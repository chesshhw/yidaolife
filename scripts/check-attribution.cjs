// No browser, network, credentials or user data: pure attribution regression tests.
const ts = require('typescript'), fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
function load(file, imports, globals = {}) {
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  vm.runInNewContext(js, {exports, require: name => imports[name], ...globals});
  return exports;
}
const inquiry = load('src/lib/inquiry.ts', {});
const location = {href: 'https://www.yidaolife.com/en/aha-training-china?gclid=qa-click&utm_source=google&utm_medium=cpc&utm_campaign=china&utm_term=aha&utm_content=headline'};
let stored = null, blocked = false;
const api = load('src/lib/attribution.ts', {'./inquiry':inquiry}, { URL, window:{location}, sessionStorage:{getItem:()=>{if(blocked)throw new Error();return stored},setItem:(_,value)=>{if(blocked)throw new Error();stored=value}} });
const first = api.captureAttribution();
assert.equal(first.values.gclid, 'qa-click');
assert.equal(first.values.utm_term, 'aha');
location.href = 'https://www.yidaolife.com/en/shanghai-first-aid-training';
assert.equal(api.captureAttribution().landingPage, '/en/aha-training-china');
assert.equal(api.captureAttribution().values.gclid, 'qa-click');
stored = '{"landingPage":"https://invalid.example","values":{}}';
assert.equal(api.captureAttribution().landingPage, '/en/aha-training-china');
blocked = true;
assert.equal(api.captureAttribution().values.gclid, 'qa-click');
location.href = 'https://www.yidaolife.com/en?utm_source=new-campaign';
assert.equal(api.captureAttribution().values.utm_source, 'new-campaign');
assert.equal(api.captureAttribution().values.gclid, '');
assert.equal(inquiry.analyticsCity('西安'), 'Xi’an');
assert.equal(inquiry.analyticsCity("Xi'an"), 'Xi’an');
assert.equal(inquiry.analyticsCity('Alex alex@example.com'), 'Other');
assert.equal(inquiry.TRAINING_CITIES.length, 16);
console.log('Attribution tests passed: all source keys, internal navigation, malformed/blocked storage, new campaign, controlled city values and 16 cities.');
