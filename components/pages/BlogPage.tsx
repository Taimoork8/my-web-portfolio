"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Search, Calendar, Tag } from "lucide-react";
import { BlogPost } from "@/lib/blog";

interface BlogPageProps {
  posts: BlogPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  // Extract all unique tags
  const allTags = ["all", ...Array.from(new Set(posts.flatMap((post) => post.tags)))];

  const filteredPosts = posts.filter((post) => {
    // Search query match
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    // Filter tag match
    if (selectedTag === "all") return true;
    return post.tags.includes(selectedTag);
  });

  // Featured post logic: only when no filter/search is active
  const isDefaultView = selectedTag === "all" && searchQuery === "";
  const featuredPost = isDefaultView && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#C6F432]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#FF5E5B]/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-5">Articles</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Technical Blog &amp; Insights
          </h1>
          <p className="text-base text-white/50 max-w-xl leading-relaxed">
            Deep dives into Flutter engineering, advanced Bluetooth (BLE) design, Django scale, systems architecture, and production readiness.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          {/* Tabs */}
          <div className="flex flex-wrap bg-white/4 border border-white/6 rounded-xl p-1 gap-1 w-full md:w-auto">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-sans cursor-pointer transition-all duration-300 capitalize ${
                  selectedTag === tag
                    ? "bg-[#C6F432] text-black shadow-lg shadow-[#C6F432]/10"
                    : "text-white/40 hover:text-white/70 border border-transparent"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111113]/80 backdrop-blur-md border border-white/8 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-white/30 focus:border-[#C6F432]/30 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Featured Post Card (Desktop View Only) */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 hidden md:block"
          >
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-12 gap-8 p-6 rounded-3xl bg-[#111113]/40 backdrop-blur-md border border-white/8 hover:border-[#C6F432]/30 transition-all duration-500 overflow-hidden relative"
            >
              {/* Highlight Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6F432]/2 rounded-full blur-[100px] pointer-events-none" />

              {/* Cover Image */}
              <div className="col-span-7 relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/6 bg-[#18181B]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredPost.cover}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  loading="eager"
                />
              </div>

              {/* Content */}
              <div className="col-span-5 flex flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#C6F432] mb-4 font-mono font-bold tracking-wider uppercase">
                    <span className="bg-[#C6F432]/10 px-2.5 py-1 rounded-md">Featured Post</span>
                    <span className="flex items-center gap-1 text-white/40">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.date}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-[#C6F432] transition-colors duration-300">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm text-white/50 mb-6 leading-relaxed">
                    {featuredPost.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-mono text-white/40 bg-white/4 border border-white/5"
                    >
                      <Tag className="w-3 h-3 opacity-50" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Featured Post (Fallback to grid item for mobile screens) */}
        {featuredPost && (
          <div className="block md:hidden mb-6">
            <Link href={`/blog/${featuredPost.slug}`} className="group flex flex-col w-full rounded-2xl bg-[#111113]/50 backdrop-blur-sm border border-white/8 hover:border-white/16 transition-all duration-300 overflow-hidden relative">
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/8 bg-[#18181B]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredPost.cover}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 flex flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-white/40 mb-3 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.date}
                  </span>
                </div>

                <h2 className="font-display text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#C6F432] transition-colors duration-300">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-white/45 mb-6 line-clamp-3 leading-relaxed flex-1">
                  {featuredPost.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/4">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono text-white/35 bg-white/4 border border-white/6"
                    >
                      <Tag className="w-2.5 h-2.5 opacity-50" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Post Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {gridPosts.length > 0 ? (
              gridPosts.map((post, i) => (
                <motion.div
                  layout
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex"
                >
                  <Link href={`/blog/${post.slug}`} className="group flex flex-col w-full rounded-2xl bg-[#111113]/50 backdrop-blur-sm border border-white/8 hover:border-[#C6F432]/20 hover:shadow-lg hover:shadow-[#C6F432]/2 transition-all duration-300 overflow-hidden relative">
                    {/* Cover Image Container */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/8 bg-[#18181B]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="flex-1 flex flex-col p-6">
                      <div className="flex items-center gap-3 text-xs text-white/40 mb-3 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                      </div>

                      <h2 className="font-display text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#C6F432] transition-colors duration-300">
                        {post.title}
                      </h2>

                      <p className="text-sm text-white/45 mb-6 line-clamp-3 leading-relaxed flex-1">
                        {post.description}
                      </p>

                      {/* Footer tags */}
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono text-white/35 bg-white/4 border border-white/6"
                          >
                            <Tag className="w-2.5 h-2.5 opacity-50" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              // Show this only if BOTH featuredPost and gridPosts are empty
              !featuredPost && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full text-center py-20 bg-[#111113]/30 border border-white/6 rounded-2xl"
                >
                  <p className="text-white/40 text-sm">No articles match your search or filters.</p>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
