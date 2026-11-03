import type { MetadataRoute } from "next";
import { getBlogCategories, getBlogPosts, type BlogPost } from "@/lib/blogs";
import { articles } from "@/lib/articles";
import { cases } from "@/lib/cases";
import { SITE_URL } from "@/lib/site";

// Rebuilt hourly so newly published CMS posts are picked up.
export const revalidate = 3600;

const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ posts }, categories] = await Promise.all([
    getBlogPosts({ perPage: 100 }),
    getBlogCategories(),
  ]);

  return [
    ...pages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...posts.map((post: BlogPost) => ({
      url: `${SITE_URL}/${post.slug}`,
      lastModified: post.modifiedDate > post.publishedDate ? post.modifiedDate : post.publishedDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...categories.map((c) => ({
      url: `${SITE_URL}/category/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...cases.filter((c) => !c.hidden).map((c) => ({
      url: `${SITE_URL}/work/${c.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/journal/${a.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
