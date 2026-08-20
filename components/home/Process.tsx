"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { process } from "@/lib/data";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animate the line across the container as it scrolls through the viewport
  const scaleX = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

  return (
    <section ref={containerRef} className="py-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-3">
            How I Work
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white max-w-sm leading-tight">
            From discovery to deployment
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line background (desktop) */}
          <div className="hidden lg:block absolute top-5 left-0 right-0 h-px bg-white/5" />

          {/* Active progress line (desktop) */}
          <motion.div
            style={{ scaleX }}
            className="hidden lg:block absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-[#C6F432] via-[#6DE7FF] to-[#C6F432] origin-left z-0"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                className="relative group cursor-default"
              >
                {/* Step number + dot */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#C6F432]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="w-10 h-10 rounded-full bg-[#111113]/90 border border-white/8 group-hover:border-[#C6F432] group-hover:bg-[#C6F432]/10 group-hover:shadow-[0_0_15px_rgba(198,244,50,0.3)] backdrop-blur-sm flex items-center justify-center transition-all duration-300 relative z-10">
                      <span className="text-xs font-mono text-[#C6F432] group-hover:text-white font-semibold transition-colors duration-300">{step.step}</span>
                    </div>
                    <div className="absolute inset-0 -m-1 rounded-full border border-[#C6F432]/0 group-hover:border-[#C6F432]/35 scale-90 group-hover:scale-100 transition-all duration-500 pointer-events-none" />
                  </div>
                </div>

                <h3 className="font-display text-base font-semibold text-white mb-2 group-hover:text-[#C6F432] transition-colors duration-300 font-sans">
                  {step.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
