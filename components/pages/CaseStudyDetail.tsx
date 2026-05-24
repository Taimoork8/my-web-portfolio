"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { projects } from "@/lib/data";

interface Project {
  id: string;
  slug: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  color: string;
}

export default function CaseStudyDetail({ project }: { project: Project }) {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14"
        >
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold mb-5"
            style={{ background: `${project.color}14`, color: project.color, border: `1px solid ${project.color}25` }}
          >
            {project.category}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">
            {project.title}
          </h1>
          <p className="text-xl text-white/45 mb-6">{project.tagline}</p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-8">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-3xl font-bold font-display" style={{ color: project.color }}>{m.value}</p>
                <p className="text-sm text-white/40">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-14" />

        {/* Content */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="font-display text-xl font-bold text-white mb-4">Overview</h2>
            <p className="text-base text-white/55 leading-relaxed">{project.description}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="p-6 rounded-2xl bg-[#111113] border border-white/8"
            >
              <h2 className="font-display text-base font-bold text-white mb-3">The Problem</h2>
              <p className="text-sm text-white/55 leading-relaxed">{project.problem}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="p-6 rounded-2xl bg-[#111113] border border-white/8"
            >
              <h2 className="font-display text-base font-bold text-white mb-3">The Solution</h2>
              <p className="text-sm text-white/55 leading-relaxed">{project.solution}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="p-6 rounded-2xl bg-[#111113] border border-white/8"
          >
            <h2 className="font-display text-lg font-bold text-white mb-5">Key Features</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.features.map((f) => (
                <div key={f} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: project.color }} />
                  <span className="text-sm text-white/60">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="font-display text-lg font-bold text-white mb-5">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg text-sm text-white/55 bg-white/4 border border-white/8">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent my-16" />

        {/* More projects */}
        <div>
          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-6">More Projects</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.filter((p) => p.id !== project.id).slice(0, 2).map((p) => (
              <Link key={p.id} href={`/case-studies/${p.slug}`}>
                <div className="p-5 rounded-xl bg-[#111113] border border-white/8 hover:border-white/14 transition-colors group">
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold mb-3"
                    style={{ background: `${p.color}14`, color: p.color }}
                  >
                    {p.category}
                  </span>
                  <p className="font-display text-sm font-bold text-white group-hover:text-white transition-colors">{p.title}</p>
                  <p className="text-xs text-white/35 mt-1">{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
