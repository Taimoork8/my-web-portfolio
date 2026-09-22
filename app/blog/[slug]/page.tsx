import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import BlogPostDetail from "@/components/pages/BlogPostDetail";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, breadcrumbJsonLd, PERSON_REF } from "@/lib/seo";
import { projects } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Article Not Found" };
  }
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${slug}`,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: `${SITE_URL}${post.cover}`,
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    author: PERSON_REF,
    publisher: PERSON_REF,
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  // Same tag-matching pattern RoleLandingPage.tsx already uses in reverse
  // (pillar -> posts). Here it's spoke -> pillar/case-study/sibling, which
  // didn't exist before: a reader deep in a Flutter or Django post was never
  // shown the matching hiring page or proof-of-work case study.
  const pillar = post.tags.includes("flutter")
    ? { href: "/flutter-developer", label: "Hire a Flutter Developer" }
    : post.tags.includes("django")
      ? { href: "/django-developer", label: "Hire a Django Developer" }
      : null;

  const relatedProjects = projects
    .filter((p) => {
      if (post.tags.includes("flutter") && p.stack.includes("Flutter")) return true;
      if (post.tags.includes("django") && p.stack.some((s) => s.startsWith("Django"))) return true;
      return false;
    })
    .slice(0, 2);

  const relatedPosts = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3)
    .map(({ slug: s, title, description }) => ({ slug: s, title, description }));

  return (
    <>
      <JsonLd id="blogposting-jsonld" data={blogPostingJsonLd} />
      <JsonLd id="breadcrumb-jsonld" data={breadcrumb} />
      <BlogPostDetail post={post} pillar={pillar} relatedProjects={relatedProjects} relatedPosts={relatedPosts} />
    </>
  );
}
