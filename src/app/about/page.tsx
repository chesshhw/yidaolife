import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SITE_URL = "https://yidaolife.com";

export const metadata: Metadata = {
  title: "关于我们｜AHA急救培训与企业团训服务｜都会急救",
  description:
    "都会急救专注 AHA Heartsaver CPR AED 培训与企业急救能力建设，提供企业团体课程定制与导师认证支持，覆盖北京、上海、深圳、广州等城市。",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "关于我们｜AHA急救培训与企业团训服务｜都会急救",
    description:
      "都会急救专注 AHA Heartsaver CPR AED 培训与企业急救能力建设，提供企业团体课程定制与导师认证支持，覆盖北京、上海、深圳、广州等城市。",
    url: `${SITE_URL}/about`,
    type: "website",
    images: [{ url: `${SITE_URL}/images/hero.webp`, width: 1200, height: 630, alt: "关于都会急救" }],
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
                关于都会急救
              </h1>
              <p className="mt-3 text-base text-neutral-600 sm:text-lg">
                专注 AHA Heartsaver CPR AED 培训与企业急救能力建设
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

      {/* 简介 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <p className="max-w-3xl text-neutral-700 leading-relaxed">
            都会急救致力于推动标准化急救能力在企业与公共场景中的普及与应用。
            课程依托 AHA（American Heart Association）Heartsaver 标准体系开展，强调实操能力与规范流程，服务对象涵盖企业、教育机构及社会组织。
          </p>
          <p className="mt-4 max-w-3xl text-neutral-700 leading-relaxed">
            我们相信，应急能力不仅是一项技能，更是组织安全体系的重要组成部分。
          </p>
        </div>
      </section>

      {/* 我们的服务方向 */}
      <section className="border-b border-neutral-100 bg-neutral-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">我们的服务方向</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-700">
            <li>AHA Heartsaver First Aid CPR AED 急救员课程</li>
            <li>企业急救培训团体定制（2小时 / 半天 / 全天）</li>
            <li>AHA 导师认证支持</li>
            <li>企业安全能力建设咨询</li>
          </ul>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            所有课程均围绕标准化流程与实操能力设计，确保培训内容具备实际应用价值。
          </p>
        </div>
      </section>

      {/* 课程体系与资质说明 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">课程体系与资质说明</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            本机构依托 AHA 授权培训体系开展课程。
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
            <li>遵循国际急救标准教学流程</li>
            <li>按体系规则进行考核与证书发放</li>
            <li>课程记录与证书符合官方规范</li>
          </ul>
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
              src="/images/cert-sample.jpg"
              alt="AHA Heartsaver 证书样本"
              width={560}
              height={420}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 50vw"
              className="h-auto w-full rounded-xl border border-neutral-200"
            />
          </div>
        </div>
      </section>

      {/* 教学原则 */}
      <section className="border-b border-neutral-100 bg-neutral-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">教学原则</h2>
          <p className="mt-3 text-neutral-700">我们坚持以下教学原则：</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-700">
            <li>强调实操训练，而非仅理论讲解</li>
            <li>小班分组练习，保证参与度</li>
            <li>规范化流程演示与现场纠正</li>
            <li>明确应急步骤与责任分工</li>
          </ul>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            在企业培训场景中，我们更关注“实际可执行性”，而不仅是课程完成。
          </p>
        </div>
      </section>

      {/* 企业合作与团训服务 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">企业合作与团训服务</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            针对企业客户，我们提供可定制的急救培训方案：
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
            <li>支持按人数分级报价</li>
            <li>支持分批次安排</li>
            <li>支持企业上门培训</li>
            <li>支持 2小时普及 / 半天强化 / 全天含证书课程</li>
          </ul>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            培训前进行需求沟通，确保课程形式与企业场景匹配。
          </p>
        </div>
      </section>

      {/* 服务覆盖城市 */}
      <section className="border-b border-neutral-100 bg-neutral-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">服务覆盖城市</h2>
          <p className="mt-3 text-neutral-700">
            目前支持排期城市包括：
          </p>
          <p className="mt-2 text-neutral-700">
            北京｜上海｜深圳｜广州｜杭州｜苏州｜南京｜成都｜重庆 等
          </p>
          <p className="mt-2 text-sm text-neutral-600">更多城市可根据需求安排培训计划。</p>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">联系我们</h2>
          <p className="mt-3 text-neutral-700">
            如需了解课程安排或企业团训方案：
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
              href="/program/enterprise-first-aid-training"
              className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              企业团训方案
            </Link>
            <Link
              href="/instructor"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              导师认证说明
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
