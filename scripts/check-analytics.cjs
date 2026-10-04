// Offline regression tests: no real browser, Google requests, credentials or enquiries.
const ts = require('typescript');
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

function load(file, imports = {}, globals = {}) {
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(js, { exports, require: name => { assert.ok(name in imports, `Unexpected import ${name}`); return imports[name]; }, URL, ...globals });
  return exports;
}
const inquiry = load('src/lib/inquiry.ts');
class MockElement {
  constructor(tag, href = null, parent = null, ignore = false) { Object.assign(this, { tag, href, parent, ignore }); }
  closest(selector) {
    for (let node = this; node; node = node.parent) {
      if ((selector === 'a[href]' && node.tag === 'a' && node.href !== null) || (selector === '[data-analytics-ignore]' && node.ignore) || node.tag === selector) return node;
    }
    return null;
  }
  getAttribute(name) { return name === 'href' ? this.href : null; }
}
function harness({ url = 'https://www.yidaolife.com/en/aha-training-china?email=private@example.com#section', mode = 'production', deployment = 'production', configure = true } = {}) {
  const calls = [], listeners = new Map();
  const browser = { location: new URL(url), gtag: (...args) => calls.push(args) };
  const document = {
    addEventListener: (type, callback) => listeners.set(type, callback),
    removeEventListener: (type, callback) => { if (listeners.get(type) === callback) listeners.delete(type); },
  };
  const api = load('src/lib/analytics.ts', { './inquiry': inquiry }, { window: browser, document, Element: MockElement, process: { env: { NODE_ENV: mode } } });
  if (configure) api.configureAnalyticsDeployment(deployment);
  return { api, browser, calls, listeners, events: () => calls.filter(args => args[0] === 'event') };
}

for (const options of [
  { url: 'http://localhost:3000/en' },
  { url: 'https://yidaolife-preview.vercel.app/en' },
  { url: 'https://www.yidaolife.com.attacker.example/' },
  { url: 'http://www.yidaolife.com/' },
  { mode: 'development' },
  { deployment: 'preview' },
  { deployment: 'development' },
  { configure: false },
]) {
  const test = harness(options);
  assert.equal(test.api.initializeAnalytics(), false);
  assert.equal(test.api.trackAnalyticsEvent('contact_click', { method: 'phone' }), false);
  const cleanup = test.api.installAnalyticsClickTracking(); cleanup();
  assert.equal(test.calls.length, 0);
  assert.equal(test.listeners.size, 0);
}
for (const host of ['www.yidaolife.com', 'yidaolife.com']) {
  const test = harness({ url: `https://${host}/` });
  assert.equal(test.api.initializeAnalytics(), true);
  assert.equal(test.api.initializeAnalytics(), true);
  assert.equal(test.calls.filter(args => args[0] === 'config').length, 1);
  assert.equal(test.calls.find(args => args[0] === 'config')[2].send_page_view, undefined);
}

const test = harness();
test.api.initializeAnalytics();
const cleanup = test.api.installAnalyticsClickTracking();
const click = (href, { parent = null, nested = false, ignore = false, button = 0 } = {}) => {
  const link = new MockElement('a', href, parent, ignore);
  const event = { button, target: nested ? new MockElement('span', null, link) : link, preventDefault() { assert.fail('Analytics must not block navigation'); } };
  test.listeners.get('click')(event);
};
click('tel:+8613512456138', { nested: true });
assert.equal(test.events().at(-1)[1], 'contact_click');
assert.equal(test.events().at(-1)[2].method, 'phone');
click('mailto:contact@yidaolife.com?subject=private', { parent: new MockElement('footer') });
assert.equal(test.events().at(-1)[2].method, 'email');
assert.equal(test.events().at(-1)[2].placement, 'footer');
click('#inquiry');
assert.equal(test.events().at(-1)[1], 'inquiry_cta_click');
click('/contact?name=private');
assert.equal(test.events().length, 4);
click('https://other.example/#inquiry');
click('mailto:private@example.com', { ignore: true });
click('tel:12345', { button: 2 });
click('/blog');
test.listeners.get('click')({ button: 0, target: {} });
assert.equal(test.events().length, 4);
cleanup();
assert.equal(test.listeners.size, 0);

