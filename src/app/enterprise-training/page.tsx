import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

const SITE_URL = "https://yidaolife.com";
const PAGE_URL = `${SITE_URL}/enterprise-training`;
const PAGE_TITLE = "企业急救培训 | 企业CPR培训 | AED培训定制服务";
const PAGE_DESC =
  "提供企业急救培训服务，课程内容包括 CPR 心肺复苏、AED 自动体外除颤仪使用、气道异物梗阻处理等。支持企业上门培训、多城市培训协调和定制化课程安排。";

const FAQ_ITEMS = [
  {
    q: "企业急救培训适合哪些单位？",
    a: "适合企业、学校、健身房、物业、商场、酒店、赛事组织及各类希望提升安全保障能力的机构。",
  },
  {
    q: "企业急救培训可以上门吗？",
    a: "可以，我们支持企业上门培训，也可根据需求安排在指定培训地点集中开展。",
  },
  {
    q: "企业急救培训主要学什么？",
    a: "主要内容包括 CPR 心肺复苏、AED 自动体外除颤仪使用、气道异物梗阻处理以及突发情况现场应对流程。",
  },
  {
    q: "企业培训可以根据人数和行业定制吗？",
    a: "可以。我们可根据参训人数、行业类型、培训场景和时间安排提供定制化培训方案。",
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

function buildBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "企业急救培训", item: PAGE_URL },
    ],
  };
}

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    type: "website",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/images/g3.jpg`, width: 1200, height: 630, alt: "企业急救培训现场" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: [`${SITE_URL}/images/g3.jpg`],
  },
};

export default function EnterpriseTrainingPage() {
  const faqJsonLd = buildFaqJsonLd();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd();

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b border-neutral-100">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,minmax(320px,1fr)] lg:items-center">
            <div>
              <div className="mb-4">
                <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "企业急救培训" }]} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                企业急救培训 | CPR AED急救课程定制服务
              </h1>
              <p className="mt-3 text-base text-neutral-600 leading-relaxed">
                为企业、学校、健身房、赛事组织、商场物业等机构提供专业急救培训服务，课程内容包括 CPR 心肺复苏、AED 自动体外除颤仪使用、气道异物梗阻处理等。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#enterprise-contact"
                  className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
                >
                  咨询企业培训
                </a>
                <Link
                  href="/cities"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  查看培训城市
                </Link>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 lg:aspect-[4/3]">
              <Image
                src="/images/g3.jpg"
                alt="企业急救培训现场"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900">为什么企业需要急救培训？</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            心脏骤停、气道异物梗阻等紧急情况可能发生在办公室、健身场所、商场、学校、活动现场等各种非医疗环境中。在专业医疗救援到达之前，现场人员是否掌握基础急救技能，往往会直接影响抢救效果。
          </p>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            通过企业急救培训，员工可以系统学习 CPR 心肺复苏、AED 使用和基础应急处理流程，提高面对突发情况时的应对能力。这不仅有助于提升企业安全保障能力，也体现了企业对员工和公众安全的重视。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900">企业急救培训内容</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            企业急救培训课程可根据机构需求进行安排，核心培训内容通常包括：
          </p>
          <ul className="mt-3 list-disc list-inside space-y-2 text-neutral-700">
            <li>CPR 心肺复苏操作</li>
            <li>AED 自动体外除颤仪使用</li>
            <li>气道异物梗阻急救</li>
            <li>突发情况现场应对流程</li>
          </ul>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            课程采用理论讲解与实操训练相结合的方式，帮助学员真正掌握急救操作技能。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900">适用机构与培训场景</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "企业员工安全培训",
              "学校及教育机构",
              "健身房与运动场馆",
              "马拉松及赛事组织",
              "商场、物业、酒店等公共服务场所",
              "社区、公益组织及其他团体",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 text-sm text-neutral-800">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            无论是日常员工培训、企业安全建设，还是大型活动保障，都可以根据实际人数与场景安排定制化急救培训。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900">培训形式与服务方式</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            我们支持多种企业培训组织方式，可根据企业需求灵活安排：
          </p>
          <ul className="mt-3 list-disc list-inside space-y-2 text-neutral-700">
            <li>企业上门培训</li>
            <li>集中到指定培训地点培训</li>
            <li>按人数和场景定制课程安排</li>
            <li>支持多城市培训协调</li>
          </ul>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            如企业已有 AED 设备，也可结合设备配置情况安排针对性的使用培训与现场演练。
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900">企业急救培训现场</h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 list-none p-0 m-0">
            {[
              { src: "/images/g3.jpg", alt: "企业急救培训现场" },
              { src: "/images/g5.jpg", alt: "CPR心肺复苏实操培训" },
              { src: "/images/g6.jpg", alt: "AED使用培训课堂" },
            ].map((item) => (
              <li key={item.src} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200">
                <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900">企业急救培训常见问题</h2>
          <div className="mt-4 space-y-3">
            {FAQ_ITEMS.map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-neutral-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 font-medium text-neutral-900 list-none [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="shrink-0 text-neutral-400 transition-transform group-open:rotate-180" aria-hidden>▼</span>
                </summary>
                <p className="border-t border-neutral-100 px-4 py-3 text-sm text-neutral-700">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900">相关文章推荐</h2>
          <div className="mt-4 grid gap-3">
            <Link
              href="/blog/why-companies-need-first-aid-training"
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors"
            >
              企业为什么需要急救培训？
            </Link>
            <Link
              href="/blog/how-to-do-cpr"
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors"
            >
              CPR心肺复苏怎么做？
            </Link>
          </div>
        </section>

        <section id="enterprise-contact" className="scroll-mt-24 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-7">
          <h2 className="text-xl font-semibold text-neutral-900">咨询企业急救培训方案</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            如果您希望为企业、学校、健身房或活动组织安排急救培训，欢迎联系我们获取培训方案与安排建议。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              微信咨询
            </Link>
            <a
              href="tel:13512456138"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              电话咨询
            </a>
            <Link
              href="/cities"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              查看培训城市
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              查看课程体系
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
