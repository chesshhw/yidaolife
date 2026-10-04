// Offline component behavior checks. React hooks, form controls, fetch, analytics,
// router and storage are mocked; no network, customer data or emails are used.
const ts = require('typescript');
const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');

function load(file, imports = {}, globals = {}) {
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(js, { exports, require: name => { assert.ok(name in imports, `Unexpected import ${name}`); return imports[name]; }, ...globals });
  return exports;
}
const inquiry = load('src/lib/inquiry.ts');
function nodes(root) {
  if (!root || typeof root !== 'object') return [];
  if (Array.isArray(root)) return root.flatMap(nodes);
  return [root, ...nodes(root.props?.children)];
}
// Read controls from the component tree, including closed details. Like browser
// FormData, disabled controls and unchecked checkboxes are omitted, not empty.
class RenderedFormData {
  constructor(form) {
    this.values = new Map();
    const visit = (root, disabled = false) => {
      if (!root || typeof root !== 'object') return;
      if (Array.isArray(root)) { root.forEach(child => visit(child, disabled)); return; }
      const props = root.props || {};
      const isDisabled = disabled || Boolean(props.disabled);
      if (['input', 'select', 'textarea'].includes(root.type) && props.name && !isDisabled) {
        const hasOverride = Object.prototype.hasOwnProperty.call(form.values, props.name);
        const value = hasOverride ? form.values[props.name] : props.defaultValue ?? '';
        if (props.type !== 'checkbox') this.values.set(props.name, String(value));
        else if (value === true || value === 'on') this.values.set(props.name, 'on');
      }
      visit(props.children, isDisabled);
    };
    visit(form.tree);
  }
  get(name) { return this.values.has(name) ? this.values.get(name) : null; }
}
const flush = () => new Promise(resolve => setImmediate(resolve));
function createHarness(options = {}) {
  const hooks = [], pendingEffects = [], fetches = [], events = [], pushes = [], storage = new Map();
  const behavior = { getFails: false, postThrows: false, postStatus: 200, postBody: { ok: true, reference: 'YD-offline-test' }, analytics: 'accept', storageFails: false, ...options };
  let hookIndex = 0, tree;
  const react = {
    useState: initial => { const index = hookIndex++; if (!(index in hooks)) hooks[index] = initial; return [hooks[index], value => { hooks[index] = typeof value === 'function' ? value(hooks[index]) : value; }]; },
    useRef: initial => { const index = hookIndex++; if (!(index in hooks)) hooks[index] = { current: initial }; return hooks[index]; },
    useEffect: (callback, deps) => {
      const index = hookIndex++;
      const previous = hooks[index];
      if (!previous || deps.some((value, key) => value !== previous[key])) pendingEffects.push(callback);
      hooks[index] = deps;
    },
  };
  const trackAnalyticsEvent = (name, params) => {
    if (behavior.analytics === 'throw_generate' && name === 'generate_lead') throw new Error('Offline analytics failure');
    events.push({ name, params });
    return behavior.analytics !== 'reject';
  };
  const jsx = (type, props) => ({ type, props });
  const Component = load('src/components/InquiryForm.tsx', {
    react, 'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'Fragment' },
    'next/link': () => null,
    'next/navigation': { useRouter: () => ({ push: path => pushes.push(path) }) },
    '@/lib/inquiry': inquiry,
    '@/lib/attribution': { captureAttribution: () => ({ landingPage: '/en/aha-training-china', values: { utm_source: 'offline-test' } }) },
    '@/lib/analytics': { trackAnalyticsEvent },
  }, {
    FormData: RenderedFormData,
    window: { location: { pathname: options.initialLanguage === 'zh' ? '/contact' : '/en/aha-training-china' } },
    sessionStorage: { getItem: key => { if (behavior.storageFails) throw new Error('Storage denied'); return storage.get(key) || null; }, setItem: (key, value) => { if (behavior.storageFails) throw new Error('Storage denied'); storage.set(key, value); } },
    AbortSignal: { timeout: () => ({}) },
    fetch: async (url, init) => {
      assert.equal(url, '/api/inquiry');
      fetches.push({ method: init.method || 'GET', ...(init.body ? { payload: JSON.parse(init.body) } : {}) });
      if (init.method !== 'POST') {
        if (behavior.getFails) throw new Error('Offline API unavailable');
        return { ok: true, status: 200, json: async () => ({ ready: true, token: 'offline-signed-token' }) };
      }
      if (behavior.postThrows) throw new Error('Offline network failure');
      return { ok: behavior.postStatus >= 200 && behavior.postStatus < 300, status: behavior.postStatus, json: async () => behavior.postBody };
    },
  }).default;
  function render() {
    hookIndex = 0;
    tree = Component({ initialLanguage: options.initialLanguage || 'en', defaultCity: 'Shanghai', defaultTraining: 'CPR & AED Training' });
    for (const node of nodes(tree)) if (node.props?.ref && !node.props.ref.current) node.props.ref.current = { open: false, focus() {} };
    return tree;
  }
  function form() { return nodes(tree).find(node => node.type === 'form'); }
  async function mount() {
    render();
    while (pendingEffects.length) pendingEffects.shift()();
    await flush();
    render();
  }
  async function submit(values = {}) {
    let prevented = false;
    const currentTarget = { tree: form(), values: { name: 'Offline Test', email: 'offline@example.com', consent: true, ...values }, reset() { assert.fail('A failed form must retain input'); } };
    await form().props.onSubmit({ currentTarget, preventDefault() { prevented = true; } });
    assert.equal(prevented, true);
    render();
  }
  return { behavior, mount, render, submit, form, fetches, events, pushes, storage, tree: () => tree, posts: () => fetches.filter(item => item.method === 'POST'), leads: () => events.filter(item => item.name === 'generate_lead') };
}

