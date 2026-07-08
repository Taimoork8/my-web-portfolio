import { getAllPosts } from "@/lib/blog";
import BlogPage from "@/components/pages/BlogPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles and deep-dives about Flutter clean architecture, Bluetooth BLE, Django REST frameworks, SaaS scaling, Firebase vs Supabase, AWS, and AI applications.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return <BlogPage posts={posts} />;
}
