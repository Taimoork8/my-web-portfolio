"use client";

import { motion } from "framer-motion";
import { techStack } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Frontend: "#C6F432",
  Backend: "#6DE7FF",
  Systems: "#FF5E5B", // Using the brand coral color to match the global branding
};

export default function TechStack() {
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
                whileHover={{
                  y: -6,
                  borderColor: `${color}40`,
                  boxShadow: `0 12px 30px -10px ${color}18`,
                }}
                className="p-6 rounded-2xl bg-[#111113] border border-white/8 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    {category}
                  </span>
                </div>

                <div className="space-y-1">
                  {items.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 + i * 0.04 + 0.15 }}
                      whileHover={{
                        x: 4,
                        backgroundColor: "rgba(255,255,255,0.03)",
                      }}
                      className="flex items-center justify-between p-2 rounded-lg border border-transparent hover:border-white/5 transition-all duration-200 group cursor-default"
                    >
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                      
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-[9px] font-mono opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 px-1.5 py-0.5 rounded" style={{ background: `${color}14`, border: `1px solid ${color}20`, color }}>
                          exp
                        </span>
                        <span className="text-[11px] font-mono text-white/20 group-hover:text-white transition-all duration-300">
                          {tech.years}
                        </span>
                      </div>
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
