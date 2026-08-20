"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-dot-grid opacity-60" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#C6F432]/4 rounded-full blur-[120px] pointer-events-none animate-blob-a" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#6DE7FF]/3 rounded-full blur-[100px] pointer-events-none animate-blob-b" />

      <div className="relative z-10 text-center max-w-lg">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-7xl sm:text-8xl font-bold text-gradient mb-4"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-xl sm:text-2xl font-semibold text-white mb-3"
        >
          This page doesn&apos;t exist
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm text-white/50 leading-relaxed mb-10"
        >
          The page you&apos;re looking for was moved, renamed, or never existed.
          Let&apos;s get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6F432] text-[#0A0A0B] text-sm font-semibold hover:bg-[#d4fc4a] transition-all hover:shadow-[0_0_20px_rgba(198,244,50,0.3)] active:scale-95"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/6 border border-white/10 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-95"
          >
            View Case Studies
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
