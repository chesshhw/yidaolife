import type { MetadataRoute } from "next";
import { getAllCitySlugs } from "@/data/cities";
import { BLOG_POSTS } from "@/data/blog";
import { ENGLISH_TRAINING } from "@/data/english-training";

const SITE_URL = "https://www.yidaolife.com";
const LANDING_PAGES_UPDATED_AT = new Date("2026-10-04");

export default function sitemap(): MetadataRoute.Sitemap {
  // No build-time dates: omit lastmod when a page has no verified content timestamp.
  const operationsUpdatedAt = new Date("2026-10-22");
  const cityPagesUpdatedAt = new Date("2026-10-28");
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/programs`, lastModified: operationsUpdatedAt, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(BLOG_POSTS.map(p => p.updatedAt ?? p.publishedAt).sort().at(-1)!), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/cities`, lastModified: cityPagesUpdatedAt, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/enterprise-training`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/instructor`, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${SITE_URL}/tianjin-wma-wilderness-first-aid-training`,
      lastModified: operationsUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: cityPagesUpdatedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/en`, lastModified: LANDING_PAGES_UPDATED_AT, changeFrequency: "monthly", priority: 0.8 },
  ];
  const cityPages: MetadataRoute.Sitemap = getAllCitySlugs().map((slug) => ({
    url: `${SITE_URL}/city/${slug}`,
    lastModified: cityPagesUpdatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const englishPages: MetadataRoute.Sitemap = Object.keys(ENGLISH_TRAINING).map(slug => ({ url: `${SITE_URL}/en/${slug}`, lastModified: slug === "corporate-first-aid-training-china" ? LANDING_PAGES_UPDATED_AT : new Date("2026-10-01"), changeFrequency: "monthly", priority: 0.8 }));
  return [...staticPages, ...cityPages, ...blogPages, ...englishPages];
}
