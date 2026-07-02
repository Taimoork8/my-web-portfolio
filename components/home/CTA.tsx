"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-[#111113] border border-white/10 p-12 sm:p-16 text-center"
        >
          {/* Background effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C6F432]/6 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 bg-dot-grid opacity-30" />

          {/* Content */}
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xs font-semibold text-[#C6F432]/70 uppercase tracking-[0.2em] mb-5"
            >
              Ready to build?
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight mb-5"
            >
              Need a developer who can build your product from idea to deployment?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base text-white/45 max-w-md mx-auto mb-10"
            >
              I work with startups and businesses to ship production-ready SaaS platforms,
              mobile apps, and AI systems. Remote worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#C6F432] text-[#0A0A0B] text-sm font-semibold hover:bg-[#d4fc4a] transition-all hover:shadow-[0_0_30px_rgba(198,244,50,0.3)] active:scale-95"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-xs text-white/25"
            >
              Usually responds within 24 hours · Remote worldwide · 5+ years experience
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
