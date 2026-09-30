const ts = require('typescript');
const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const env = { NODE_ENV: 'production', SMTP_USER: '13512456138@163.com', SMTP_PASS: 'test-only-not-a-real-secret' };
let attempts = 0, rejectDelivery = false, lastMail;
function load(file, imports) {
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  vm.runInNewContext(js, { exports, require: name => { if (!(name in imports)) throw new Error('Unexpected import: '+name); return imports[name]; }, process: { env }, Buffer, Date, Set, Map, Response });
  return exports;
}
const inquiry = load('src/lib/inquiry.ts', {});
const server = load('src/lib/inquiry-server.ts', {
  'node:crypto': crypto,
  './inquiry': inquiry,
  nodemailer: { createTransport: options => {
    assert.equal(options.secure, true); assert.equal(options.requireTLS, true);
    assert.equal(options.disableFileAccess, true); assert.equal(options.disableUrlAccess, true);
    return { sendMail: async mail => { attempts++; lastMail = mail; if (rejectDelivery) throw new Error('Simulated rejection'); return { accepted: [inquiry.INQUIRY_EMAIL] }; }, close() {} };
  } },
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
const sample = () => ({ name: 'QA Test', company: '', email: 'qa@example.com', phone: '', wechat: '', message: 'Local test only; not sent externally.', language: 'en', page: '/en', consent: true, website: '', token: token() });
(async () => {
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
  assert.equal((await route.POST(request('a'.repeat(16001)))).status, 413);
  assert.equal(attempts, 0);
  const good = sample();
  const first = await route.POST(request(good));
  assert.equal(first.status, 200); assert.equal((await first.json()).ok, true);
  assert.equal(lastMail.to, '13512456138@163.com'); assert.equal(lastMail.replyTo.address, 'qa@example.com');
  assert.equal(lastMail.from.address, '13512456138@163.com');
  assert.equal((await route.POST(request(good))).status, 200); assert.equal(attempts, 1);
  rejectDelivery = true;
  const failed = await route.POST(request(sample()));
  assert.equal(failed.status, 502); assert.equal((await failed.json()).ok, undefined);
  for (let i = 0; i < 5; i++) assert.equal(server.allowInquiryAttempt('test-rate-ip'), true);
  assert.equal(server.allowInquiryAttempt('test-rate-ip'), false);
  env.SMTP_PASS = '';
  assert.equal((await route.GET()).status, 200); assert.equal((await (await route.GET()).json()).ready, false);
  assert.equal((await route.POST(request(sample()))).status, 503);
  console.log('Server tests passed: signed tokens, origin/type/body limits, validation, honeypot, rate limit, fixed recipient, reply-to, SMTP acceptance, duplicate suppression, failure and missing configuration. SMTP mocked: no email sent.');
})().catch(error => { console.error(error); process.exitCode = 1; });
