"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const REGIONS = [
  { id: "bj", name: "京津冀" },
  { id: "yj", name: "长三角" },
  { id: "zj", name: "珠三角" },
  { id: "xn", name: "西南" },
  { id: "xb", name: "西北" },
  { id: "db", name: "东北" },
  { id: "other", name: "其他" },
];

const CITIES_BY_REGION: Record<string, string[]> = {
  bj: ["北京", "天津", "石家庄", "唐山", "保定", "廊坊"],
  yj: ["上海", "杭州", "南京", "苏州", "无锡", "宁波", "合肥"],
  zj: ["广州", "深圳", "珠海", "东莞", "佛山", "中山"],
  xn: ["成都", "重庆", "昆明", "贵阳", "西安"],
  xb: ["西安", "兰州", "乌鲁木齐", "银川", "西宁"],
  db: ["沈阳", "大连", "哈尔滨", "长春", "济南", "青岛"],
  other: ["郑州", "武汉", "长沙", "福州", "厦门"],
};

export default function CitiesPage() {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero：白底 + 地图 contain 不裁切 + 轻遮罩 + 玻璃卡 */}
      <section className="relative w-full min-h-[55vh] flex flex-col bg-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/china-map.jpg"
            alt="服务城市"
            fill
            className="object-contain object-[50%_60%]"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-white/15" aria-hidden />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" aria-hidden />

        {/* 中央玻璃卡片 */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 sm:p-8">
          <div className="max-w-xl w-full rounded-3xl bg-white/70 backdrop-blur-md shadow-2xl border border-white/40 px-8 py-10 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
              服务城市
            </h1>
            <p className="text-base md:text-lg text-neutral-600 mt-3">
              覆盖全国 · 多城可约
            </p>
            <p className="text-sm text-neutral-600 mt-2">
              支持企业团训与公开课
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#regions"
                className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-all duration-200"
              >
                按区域查看
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 text-neutral-700 px-6 py-3 text-sm font-medium hover:bg-neutral-100 transition-all duration-200"
              >
                联系顾问
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 区域选择 */}
      <section id="regions" className="py-14 scroll-mt-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-6">
            按区域选择
          </h2>
          <div className="flex flex-wrap gap-3">
            {REGIONS.map((r) => (
              <a
                key={r.id}
                href={`#region-${r.id}`}
                onClick={() => setSelectedRegionId(r.id)}
                className={`rounded-full px-5 py-2 text-sm font-medium border border-neutral-300 transition-all ${
                  selectedRegionId === r.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-neutral-700 hover:bg-black hover:text-white"
                }`}
              >
                {r.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 城市列表 */}
      <section className="py-16 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-12">
            {REGIONS.map((r) => (
              <div key={r.id} id={`region-${r.id}`} className="scroll-mt-24">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  {r.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CITIES_BY_REGION[r.id]?.map((city) => (
                    <span
                      key={city}
                      className="inline-flex items-center rounded-xl bg-neutral-100 px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-200 transition-all duration-200"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
