import { getAllPosts } from "@/lib/blog";
import BlogPage from "@/components/pages/BlogPage";
import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles and deep-dives about Flutter clean architecture, Bluetooth BLE, Django REST frameworks, SaaS scaling, Firebase vs Supabase, AWS, and AI applications.",
  alternates: {
    canonical: "/blog",
  },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" },
]);

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <>
      <JsonLd id="breadcrumb-jsonld" data={breadcrumb} />
      <BlogPage posts={posts} />
    </>
  );
}
