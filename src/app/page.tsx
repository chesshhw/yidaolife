import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeContactBar from "@/components/HomeContactBar";
import HomeCourseSection from "@/components/home-course/HomeCourseSection";
import HomeHeroCtas from "@/components/HomeHeroCtas";
import HomePromoVideo from "@/components/HomePromoVideo";
import { BLOG_POSTS } from "@/data/blog";
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
    url: "https://www.yidaolife.com/",
    images: [{ url: "/images/hero.webp", width: 1200, height: 630, alt: "AHA急救培训" }],
  },
  twitter: {
    title: "AHA急救培训 | CPR AED急救员认证课程 | 全国急救培训",
    description:
      "提供 AHA Heartsaver 急救员认证培训课程，内容包括 CPR 心肺复苏、AED 使用、气道异物梗阻急救等。全国多城市开课，并支持企业急救培训服务。",
    images: ["/images/hero.webp"],
  },
};

const CITY_LINKS = getHomepageCitySlugs().map((slug) => ({
  name: getCityBySlug(slug)!.name,
  href: `/city/${slug}`,
}));

const RECENT_POSTS = [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3);
const FAQS = [
  { q: "没有医学背景，可以参加吗？", a: "可以。AHA Heartsaver 课程面向公众，适合个人、企业员工、教师、教练和家长等非医疗人员学习。" },
  { q: "急救培训需要多久？", a: "AHA Heartsaver 急救员课程通常安排一天，包含课程学习、实操练习与技能考核。具体时间请查看所在城市的课程安排。" },
  { q: "企业可以组织团体培训吗？", a: "可以。可根据参训人数、所在城市、场地和培训目标沟通团体培训或上门授课安排。" },
  { q: "完成课程后，证书如何查询？", a: "完成相应课程并通过技能考核后，可获得对应的 AHA 课程证书，并在官方系统查询。报名前可向老师了解具体课程与证书要求。" },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-[var(--border)] bg-[#f5f7f4]">
        <div className="site-container grid items-center gap-8 py-9 sm:gap-10 sm:py-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-14">
          <div className="min-w-0 lg:py-6">
            <p className="eyebrow">都会急救 · AHA HEARTSAVER</p>
            <h1 className="mt-5 text-[34px] font-semibold leading-[1.3] tracking-tight sm:text-[44px] lg:text-[48px] xl:text-[52px]">
              专业急救培训，<br />从亲手练习开始。
            </h1>
            <p className="section-intro mt-6 max-w-lg">
              学习 CPR 心肺复苏、AED 使用与基础急救技能。通过导师指导下的实操练习，为生活和工作中的突发情况做好准备。
            </p>
            <HomeHeroCtas />
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#d7e0d8] pt-5 text-xs leading-6 text-[var(--muted)] sm:text-sm">
              <span>个人课程报名</span><span>企业团体培训</span><span>全国多城市开课</span>
            </div>
          </div>
          <figure className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_-24px_rgba(28,48,45,0.3)]">
            <div className="relative aspect-[5/4] sm:aspect-[4/3] lg:aspect-[1/1]">
              <Image src="/images/g6.jpg?v=bebb2a9ae9b6" alt="导师指导学员在模拟人上练习人工呼吸与胸外按压" fill priority sizes="(max-width: 1023px) 100vw, 560px" quality={80} className="object-cover object-[50%_72%]" />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 text-xs text-[var(--muted)]">
              <span className="font-medium text-[var(--brand)]">课堂实拍</span>
              <span>实际操作 · 导师指导 · 及时反馈</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <HomePromoVideo />

      <HomeCourseSection />

      <section className="section-space border-y border-[var(--border)] bg-[var(--surface)]" aria-labelledby="classroom-heading">
        <div className="site-container">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="eyebrow">走进课堂</p><h2 id="classroom-heading" className="section-title mt-3">看见真实的学习现场</h2></div>
            <Link href="/blog/why-first-aid-hands-on-practice-matters" className="text-link shrink-0">为什么重视实操练习 <span aria-hidden>↗</span></Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src="/images/g3.jpg?v=eb9351e83ceb" alt="学员观看 Heartsaver 教学视频，课堂配备模拟人和练习用品" fill sizes="(max-width: 767px) 100vw, 560px" className="object-cover" /></div>
              <figcaption className="mt-4 flex items-start gap-4"><span className="pt-1 text-xs text-[var(--brand)]">01</span><div><h3 className="font-semibold">理解步骤，做好练习准备</h3><p className="mt-1 text-sm leading-7 text-[var(--muted)]">结合视频教学、课堂讲解与模拟人练习。</p></div></figcaption>
            </figure>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src="/images/hero.webp" alt="都会急救课程结束后，学员与导师手持培训横幅合影" fill sizes="(max-width: 767px) 100vw, 560px" className="object-cover" /></div>
              <figcaption className="mt-4 flex items-start gap-4"><span className="pt-1 text-xs text-[var(--brand)]">02</span><div><h3 className="font-semibold">把一次学习，带回日常生活</h3><p className="mt-1 text-sm leading-7 text-[var(--muted)]">面向个人与团体，让更多人有机会接触和学习急救。</p></div></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="enterprise-heading">
        <div className="site-container">
          <div className="grid gap-10 rounded-2xl bg-[#1c4036] p-7 text-white sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:p-14">
            <div>
              <p className="text-xs font-medium tracking-[0.16em] text-[#c4dace]">企业与机构培训</p>
              <h2 id="enterprise-heading" className="mt-4 text-[28px] font-semibold leading-[1.4] sm:text-4xl">为团队安排一堂<br />真正动手的急救课</h2>
              <p className="mt-5 text-base leading-8 text-[#dfebe4]">面向企业、学校、运动场馆和公共服务机构，根据人员、场地与培训目标，沟通适合团队的课程安排。</p>
              <Link href="/enterprise-training" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#1c4036] hover:bg-[#eaf1eb]">了解企业培训方案 <span aria-hidden>↗</span></Link>
            </div>
            <ol className="self-center divide-y divide-white/20">
              {[["沟通培训需求", "确认城市、人数、场地与课程目标。"], ["安排课程与练习", "结合团队情况，沟通授课方式和实操安排。"], ["关注技能与复练", "了解考核要求与后续复练方式。"]].map(([title, desc], i) => <li key={title} className="flex gap-5 py-5 first:pt-0 last:pb-0"><span className="pt-1 text-sm tabular-nums text-[#b9d1c4]">0{i + 1}</span><div><h3 className="text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-7 text-[#d4e4d9]">{desc}</p></div></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] pb-16 sm:pb-20" aria-labelledby="cities-heading">
        <div className="site-container grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div><p className="eyebrow">就近学习</p><h2 id="cities-heading" className="section-title mt-3">找到你的培训城市</h2><p className="section-intro mt-4">查看当地开课日期与培训地点。企业团体培训可进一步沟通场地与排期。</p><Link href="/cities" className="text-link mt-4">查看全部城市与排期 <span aria-hidden>→</span></Link></div>
          <ul className="grid grid-cols-3 content-start gap-3 sm:grid-cols-4">
            {CITY_LINKS.map(({name,href}) => <li key={href}><Link href={href} className="flex min-h-14 items-center justify-center rounded-lg border border-[var(--border)] px-3 py-3 text-sm transition-colors hover:border-[var(--brand)] hover:bg-[var(--surface)] hover:text-[var(--brand)]">{name}</Link></li>)}
          </ul>
        </div>
      </section>

      <section className="section-space" aria-labelledby="knowledge-heading">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="eyebrow">急救知识与教学观察</p><h2 id="knowledge-heading" className="section-title mt-3">从一个问题，多了解一点急救</h2></div>
            <Link href="/blog" className="text-link shrink-0">阅读全部文章 <span aria-hidden>↗</span></Link>
          </div>
          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {RECENT_POSTS.map((post) => <article key={post.slug} className="flex flex-col border-t-2 border-[var(--border)] pt-5"><p className="text-xs text-[var(--muted)]"><time dateTime={post.publishedAt}>{post.publishedAt}</time> · 都会急救</p><h3 className="mt-4 text-xl font-semibold leading-8"><Link href={`/blog/${post.slug}`} className="hover:text-[var(--brand)]">{post.title}</Link></h3><p className="mb-4 mt-3 text-sm leading-7 text-[var(--muted)]">{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="text-link mt-auto" aria-label={`阅读全文：${post.title}`}>阅读全文 <span aria-hidden>→</span></Link></article>)}
          </div>
        </div>
      </section>

      <section className="section-space border-t border-[var(--border)] bg-[var(--surface)]" aria-labelledby="faq-heading">
        <div className="site-container grid gap-8 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div><p className="eyebrow">报名前，你可能想了解</p><h2 id="faq-heading" className="section-title mt-3">常见问题</h2><Link href="/contact" className="text-link mt-5">向老师咨询 <span aria-hidden>↗</span></Link></div>
          <div className="divide-y divide-[var(--border)]">
            {FAQS.map(({q,a}) => <article key={q} className="py-6 first:pt-0"><h3 className="text-base font-semibold sm:text-lg">{q}</h3><p className="mt-3 text-sm leading-7 text-[var(--muted)] sm:text-base">{a}</p></article>)}
          </div>
        </div>
      </section>
      <HomeContactBar />
    </>
  );
}
