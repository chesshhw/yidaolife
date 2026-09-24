import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, getAllBlogSlugs, getBlogPostBySlug } from "@/data/blog";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogBottomCta from "@/components/BlogBottomCta";

const SITE_URL = "https://www.yidaolife.com";
const SITE_NAME = "都会急救";
const LEGAL_NAME = "天津一道技术服务有限公司";

type Props = { params: Promise<{ slug: string }> };

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

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
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const seoTitle = post.seoTitle ?? `${post.title} | 急救知识`;
  const ogImage = post.ogImage ?? { src: "/images/g5.jpg", alt: post.title };
  return {
    title: post.seoTitle ? { absolute: post.seoTitle } : seoTitle,
    description: post.description,
    keywords: post.topics,
    authors: post.author ? [{ name: post.author }] : [{ name: SITE_NAME }],
    alternates: { canonical: pageUrl },
    robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    openGraph: {
      type: "article",
      title: seoTitle,
      description: post.description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: "zh_CN",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: post.author ? [post.author] : [SITE_NAME],
      images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: ogImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: post.description,
      images: [{ url: ogImage.src, alt: ogImage.alt }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const related = post.relatedSlugs?.length
    ? post.relatedSlugs
        .map((relatedSlug) => getBlogPostBySlug(relatedSlug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
    : BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const dateModified = post.updatedAt ?? post.publishedAt;
  const authorName = post.author ?? SITE_NAME;
  const brandName = post.brand ?? SITE_NAME;
  const organizationName = post.organization ?? LEGAL_NAME;
  const ogImage = post.ogImage;
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
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    inLanguage: "zh-CN",
    datePublished: post.publishedAt,
    dateModified,
    author: {
      "@type": post.author ? "Person" : "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: organizationName,
      brand: { "@type": "Brand", name: brandName },
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    ...(ogImage
      ? {
          image: [`${SITE_URL}${ogImage.src}`],
        }
      : {}),
    ...(post.topics?.length
      ? {
          about: post.topics.map((topic) => ({ "@type": "Thing", name: topic })),
        }
      : {}),
  };
  const faqJsonLd = post.faqItems?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqItems.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }
    : null;

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
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
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
          <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
            作者：{authorName}
            {" · "}
            {brandName}
            {" · "}
            {organizationName}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            发布日期：<time dateTime={post.publishedAt}>{post.publishedAt}</time>
            {dateModified !== post.publishedAt ? ` · 修改日期：${dateModified}` : ""}
          </p>
          <p className="mt-4 text-neutral-600 leading-relaxed">{post.description}</p>
        </header>

        <div className="pt-8 space-y-8">
          {post.lead?.length ? (
            <section className="-mt-2">
              {post.lead.map((p) => (
                <p key={p} className="mt-3 text-neutral-700 leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ) : null}

          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-neutral-900">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mt-3 text-neutral-700 leading-relaxed">
                  {p}
                </p>
              ))}

              {section.blocks?.map((block, index) =>
                block.type === "list" ? (
                  <ul key={index} className="mt-3 list-disc pl-5 text-neutral-700 space-y-2">
                    {block.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : (
                  <p key={index} className="mt-3 text-neutral-700 leading-relaxed">
                    {block.text}
                    {block.links?.map((link) => (
                      <a key={link.url} href={link.url} className="ml-1 underline hover:no-underline break-words" target="_blank" rel="noopener noreferrer">{link.text}</a>
                    ))}
                  </p>
                )
              )}

              {section.table && (
                <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-200">
                  <table className="w-full text-sm">
                    <thead className="bg-neutral-50">
                      <tr>
                        {section.table.headers.map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left font-semibold text-neutral-900 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row.join("|")} className="border-t border-neutral-200">
                          {row.map((cell, idx) => (
                            <td key={`${idx}-${cell}`} className="px-4 py-3 text-neutral-700 whitespace-nowrap">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.bullets && (
                <ul className="mt-3 list-disc list-inside text-neutral-700 space-y-1">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}

              {section.links?.length ? (
                <ul className="mt-3 list-disc list-inside text-neutral-700 space-y-1">
                  {section.links.map((l) => (
                    <li key={l.href}>
                      {isExternalHref(l.href) ? (
                        <a
                          href={l.href}
                          className="underline hover:no-underline break-words"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="underline hover:no-underline">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.subsections?.length ? (
                <div className="mt-5 space-y-6">
                  {section.subsections.map((sub) => (
                    <div key={sub.heading}>
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
                        {sub.heading}
                      </h3>
                      {sub.paragraphs.map((p) => (
                        <p key={p} className="mt-3 text-neutral-700 leading-relaxed">
                          {p}
                        </p>
                      ))}
                      {sub.bullets && (
                        <ul className="mt-3 list-disc list-inside text-neutral-700 space-y-1">
                          {sub.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}

              {section.image ? (
                <figure className="mt-5 rounded-xl border border-neutral-200 bg-white p-4">
                  <div className="mx-auto max-w-xs">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      width={320}
                      height={320}
                      className="h-auto w-full"
                    />
                  </div>
                  {section.image.caption ? (
                    <figcaption className="mt-3 text-center text-xs text-neutral-500">
                      {section.image.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}

              {section.qrCard ? (
                <div className="mt-5 rounded-[12px] bg-[#f7f7f7] p-6 text-center">
                  <p className="text-base font-semibold text-neutral-900">{section.qrCard.title}</p>
                  {section.qrCard.cta ? (
                    <p className="mt-2 text-base text-neutral-700">{section.qrCard.cta}</p>
                  ) : null}
                  <div className="mt-4 flex justify-center">
                    <Image
                      src={section.qrCard.image.src}
                      alt={section.qrCard.image.alt}
                      width={320}
                      height={320}
                      className="h-auto w-[260px] sm:w-[320px]"
                    />
                  </div>
                  <div className="mt-4 space-y-1">
                    {section.qrCard.textLines.map((t) => (
                      <p key={t} className="text-base text-neutral-800">
                        {t}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}

              {post.faqItems?.length && section.heading.includes("常见问题") ? (
                <dl className="mt-5 space-y-5">
                  {post.faqItems.map(({ q, a }) => (
                    <div key={q}>
                      <dt><h3 className="text-base sm:text-lg font-semibold text-neutral-900">{q}</h3></dt>
                      <dd className="mt-2 text-neutral-700 leading-relaxed">{a}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
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

        {post.bottomCta ? (
          <BlogBottomCta primary={post.bottomCta.primary} secondary={post.bottomCta.secondary} />
        ) : (
          <section className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-neutral-900">学习急救技能</h2>
            <p className="mt-3 text-neutral-700 leading-relaxed">
              如果您希望系统学习 CPR 心肺复苏、AED 使用和基础急救技能，可以参加我们的急救培训课程。
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/cities"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                查看培训城市
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
              >
                查看课程体系
              </Link>
              <Link
                href="/enterprise-training"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
              >
                企业培训咨询
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
              >
                微信咨询
              </Link>
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
