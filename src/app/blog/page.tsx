import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";

export const metadata: Metadata = {
  title: "急救知识 | CPR AED急救技能与培训指南",
  description:
    "了解 CPR 心肺复苏、AED 使用以及基础急救知识，学习关键急救技能，并了解急救培训课程与企业培训服务。",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "急救知识 | CPR AED急救技能与培训指南",
    description:
      "了解 CPR 心肺复苏、AED 使用以及基础急救知识，学习关键急救技能，并了解急救培训课程与企业培训服务。",
    url: "https://www.yidaolife.com/blog",
    images: [{ url: "/images/g5.jpg", width: 1200, height: 630, alt: "急救知识栏目" }],
  },
  twitter: {
    title: "急救知识 | CPR AED急救技能与培训指南",
    description:
      "了解 CPR 心肺复苏、AED 使用以及基础急救知识，学习关键急救技能，并了解急救培训课程与企业培训服务。",
    images: ["/images/g5.jpg"],
  },
};

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const [featured, ...rest] = posts;
  return (
    <div className="bg-white">
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="site-container py-12 sm:py-16">
          <p className="eyebrow">都会急救 · 知识与教学观察</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">急救知识</h1>
          <p className="section-intro mt-5 max-w-2xl">从课堂中的真实问题出发，了解 CPR、AED 与基础急救，也了解如何选择适合个人和团队的培训。</p>
        </div>
      </section>
      <div className="site-container py-12 sm:py-16">
        {featured && <article className="grid gap-6 border-b border-[var(--border)] pb-12 lg:grid-cols-[0.5fr_1.5fr] lg:gap-14">
          <div><p className="eyebrow">最新文章</p><p className="mt-4 text-sm text-[var(--muted)]"><time dateTime={featured.publishedAt}>{featured.publishedAt}</time><br /><span className="mt-2 inline-block">{featured.author ?? "都会急救"}</span></p></div>
          <div><h2 className="text-2xl font-semibold leading-[1.5] sm:text-3xl"><Link href={`/blog/${featured.slug}`} className="hover:text-[var(--brand)]">{featured.title}</Link></h2><p className="section-intro mt-4">{featured.excerpt}</p><Link href={`/blog/${featured.slug}`} className="text-link mt-5">阅读全文 <span aria-hidden>→</span></Link></div>
        </article>}
        <div className="grid gap-x-10 gap-y-9 pt-10 md:grid-cols-2">
          {rest.map((post) => <article key={post.slug} className="flex flex-col border-b border-[var(--border)] pb-8"><p className="text-xs leading-6 text-[var(--muted)]"><time dateTime={post.publishedAt}>{post.publishedAt}</time> · {post.author ?? "都会急救"}</p><h2 className="mt-3 text-xl font-semibold leading-8"><Link href={`/blog/${post.slug}`} className="hover:text-[var(--brand)]">{post.title}</Link></h2><p className="mb-4 mt-3 text-sm leading-7 text-[var(--muted)]">{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="text-link mt-auto" aria-label={`阅读全文：${post.title}`}>阅读全文 <span aria-hidden>→</span></Link></article>)}
        </div>
      </div>
      <section className="bg-[var(--surface)] py-14">
        <div className="site-container"><h2 className="section-title">把知识带进实际练习</h2><p className="section-intro mt-4">了解课程安排，在导师指导下学习和练习急救技能。</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/cities" className="button-primary">查看培训城市</Link><Link href="/programs" className="button-secondary">查看课程体系</Link><Link href="/enterprise-training" className="button-secondary">企业培训咨询</Link></div></div>
      </section>
    </div>
  );
}
