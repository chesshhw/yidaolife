"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getCitiesByRegion, getDisplayLocations } from "@/data/cities";

export default function CitiesPage() {
  const [q, setQ] = useState("");
  const regionsWithCities = useMemo(() => getCitiesByRegion(), []);
  const filtered = useMemo(
    () =>
      q.trim()
        ? regionsWithCities.map(({ region, cities }) => ({
            region,
            cities: cities.filter((c) => c.name.includes(q.trim())),
          })).filter((r) => r.cities.length > 0)
        : regionsWithCities,
    [regionsWithCities, q]
  );

  return (
    <div className="min-h-screen bg-white">
      <section className="relative w-full min-h-[40vh] flex flex-col bg-white border-b border-neutral-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/china-map.jpg"
            alt="全国AHA急救培训城市分布"
            fill
            className="object-contain object-[50%_60%]"
            priority={false}
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-white/20" aria-hidden />
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 sm:p-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 text-center">
            全国AHA急救培训城市
          </h1>
          <p className="text-base text-neutral-600 mt-2 text-center">
            查看各城市培训地址与报名入口
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 sticky top-16 sm:top-20 z-10 bg-white/95 backdrop-blur border-b border-neutral-100">
        <div className="max-w-2xl mx-auto">
          <label htmlFor="city-search" className="sr-only">
            按城市名搜索
          </label>
          <input
            id="city-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="按城市名搜索，如：北京、深圳"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
            aria-label="按城市名搜索"
          />
        </div>
      </section>

      <section className="pt-8 pb-2 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900">
            全国AHA急救培训城市
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-700 leading-7">
            我们在全国多个城市开展 AHA Heartsaver 急救员认证培训课程，课程内容包括 CPR 心肺复苏、AED 自动体外除颤仪使用、气道异物梗阻急救等急救技能。
          </p>
          <p className="mt-3 text-sm sm:text-base text-neutral-700 leading-7">
            培训课程适用于：
          </p>
          <ul className="mt-2 list-disc list-inside text-sm sm:text-base text-neutral-700 leading-7 space-y-1">
            <li>个人急救技能学习</li>
            <li>企业员工安全培训</li>
            <li>学校与公共机构培训</li>
          </ul>
          <p className="mt-3 text-sm sm:text-base text-neutral-700 leading-7">
            目前培训城市包括北京、上海、广州、深圳、天津等，并持续增加新的培训城市。
          </p>
        </div>
      </section>

      <section className="py-10 pb-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-10">
          {filtered.length === 0 ? (
            <p className="text-neutral-500 text-center py-8">暂无匹配城市</p>
          ) : (
            filtered.map(({ region, cities }) => (
              <div key={region}>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">{region}</h2>
                <ul className="space-y-4 list-none p-0 m-0">
                  {cities.map((city) => {
                    const addrs = getDisplayLocations(city.locations);
                    const displayName = city.name.replace(/市$/, "");
                    return (
                      <li key={city.slug}>
                        <Link
                          href={`/city/${city.slug}`}
                          className="group block rounded-2xl border border-neutral-200 bg-white p-4 md:p-5 shadow-sm hover:shadow-md hover:border-neutral-300 transition cursor-pointer"
                          aria-label={`查看${city.name}急救培训课程时间与报名`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <h3 className="text-base md:text-lg font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                                {displayName}急救培训 | AHA Heartsaver急救员认证课程
                              </h3>
                              <p className="mt-1 text-sm text-neutral-600">
                                HeartSaver急救员认证课程（纸质证书）
                              </p>
                              <p className="mt-2 text-sm text-neutral-700">
                                {displayName}培训内容包括：
                              </p>
                              <ul className="mt-1 list-disc list-inside text-sm text-neutral-700 leading-6 space-y-1">
                                <li>CPR心肺复苏</li>
                                <li>AED自动体外除颤仪使用</li>
                                <li>气道异物梗阻急救</li>
                              </ul>
                            </div>
                            <span
                              className="shrink-0 inline-flex items-center gap-1 rounded-full bg-neutral-900 text-white text-sm px-3 py-1.5 group-hover:opacity-90 group-hover:shadow-md transition"
                              aria-hidden
                            >
                              查看课程时间与报名
                              <span aria-hidden>→</span>
                            </span>
                          </div>
                          <div className="mt-3 space-y-2">
                            {addrs.map((addr, i) => (
                              <address
                                key={i}
                                className="not-italic text-sm text-neutral-700 leading-relaxed"
                              >
                                {addr}
                              </address>
                            ))}
                          </div>
                          <p className="mt-4 text-xs text-neutral-500">
                            点击卡片任意位置进入课程时间与报名
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-2xl mx-auto rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900">
            企业急救培训服务
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-700 leading-7">
            如果您的企业、学校、健身房或赛事组织需要急救培训，我们可以提供企业团体培训服务。
          </p>
          <p className="mt-3 text-sm sm:text-base text-neutral-700 leading-7">
            培训内容包括：
          </p>
          <ul className="mt-2 list-disc list-inside text-sm sm:text-base text-neutral-700 leading-7 space-y-1">
            <li>CPR 心肺复苏</li>
            <li>AED 自动体外除颤仪使用</li>
            <li>气道异物梗阻处理</li>
          </ul>
          <p className="mt-3 text-sm sm:text-base text-neutral-700 leading-7">
            支持企业上门培训或集中培训。
          </p>
          <div className="mt-5">
            <Link
              href="/enterprise-training"
              className="inline-flex items-center gap-1 rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-white transition"
            >
              咨询企业培训
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900">
            培训城市常见问题
          </h2>
          <div className="mt-4 space-y-3">
            <article className="rounded-xl border border-neutral-200 bg-white p-4">
              <h3 className="text-sm sm:text-base font-semibold text-neutral-900">急救培训课程多久完成？</h3>
              <p className="mt-2 text-sm sm:text-base text-neutral-700 leading-7">
                AHA Heartsaver 急救员课程通常一天即可完成培训与考核。
              </p>
            </article>
            <article className="rounded-xl border border-neutral-200 bg-white p-4">
              <h3 className="text-sm sm:text-base font-semibold text-neutral-900">哪些城市可以参加培训？</h3>
              <p className="mt-2 text-sm sm:text-base text-neutral-700 leading-7">
                目前培训城市包括北京、上海、广州、深圳、天津等，并持续增加新的培训城市。
              </p>
            </article>
            <article className="rounded-xl border border-neutral-200 bg-white p-4">
              <h3 className="text-sm sm:text-base font-semibold text-neutral-900">企业可以预约培训吗？</h3>
              <p className="mt-2 text-sm sm:text-base text-neutral-700 leading-7">
                可以，我们支持企业团体培训和上门培训服务。
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
