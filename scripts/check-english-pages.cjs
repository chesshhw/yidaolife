// Read-only smoke test against a running production preview or public deployment.
const assert = require('node:assert/strict');
const ts = require('typescript'), fs = require('node:fs'), vm = require('node:vm');
function load(file, imports = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText, {exports,require:name=>imports[name]});
  return exports;
}
const cities = load('src/data/english-cities.ts');
const pages = load('src/data/english-training.ts', {'./english-cities':cities}).ENGLISH_TRAINING;
const base = process.argv[2] || 'http://127.0.0.1:3012';
async function read(path) {
  const response = await fetch(base + path, {signal:AbortSignal.timeout(25000)});
  assert.equal(response.status, 200, path+' status');
  return response.text();
}
(async () => {
  const sitemap = await read('/sitemap.xml');
  const titles = new Set(), descriptions = new Set();
  for (const [slug, page] of Object.entries(pages)) {
    const path = '/en/'+slug, html = await read(path);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
    assert.ok(!titles.has(title), 'duplicate title'); titles.add(title);
    assert.ok(!descriptions.has(description), 'duplicate description'); descriptions.add(description);
    assert.ok(html.includes('href="https://www.yidaolife.com'+path+'"'), path+' canonical');
    assert.equal((html.match(/<h1[ >]/g)||[]).length, 1, path+' h1');
    assert.ok(html.includes('BreadcrumbList') && html.includes('FAQPage'), path+' schema');
    assert.ok(html.includes('id="inquiry"') && html.includes('name="city"') && html.includes('name="email"'), path+' form');
    assert.ok(sitemap.includes('https://www.yidaolife.com'+path), path+' sitemap');
    if (page.city) assert.ok(html.includes('value="'+page.city+'"'), path+' prefilled city');
  }
  const home = await read('/en');
  for (const slug of Object.keys(pages)) assert.ok(home.includes('/en/'+slug), slug+' homepage entry');
  assert.ok(!(sitemap.includes('/en/thank-you')), 'thank-you must not be in sitemap');
  const thanks = await read('/en/thank-you');
  assert.ok(thanks.includes('noindex, nofollow'));
  assert.ok(!(thanks.includes('name="googlebot" content="index,')));
  assert.ok(thanks.includes('href="/en#inquiry"'));
  assert.ok((await read('/robots.txt')).includes('Allow: /'));
  const config = await fetch(base+'/api/inquiry').then(r=>r.json());
  console.log(JSON.stringify({checkedEnglishPages:Object.keys(pages).length+1, cityPages:Object.values(pages).filter(p=>p.city).length, uniqueMetadata:true, canonical:true, sitemap:true, schemas:true, formOnEveryPage:true, thankYouNoindex:true, apiReady:config.ready}, null, 2));
})().catch(error=>{ console.error(error); process.exitCode=1; });
