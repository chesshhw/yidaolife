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
    url: "https://yidaolife.com/blog",
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
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-neutral-100 bg-neutral-50/50">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
            急救知识
          </h1>
          <p className="mt-3 text-base text-neutral-600 max-w-3xl leading-relaxed">
            了解 CPR 心肺复苏、AED 使用以及基础急救知识，帮助更多人掌握关键时刻可能挽救生命的技能。
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14 px-4">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <p className="text-xs text-neutral-500">{post.publishedAt}</p>
              <h2 className="mt-2 text-lg font-semibold text-neutral-900">{post.title}</h2>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
              >
                阅读全文
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 px-4 border-t border-neutral-100">
        <div className="mx-auto max-w-5xl rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-neutral-900">学习急救技能</h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            如果您希望系统学习 CPR 心肺复苏、AED 使用和基础急救技能，可以参加我们的急救培训课程。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/cities" className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
              查看培训城市
            </Link>
            <Link href="/programs" className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors">
              查看课程体系
            </Link>
            <Link href="/enterprise-training" className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors">
              企业培训咨询
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
