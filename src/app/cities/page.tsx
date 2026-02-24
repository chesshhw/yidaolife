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
                    return (
                      <li key={city.slug}>
                        <article className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm">
                          <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                            <Link
                              href={`/city/${city.slug}`}
                              className="hover:text-neutral-600 transition-colors"
                            >
                              {city.name}AHA急救培训
                            </Link>
                          </h3>
                          <div className="space-y-2">
                            {addrs.map((addr, i) => (
                              <address
                                key={i}
                                className="text-neutral-700 not-italic text-sm leading-relaxed"
                              >
                                {addr}
                              </address>
                            ))}
                          </div>
                          <Link
                            href={`/city/${city.slug}`}
                            className="inline-block mt-4 text-sm font-medium text-neutral-900 hover:underline"
                          >
                            查看详情与报名 →
                          </Link>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
