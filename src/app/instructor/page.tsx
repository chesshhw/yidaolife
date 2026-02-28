import type { Metadata } from "next";
import Image from "next/image";

const SITE_NAME = "都会急救";
const SITE_URL = "https://yidaolife.com";
const PAGE_TITLE = "AHA导师认证报名通道｜Heartsaver导师申请流程｜2026全国开放";
const PAGE_DESC =
  "2026年AHA Heartsaver导师认证申请通道开放，全国城市可申请。介绍导师报名条件、申请流程、培训安排、证书说明与常见问题。支持机构合作与企业培训发展。";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: "/instructor" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    type: "website",
    url: `${SITE_URL}/instructor`,
    images: [
      { url: `${SITE_URL}/images/instructor.jpg`, width: 1200, height: 675, alt: "AHA导师认证证书与报名通道" },
    ],
  },
};

function buildJsonLd() {
  const url = `${SITE_URL}/instructor`;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: PAGE_TITLE,
    description: PAGE_DESC,
    url,
    inLanguage: "zh-CN",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "没有医学背景可以申请导师吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Heartsaver 导师更偏向非医护方向，但仍需满足基础能力与培训考核要求，具体以当期安排为准。",
        },
      },
      {
        "@type": "Question",
        name: "导师资格是否全国通用？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "在体系规范与授权要求下可通用，具体授课与合作方式以规则为准。",
        },
      },
      {
        "@type": "Question",
        name: "通过后可以做企业内训吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "可在规范流程下开展企业/学校/机构培训合作，详情请咨询。",
        },
      },
      {
        "@type": "Question",
        name: "多久可以完成认证？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "取决于城市安排、个人准备与考核结果，提交报名后以实际通知为准。",
        },
      },
    ],
  };

  return [webPage, faq];
}

