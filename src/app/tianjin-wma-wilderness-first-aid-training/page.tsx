import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://yidaolife.com";
const CANONICAL_URL = `${SITE_URL}/tianjin-wma-wilderness-first-aid-training`;

const PAGE_TITLE =
  "天津野外急救培训WMA（WMW）报名｜2026年5月30日｜户外急救课程｜天津急救培训";
const PAGE_DESC =
  "天津WMA野外急救培训（WMW）报名中，适合徒步、登山、越野跑及AHA学员进阶学习。2026年5月30日开课，天津市和平区万通中心，小班教学，支持老学员及早鸟优惠。";

const FAQ_ITEMS = [
  {
    q: "天津野外急救培训需要基础吗？",
    a: "不需要，零基础也可以学习，课程以实操为主。",
  },
  {
    q: "WMA和AHA急救培训有什么区别？",
    a: "AHA更偏标准急救流程，WMA更强调复杂环境下的判断与决策。",
  },
  {
    q: "是否提供证书？",
    a: "完成课程后可获得WMA体系相关培训证明（以实际课程为准）。",
  },
  {
    q: "课程适合企业团建或安全培训吗？",
    a: "非常适合，尤其适用于户外团队、运动团队及企业安全培训。",
  },
];

function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: "/tianjin-wma-wilderness-first-aid-training" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    type: "website",
    url: CANONICAL_URL,
    images: [{ url: `${SITE_URL}/images/g5.jpg`, width: 1200, height: 630, alt: "天津野外急救培训 WMA WMW" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: ["/images/g5.jpg"],
  },
};