assert.equal(test.api.trackAnalyticsEvent('contact_click', { method: 'private@example.com' }), false);
assert.equal(test.api.trackAnalyticsEvent('unknown_event', { name: 'private' }), false);
test.api.trackAnalyticsEvent('wechat_copy', { placement: 'floating_contact', text: 'private@example.com' });
assert.equal(test.events().at(-1)[1], 'wechat_copy');
assert.equal(test.events().at(-1)[2].method, 'wechat');
for (const name of ['form_start', 'form_submit', 'form_error']) {
  test.api.trackAnalyticsEvent(name, { form_name: 'english_training_inquiry', form_language: 'en', error_type: 'expired' });
  assert.equal(test.events().at(-1)[1], `inquiry_${name}`);
}
assert.equal(test.api.trackAnalyticsEvent('generate_lead', {
  form_name: 'english_training_inquiry', form_language: 'en', training_type: 'CPR & AED Training', city: '上海',
  landing_page: '/en/aha-training-china?email=private@example.com#private', email: 'private@example.com', phone: '+1234567890', name: 'Private Person', message: 'Private notes', reference: 'private-reference', gclid: 'private-click', placement: 'private-location',
}), true);
const lead = test.events().at(-1);
assert.equal(lead[1], 'generate_lead');
assert.equal(lead[2].city, 'Shanghai');
assert.equal(lead[2].landing_page, '/en/aha-training-china');
assert.equal(lead[2].training_type, 'CPR & AED Training');
assert.equal(lead[2].page_type, 'english_training');
assert.equal(JSON.stringify(test.events()).includes('private'), false);
assert.equal(JSON.stringify(test.events()).includes('13512456138'), false);
test.api.trackAnalyticsEvent('generate_lead', { form_name: 'private', city: 'private@example.com', training_type: 'private', landing_page: '//attacker.example/path', form_language: 'private' });
assert.equal(test.events().at(-1)[2].city, 'Other');
assert.equal(test.events().at(-1)[2].training_type, 'Not specified');
assert.equal(test.events().at(-1)[2].landing_page, 'other');
assert.equal(test.events().at(-1)[2].form_name, undefined);
assert.equal(test.api.analyticsPath('/blog/private-slug?email=private'), '/blog');
assert.equal(test.api.analyticsPath('/city/private-slug'), '/cities');
assert.equal(test.api.analyticsPath('/private-person/123456'), 'other');

test.browser.gtag = () => { throw new Error('Blocked analytics'); };
assert.doesNotThrow(() => test.api.trackAnalyticsEvent('contact_click', { method: 'phone' }));
assert.equal(test.api.trackAnalyticsEvent('generate_lead'), false);
const queue = harness(); delete queue.browser.gtag;
assert.equal(queue.api.initializeAnalytics(), true);
assert.equal(queue.api.trackAnalyticsEvent('contact_click', { method: 'email' }), true);
assert.equal(queue.browser.dataLayer.length, 3);

