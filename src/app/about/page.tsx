import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SITE_URL = "https://yidaolife.com";

export const metadata: Metadata = {
  title: "关于我们 | AHA急救培训与企业急救课程服务",
  description:
    "我们专注于 AHA Heartsaver 急救培训，提供面向个人学员与企业机构的 CPR、AED 与基础急救课程服务，支持全国多城市培训与企业团体培训安排。",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "关于我们 | AHA急救培训与企业急救课程服务",
    description:
      "我们专注于 AHA Heartsaver 急救培训，提供面向个人学员与企业机构的 CPR、AED 与基础急救课程服务，支持全国多城市培训与企业团体培训安排。",
    url: `${SITE_URL}/about`,
    type: "website",
    images: [{ url: `${SITE_URL}/images/hero.webp`, width: 1200, height: 630, alt: "关于都会急救" }],
  },
  twitter: {
    title: "关于我们 | AHA急救培训与企业急救课程服务",
    description:
      "我们专注于 AHA Heartsaver 急救培训，提供面向个人学员与企业机构的 CPR、AED 与基础急救课程服务，支持全国多城市培训与企业团体培训安排。",
    images: [`${SITE_URL}/images/hero.webp`],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 首屏：简洁白底 + 标题 + 轻背景图 */}
      <section className="border-b border-neutral-100 bg-neutral-50/50">
        <div className="mx-auto max-w-[1120px] px-4 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,minmax(280px,1fr)] lg:items-center">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                关于我们
              </h1>
              <p className="mt-3 text-base text-neutral-600 sm:text-lg">
                我们专注于 AHA Heartsaver 急救培训，提供面向个人学员与企业机构的 CPR、AED 与基础急救课程服务。
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 lg:aspect-[4/3]">
              <Image
                src="/images/g5.jpg"
                alt="AHA 急救培训现场"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 我们提供什么培训 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">我们提供什么培训</h2>
          <p className="mt-3 max-w-4xl text-neutral-700 leading-relaxed">
            我们主要提供 AHA Heartsaver 急救员培训，以及面向企业和团体的急救培训服务。课程内容围绕 CPR 心肺复苏、AED 自动体外除颤仪使用、气道异物梗阻处理和紧急情况现场应对等基础急救技能展开。
          </p>
          <p className="mt-4 max-w-4xl text-neutral-700 leading-relaxed">
            课程适用于希望系统学习急救技能的个人，也适用于企业员工安全培训、学校培训、赛事保障培训等多种场景。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              查看课程体系
            </Link>
          </div>
        </div>
      </section>

      {/* 为什么选择我们 */}
      <section className="border-b border-neutral-100 bg-neutral-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">为什么选择我们</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "标准化课程体系",
                desc: "采用 AHA Heartsaver 急救培训体系，课程内容清晰，学习目标明确。",
              },
              {
                title: "真实实操训练",
                desc: "课程包含实际操作训练，由导师进行现场指导，帮助学员真正掌握急救技能。",
              },
              {
                title: "多城市培训支持",
                desc: "目前已在全国多个城市开展培训，并可根据需求安排企业团体培训。",
              },
              {
                title: "适用于个人与机构",
                desc: "既适合个人学习，也适合企业、学校、健身房、赛事组织等机构开展培训。",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 服务对象与适用场景 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">服务对象与适用场景</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "个人学员",
              "企业员工安全培训",
              "学校及教育机构",
              "健身房与运动场馆",
              "商场、物业、酒店等公共服务行业",
              "马拉松、赛事组织及活动保障团队",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm text-neutral-800">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            无论是个人急救技能学习，还是机构安全培训与活动保障需求，我们都可以提供相应的课程支持。
          </p>
        </div>
      </section>

      {/* 培训覆盖城市与合作培训点 */}
      <section className="border-b border-neutral-100 bg-neutral-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">培训覆盖城市与合作培训点</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            目前我们已在全国多个城市开展急救培训课程，并持续拓展合作培训点。学员可根据所在城市选择就近参加课程，企业团体培训也可根据需求协调安排。
          </p>
          <p className="mt-3 text-neutral-700">
            北京｜上海｜深圳｜广州｜杭州｜苏州｜南京｜成都｜重庆 等
          </p>
          <div className="mt-6">
            <Link
              href="/cities"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              查看培训城市
            </Link>
          </div>
        </div>
      </section>

      {/* 真实培训经验与课堂特色 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">真实培训经验与课堂特色</h2>
          <p className="mt-3 max-w-4xl text-neutral-700 leading-relaxed">
            我们的课程重视真实操作能力的训练。在培训过程中，学员不仅学习基础理论，还会进行 CPR、AED 使用和气道异物梗阻处理等实操练习。
          </p>
          <p className="mt-3 max-w-4xl text-neutral-700 leading-relaxed">
            我们希望每一位学员在完成课程后，不只是“听过急救知识”，而是真正能够在紧急情况下知道该如何判断、如何操作、如何配合现场救援。
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Image
              src="/images/license.png"
              alt="AHA 授权证明"
              width={560}
              height={420}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 50vw"
              className="h-auto w-full rounded-xl border border-neutral-200"
            />
            <Image
              src="/images/g6.jpg"
              alt="急救培训课堂实操与导师指导"
              width={560}
              height={420}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 50vw"
              className="h-auto w-full rounded-xl border border-neutral-200"
            />
          </div>
        </div>
      </section>

      {/* 企业团体培训 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">企业团体培训</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            如果您希望为企业、学校、健身房、赛事组织或其他机构安排急救培训，我们也提供企业团体培训服务。可根据参训人数、培训场景和时间安排提供定制化方案。
          </p>
          <div className="mt-6">
            <Link
              href="/enterprise-training"
              className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              查看企业急救培训
            </Link>
          </div>
        </div>
      </section>

      {/* 页面底部 CTA */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">欢迎咨询课程与培训安排</h2>
          <p className="mt-3 text-neutral-700">
            如果您希望了解个人课程报名、所在城市培训安排，或企业团体培训服务，欢迎通过微信或电话与我们联系。
          </p>
          <p className="mt-2 font-medium text-neutral-900">
            电话 / 微信：<a href="tel:13512456138" className="underline hover:no-underline">13512456138</a>
          </p>
          <div className="mt-4">
            <Image
              src="/images/wechat.png"
              alt="都会急救课程顾问微信二维码"
              width={160}
              height={160}
              loading="lazy"
              className="h-40 w-40 rounded-xl border border-neutral-200"
            />
          </div>
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
              className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              查看培训城市
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
