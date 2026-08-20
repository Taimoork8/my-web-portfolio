"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="py-10 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-3">
            Client Feedback
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
            What clients say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[#111113] border border-white/8 hover:border-white/12 transition-colors flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-3.5 h-3.5 fill-[#C6F432] text-[#C6F432]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-white/60 leading-relaxed flex-1 mb-5">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-xs font-bold text-white/50">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80">{t.name}</p>
                  <p className="text-[11px] text-white/35">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
