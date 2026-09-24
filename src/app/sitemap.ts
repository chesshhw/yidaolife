import type { MetadataRoute } from "next";
import { getAllCitySlugs } from "@/data/cities";
import { BLOG_POSTS } from "@/data/blog";

const SITE_URL = "https://www.yidaolife.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/programs`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/cities`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/enterprise-training`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/instructor`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${SITE_URL}/tianjin-wma-wilderness-first-aid-training`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
  const cityPages: MetadataRoute.Sitemap = getAllCitySlugs().map((slug) => ({
    url: `${SITE_URL}/city/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticPages, ...cityPages, ...blogPages];
}
