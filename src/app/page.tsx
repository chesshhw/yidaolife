import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeContactBar from "@/components/HomeContactBar";

export const metadata: Metadata = {
  title: "一天学会救命技能｜AHA急救培训",
  description:
    "都会急救（AHA授权培训中心）提供 Heartsaver 急救员认证课程：CPR、AED、急救技能。小班实操，证书全球通用，全国多城市可约。",
  alternates: { canonical: "/" },
  openGraph: {
    title: "一天学会救命技能｜AHA急救培训",
    description:
      "Heartsaver 急救员认证：CPR + AED + 急救技能｜小班实操｜证书全球通用｜全国多城市可约。",
    url: "https://yidaolife.com/",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "AHA急救培训" }],
  },
};

const SELLING_POINTS = [
  { label: "证书全球通用", icon: "check" },
  { label: "开课前一周可退改", icon: "check" },
  { label: "全国协同排期", icon: "check" },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero：public/images/hero.jpg 背景 + 遮罩 + 文案最上层 */}
      <section className="relative w-full min-h-[65vh] flex flex-col">
        {/* 背景图层 */}
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "left center",
          }}
        />
        {/* 黑色遮罩 */}
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        {/* 文案容器：最上层，整体上移避免挡住人脸 */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-12 lg:p-16 translate-y-[-15vh]">
          <h1 className="text-5xl md:text-6xl font-medium text-white tracking-tight max-w-2xl">
            一天学会救命技能
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white opacity-90 max-w-lg">
            AHA官方授权培训中心 · 全国68城可约
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#course-card"
              className="btn-subtle text-white border-white hover:bg-white hover:text-black"
            >
              立即报名
            </a>
            <Link
              href="/contact"
              className="btn-subtle text-white border-white hover:bg-white hover:text-black"
            >
              联系老师
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 主课程卡（含优势条） */}
      <section id="course-card" className="pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 scroll-mt-24">
        <div className="mx-auto max-w-5xl">
          <article className="mx-auto py-10 px-6 sm:px-10 rounded-3xl border border-[var(--border)] shadow-xl overflow-hidden bg-white dark:bg-black">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="min-w-0 flex-1 overflow-hidden">
                <h2 className="text-base sm:text-lg md:text-xl font-medium tracking-tight text-[var(--foreground)] whitespace-nowrap overflow-hidden text-ellipsis">
                  AHA HeartSaver 国际急救员认证
                </h2>
              </div>
              <span className="shrink-0 text-xs tracking-wide text-[var(--muted)] border border-[var(--border)] px-3 py-1.5 rounded">
                全国开课
              </span>
            </div>
            <ul className="mt-4 flex flex-wrap justify-center gap-6 sm:gap-8 list-none p-0 m-0">
              {SELLING_POINTS.map(({ label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-[var(--muted)]">
              CPR · AED · 急救技能
            </p>
            <div className="mt-6 sm:mt-8 flex justify-end">
              <Link
                href="/programs"
                className="btn-subtle inline-flex items-center gap-1.5"
              >
                查看课程与排期
                <span aria-hidden>→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* 4. 课程实拍（图片墙 g1–g6） */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--foreground)]">
            课程实拍
          </h2>
          <ul className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 list-none p-0 m-0">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <li key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
                <Image
                  src={`/images/g${i}.jpg`}
                  alt={`培训现场 ${i}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. 联系闭环条 */}
      <HomeContactBar />
    </>
  );
}