export default function TianjinWmaWmwPage() {
  const faqJsonLd = buildFaqJsonLd();

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b border-neutral-100 bg-neutral-50/50">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
            天津野外急救培训（WMA WMW）报名｜户外急救必修课程
          </h1>
          <p className="mt-3 text-base text-neutral-700 leading-relaxed">
            适合徒步、登山、越野跑等户外人群的进阶急救课程。2026年5月30日开课，天津市和平区万通中心，小班教学，
            支持老学员与早鸟优惠。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#signup"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              直接咨询报名
            </a>
            <a
              href="#faq"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              查看常见问题
            </a>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16 space-y-12">
        <section>
          <h2 className="text-xl font-semibold text-neutral-900">一、天津野外急救培训｜为什么越来越多人在学？</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            近几年，“户外急救”“野外急救培训”“急救证书培训”等关键词的搜索量明显上升。原因很简单：徒步、露营、越野跑等户外活动越来越普及，
            但很多人只学过基础急救（如心肺复苏）。
          </p>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            真实户外环境里，你可能会遇到：没有 AED 设备、无法第一时间送医、需要长时间现场处理伤情。也正因如此，越来越多人开始系统学习野外急救
            （Wilderness First Aid / WMA）。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">二、什么是WMA野外急救（WMW课程）？</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            WMA（Wilderness Medical Associates）是国际知名的野外医学培训体系。WMW（Wilderness Medical Workshop）课程更聚焦于资源受限环境下的现场处理：
            如何在户外突发事件中做出判断、决策，并组织更长时间的照护与转运。
          </p>

          <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900 whitespace-nowrap">
                    普通急救培训（AHA等）
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-neutral-900 whitespace-nowrap">
                    WMA野外急救
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-neutral-200">
                  <td className="px-4 py-3 text-neutral-700 whitespace-nowrap">标准环境</td>
                  <td className="px-4 py-3 text-neutral-700 whitespace-nowrap">野外复杂环境</td>
                </tr>
                <tr className="border-t border-neutral-200">
                  <td className="px-4 py-3 text-neutral-700 whitespace-nowrap">快速交接医疗系统</td>
                  <td className="px-4 py-3 text-neutral-700 whitespace-nowrap">长时间自主处理</td>
                </tr>
                <tr className="border-t border-neutral-200">
                  <td className="px-4 py-3 text-neutral-700 whitespace-nowrap">技术操作为主</td>
                  <td className="px-4 py-3 text-neutral-700 whitespace-nowrap">判断 + 决策为核心</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-neutral-500">
            关键词覆盖：天津急救培训 / 户外急救课程 / 野外急救培训 / WMA课程
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">三、天津WMA野外急救培训适合哪些人？</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">本次天津野外急救培训，适合：</p>
          <ul className="mt-3 list-disc list-inside text-neutral-700 space-y-1">
            <li>徒步 / 登山 / 露营爱好者</li>
            <li>越野跑 / 马拉松跑者</li>
            <li>体育老师 / 户外领队 / 教练</li>
            <li>企业安全负责人</li>
            <li>已学习AHA急救证书的学员（进阶）</li>
          </ul>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            如果你在搜索“天津急救证培训哪家好 / 天津急救课程推荐”，这门课更偏进阶能力型课程：强调在复杂环境中“看懂风险、做出决策、组织现场处理”。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">四、课程内容（WMA野外急救核心模块）</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">本次天津 WMW 课程包含：</p>
          <ul className="mt-3 list-disc list-inside text-neutral-700 space-y-1">
            <li>野外伤情评估（Primary &amp; Secondary Survey）</li>
            <li>出血控制与伤口处理</li>
            <li>骨折固定（无专业器材）</li>
            <li>环境伤害处理（中暑 / 失温）</li>
            <li>搬运与转运决策</li>
            <li>长时间照护（Extended Care）</li>
          </ul>
          <p className="mt-3 text-sm text-neutral-500">
            SEO关键词自然覆盖：野外急救知识 / 户外急救技能 / 急救培训内容
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">五、天津野外急救培训时间与地点（重点）</h2>
          <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6 text-neutral-800">
            <p className="text-sm">
              <strong>培训城市：</strong>天津
            </p>
            <p className="mt-2 text-sm">
              <strong>培训地址：</strong>天津市和平区大沽北路与徐州道交口 万通中心
            </p>
            <p className="mt-2 text-sm">
              <strong>培训日期：</strong>2026年5月30日
            </p>
            <p className="mt-2 text-sm">
              <strong>培训费用：</strong>1200元
            </p>
            <div className="mt-4">
              <p className="text-sm font-medium text-neutral-900">优惠政策（可叠加）：</p>
              <ul className="mt-2 list-disc list-inside text-sm text-neutral-700 space-y-1">
                <li>AHA老学员优惠：减200元</li>
                <li>早鸟报名优惠：减100元</li>
              </ul>
              <p className="mt-2 text-sm text-neutral-700">
                <strong>最低仅需：</strong>900元
              </p>
            </div>
          </div>
        </section>

        <section id="signup" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-900">六、报名方式</h2>
          <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
            <p className="text-neutral-700 leading-relaxed">
              <strong>联系人：</strong>黄老师
            </p>
            <p className="mt-2 text-neutral-700 leading-relaxed">
              <strong>电话 / 微信：</strong>
              <a href="tel:13512456138" className="underline hover:no-underline">
                13512456138
              </a>
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              建议直接添加微信咨询课程详情及剩余名额。
            </p>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-900">七、常见问题（FAQ）</h2>
          <div className="mt-4 space-y-2">
            {FAQ_ITEMS.map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-neutral-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 font-medium text-neutral-900 list-none [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="shrink-0 text-neutral-400 transition-transform group-open:rotate-180" aria-hidden>
                    ▼
                  </span>
                </summary>
                <p className="border-t border-neutral-100 px-4 py-3 text-sm text-neutral-600">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900">八、为什么建议尽早报名？</h2>
          <ul className="mt-3 list-disc list-inside text-neutral-700 space-y-1">
            <li>小班教学，名额有限</li>
            <li>户外安全意识正在快速提升</li>
            <li>急救能力正在成为“刚需技能”</li>
          </ul>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            很多人搜索“天津急救培训”，是因为已经意识到风险存在；但真正有用的，是在事情发生前具备处理能力。
          </p>
        </section>

        <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-neutral-900">你也可以了解这些页面</h2>
          <div className="mt-4 grid gap-3">
            <Link
              href="/programs"
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors"
            >
              查看课程体系（/programs）
            </Link>
            <Link
              href="/enterprise-training"
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors"
            >
              企业急救培训定制（/enterprise-training）
            </Link>
            <Link
              href="/blog/aed-why-important"
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors"
            >
              AED为什么重要？（/blog/aed-why-important）
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