// Exercise the actual component's loading decision with minimal React hooks.
for (const deployment of ['production', 'preview']) {
  const componentTest = harness({ configure: false });
  let enabled = false, effect, cleanupEffect;
  const react = { useState: () => [enabled, value => { enabled = value; }], useEffect: callback => { effect = callback; } };
  const jsx = (type, props) => ({ type, props });
  const Component = load('src/components/Analytics.tsx', {
    react, 'react/jsx-runtime': { jsx }, 'next/script': () => null, '@/lib/analytics': componentTest.api,
  }).default;
  assert.equal(Component({ deploymentEnvironment: deployment }), null);
  cleanupEffect = effect();
  const rendered = Component({ deploymentEnvironment: deployment });
  if (deployment === 'preview') assert.equal(rendered, null);
  else assert.match(rendered.props.src, /^https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-8B4KHDJH9E$/);
  cleanupEffect?.();
}
async function checkFloatingContact() {
  let pathname = '/', stateIndex = 0, copyFails = false, observer;
  const states = [], effects = [], contactEvents = [], focusListeners = new Map();
  class MockNode {}
  class MockObserver {
    constructor(callback) { this.callback = callback; observer = this; }
    observe() {}
    disconnect() { this.disconnected = true; }
  }
  const form = { contains: target => target instanceof MockNode };
  const react = {
    useState: initial => { const index = stateIndex++; if (!(index in states)) states[index] = initial; return [states[index], value => { states[index] = value; }]; },
    useRef: () => ({ current: null }),
    useCallback: callback => callback,
    useEffect: callback => effects.push(callback),
  };
  const jsx = (type, props) => ({ type, props });
  const Component = load('src/components/FloatingContact.tsx', {
    react, 'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'Fragment' },
    'next/image': () => null, 'next/link': () => null, 'next/navigation': { usePathname: () => pathname },
    '@/lib/analytics': { trackAnalyticsEvent: (...args) => contactEvents.push(args) },
  }, {
    navigator: { clipboard: { writeText: async () => { if (copyFails) throw new Error('Clipboard denied'); } } },
    document: { getElementById: () => form, addEventListener: (name, callback) => focusListeners.set(name, callback), removeEventListener: name => focusListeners.delete(name) },
    Node: MockNode, IntersectionObserver: MockObserver,
  }).default;
  const render = () => { stateIndex = 0; effects.length = 0; return Component(); };
  const find = (node, predicate) => {
    if (!node || typeof node !== 'object') return null;
    if (predicate(node)) return node;
    for (const child of [node.props?.children].flat()) { const match = find(child, predicate); if (match) return match; }
    return null;
  };
  const chinese = render();
  find(chinese, node => node.props?.['aria-label'] === '打开微信咨询').props.onClick();
  assert.equal(contactEvents.length, 1);
  assert.equal(contactEvents[0][0], 'contact_click');
  assert.equal(contactEvents[0][1].method, 'wechat');
  const copyButton = find(chinese, node => node.type === 'button' && node.props.children === '复制微信号');
  copyFails = true;
  await copyButton.props.onClick();
  assert.equal(contactEvents.length, 1, 'Failed copying must not become a successful copy event');
  copyFails = false;
  await copyButton.props.onClick();
  assert.equal(contactEvents.length, 2);
  assert.equal(contactEvents[1][0], 'wechat_copy');

  pathname = '/en';
  assert.equal(render().props.children, 'Enquire');
  const cleanupVisibility = effects[0]();
  observer.callback([{ isIntersecting: true }]);
  assert.equal(render(), null, 'Floating CTA must hide while form is visible');
  observer.callback([{ isIntersecting: false }]);
  assert.equal(render().props.children, 'Enquire');
  focusListeners.get('focusin')({ target: new MockNode() });
  assert.equal(render(), null, 'Floating CTA must hide while editing the form');
  focusListeners.get('focusout')();
  assert.equal(render().props.children, 'Enquire');
  pathname = '/en/thank-you';
  assert.equal(render(), null, 'Confirmation page must not display a redundant enquiry CTA');
  cleanupVisibility();
  assert.equal(observer.disconnected, true);
  assert.equal(focusListeners.size, 0);
}
checkFloatingContact().then(() => {
  console.log('Analytics checks passed: production hosts and Vercel environment, no preview script, default page_view, contact/CTA capture, controlled parameters/no contact data/query, distinct inquiry funnel, failure isolation, successful WeChat copy only, and floating CTA visibility/focus/cleanup. No Google requests or emails sent.');
}).catch(error => { console.error(error); process.exitCode = 1; });