(async () => {
  const successful = createHarness();
  await successful.mount();
  const all = nodes(successful.tree());
  const details = all.find(node => node.type === 'details');
  assert.ok(details, 'Optional controls should use a native collapsible section');
  assert.notEqual(details.props.open, true);
  const optionalNames = nodes(details).filter(node => ['input', 'select', 'textarea'].includes(node.type)).map(node => node.props.name);
  assert.deepEqual(optionalNames.sort(), ['company', 'message', 'participantCount', 'phone', 'preferredDate', 'trainingType', 'wechat'].sort());
  const visibleRequired = all.filter(node => node.type === 'input' && node.props.required && node.props.type !== 'checkbox').map(node => node.props.name);
  assert.deepEqual(visibleRequired, ['name', 'email', 'city']);
  assert.ok(visibleRequired.every(name => !optionalNames.includes(name)));

  successful.form().props.onChange();
  successful.form().props.onChange();
  assert.equal(successful.events.filter(event => event.name === 'form_start').length, 1);
  await successful.submit();
  assert.equal(successful.posts().length, 1);
  const payload = successful.posts()[0].payload;
  assert.equal(payload.city, 'Shanghai');
  assert.equal(payload.trainingType, 'CPR & AED Training', 'Default course must survive a closed optional section');
  for (const field of ['company', 'phone', 'wechat', 'message', 'participantCount', 'preferredDate', 'website']) assert.equal(payload[field], '', `${field} must be a string, not omitted or null`);
  assert.equal(payload.consent, true);
  assert.equal(payload.landingPage, '/en/aha-training-china');
  assert.equal(payload.attribution.utm_source, 'offline-test');
  assert.ok(inquiry.validateInquiry(payload), 'Actual server validator must accept the minimal collapsed form');
  assert.equal(successful.leads().length, 1);
  assert.deepEqual(successful.pushes, ['/en/thank-you']);
  const leadParams = successful.leads()[0].params;
  assert.equal(leadParams.city, 'Shanghai');
  for (const field of ['name', 'email', 'phone', 'wechat', 'message', 'company']) assert.equal(leadParams[field], undefined, 'Do not send form contact fields to analytics');

  await successful.submit();
  assert.equal(successful.leads().length, 1, 'Same server reference is only tracked once');
  successful.behavior.postBody = { ok: true, reference: 'YD-another-offline-test' };
  await successful.submit({ company: 'Offline Company', phone: '+1 212 555 0100', wechat: 'offline-id', message: 'Offline test only', participantCount: '12', preferredDate: '2026-12-01' });
  assert.equal(successful.leads().length, 2, 'A different saved enquiry should count separately');
  assert.ok(inquiry.validateInquiry(successful.posts().at(-1).payload));
  assert.equal(successful.posts().at(-1).payload.message, 'Offline test only');

  for (const [status, error, expected] of [[400, 'INVALID', 'invalid'], [400, 'EXPIRED', 'expired'], [429, 'RATE_LIMIT', 'rate_limit'], [503, 'UNAVAILABLE', 'unavailable'], [502, 'DELIVERY_FAILED', 'server']]) {
    const failed = createHarness({ postStatus: status, postBody: { error } });
    await failed.mount();
    await failed.submit();
    assert.equal(failed.leads().length, 0, `${error} must not create a lead event`);
    assert.equal(failed.pushes.length, 0);
    assert.equal(failed.events.find(event => event.name === 'form_error').params.error_type, expected);
    if (error === 'INVALID') assert.equal(nodes(failed.tree()).find(node => node.type === 'details').props.ref.current.open, true, 'Server validation error should reveal optional fields for correction');
  }
  const network = createHarness({ postThrows: true });
  await network.mount(); await network.submit();
  assert.equal(network.leads().length, 0);
  assert.equal(network.events.at(-1).params.error_type, 'network');
  assert.equal(network.pushes.length, 0);

  const unavailable = createHarness({ getFails: true });
  await unavailable.mount(); await unavailable.submit();
  assert.equal(unavailable.posts().length, 0);
  assert.equal(unavailable.leads().length, 0);
  assert.equal(unavailable.events.find(event => event.name === 'form_error').params.error_type, 'unavailable');

  const analyticsRejected = createHarness({ analytics: 'reject' });
  await analyticsRejected.mount(); await analyticsRejected.submit();
  assert.deepEqual(analyticsRejected.pushes, ['/en/thank-you']);
  assert.equal(analyticsRejected.storage.size, 0, 'An unqueued event must not receive a tracking marker');
  analyticsRejected.behavior.analytics = 'accept';
  await analyticsRejected.submit();
  assert.equal(analyticsRejected.storage.size, 1);
  const analyticsThrows = createHarness({ analytics: 'throw_generate' });
  await analyticsThrows.mount(); await analyticsThrows.submit();
  assert.deepEqual(analyticsThrows.pushes, ['/en/thank-you']);
  const blockedStorage = createHarness({ storageFails: true, initialLanguage: 'zh' });
  await blockedStorage.mount(); await blockedStorage.submit();
  assert.deepEqual(blockedStorage.pushes, ['/thank-you']);

  const invalidBrowser = createHarness();
  await invalidBrowser.mount();
  const invalidDetails = { open: false };
  const event = { target: { closest: selector => selector === 'details' ? invalidDetails : null } };
  invalidBrowser.form().props.onInvalidCapture(event);
  invalidBrowser.form().props.onInvalidCapture(event);
  assert.equal(invalidDetails.open, true);
  assert.equal(invalidBrowser.events.filter(item => item.name === 'form_error').length, 1);
  invalidBrowser.form().props.onChange();
  invalidBrowser.form().props.onInvalidCapture(event);
  assert.equal(invalidBrowser.events.filter(item => item.name === 'form_error').length, 2);
  console.log('Inquiry form checks passed: required fields first, closed optional controls and defaults submit a server-valid payload, successful references deduplicate, API/network/unavailable failures never become leads, invalid inputs reopen details, analytics/storage failures do not block confirmation. All network and analytics mocked; no email sent.');
})().catch(error => { console.error(error); process.exitCode = 1; });
