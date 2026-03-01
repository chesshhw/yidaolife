import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EnterpriseContactButtons } from "@/components/EnterpriseContactButtons";

const SITE_URL = "https://yidaolife.com";
const PAGE_URL = `${SITE_URL}/program/enterprise-first-aid-training`;
const PAGE_TITLE = "企业急救培训团体定制方案 | AHA Heartsaver CPR AED 企业内训（2026）";
const PAGE_DESC =
  "提供企业急救培训（CPR+AED）团体定制服务，支持2小时/半天/全天（含证书）多种方案与分级报价。覆盖北京、上海、深圳、广州、杭州、苏州、南京、成都、重庆等城市，可上门培训，主任导师授课，预约咨询。";

const FAQ_ITEMS = [
  {
    q: "企业急救培训一般多久？",
    a: "支持 2 小时应急普及、半天强化、全天标准（含证书）多种时长，可根据企业需求与人数选择。",
  },
  {
    q: "2小时/半天/全天有什么区别？",
    a: "2 小时聚焦核心流程与演示，快速覆盖；半天强化 CPR+AED 实操；全天含完整考核与证书（有效期 2 年）。",
  },
  {
    q: "多少人可以开班？可否分批？",
    a: "支持分批培训，根据人数与场地分组。为保证实操效果，建议小班分组训练，具体人数与排期可预约沟通。",
  },
  {
    q: "是否可以上门培训？需要准备什么场地？",
    a: "支持上门或集中培训。需具备可进行 CPR 实操的场地（如会议室、培训室），我们会提供场地与分组建议。",
  },
  {
    q: "是否提供证书？有效期多久？",
    a: "全天标准方案含考核合格后签发的电子证书，有效期 2 年。2 小时/半天方案以普及为主，不含证书。",
  },
  {
    q: "是否可以开具发票/合同流程如何？",
    a: "可开发票，支持企业合同流程。具体开票与合同事宜在预约沟通时确认。",
  },
  {
    q: "能否根据行业（制造/互联网/学校/物业）定制重点？",
    a: "可根据行业特点定制培训重点与案例，如制造业侧重工伤急救、学校侧重儿童气道梗阻等。",
  },
  {
    q: "如何预约与获取报价？",
    a: "通过本页联系方式（电话/微信/二维码）预约沟通，我们会根据人数、城市、时长、是否含证书等提供报价与方案建议。",
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
  keywords: [
    "企业急救培训",
    "企业CPR培训",
    "企业AED培训",
    "AHA企业培训",
    "Heartsaver企业内训",
    "企业团体培训定制",
    "急救培训上门",
    "北京企业急救培训",
    "上海企业CPR培训",
    "深圳AED培训",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    type: "website",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/images/hero.webp`, width: 1200, height: 630, alt: "企业急救培训团体定制" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
  },
};

export default function EnterpriseFirstAidTrainingPage() {
  const faqJsonLd = buildFaqJsonLd();

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative border-b border-neutral-100">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,minmax(320px,1fr)] lg:items-center">
            <div>
              <h1 className="text-2xl font-semibold leading-tight text-neutral-900 sm:text-3xl">
                企业急救培训 · 团体课程定制方案（AHA Heartsaver CPR AED）
              </h1>
              <p className="mt-3 text-base text-neutral-600 sm:text-lg">
                支持按人数分级报价｜2小时/半天/全天（含证书）｜可上门｜主任导师授课
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 transition-colors"
                >
                  预约企业团训方案沟通
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  获取团体报价
                </a>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 lg:aspect-[4/3]">
              <Image
                src="/images/g3.jpg"
                alt="企业急救培训 CPR AED 现场实操"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">企业为什么需要急救能力建设？</h2>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li>提升员工现场应急处置能力</li>
            <li>降低突发事件风险</li>
            <li>完善企业安全管理体系</li>
            <li>增强组织社会责任与品牌形象</li>
          </ul>
          <div className="pt-4">
            <Image
              src="/images/g1.jpg"
              alt="企业急救培训 CPR AED 团体课程 现场实操"
              width={800}
              height={533}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 800px"
              className="h-auto w-full rounded-xl border border-neutral-200"
            />
          </div>
        </section>

        {/* Section 2 */}
        <section className="mt-14 space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">课程体系（Heartsaver First Aid CPR AED）</h2>
          <p className="text-neutral-700">
            课程覆盖 CPR、AED 使用、气道异物梗阻处理与常见急症应对。培训以标准化流程为核心，强调实操与关键步骤的规范掌握。
          </p>
          <ul className="list-disc space-y-2 pl-5 text-neutral-700">
            <li>CPR 心肺复苏</li>
            <li>AED 自动体外除颤器使用</li>
            <li>气道异物梗阻处理</li>
            <li>常见急症应对</li>
          </ul>
          <div className="pt-4">
            <Image
              src="/images/cert-sample.jpg"
              alt="AHA Heartsaver 企业急救培训证书样本"
              width={800}
              height={533}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 800px"
              className="h-auto w-full rounded-xl border border-neutral-200"
            />
          </div>
        </section>

        {/* Section 3 */}
        <section className="mt-14 space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900">团体定制方案（按场景选择）</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            <article className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5">
              <h3 className="text-base font-semibold text-neutral-900">标准全天（含证书）</h3>
              <p className="mt-2 text-sm text-neutral-600">适合：年度安全培训、关键岗位、管理层</p>
              <p className="mt-2 text-sm text-neutral-700">输出：考核合格签发电子证书（有效期2年）</p>
            </article>
            <article className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5">
              <h3 className="text-base font-semibold text-neutral-900">半天强化（偏实操）</h3>
              <p className="mt-2 text-sm text-neutral-600">适合：大规模员工基础能力覆盖</p>
              <p className="mt-2 text-sm text-neutral-700">输出：强化 CPR+AED 要点与实操</p>
            </article>
            <article className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-5">
              <h3 className="text-base font-semibold text-neutral-900">2小时应急普及（快速覆盖）</h3>
              <p className="mt-2 text-sm text-neutral-600">适合：安全月活动、会议日、入职宣导</p>
              <p className="mt-2 text-sm text-neutral-700">输出：核心流程与演示</p>
            </article>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mt-14 space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">团体报价与排期方式</h2>
          <p className="text-neutral-700">
            我们会根据企业人数、培训时长（2小时/半天/全天）、是否需要证书、城市与排期方式（是否分批/是否上门）提供团体报价与方案建议。为了保证实操效果，通常建议分组训练与小班实操。
          </p>
          <p className="text-neutral-700">
            支持分批培训、周末/工作日、上门或集中培训。获取报价请预约沟通。
          </p>
        </section>

        {/* Section 5 */}
        <section className="mt-14 space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">我们的不同（为什么更正规）</h2>
          <ul className="space-y-2 text-neutral-700">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-green-600" aria-hidden>✓</span>
              主任导师亲自授课
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-green-600" aria-hidden>✓</span>
              小班实操/分组训练
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-green-600" aria-hidden>✓</span>
              标准化教学流程
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-green-600" aria-hidden>✓</span>
              可提供企业培训方案与流程文件（培训前沟通、分组、场地建议）
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-green-600" aria-hidden>✓</span>
              培训后支持：证书发放指引/续证提醒（如适用）
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="mt-14 space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">覆盖城市（SEO长尾词）</h2>
          <div className="space-y-3 text-neutral-700">
            <p><strong>北京企业急救培训</strong>（CPR AED 团体内训/上门可安排）</p>
            <p><strong>上海企业CPR培训</strong>（支持团体排期与分批）</p>
            <p><strong>深圳企业AED培训</strong>（支持企业内训与集中培训）</p>
            <p><strong>广州企业急救培训</strong>（可定制2小时/半天/全天）</p>
            <p><strong>杭州/苏州/南京企业团训</strong>（支持排期安排）</p>
            <p><strong>成都/重庆企业急救培训</strong>（支持团体课程定制）</p>
          </div>
        </section>

        {/* Section 7 - FAQ */}
        <section className="mt-14 space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">常见问题</h2>
          <div className="space-y-2">
            {FAQ_ITEMS.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-xl border border-neutral-200 bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 font-medium text-neutral-900 list-none [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="shrink-0 text-neutral-400 transition-transform group-open:rotate-180" aria-hidden>▼</span>
                </summary>
                <p className="border-t border-neutral-100 px-4 py-3 text-sm text-neutral-600">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Section 8 - Contact */}
        <section id="contact" className="mt-14 space-y-6 scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-900">联系与预约</h2>
          <p className="text-neutral-700">
            预约企业团训方案沟通 / 获取团体报价
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6">
            <p className="font-medium text-neutral-900">
              电话/微信：<a href="tel:13512456138" className="underline hover:no-underline">13512456138</a>
            </p>
            <p className="mt-1 text-sm text-neutral-500">工作日 9:00–18:00</p>
            <div className="mt-4">
              <Image
                src="/images/wechat.png"
                alt="课程顾问个人微信二维码"
                width={240}
                height={240}
                loading="lazy"
                className="h-auto w-48 rounded-xl border border-neutral-200"
              />
            </div>
            <EnterpriseContactButtons />
          </div>
        </section>

        {/* Internal links */}
        <nav className="mt-14 border-t border-neutral-200 pt-8" aria-label="相关课程">
          <p className="text-sm text-neutral-500">相关课程：</p>
          <ul className="mt-2 flex flex-wrap gap-4 text-sm">
            <li>
              <Link href="/programs" className="text-neutral-700 underline hover:no-underline">
                AHA HeartSaver 急救员认证
              </Link>
            </li>
            <li>
              <Link href="/instructor" className="text-neutral-700 underline hover:no-underline">
                AHA 导师认证报名通道
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
