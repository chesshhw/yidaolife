"use client";

import Image from "next/image";
import Link from "next/link";

const PHONE = "13512456138";
const EMAIL = "13512456138@163.com";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-neutral-100 bg-neutral-50/50">
        <div className="mx-auto max-w-[1120px] px-4 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,minmax(280px,1fr)] lg:items-center">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                企业合作与培训预约
              </h1>
              <p className="mt-3 text-base text-neutral-600 sm:text-lg">
                AHA Heartsaver CPR AED｜企业团体培训可定制｜导师认证咨询
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition-colors"
                >
                  预约企业团训
                </a>
                <Link
                  href="/program/enterprise-first-aid-training"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  查看企业团训方案
                </Link>
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

      {/* 联系方式模块 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="sr-only">联系方式</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* 卡片A：微信 */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-900">微信咨询（推荐）</h3>
              <p className="mt-1 text-sm text-neutral-600">扫码添加课程顾问，工作日 9:00–18:00 优先回复</p>
              <div className="mt-4">
                <Image
                  src="/images/wechat.png"
                  alt="都会急救课程顾问微信二维码"
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-xl border border-neutral-100"
                />
              </div>
            </div>

            {/* 卡片B：电话 */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-900">电话咨询</h3>
              <p className="mt-1 text-sm text-neutral-600">同微信</p>
              <a
                href={`tel:${PHONE}`}
                className="mt-3 inline-block text-lg font-semibold text-neutral-900 hover:text-red-600 transition-colors"
              >
                {PHONE}
              </a>
            </div>

            {/* 卡片C：企业合作 */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-900">企业合作</h3>
              <p className="mt-1 text-sm text-neutral-600">企业团训 / 长期合作 / 年度安全培训</p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
              >
                查看联系方式
              </a>
            </div>

            {/* 卡片D：邮箱 */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-900">邮箱</h3>
              <p className="mt-1 text-sm text-neutral-600">企业合作与咨询</p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-3 block text-sm font-medium text-neutral-900 break-all hover:text-red-600 transition-colors"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 快速入口 */}
      <section className="border-b border-neutral-100 bg-neutral-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="sr-only">快速入口</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link
              href="/program/enterprise-first-aid-training"
              className="group block rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-neutral-300 transition"
            >
              <h3 className="text-lg font-semibold text-neutral-900">企业急救培训（可定制）</h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                <li>· 按人数分级报价</li>
                <li>· 2小时/半天/全天（含证书）</li>
                <li>· 支持上门 / 分批 / 全国排期</li>
              </ul>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-600 group-hover:gap-2 transition-all">
                查看企业团训方案 →
              </span>
            </Link>

            <Link
              href="/instructor"
              className="group block rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-neutral-300 transition"
            >
              <h3 className="text-lg font-semibold text-neutral-900">AHA 导师认证咨询</h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                <li>· 申请条件与流程说明</li>
                <li>· 排期与带教支持</li>
                <li>· 全国开放城市可协调</li>
              </ul>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-600 group-hover:gap-2 transition-all">
                查看导师认证 →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 信任背书 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">资质与体系</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4 text-neutral-700">
              <p>
                课程依托 AHA 授权培训体系开展，遵循标准化教学流程。证书按体系规则发放并可查询。
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Image
                src="/images/license.png"
                alt="AHA 授权证明"
                width={400}
                height={300}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 50vw"
                className="h-auto w-full rounded-xl border border-neutral-200"
              />
              <Image
                src="/images/cert-sample.jpg"
                alt="AHA Heartsaver 证书样本"
                width={400}
                height={300}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 50vw"
                className="h-auto w-full rounded-xl border border-neutral-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 覆盖城市 */}
      <section className="border-b border-neutral-100 bg-neutral-50/50 py-10 sm:py-12">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-lg font-semibold text-neutral-900">支持排期城市（可上门/集中培训）</h2>
          <p className="mt-3 text-neutral-700">
            北京、上海、深圳、广州、杭州、苏州、南京、成都、重庆等。
          </p>
          <p className="mt-1 text-sm text-neutral-600">更多城市可沟通排期。</p>
        </div>
      </section>

      {/* 联系与预约 #contact */}
      <section id="contact" className="scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">联系与预约</h2>
          <p className="mt-3 text-neutral-700">
            如需了解课程安排或企业团训方案，欢迎通过以下方式联系。
          </p>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
            <div>
              <p className="text-sm font-medium text-neutral-900">电话</p>
              <a href={`tel:${PHONE}`} className="text-lg font-semibold text-neutral-900 hover:text-red-600 transition-colors">
                {PHONE}
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">微信</p>
              <Image
                src="/images/wechat.png"
                alt="课程顾问微信二维码"
                width={120}
                height={120}
                className="mt-2 h-28 w-28 rounded-xl border border-neutral-200"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
