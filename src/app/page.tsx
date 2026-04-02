import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeContactBar from "@/components/HomeContactBar";
import HomeCourseSection from "@/components/home-course/HomeCourseSection";
import HomeHeroCtas from "@/components/HomeHeroCtas";
import PerformanceSelfCheck from "@/components/PerformanceSelfCheck";
import { getHomepageCitySlugs, getCityBySlug } from "@/data/cities";

export const metadata: Metadata = {
  title: "AHA急救培训 | CPR AED急救员认证课程 | 全国急救培训",
  description:
    "提供 AHA Heartsaver 急救员认证培训课程，内容包括 CPR 心肺复苏、AED 使用、气道异物梗阻急救等。全国多城市开课，并支持企业急救培训服务。",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AHA急救培训 | CPR AED急救员认证课程 | 全国急救培训",
    description:
      "提供 AHA Heartsaver 急救员认证培训课程，内容包括 CPR 心肺复苏、AED 使用、气道异物梗阻急救等。全国多城市开课，并支持企业急救培训服务。",
    url: "https://yidaolife.com/",
    images: [{ url: "/images/hero.webp", width: 1200, height: 630, alt: "AHA急救培训" }],
  },
  twitter: {
    title: "AHA急救培训 | CPR AED急救员认证课程 | 全国急救培训",
    description:
      "提供 AHA Heartsaver 急救员认证培训课程，内容包括 CPR 心肺复苏、AED 使用、气道异物梗阻急救等。全国多城市开课，并支持企业急救培训服务。",
    images: ["/images/hero.webp"],
  },
};

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
            alt="AHA急救培训课堂现场"
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
            AHA急救培训 | 美国心脏协会认证课程
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white opacity-90 max-w-xl">
            CPR心肺复苏 · AED自动体外除颤仪 · 气道异物梗阻急救
          </p>
          <p className="mt-1 text-sm sm:text-base text-white opacity-90 max-w-xl">
            一天课程 · 国际认证证书 · 全国多城市开课
          </p>
          <HomeHeroCtas />
        </div>
      </section>

      {/* 2. 首页课程模块：介绍 → 技能 → 信息 → 价值 → CTA */}
      <HomeCourseSection />

      {/* 全国AHA急救培训城市 */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--foreground)]">
            全国AHA急救培训城市
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--muted)] leading-7 max-w-3xl">
            我们在全国多个城市开展 AHA Heartsaver 急救员认证培训课程，包括北京、上海、广州、深圳、天津等城市。
          </p>
          <p className="mt-2 text-sm sm:text-base text-[var(--muted)] leading-7 max-w-3xl">
            部分城市支持企业团体培训和上门授课。
          </p>
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

      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-t border-[var(--border)]">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--foreground)]">
            为什么学习急救？
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--muted)] leading-7">
            心脏骤停往往发生在医院之外。在专业医疗救援到达之前，现场人员的及时施救非常关键。
          </p>
          <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-7">
            研究表明，在心脏骤停发生后的4分钟内进行心肺复苏（CPR）并使用 AED 进行除颤，可以显著提高生存率。
          </p>
          <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-7">
            掌握基本急救技能不仅可以帮助他人，也是每个人都应该具备的重要能力。
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-14">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--border)] bg-neutral-50/70 dark:bg-neutral-900/40 p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--foreground)]">
            企业急救培训
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--muted)] leading-7">
            我们为企业、学校、健身房、赛事组织等机构提供定制化急救培训服务。
          </p>
          <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-7">
            培训内容包括：
          </p>
          <ul className="mt-2 text-sm sm:text-base text-[var(--muted)] leading-7 list-disc list-inside">
            <li>CPR 心肺复苏</li>
            <li>AED 自动体外除颤仪使用</li>
            <li>气道异物梗阻处理</li>
            <li>突发事件现场应对流程</li>
          </ul>
          <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-7">
            支持企业上门培训，课程可根据企业需求定制。
          </p>
          <div className="mt-6">
            <Link href="/enterprise-training" className="btn-subtle inline-flex items-center gap-1.5">
              咨询企业培训
              <span aria-hidden>→</span>
            </Link>
          </div>
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
                  alt={i === 1 ? "急救培训课堂实拍" : i === 2 ? "CPR心肺复苏实操训练现场" : i === 3 ? "AED使用教学现场" : i === 4 ? "导师指导急救操作练习" : i === 5 ? "学员分组进行急救训练" : "急救培训现场实操演练"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-14 sm:pb-16" aria-labelledby="section-faq">
        <div className="mx-auto max-w-4xl">
          <h2 id="section-faq" className="text-lg sm:text-xl font-medium tracking-tight text-[var(--foreground)]">
            常见问题
          </h2>
          <div className="mt-5 space-y-4">
            <article className="rounded-2xl border border-[var(--border)] p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-medium text-[var(--foreground)]">
                急救培训需要多久？
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[var(--muted)] leading-7">
                AHA Heartsaver 急救员课程通常一天即可完成培训与考核。
              </p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-medium text-[var(--foreground)]">
                证书是否可以查询？
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[var(--muted)] leading-7">
                证书由美国心脏协会授权体系签发，可在官方系统查询。
              </p>
            </article>
            <article className="rounded-2xl border border-[var(--border)] p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-medium text-[var(--foreground)]">
                企业可以组织团体培训吗？
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[var(--muted)] leading-7">
                可以，我们支持企业团体培训及上门培训服务。
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-14">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--border)] bg-neutral-50/70 dark:bg-neutral-900/40 p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--foreground)]">
            急救知识
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-7">
            了解 CPR 心肺复苏、AED 使用和基础急救知识，帮助你建立更完整的急救认知。
          </p>
          <div className="mt-5">
            <Link href="/blog" className="btn-subtle inline-flex items-center gap-1.5">
              查看急救知识文章
              <span aria-hidden>→</span>
            </Link>
          </div>
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
