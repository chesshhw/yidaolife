import type { MetadataRoute } from "next";
import { getAllCitySlugs } from "@/data/cities";

const SITE_URL = "https://yidaolife.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/programs`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/cities`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/instructor`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/program/enterprise-first-aid-training`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
  const cityPages: MetadataRoute.Sitemap = getAllCitySlugs().map((slug) => ({
    url: `${SITE_URL}/city/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...staticPages, ...cityPages];
}
