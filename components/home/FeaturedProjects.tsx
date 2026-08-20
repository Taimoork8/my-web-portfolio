"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

export default function FeaturedProjects() {
  return (
    <section className="py-10 relative">
      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-3">
              Featured Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Products built from zero to launch
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="flex-shrink-0 flex items-center gap-1.5 text-sm text-white/50 hover:text-[#C6F432] transition-colors group"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/case-studies/${project.slug}`}>
                <div className="relative p-6 rounded-2xl bg-[#111113] border border-white/8 hover:border-white/14 transition-all duration-300 overflow-hidden">
                  {/* Accent glow */}
                  <div
                    className="absolute top-0 right-0 w-48 h-48 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 100% 0%, ${project.color}12, transparent 70%)` }}
                  />

                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold"
                      style={{ background: `${project.color}14`, color: project.color, border: `1px solid ${project.color}25` }}
                    >
                      {project.category}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/14 transition-all">
                      <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-1.5 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/40 mb-4">{project.tagline}</p>

                  <p className="text-sm text-white/55 leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex items-center gap-5 mb-5">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="text-base font-bold font-display" style={{ color: project.color }}>{m.value}</p>
                        <p className="text-[11px] text-white/35">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded-md text-[11px] text-white/40 bg-white/4 border border-white/6">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