export default function InstructorPage() {
  const jsonLd = buildJsonLd();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* JSON-LD for SEO/AI */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top */}
      <header className="space-y-4">
        <p className="text-sm text-neutral-500">2026年全国开放｜可协调城市档期｜小班带教</p>
        <h1 className="text-3xl font-semibold leading-tight text-neutral-900">
          AHA导师认证报名通道（2026年全国开放）
        </h1>
        <p className="text-base leading-relaxed text-neutral-700">
          如果你在找「AHA导师认证」「Heartsaver导师报名条件」「导师申请流程」「导师培训安排」，本页为
          2026年 AHA Heartsaver 导师申请与报名通道说明。适用于培训机构讲师、企业安全负责人、
          希望提升急救授课能力的人群。
        </p>

        {/* CTA #1 */}
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="#apply"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 transition-colors"
          >
            立即申请导师（提交信息）
          </a>
          <a
            href="tel:13512546138"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 transition-colors"
          >
            直接拨打电话：13512546138
          </a>
        </div>

        {/* 首屏核心视觉：报名二维码 */}
        <div className="pt-6">
          <Image
            src="/images/wxpay.png"
            alt="导师报名咨询二维码"
            width={800}
            height={800}
            priority
            className="h-auto w-full max-w-sm rounded-2xl border border-neutral-200"
          />
        </div>
      </header>

      {/* Content */}
      <section className="mt-10 space-y-10 leading-relaxed text-neutral-700">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">什么是AHA导师认证？</h2>
          <p>
            AHA（American Heart Association，美国心脏协会）体系下的导师（Instructor），是完成标准培训与考核后获得授课资格的认证讲师。
            Heartsaver 导师可在规范流程下开展 CPR / AED / 急救相关课程教学与实操训练。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">为什么越来越多人申请Heartsaver导师？</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>企业安全合规与急救培训需求持续增长</li>
            <li>国际体系标准化课程，职业发展路径清晰</li>
            <li>更适合面向企业/学校/机构开展规范培训</li>
            <li>强调实操与教学能力，而非“快速取证”</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">导师报名条件（基础要求）</h2>
          <p>通常需满足：</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>已完成 Heartsaver 急救员相关学习</li>
            <li>具备良好表达与授课意愿</li>
            <li>认同标准化教学与考核流程</li>
          </ul>
          <p className="text-sm text-neutral-500">
            （具体以当期培训安排为准，提交申请后以工作人员确认结果为准）
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">导师申请流程（标准步骤）</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>提交导师报名信息</li>
            <li>确认城市与培训安排</li>
            <li>参加导师培训（含教学技巧与课程规范）</li>
            <li>完成模拟授课与实操考核</li>
            <li>通过后获得导师资格与后续支持</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">培训形式与我们坚持的原则</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>小班制：保证每位申请人都能获得带教指导</li>
            <li>强实操：模拟授课 + 实操演练 + 现场评估</li>
            <li>不做速成：强调真正具备授课与现场教学能力</li>
          </ul>

          {/* CTA #2 (middle) */}
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="#apply"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 transition-colors"
            >
              立即申请导师（名额有限）
            </a>
            <a
              href="tel:13512546138"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 transition-colors"
            >
              电话咨询：13512546138
            </a>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">全国开放城市（持续更新）</h2>
          <p>覆盖区域：京津冀｜长三角｜珠三角｜西南｜东北等</p>
          <p>可协调安排：北京 / 上海 / 广州 / 深圳 / 成都 / 杭州 / 南京 / 重庆等（其他城市可咨询）</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">证书样本</h2>
          <Image
            src="/images/instructor.jpg"
            alt="AHA导师证书样本"
            width={1200}
            height={675}
            className="h-auto w-full rounded-2xl border border-neutral-200"
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">常见问题（FAQ）</h2>

          <div className="space-y-3">
            <div className="rounded-2xl border border-neutral-200 p-4">
              <h3 className="font-medium text-neutral-900">Q：没有医学背景可以申请导师吗？</h3>
              <p className="mt-2 text-neutral-600">
                A：Heartsaver 导师更偏向非医护方向，但仍需满足基础能力与培训考核要求，具体以当期安排为准。
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-4">
              <h3 className="font-medium text-neutral-900">Q：导师资格是否全国通用？</h3>
              <p className="mt-2 text-neutral-600">
                A：在体系规范与授权要求下可通用，具体授课与合作方式以规则为准。
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-4">
              <h3 className="font-medium text-neutral-900">Q：通过后可以做企业内训吗？</h3>
              <p className="mt-2 text-neutral-600">
                A：可在规范流程下开展企业/学校/机构培训合作，详情请咨询。
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-4">
              <h3 className="font-medium text-neutral-900">Q：多久可以完成认证？</h3>
              <p className="mt-2 text-neutral-600">
                A：取决于城市安排、个人准备与考核结果，提交报名后以实际通知为准。
              </p>
            </div>
          </div>
        </section>

        {/* Apply */}
        <section id="apply" className="space-y-4 scroll-mt-24">
          <h2 className="text-xl font-semibold text-neutral-900">立即申请导师</h2>
          <p>
            2026 名额有限，建议尽早提交申请，优先锁定培训档期。提交后我们会根据你的所在城市与基础情况进行确认与安排。
          </p>

          <div className="space-y-3 rounded-2xl border border-neutral-200 p-5">
            <p className="font-medium text-neutral-900">
              咨询电话：<a className="underline hover:no-underline" href="tel:13512546138">13512546138</a>
            </p>
            <p className="text-sm text-neutral-500">工作时间：9:00–21:00</p>

            <div className="pt-3">
              <p className="mb-2 text-sm text-neutral-500">扫码立即咨询/提交报名信息：</p>
              <Image
                src="/images/wxpay.png"
                alt="导师报名咨询二维码"
                width={800}
                height={800}
                className="h-auto w-64 max-w-full rounded-2xl border border-neutral-200"
              />
            </div>
          </div>

          {/* CTA #3 bottom */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="tel:13512546138"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 transition-colors"
            >
              直接电话咨询
            </a>
            <a
              href="#apply"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 transition-colors"
            >
              已到报名区（保存二维码）
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
