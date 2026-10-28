// Read-only checks. No form POST, notifications, credentials, submission or publication.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {load,root} = require('./operations-loader.cjs');
const {parse} = require('next/dist/compiled/node-html-parser');
const {shanghaiDate,splitSchedule,scheduleDateIso} = load('src/lib/schedule.ts');
const {CITIES,sanitizeLocation} = load('src/data/cities.ts');
const {CITY_SCHEDULE_DATES} = load('src/data/city-dates.ts');
const {buildCityJsonLd} = load('src/lib/city-landing.ts');
const args = process.argv.slice(2);
const arg = name => args[args.indexOf(name)+1];
const base = args.includes('--base') ? arg('--base').replace(/\/$/,'') : null;
const asOf = shanghaiDate();
const report = {checkedAt:new Date().toISOString(),asOf,timezone:'Asia/Shanghai',base,
  checks:[],issues:[],businessVerification:'Schedules and locations reconciled against owner-supplied 2026-10-28 files; Xi’an address corrected by owner. Puer, Ganzhou and Dujiangyan remain available with dates/venues pending. Fees, seats and venue affiliation remain unverified. See docs/operations/sources/20261028/reconciliation.json.',
  formDelivery:'Not tested: no real enquiry sent',publication:'Not inferred from local checks'};
