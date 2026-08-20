"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag, ArrowUpRight } from "lucide-react";
import { BlogPost } from "@/lib/blog";
import "highlight.js/styles/github-dark.css";

interface BlogPostDetailProps {
  post: BlogPost;
}

export default function BlogPostDetail({ post }: BlogPostDetailProps) {
  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-[#C6F432]/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-[#FF5E5B]/2 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/40 hover:text-[#C6F432] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Articles
          </Link>
        </motion.div>

        {/* Post Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[21/9] w-full rounded-2xl border border-white/8 bg-[#18181B] overflow-hidden mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
        >
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Post Metadata Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 pb-8 border-b border-white/8"
        >
          <div className="flex items-center gap-3 text-xs text-white/40 mb-4 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono text-white/50 bg-white/4 border border-white/6 capitalize"
              >
                <Tag className="w-3 h-3 opacity-55" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Article content with custom styles */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="blog-content mb-16"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Premium Bottom Author / CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-8 rounded-2xl bg-[#111113]/60 backdrop-blur-md border border-white/8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6F432]/3 rounded-full blur-2xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="max-w-lg">
              <h3 className="font-display text-lg font-bold text-white mb-2">Taimoor Khan</h3>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Full-Stack Product Engineer</p>
              <p className="text-sm text-white/60 leading-relaxed">
                Building scalable SaaS platforms, Flutter mobile apps, Django backends, and BLE/IoT hardware integrations for startups worldwide.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-2 py-3 px-5 rounded-xl bg-[#C6F432] text-[#0A0A0B] text-xs font-bold hover:bg-[#d4fc4a] hover:shadow-[0_0_20px_rgba(198,244,50,0.25)] transition-all shrink-0 cursor-pointer"
            >
              Let&apos;s build together
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Global CSS to style the Markdown HTML content manually */}
      <style jsx global>{`
        .blog-content {
          font-family: var(--font-sans), sans-serif;
          color: rgba(240, 237, 230, 0.75);
          font-size: 1.05rem;
          line-height: 1.8;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content h2 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          color: #ffffff;
          font-size: 1.75rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .blog-content h3 {
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          color: #ffffff;
          font-size: 1.35rem;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .blog-content h4 {
          font-family: var(--font-display), sans-serif;
          font-weight: 600;
          color: #ffffff;
          font-size: 1.15rem;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .blog-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content blockquote {
          border-left: 4px solid #C6F432;
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: rgba(240, 237, 230, 0.55);
        }
        .blog-content pre {
          background-color: #111113;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.25rem;
          margin: 1.75rem 0;
          overflow-x: auto;
        }
        .blog-content code {
          font-family: var(--font-mono), monospace;
          font-size: 0.85em;
          background-color: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.04);
          color: #C6F432;
          padding: 0.15rem 0.35rem;
          border-radius: 4px;
        }
        .blog-content pre code {
          color: inherit;
          background-color: transparent;
          border: none;
          padding: 0;
          border-radius: 0;
        }
        .blog-content a {
          color: #C6F432;
          text-decoration: underline;
          text-underline-offset: 4px;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .blog-content a:hover {
          color: #d4fc4a;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 2rem auto;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </div>
  );
}
