"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-5">Case Studies</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Products built from zero to launch
          </h1>
          <p className="text-base text-white/50 max-w-xl leading-relaxed">
            Real projects with real impact — covering AI platforms, SaaS products, mobile apps, and IoT systems.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Link href={`/case-studies/${project.slug}`}>
                <div className="group p-8 rounded-2xl bg-[#111113] border border-white/8 hover:border-white/14 transition-all duration-300 overflow-hidden relative">
                  {/* Accent glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 0% 50%, ${project.color}08, transparent 70%)` }}
                  />

                  <div className="relative flex flex-col sm:flex-row sm:items-start gap-6">
                    {/* Left */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold"
                          style={{ background: `${project.color}14`, color: project.color, border: `1px solid ${project.color}25` }}
                        >
                          {project.category}
                        </span>
                      </div>

                      <h2 className="font-display text-2xl font-bold text-white mb-1.5">{project.title}</h2>
                      <p className="text-sm text-white/40 mb-4">{project.tagline}</p>
                      <p className="text-sm text-white/55 leading-relaxed mb-6 max-w-xl">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.stack.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded-md text-[11px] text-white/35 bg-white/4 border border-white/6">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6">
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <p className="text-lg font-bold font-display" style={{ color: project.color }}>{m.value}</p>
                            <p className="text-xs text-white/35">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="flex-shrink-0 flex items-center">
                      <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-white/70 transition-colors">
                        View case study
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