function check(name,passed,detail) { report.checks.push({name,passed,detail}); if(!passed) report.issues.push({name,detail}); }
function datesIn(value,result=[]) {
  if(Array.isArray(value)) value.forEach(v=>datesIn(v,result));
  else if(value && typeof value==='object') { if(value['@type']==='CourseInstance') result.push(value.startDate); Object.values(value).forEach(v=>datesIn(v,result)); }
  return result;
}
async function main() {
  assert.equal(shanghaiDate(new Date('2026-10-21T15:59:59Z')),'2026-10-21');
  assert.equal(shanghaiDate(new Date('2026-10-21T16:00:00Z')),'2026-10-22');
  assert.equal(scheduleDateIso('2026年2月30日'),null);
  const boundary=splitSchedule('2026年10月23日, 2026年10月21日, 2026年10月22日, 2026年10月23日','2026-10-22');
  assert.equal(JSON.stringify(boundary.dates),JSON.stringify(['2026年10月22日','2026年10月23日']));
  assert.equal(boundary.pastDates.length,1);
  assert.equal(splitSchedule('2026年10月21日','2026-10-22').dates.length,0);
  assert.equal(splitSchedule('满6人开课').dates.length,0);
  assert.ok(sanitizeLocation('某培训教室（暂定）').includes('暂定'));
  check('Shanghai midnight, calendar validity, ordering, no invented dates and tentative address retention',true);
  const sourceRows=fs.readFileSync(path.join(root,'trainingDates.json'),'utf8').replace(/^\uFEFF/,'').trim().split(/\r?\n/).map(JSON.parse);
  const alias={};
  for(const row of sourceRows) {
    const key=alias[row.city]||row.city;
    const normalized=row.date.includes('满6人开课')?'满6人开课':row.date.split(/[,，]\s*/).map(x=>x.trim()).join(', ');
    check('Source parity: '+row.city,CITY_SCHEDULE_DATES[key]===normalized);
  }
  report.schedules=CITIES.map(city=>{
    const state=splitSchedule(city.scheduleDates,asOf);
    const schemaDates=datesIn(buildCityJsonLd(city,city.slug,asOf));
    check('Schedule/schema: '+city.slug,!state.invalidDates.length && JSON.stringify(schemaDates)===JSON.stringify(state.dates.map(scheduleDateIso)));
    return {city:city.name,slug:city.slug,...state};
  });
  const manifestPath=path.join(root,'.next/prerender-manifest.json');
  if(fs.existsSync(manifestPath)) {
    const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
    check('City schedules not cached as static HTML',!Object.keys(manifest.routes).some(p=>p==='/cities'||p.startsWith('/city/')));
  }
  if(base) {
    const routes=['/','/cities','/city/beijing','/city/tianjin','/city/shanghai','/city/shenzhen','/enterprise-training','/contact','/en','/programs','/tianjin-wma-wilderness-first-aid-training','/robots.txt','/sitemap.xml'];
    report.pages=[];
    for(const route of routes) {
      try {
        const res=await fetch(base+route,{signal:AbortSignal.timeout(20000)});
        const html=await res.text();
        const entry={route,status:res.status,bytes:Buffer.byteLength(html)};
        report.pages.push(entry);
        check('HTTP '+route,res.status===200,entry);
        if(route==='/robots.txt') { check('Robots sitemap',html.includes('https://www.yidaolife.com/sitemap.xml')); continue; }
        if(route==='/sitemap.xml') {
          const xml=parse(html), urls=xml.querySelectorAll('url');
          check('Sitemap unique URLs',new Set(urls.map(x=>x.querySelector('loc')?.text)).size===urls.length);
          check('Sitemap no future timestamps',urls.every(x=>!x.querySelector('lastmod')||x.querySelector('lastmod').text.slice(0,10)<=asOf));
          entry.urls=urls.length; continue;
        }
        const dom=parse(html);
        check('Initial HTML content '+route,Boolean(dom.querySelector('h1')?.text.trim()));
        const canonical=dom.querySelector('link[rel=canonical]')?.getAttribute('href');
        check('Canonical '+route,canonical==='https://www.yidaolife.com'+(route==='/'?'':route),canonical);
        check('Viewport '+route,Boolean(dom.querySelector('meta[name=viewport]')));
        check('Indexable '+route,!/noindex/i.test(dom.querySelector('meta[name=robots]')?.getAttribute('content')||'')&&!/noindex/i.test(res.headers.get('x-robots-tag')||''));
        let schemas=[];
        try { schemas=dom.querySelectorAll('script[type="application/ld+json"]').map(el=>JSON.parse(el.text)); check('JSON-LD parses '+route,true); }
        catch(error) { check('JSON-LD parses '+route,false,error.message); }
        if(route.startsWith('/city/')) {
          const city=CITIES.find(c=>'/city/'+c.slug===route), expected=splitSchedule(city.scheduleDates,asOf);
          const section=dom.querySelector('#city-schedule');
          const history=section?.querySelector('details');
          check('History '+route,expected.pastDates.every(d=>history?.text.includes(d)));
          if(history) history.remove();
          check('Upcoming excludes history '+route,expected.pastDates.every(d=>!section?.text.includes(d)));
          check('Upcoming includes supplied dates '+route,expected.dates.every(d=>section?.text.includes(d)));
          check('Live schema matches upcoming '+route,JSON.stringify(datesIn(schemas))===JSON.stringify(expected.dates.map(scheduleDateIso)));
        }
        if(route.includes('tianjin-wma-')) {
          const text=dom.querySelector('main')?.text||'';
          check('WMA expired promotion removed',!text.includes('关键词覆盖')&&!text.includes('最低仅需')&&!text.includes('1200元')&&text.includes('历史排期')&&text.includes('待确认'));
        }
        if(route==='/contact') check('Contact form present',Boolean(dom.querySelector('form')) && html.includes('contact@yidaolife.com'));
      } catch(error) { check('Fetch '+route,false,error.message); }
    }
  }
  report.passed=report.issues.length===0;
  if(args.includes('--output')) { const p=path.resolve(arg('--output')); fs.mkdirSync(path.dirname(p),{recursive:true}); fs.writeFileSync(p,JSON.stringify(report,null,2)+'\n'); }
  console.log(JSON.stringify({passed:report.passed,checks:report.checks.length,cities:CITIES.length,asOf,base,issues:report.issues},null,2));
  if(!report.passed) process.exitCode=1;
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
