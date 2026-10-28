import type { Metadata } from "next";
import Link from "next/link";

const URL = "https://www.yidaolife.com/tianjin-wma-wilderness-first-aid-training";
const TITLE = "天津野外急救培训（WMA WMW）｜课程介绍与新一期意向咨询";
const DESCRIPTION = "了解天津野外急救课程的学习方向与报名前需要确认的信息。2026年5月30日旧排期已归档，新一期时间、地点、费用与证书安排待确认。";
const FAQ_ITEMS = [
  { q: "现在可以报名哪一期？", a: "目前接受新一期意向咨询。具体开课日期、地点、课程版本、时长、费用与余位尚待确认，意向登记不代表报名成功。" },
  { q: "原来的5月30日活动和早鸟价格还适用吗？", a: "2026年5月30日属于历史排期，原活动价格与优惠不作为当前报名依据。新一期信息确认后会更新。" },
  { q: "零基础可以参加吗？", a: "请先说明已有急救学习经历和户外活动需求，再确认具体课程的报名条件；不要仅根据旧活动介绍判断资格。" },
  { q: "课程会发什么证书？", a: "新一期的课程名称、发证机构、考核要求及证明形式需在报名之前确认。若用于职业、赛事或其他资格审核，还应与接收单位确认要求。" },
  { q: "企业或户外团队可以咨询吗？", a: "可以。请提供活动场景、人数、所在城市和期望日期，沟通培训安排与报价所需信息。" },
];

export const metadata: Metadata = {
  title: TITLE, description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", url: URL },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export default function TianjinWmaWmwPage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://www.yidaolife.com" },
      { "@type": "ListItem", position: 2, name: "课程体系", item: "https://www.yidaolife.com/programs" },
      { "@type": "ListItem", position: 3, name: "天津野外急救培训", item: URL },
    ] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ_ITEMS.map(({q,a}) => ({
      "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a },
    })) },
  ];
  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="eyebrow">户外急救 · 课程咨询</p>
          <h1 className="mt-4 text-3xl font-semibold leading-[1.45] sm:text-4xl">天津野外急救培训（WMA WMW）</h1>
          <p className="mt-5 leading-8 text-neutral-700">本页保留野外急救课程的学习方向，并接受新一期意向咨询。旧活动排期已归档，新一期时间、地点、费用及报名条件待确认。</p>
          <a href="#signup" className="button-primary mt-6">咨询新一期课程</a>
        </div>
      </section>
      <article className="mx-auto max-w-3xl space-y-10 px-5 py-10 sm:px-8 sm:py-14">
        <section aria-labelledby="status-heading" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">
          <h2 id="status-heading" className="text-xl font-semibold">当前课程状态</h2>
          <dl className="mt-4 grid gap-4 text-sm leading-7 sm:grid-cols-2">
            <div><dt className="text-neutral-500">新一期日期与时长</dt><dd>待确认</dd></div>
            <div><dt className="text-neutral-500">上课地点与费用</dt><dd>待确认</dd></div>
            <div><dt className="text-neutral-500">课程版本与证书安排</dt><dd>报名之前单独确认</dd></div>
            <div><dt className="text-neutral-500">报名状态</dt><dd>接受意向咨询，余位待确认</dd></div>
          </dl>
          <details className="mt-5 border-t border-[var(--border)] pt-4">
            <summary className="cursor-pointer font-medium">查看历史排期说明</summary>
            <p className="mt-3 text-sm leading-7 text-neutral-600">原页面登记日期为2026年5月30日，登记地点为天津市和平区万通中心。该日期已经过去，仅作历史信息保留；原价格及早鸟优惠不适用于新一期。此处不作为活动实际举办的证明。</p>
          </details>
          <p className="mt-4 text-xs text-neutral-500">状态整理日期：2026年10月22日</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">什么情况下需要了解野外急救课程？</h2>
          <p className="mt-4 leading-8 text-neutral-700">徒步、登山、越野跑或团队户外活动可能发生在医疗资源较远、通信或交通受限的地点。选择课程时，除了基础急救技能，还需要了解风险评估、现场组织和转运决策等学习内容是否适合自己的活动场景。</p>
          <p className="mt-3 leading-8 text-neutral-700">课程适配需要结合活动环境、已有学习经历和具体课程大纲讨论。基础 CPR/AED 学习与野外急救学习各有侧重，不能直接把不同体系的课程或证书视为相互替代。</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">咨询时可讨论的学习方向</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-8 text-neutral-700">
            <li>户外环境风险与现场评估</li><li>伤情观察、急救物资准备与团队分工</li>
            <li>在救援抵达前的照护与转运决策</li><li>与活动类型相符的情景练习</li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-neutral-600">以上用于沟通学习需求；新一期实际教学模块、导师配置与考核要求以确认的课程说明为准。</p>
        </section>
        <section id="signup" className="scroll-mt-24 rounded-xl border border-[var(--border)] p-5 sm:p-7">
          <h2 className="text-xl font-semibold">咨询新一期安排</h2>
          <p className="mt-4 leading-8 text-neutral-700">请告诉黄老师：个人或团队参加、人数、所在城市、期望日期、户外活动类型，以及是否有证书用途要求。确认课程与费用后，再决定报名。</p>
          <p className="mt-3 text-sm leading-7">电话 / 微信：<a href="tel:13512456138" className="underline">13512456138</a></p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="button-primary">提交课程咨询</Link>
            <Link href="/enterprise-training" className="button-secondary">了解团队培训</Link>
          </div>
        </section>
        <section id="faq" className="scroll-mt-24">
          <h2 className="text-xl font-semibold">报名前常见问题</h2>
          <div className="mt-4 space-y-3">{FAQ_ITEMS.map(({q,a}) => (
            <details key={q} className="rounded-lg border border-[var(--border)] p-4">
              <summary className="cursor-pointer font-medium leading-7">{q}</summary>
              <p className="mt-3 text-sm leading-7 text-neutral-700">{a}</p>
            </details>
          ))}</div>
        </section>
        <nav aria-label="相关课程与准备" className="flex flex-wrap gap-4 border-t border-[var(--border)] pt-6 text-sm">
          <Link href="/programs" className="underline">课程体系</Link>
          <Link href="/blog/outdoor-first-aid-preparation-before-hiking" className="underline">徒步前的急救准备</Link>
          <Link href="/cities" className="underline">查看城市急救课程排期</Link>
        </nav>
      </article>
    </main>
  );
}
