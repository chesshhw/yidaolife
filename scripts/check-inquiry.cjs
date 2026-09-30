// Local-only validation tests. Does not connect to SMTP or send customer messages.
const ts = require('typescript');
const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const source = ts.transpileModule(fs.readFileSync('src/lib/inquiry.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const exportsObject = {};
vm.runInNewContext(source, { exports: exportsObject });
const { validateInquiry, inquiryEmailText, INQUIRY_EMAIL } = exportsObject;
const base = { name: 'Alex Test', company: 'Example Team', email: 'alex@example.com', phone: '+65 6123 4567', wechat: '', message: 'Shanghai / 12 participants / English instruction enquiry', consent: true, language: 'en', page: '/en' };
assert.equal(INQUIRY_EMAIL, '13512456138@163.com');
assert.ok(validateInquiry(base));
assert.ok(validateInquiry({ ...base, name: '王老师', language: 'zh', phone: '', company: '' }));
for (const invalid of [null, [], 'text', { ...base, consent: false }, { ...base, email: 'a@example.com\r\nBcc: victim@example.com' }, { ...base, name: '\r\nInjected' }, { ...base, email: 'a,b@example.com' }, { ...base, email: 'bad address@example.com' }, { ...base, message: '' }, { ...base, message: 'x'.repeat(3001) }, { ...base, company: { text: 'bad' } }, { ...base, phone: 'abc' }, { ...base, language: 'fr' }]) assert.equal(validateInquiry(invalid), null);
assert.equal(validateInquiry({ ...base, page: 'https://attacker.example/?email=private' }).page, '/contact');
const mail = inquiryEmailText(validateInquiry(base), 'YD-test', new Date('2026-09-30T00:00:00Z'));
for (const value of ['Alex Test', 'Example Team', 'alex@example.com', '+65 6123 4567', 'Shanghai / 12 participants']) assert.ok(mail.includes(value));
console.log('Inquiry validation: required fields, optional fields, international phone, bounds, consent, unsafe headers, source allowlist and email contents passed. No email sent.');
