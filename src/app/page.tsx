import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeContactBar from "@/components/HomeContactBar";
import PerformanceSelfCheck from "@/components/PerformanceSelfCheck";
import { getHomepageCitySlugs, getCityBySlug } from "@/data/cities";

export const metadata: Metadata = {
  title: "AHA急救培训｜美国心脏协会认证CPR & AED课程｜全国开班｜都会急救",
  description:
    "都会急救提供美国心脏协会（AHA）HeartSaver急救员认证培训课程，涵盖CPR心肺复苏、AED使用、气道异物梗阻等内容。全国多城市开班，支持企业团建培训与个人认证报名，正规证书，全国通用。",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AHA急救培训｜美国心脏协会认证CPR & AED课程｜全国开班｜都会急救",
    description:
      "都会急救提供美国心脏协会（AHA）HeartSaver急救员认证培训课程，涵盖CPR心肺复苏、AED使用、气道异物梗阻等内容。全国多城市开班，支持企业团建培训与个人认证报名，正规证书，全国通用。",
    url: "https://yidaolife.com/",
    images: [{ url: "/images/hero.webp", width: 1200, height: 630, alt: "AHA急救培训" }],
  },
};

const SELLING_POINTS = [
  { label: "证书全球通用", icon: "check" },
  { label: "开课前一周可退改", icon: "check" },
  { label: "全国协同排期", icon: "check" },
];

const CITY_LINKS = [
  ...getHomepageCitySlugs().map((slug) => ({
    name: getCityBySlug(slug)!.name,
    href: `/city/${slug}`,
  })),
  { name: "其他城市", href: "/cities" },
];

/** 首屏 Hero 图：next/image 优化，仅此图用 priority */
const HERO_IMAGE_SRC = "/images/hero.webp";
const HERO_SIZES = "100vw";
const HERO_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQ";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero：next/image 优化（Network 应见 /_next/image?url=...&w=...&q=...） */}
      <section className="relative w-full h-[65vh] min-h-[520px] md:h-[70vh] md:min-h-[620px] flex flex-col">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE_SRC}
            alt=""
            fill
            priority
            sizes={HERO_SIZES}
            quality={72}
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover object-left"
            style={{ objectFit: "cover" }}
            data-hero="1"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        {/* 文案容器：最上层，整体上移避免挡住人脸 */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-12 lg:p-16 translate-y-[-15vh]">
          <h1 className="text-5xl md:text-6xl font-medium text-white tracking-tight max-w-2xl">
            AHA急救培训｜美国心脏协会认证课程
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white opacity-90 max-w-lg">
            全国AHA HeartSaver急救员认证中心 · 全国68城可约
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

      {/* 2. CPR与AED培训 · 主课程卡 */}
      <section id="course-card" className="pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 scroll-mt-24" aria-labelledby="section-cpr">
        <h2 id="section-cpr" className="sr-only">CPR心肺复苏与AED使用培训</h2>
        <div className="mx-auto max-w-5xl">
          <article className="mx-auto py-10 px-6 sm:px-10 rounded-3xl border border-[var(--border)] shadow-xl overflow-hidden bg-white dark:bg-black">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="min-w-0 flex-1 overflow-hidden">
                <h3 className="text-base sm:text-lg md:text-xl font-medium tracking-tight text-[var(--foreground)] whitespace-nowrap overflow-hidden text-ellipsis">
                  AHA HeartSaver 国际急救员认证
                </h3>
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

      {/* 全国AHA急救培训城市 */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--foreground)]">
            全国AHA急救培训城市
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
            {CITY_LINKS.map(({ name, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. 全国多城市开班 · 课程实拍 */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24" aria-labelledby="section-cities">
        <h2 id="section-cities" className="sr-only">全国多城市开班</h2>
        <div className="mx-auto max-w-4xl">
          <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--foreground)]">
            课程实拍
          </h3>
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

      {/* 4. 企业急救培训解决方案 · 联系闭环 */}
      <section aria-labelledby="section-enterprise">
        <h2 id="section-enterprise" className="sr-only">企业急救培训解决方案</h2>
        <HomeContactBar />
      </section>

      {process.env.NODE_ENV === "development" && (
        <PerformanceSelfCheck heroFile={HERO_IMAGE_SRC} heroPriority heroSizes={HERO_SIZES} />
      )}
    </>
  );
}
