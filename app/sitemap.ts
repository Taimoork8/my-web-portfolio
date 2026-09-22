import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Real per-page freshness signal for the two routes that genuinely change
  // when content ships (latest post date), rather than a shared build-clock
  // timestamp reused across every unrelated static page.
  const latestPostDate = getAllPosts()[0]?.date || undefined;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: latestPostDate, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/flutter-developer`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/django-developer`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/case-studies`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  // No per-case-study update date exists in lib/data.ts yet, so lastModified
  // is intentionally omitted here rather than faked — per Google's own
  // sitemap guidance, no lastmod is safer than one that doesn't reflect a
  // real content change.
  const caseStudyRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/case-studies/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date || undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
