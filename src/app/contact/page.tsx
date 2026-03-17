"use client";

import Image from "next/image";
import Link from "next/link";

const PHONE = "13512456138";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-neutral-100 bg-neutral-50/50">
        <div className="mx-auto max-w-[1120px] px-4 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,minmax(280px,1fr)] lg:items-center">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                咨询与联系
              </h1>
              <p className="mt-3 text-base text-neutral-600 sm:text-lg">
                无论您是想报名急救课程，了解所在城市培训安排，还是咨询企业团体培训服务，都可以通过以下方式联系我们。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact-main" className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition-colors">
                  微信咨询
                </a>
                <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors">
                  电话咨询
                </a>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 lg:aspect-[4/3]">
              <Image
                src="/images/g3.jpg"
                alt="企业急救培训 CPR AED 现场"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 咨询分流卡片区 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">请选择您的咨询需求</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-neutral-900">个人课程报名</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                适合想报名 AHA Heartsaver 急救员课程、了解课程安排与证书信息的学员。
              </p>
              <Link
                href="/programs"
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
              >
                查看课程与城市
              </Link>
            </article>

            <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-neutral-900">培训城市查询</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                适合想查看北京、上海、深圳、广州、天津等城市培训安排的用户。
              </p>
              <Link
                href="/cities"
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
              >
                查看培训城市
              </Link>
            </article>

            <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-neutral-900">企业培训咨询</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                适合企业、学校、健身房、赛事组织、物业等机构咨询急救培训方案。
              </p>
              <Link
                href="/enterprise-training"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                查看企业急救培训
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 联系方式主区域 */}
      <section id="contact-main" className="border-b border-neutral-100 bg-neutral-50/50 py-12 sm:py-16 scroll-mt-24">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">联系方式</h2>
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-neutral-900">添加微信咨询报名</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                可通过微信咨询课程安排、报名流程、企业培训等问题。
              </p>
              <p className="mt-2 text-sm font-medium text-neutral-900">名额有限，建议提前锁定</p>
              <p className="mt-2 text-sm text-neutral-700">
                联系人：<span className="font-medium text-neutral-900">黄老师</span>
              </p>
              <div className="mt-4">
                <Image src="/images/wechat.png" alt="都会急救课程顾问微信二维码" width={160} height={160} className="h-40 w-40 rounded-xl border border-neutral-100" />
              </div>
              <a
                href="#contact-main"
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
              >
                微信咨询
              </a>
            </article>

            <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-neutral-900">电话咨询</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                如需直接沟通课程安排或企业培训需求，可电话联系。
              </p>
              <a href={`tel:${PHONE}`} className="mt-3 inline-block text-xl font-semibold text-neutral-900 hover:text-red-600 transition-colors">
                {PHONE}
              </a>
              <p className="mt-2 text-sm text-neutral-600">支持电话 / 微信咨询</p>
              <a
                href={`tel:${PHONE}`}
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                拨打电话
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* 常见咨询场景说明 */}
      <section className="border-b border-neutral-100 bg-neutral-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">您可以咨询哪些内容？</h2>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 text-neutral-700">
            <li>个人课程报名与上课时间</li>
            <li>所在城市培训安排</li>
            <li>证书相关问题</li>
            <li>企业团体培训方案</li>
            <li>企业上门培训安排</li>
            <li>其他合作咨询</li>
          </ul>
        </div>
      </section>

      {/* 企业培训咨询入口 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">企业急救培训咨询</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed max-w-3xl">
            如果您希望为企业、学校、健身房、赛事组织或其他机构安排急救培训，可查看企业急救培训页面，了解培训内容、适用场景与服务方式。
          </p>
          <div className="mt-5">
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
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">欢迎咨询课程与培训安排</h2>
          <p className="mt-3 text-neutral-700">
            如果您已经确定想报名课程，或希望进一步了解企业培训服务，欢迎通过微信或电话联系我们。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact-main"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              微信咨询
            </a>
            <a
              href={`tel:${PHONE}`}
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
