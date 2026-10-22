import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, DEFAULT_BLOG_AUTHOR, getAllBlogSlugs, getBlogPostBySlug } from "@/data/blog";
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
    authors: [{ name: post.author ?? DEFAULT_BLOG_AUTHOR }],
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
      authors: [post.author ?? DEFAULT_BLOG_AUTHOR],
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

  const renderText = (text: string) => {
    if (!post.sources?.length) return text;
    return text.split(/\[(S\d+)\]/g).map((part, index) => {
      if (index % 2 === 0) return part;
      const source = post.sources?.find((item) => item.id === part);
      return source ? (
        <sup key={`${part}-${index}`} className="ml-1 text-[11px]">
          <a href={`#source-${source.id}`} aria-label={`来源 ${source.id.slice(1)}：${source.publisher}`} className="underline underline-offset-2">[{source.id.slice(1)}]</a>
        </sup>
      ) : `[${part}]`;
    });
  };

  const related = post.relatedSlugs?.length
    ? post.relatedSlugs
        .map((relatedSlug) => getBlogPostBySlug(relatedSlug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
    : BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const dateModified = post.updatedAt ?? post.publishedAt;
  const authorName = post.author ?? DEFAULT_BLOG_AUTHOR;
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
      "@type": post.authorType ?? "Person",
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
    ...(post.sources?.length ? { citation: post.sources.map((source) => source.url) } : {}),
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
    <div className="min-h-screen bg-white">
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
      <article className="mx-auto max-w-[820px] px-5 py-10 sm:px-8 sm:py-16">
        <header className="border-b border-[var(--border)] pb-8">
          <div className="mb-4">
            <Breadcrumbs
              items={[
                { label: "首页", href: "/" },
                { label: "急救知识", href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>
          <p className="eyebrow mb-4">都会急救 · 急救知识</p>
          <h1 className="text-[28px] font-semibold leading-[1.45] tracking-tight text-[var(--foreground)] sm:text-[38px]">
            {post.title}
          </h1>
          <p className="mt-5 text-sm text-[var(--muted)] leading-7">
            作者：{authorName}
            {" · "}
            {brandName}
            {" · "}
            {organizationName}
          </p>
          <p className="mt-1 text-sm leading-7 text-[var(--muted)]">
            发布日期：<time dateTime={post.publishedAt}>{post.publishedAt}</time>
            {dateModified !== post.publishedAt ? ` · 修改日期：${dateModified}` : ""}
          </p>
          <p className="mt-6 border-l-2 border-[var(--brand)] bg-[var(--surface)] px-5 py-4 text-base leading-8 text-[var(--muted)]">{post.description}</p>
        </header>

        <div className="article-content pt-8 space-y-10 sm:space-y-12">
          {post.lead?.length ? (
            <section className="-mt-2">
              {post.lead.map((p) => (
                <p key={p} className="mt-3 text-neutral-700 leading-relaxed">
                  {renderText(p)}
                </p>
              ))}
            </section>
          ) : null}

          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold leading-[1.5] text-[var(--foreground)] sm:text-2xl">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mt-3 text-neutral-700 leading-relaxed">
                  {renderText(p)}
                </p>
              ))}

              {section.blocks?.map((block, index) =>
                block.type === "list" ? (
                  <ul key={index} className="mt-3 list-disc pl-5 text-neutral-700 space-y-2">
                    {block.items.map((item) => <li key={item}>{renderText(item)}</li>)}
                  </ul>
                ) : (
                  <p key={index} className="mt-3 text-neutral-700 leading-relaxed">
                    {renderText(block.text)}
                    {block.links?.map((link) => (
                      <a key={link.url} href={link.url} className="ml-1 underline hover:no-underline break-words" target="_blank" rel="noopener noreferrer">{link.text}</a>
                    ))}
                  </p>
                )
              )}

              {section.table && (
                <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-200">
                  <table className={`w-full text-sm ${section.table.mobileCards ? "block sm:table" : ""}`}>
                    <thead className={`bg-neutral-50 ${section.table.mobileCards ? "hidden sm:table-header-group" : ""}`}>
                      <tr>
                        {section.table.headers.map((h) => (
                          <th
                            key={h}
                            scope="col"
                            className="px-4 py-3 text-left font-semibold text-neutral-900 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className={section.table.mobileCards ? "block sm:table-row-group" : undefined}>
                      {section.table.rows.map((row) => (
                        <tr key={row.join("|")} className={`border-t border-neutral-200 ${section.table?.mobileCards ? "block first:border-t-0 sm:table-row" : ""}`}>
                          {row.map((cell, idx) => (
                            <td key={`${idx}-${cell}`} className={`px-4 py-3 text-neutral-700 ${section.table?.mobileCards ? "block whitespace-normal break-words leading-7 sm:table-cell sm:align-top" : "whitespace-nowrap"}`}>
                              {section.table?.mobileCards ? <span className="mb-1 block text-xs font-medium text-neutral-500 sm:hidden">{section.table.headers[idx]}</span> : null}
                              {renderText(cell)}
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
                    <li key={item}>{renderText(item)}</li>
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
                  <div className={section.image.layout === "wide" ? "mx-auto max-w-2xl" : "mx-auto max-w-xs"}>
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      width={section.image.width ?? 320}
                      height={section.image.height ?? 320}
                      sizes={section.image.layout === "wide" ? "(max-width: 768px) 100vw, 672px" : "320px"}
                      className="h-auto w-full rounded-lg"
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

        {post.sources?.length ? (
          <section className="mt-12 border-t border-neutral-200 pt-8" aria-labelledby="article-sources">
            <h2 id="article-sources" className="text-xl font-semibold text-neutral-900">官方资料与核验说明</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              {post.sourcesVerifiedAt ? `资料核验日期：${post.sourcesVerifiedAt}。` : ""}未标注发布日期的页面，以核验时的页面内容为据。资格要求可能更新，申请时请再次查看具体项目规则。
            </p>
            <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm leading-7 text-neutral-700">
              {post.sources.map((source) => (
                <li key={source.id} id={`source-${source.id}`} className="scroll-mt-24 break-words">
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{source.publisher} · {source.title}</a>
                  <p className="text-xs leading-6 text-neutral-500">{source.date ?? "页面未明确标注更新时间"}{source.note ? `；${source.note}` : ""}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

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
                className="button-primary"
              >
                查看培训城市
              </Link>
              <Link
                href="/programs"
                className="button-secondary"
              >
                查看课程体系
              </Link>
              <Link
                href="/enterprise-training"
                className="button-secondary"
              >
                企业培训咨询
              </Link>
              <Link
                href="/contact"
                className="button-secondary"
              >
                微信咨询
              </Link>
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
