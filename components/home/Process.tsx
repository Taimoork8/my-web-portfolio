"use client";

import { motion } from "framer-motion";
import { process } from "@/lib/data";

export default function Process() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-28" />

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
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                {/* Step number + dot */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#111113] border border-white/10 flex items-center justify-center">
                      <span className="text-xs font-mono text-[#C6F432] font-semibold">{step.step}</span>
                    </div>
                    {i < process.length - 1 && (
                      <div className="lg:hidden absolute top-1/2 left-full w-8 h-px bg-white/10 -translate-y-1/2 ml-1" />
                    )}
                  </div>
                </div>

                <h3 className="font-display text-base font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
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
