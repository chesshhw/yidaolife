// Offline-only regression checks: private Blob storage and Tencent SES fetch are
// replaced with in-memory mocks. This script cannot send email or use credentials.
const ts = require('typescript');
const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const env = {
  NODE_ENV: 'production',
  TENCENTCLOUD_SECRET_ID: 'test-only-secret-id',
  TENCENTCLOUD_SECRET_KEY: 'test-only-not-a-real-secret',
  BLOB_READ_WRITE_TOKEN: 'test-private-token',
};
let attempts = 0, rejectDelivery = false, rejectStorage = false, lastMail;
const logs = [];
const blobs = new Map();

async function mockSesFetch(url, options) {
  assert.equal(url, 'https://ses.tencentcloudapi.com/');
  assert.equal(options.method, 'POST');
  assert.equal(options.headers['X-TC-Action'], 'SendEmail');
  assert.equal(options.headers['X-TC-Region'], 'ap-hongkong');
  assert.equal(options.headers['X-TC-Version'], '2020-10-02');
  assert.match(options.headers.Authorization, /^TC3-HMAC-SHA256 Credential=test-only-secret-id\//);
  attempts++;
  lastMail = JSON.parse(options.body);
  const reference = lastMail.Subject.replace(/^New Training Inquiry - /, '');
  assert.ok([...blobs.entries()].some(([path, record]) => path.startsWith('leads/') && record.id === reference), 'Lead must be stored privately before notification');
  if (rejectDelivery) {
    return Response.json({ Response: { Error: { Code: 'FailedOperation.SendMail', Message: 'Secret SES response: must-not-log' }, RequestId: 'test-request-id' } });
  }
  return Response.json({ Response: { MessageId: 'test-message-id', RequestId: 'test-request-id' } });
}

function load(file, imports) {
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  vm.runInNewContext(js, {
    exports,
    require: name => { if (!(name in imports)) throw new Error('Unexpected import: '+name); return imports[name]; },
    process: { env }, Buffer, Date, Set, Map, Response, AbortSignal,
    fetch: mockSesFetch,
    console: { error: (...args) => logs.push(args), info: (...args) => logs.push(args) },
  });
  return exports;
}
const inquiry = load('src/lib/inquiry.ts', {});
const server = load('src/lib/inquiry-server.ts', {
  'node:crypto': crypto,
  './inquiry': inquiry,
  '@vercel/blob': {
    put: async (path, body, options) => { assert.equal(options.access, 'private'); assert.equal(options.addRandomSuffix, false); if (rejectStorage || (blobs.has(path) && !options.allowOverwrite)) throw new Error('Storage rejected'); blobs.set(path, JSON.parse(body)); return {pathname: path}; },
    get: async (path, options) => { assert.equal(options.access, 'private'); assert.equal(options.useCache, false); if (rejectStorage) throw new Error('Storage offline'); return blobs.has(path) ? { statusCode: 200, stream: new Response(JSON.stringify(blobs.get(path))).body } : null; },
  },
});
const route = load('src/app/api/inquiry/route.ts', {
  'next/server': { NextResponse: { json: (body, options) => Response.json(body, options) } },
  '@/lib/inquiry': inquiry,
  '@/lib/inquiry-server': server,
});
const token = () => server.createInquiryToken(Date.now() - 5000);
let requestNumber = 0;
function request(body, overrides = {}) {
  const req = new Request('https://www.yidaolife.com/api/inquiry', { method: 'POST', headers: { 'origin': 'https://www.yidaolife.com', 'content-type': 'application/json', 'x-vercel-forwarded-for': `192.0.2.${++requestNumber}`, ...overrides }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  req.nextUrl = new URL(req.url); return req;
}
const sample = () => ({ name: 'QA Test', company: '', email: 'qa@example.com', phone: '', wechat: '', message: 'Local test only; not sent externally.', city: 'Beijing', participantCount: '10', trainingType: 'Corporate First Aid Training', preferredDate: '', language: 'en', page: '/en', landingPage: '/en/corporate-first-aid-training-china', attribution: {gclid: 'test-click', utm_source: 'google'}, consent: true, website: '', token: token() });
(async () => {
  assert.equal(inquiry.INQUIRY_EMAIL, 'contact@yidaolife.com');
  assert.equal((await (await route.GET()).json()).ready, true);
  assert.equal(server.verifyInquiryToken(server.createInquiryToken()), false);
  assert.equal(server.verifyInquiryToken(server.createInquiryToken(Date.now() - 7200001)), false);
  assert.equal(server.verifyInquiryToken(token()), true);
  assert.equal(server.verifyInquiryToken(token()+'x'), false);
  assert.equal((await route.POST(request(sample(), { origin: 'https://attacker.example' }))).status, 403);
  assert.equal((await route.POST(request(sample(), { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await route.POST(request('bad-json'))).status, 400);
  assert.equal((await route.POST(request({ ...sample(), website: 'bot' }))).status, 400);
  assert.equal((await route.POST(request({ ...sample(), consent: false }))).status, 400);
  assert.equal((await route.POST(request({ ...sample(), token: '' }))).status, 400);
  assert.equal((await route.POST(request('a'.repeat(20001)))).status, 413);
  assert.equal(attempts, 0);
  const good = { ...sample(), Destination: ['attacker@example.com'] };
  const first = await route.POST(request(good));
  assert.equal(first.status, 200); assert.equal((await first.json()).ok, true);
  assert.deepEqual(lastMail.Destination, ['contact@yidaolife.com']);
  assert.equal(lastMail.ReplyToAddresses, 'qa@example.com');
  assert.equal(lastMail.FromEmailAddress, 'Yidaolife Training <leads@notify.yidaolife.com>');
  assert.equal(lastMail.Template.TemplateID, 221198);
  assert.match(JSON.parse(lastMail.Template.TemplateData).lead_details, /qa@example\.com/);
  assert.equal((await route.POST(request(good))).status, 200); assert.equal(attempts, 1);
  assert.equal((await route.POST(request({...good, name: 'Different payload'}))).status, 502); assert.equal(attempts, 1);
  const saved = [...blobs.entries()].find(([key]) => key.startsWith('leads/'))[1];
  assert.equal(saved.gclid, 'test-click'); assert.equal(saved.utm_source, 'google'); assert.equal(saved.source, 'google_ads'); assert.equal(saved.city, 'Beijing'); assert.equal(saved.landingPage, good.landingPage);
  rejectDelivery = true;
  const failed = await route.POST(request(sample()));
  assert.equal(failed.status, 200); assert.equal((await failed.json()).ok, true);
  assert.ok([...blobs.values()].some(record => record.status === 'failed'));
  const failedStatus = [...blobs.values()].find(record => record.status === 'failed');
  assert.ok([...blobs.entries()].some(([path, record]) => path.startsWith('leads/') && record.id === failedStatus.id), 'Failed email must not discard the saved lead');
  assert.equal(failedStatus.failure.code, 'FailedOperation.SendMail');
  assert.equal(failedStatus.failure.command, 'SEND_EMAIL');
  assert.deepEqual(Object.keys(failedStatus.failure).sort(), ['code', 'command']);
  assert.ok(logs.some(([event]) => event === 'INQUIRY_NOTIFICATION_ACCEPTED'));
  assert.ok(logs.some(([event, data]) => event === 'INQUIRY_NOTIFICATION_FAILED' && data.reference));
  assert.equal(JSON.stringify(logs).includes('must-not-log'), false);
  assert.equal(JSON.stringify(failedStatus).includes('must-not-log'), false);
  assert.equal(JSON.stringify(logs).includes(env.TENCENTCLOUD_SECRET_KEY), false);
  assert.equal(server.inquiryMailFailure({code:'secret text',command:'secret',responseCode:999}).code, 'UNKNOWN');
  const beforeStorageFailure = attempts;
  rejectStorage = true;
  assert.equal((await route.POST(request(sample()))).status, 502); assert.equal(attempts, beforeStorageFailure);
  rejectStorage = false;
  for (let i = 0; i < 5; i++) assert.equal(server.allowInquiryAttempt('test-rate-ip'), true);
  assert.equal(server.allowInquiryAttempt('test-rate-ip'), false);
  env.TENCENTCLOUD_SECRET_KEY = '';
  assert.equal((await route.GET()).status, 200); assert.equal((await (await route.GET()).json()).ready, false);
  assert.equal((await route.POST(request(sample()))).status, 503);
  env.TENCENTCLOUD_SECRET_KEY = 'test-only'; env.BLOB_READ_WRITE_TOKEN = '';
  assert.equal((await (await route.GET()).json()).ready, false);
  console.log('Server tests passed: contact recipient, unchanged notify sender, visitor Reply-To, validation, signed tokens, origins, limits, private storage BEFORE email, source capture, duplicate/mismatched retry, SES failure retains lead, storage failure prevents success, missing config. Blob and SES fetch mocked: no network or email.');
})().catch(error => { console.error(error); process.exitCode = 1; });
