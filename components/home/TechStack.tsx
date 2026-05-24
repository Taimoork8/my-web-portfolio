"use client";

import { motion } from "framer-motion";
import { techStack } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Frontend: "#C6F432",
  Backend: "#6DE7FF",
  Systems: "#FF6B3D",
};

export default function TechStack() {
  return (
    <section className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-28" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-3">
            Tech Stack
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
            Tools I use to ship
          </h2>
        </motion.div>

        {/* Stack grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(techStack).map(([category, items], catIndex) => {
            const color = categoryColors[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: catIndex * 0.1 }}
                className="p-6 rounded-2xl bg-[#111113] border border-white/8"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    {category}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {items.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 + i * 0.05 + 0.2 }}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                      <span className="text-[11px] font-mono text-white/25">{tech.years}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
