import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, getAllBlogSlugs, getBlogPostBySlug } from "@/data/blog";
import Breadcrumbs from "@/components/Breadcrumbs";

const SITE_URL = "https://yidaolife.com";
const SITE_NAME = "都会急救";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return {
      title: "急救知识 | 都会急救",
      description: "急救知识栏目文章。",
    };
  }
  return {
    title: `${post.title} | 急救知识`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | 急救知识`,
      description: post.description,
      url: `https://yidaolife.com/blog/${post.slug}`,
      images: [{ url: "/images/g5.jpg", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      title: `${post.title} | 急救知识`,
      description: post.description,
      images: ["/images/g5.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-white py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold text-neutral-900">文章未找到</h1>
          <Link href="/blog" className="mt-4 inline-flex text-neutral-700 hover:underline">
            返回急救知识栏目
          </Link>
        </div>
      </main>
    );
  }

  const related = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "急救知识", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: pageUrl,
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <header className="border-b border-neutral-100 pb-6">
          <div className="mb-4">
            <Breadcrumbs
              items={[
                { label: "首页", href: "/" },
                { label: "急救知识", href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-neutral-500">发布时间：{post.publishedAt}</p>
        </header>

        <div className="pt-8 space-y-8">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-neutral-900">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mt-3 text-neutral-700 leading-relaxed">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-3 list-disc list-inside text-neutral-700 space-y-1">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {post.slug === "why-companies-need-first-aid-training" && (
          <section className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-sm text-neutral-700 leading-relaxed">
              如果您有企业内训需求，可进一步查看
              <Link href="/enterprise-training" className="mx-1 underline hover:no-underline">
                企业急救培训页面
              </Link>
              ，了解培训内容、服务方式与咨询入口。
            </p>
          </section>
        )}

        <section className="mt-12 border-t border-neutral-100 pt-8">
          <h2 className="text-lg font-semibold text-neutral-900">相关文章推荐</h2>
          <div className="mt-4 grid gap-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
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
        </section>
      </article>
    </main>
  );
}
