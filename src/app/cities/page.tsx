"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getCitiesByRegion, getCityShortName } from "@/data/cities";
import CityCard from "@/components/CityCard";

export default function CitiesPage() {
  const [q, setQ] = useState("");
  const regionsWithCities = useMemo(() => getCitiesByRegion(), []);
  const filtered = useMemo(() => q.trim() ? regionsWithCities.map(({region,cities})=>({region,cities:cities.filter(c=>getCityShortName(c).includes(q.trim()) || c.name.includes(q.trim()))})).filter(r=>r.cities.length > 0) : regionsWithCities, [regionsWithCities,q]);
  const count = filtered.reduce((total,item)=>total+item.cities.length,0);
  return (
    <div>
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="site-container py-12 sm:py-16">
          <p className="eyebrow">都会急救 · 就近学习</p>
          <h1 className="mt-4 text-3xl font-semibold leading-[1.4] sm:text-5xl">全国急救培训城市</h1>
          <p className="section-intro mt-5 max-w-2xl">选择所在城市，查看培训地址、开课日期与报名入口。课程面向个人、企业员工及学校与公共机构工作人员。</p>
        </div>
      </section>
      <section className="sticky top-[72px] z-20 border-b border-[var(--border)] bg-white/95 py-4 backdrop-blur-md lg:top-20" aria-label="查找培训城市">
        <div className="site-container flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="city-search" className="sr-only">按城市名搜索</label>
          <input id="city-search" type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="输入城市名称，如北京、深圳" className="min-h-12 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--muted)] sm:max-w-md" />
          <p role="status" className="text-xs text-[var(--muted)]">找到 {count} 个城市 · 具体开课安排以报名确认为准</p>
        </div>
      </section>
      <section className="site-container py-10 sm:py-14" aria-label="城市列表">
        {!q.trim() && <nav aria-label="按区域浏览" className="mb-9 flex flex-wrap gap-2">{regionsWithCities.map(({region},i)=><a key={region} href={`#region-${i}`} className="inline-flex min-h-11 items-center rounded-lg border border-[var(--border)] px-4 text-sm hover:bg-[var(--surface)]">{region}</a>)}</nav>}
        {filtered.length===0 ? <div className="rounded-xl bg-[var(--surface)] px-6 py-12 text-center"><h2 className="text-xl font-semibold">暂未找到匹配城市</h2><p className="section-intro mt-3">可以更换城市名称，或联系老师确认可安排的培训。</p><button type="button" onClick={()=>setQ("")} className="button-secondary mt-5">查看全部城市</button></div> :
          <div className="space-y-12">{filtered.map(({region,cities})=><section key={region} id={`region-${regionsWithCities.findIndex(r=>r.region===region)}`} className="scroll-mt-48"><div className="mb-5 flex items-center gap-3"><h2 className="text-2xl font-semibold">{region}</h2><span className="text-xs text-[var(--muted)]">{cities.length} 个城市</span></div><ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{cities.map(city=><CityCard key={city.slug} city={city}/>)}</ul></section>)}</div>}
      </section>
      <section className="site-container pb-14">
        <h2 className="text-2xl font-semibold">培训城市常见问题</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[["急救培训课程多久完成？","AHA Heartsaver 急救员课程通常一天即可完成培训与考核。"],["哪些城市可以参加培训？","目前培训城市包括北京、上海、广州、深圳、天津等，并持续增加新的培训城市。"],["企业可以预约培训吗？","可以。企业团体培训可根据参训人数、培训场景和时间安排沟通课程方案。"]].map(([q,a])=><article key={q} className="border-t border-[var(--border)] pt-5"><h3 className="font-semibold">{q}</h3><p className="mt-3 text-sm leading-7 text-[var(--muted)]">{a}</p></article>)}
        </div>
      </section>
      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-14">
        <div className="site-container grid gap-7 md:grid-cols-[1.5fr_1fr] md:items-center"><div><h2 className="section-title">为团队安排培训？</h2><p className="section-intro mt-4">可沟通企业上门培训、指定场地集中培训或多城市协调。课程包括 CPR、AED 使用与基础急救技能。</p></div><div className="flex flex-wrap gap-3 md:justify-end"><Link href="/enterprise-training" className="button-primary">企业培训咨询</Link><Link href="/contact" className="button-secondary">联系老师</Link></div></div>
      </section>
    </div>
  );
}
