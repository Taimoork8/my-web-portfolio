"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Smartphone,
  RefreshCw,
  Cpu,
  Brain,
  Bell,
  Rocket,
  Server,
  Layers,
  Activity,
  TrendingUp,
  Cloud,
} from "lucide-react";
import type { Project } from "@/lib/data";
import type { BlogPost } from "@/lib/blog";
import Testimonials from "@/components/home/Testimonials";

// Icons are resolved here (in the client component) by name, since a
// function reference can't be passed as a prop from a Server Component
// page.tsx to a Client Component across the RSC boundary.
const iconMap = {
  smartphone: Smartphone,
  "refresh-cw": RefreshCw,
  cpu: Cpu,
  brain: Brain,
  bell: Bell,
  rocket: Rocket,
  server: Server,
  layers: Layers,
  activity: Activity,
  "trending-up": TrendingUp,
  cloud: Cloud,
} as const;

export type CapabilityIcon = keyof typeof iconMap;

export interface Capability {
  icon: CapabilityIcon;
  title: string;
  description: string;
}

export interface RoleLandingContent {
  eyebrow: string;
  roleTitle: string;
  headlinePrefix: string;
  headlineRole: string;
  headlineSuffix: string;
  subheadline: string;
  color: string;
  stats: { value: string; label: string }[];
  capabilities: Capability[];
  proofProjects: Project[];
  techChips: string[];
  posts: Pick<BlogPost, "slug" | "title" | "description">[];
  qa: { question: string; answer: string }[];
}

export default function RoleLandingPage({ content }: { content: RoleLandingContent }) {
  const {
    eyebrow,
    roleTitle,
    headlinePrefix,
    headlineRole,
    headlineSuffix,
    subheadline,
    color,
    stats,
    capabilities,
    proofProjects,
    techChips,
    posts,
    qa,
  } = content;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-5">{eyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5 max-w-3xl">
            {headlinePrefix} <span style={{ color }}>{headlineRole}</span> {headlineSuffix}
          </h1>
          <p className="text-base text-white/50 max-w-2xl leading-relaxed mb-10">{subheadline}</p>

          <div className="flex flex-wrap items-center gap-10 mb-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold font-display text-white">{s.value}</p>
                <p className="text-xs text-white/40 max-w-[10rem]">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6F432] text-[#0A0A0B] text-sm font-semibold hover:bg-[#d4fc4a] transition-all active:scale-95"
            >
              Hire a {roleTitle}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/6 border border-white/10 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-95"
            >
              View All Case Studies
            </Link>
          </div>
        </motion.div>

        {/* What I build */}
        <div className="mb-20">
          <h2 className="font-display text-xl font-bold text-white mb-6">What I build as a {roleTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => {
              const Icon = iconMap[cap.icon];
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="p-6 rounded-2xl bg-[#111113] border border-white/8 hover:border-white/12 transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${color}14`, border: `1px solid ${color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-white mb-2">{cap.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{cap.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Proof: real projects */}
        <div className="mb-20">
          <h2 className="font-display text-xl font-bold text-white mb-6">Proof, not promises</h2>
          <div className="space-y-4">
            {proofProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link href={`/case-studies/${project.slug}`}>
                  <div className="group p-6 rounded-2xl bg-[#111113] border border-white/8 hover:border-white/14 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold mb-2"
                          style={{ background: `${project.color}14`, color: project.color }}
                        >
                          {project.category}
                        </span>
                        <p className="font-display text-base font-bold text-white group-hover:text-white transition-colors">
                          {project.title}
                        </p>
                        <p className="text-sm text-white/45 mt-1">{project.tagline}</p>
                      </div>
                      <div className="flex items-center gap-6 flex-shrink-0">
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <p className="text-base font-bold font-display" style={{ color: project.color }}>
                              {m.value}
                            </p>
                            <p className="text-[11px] text-white/35">{m.label}</p>
                          </div>
                        ))}
                        <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-20">
          <h2 className="font-display text-xl font-bold text-white mb-6">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {techChips.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-lg text-sm text-white/55 bg-white/4 border border-white/8">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Related writing */}
        {posts.length > 0 && (
          <div className="mb-20">
            <h2 className="font-display text-xl font-bold text-white mb-6">Related writing</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="group p-5 rounded-xl bg-[#111113] border border-white/8 hover:border-white/14 transition-colors h-full">
                    <p className="font-display text-sm font-bold text-white group-hover:text-white transition-colors mb-1.5">
                      {post.title}
                    </p>
                    <p className="text-xs text-white/40 leading-relaxed">{post.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Q&A */}
        <div className="mb-20">
          <h2 className="font-display text-xl font-bold text-white mb-6">Common questions</h2>
          <div className="space-y-6">
            {qa.map((item) => (
              <div key={item.question}>
                <h3 className="text-sm font-semibold text-white/85 mb-1.5">{item.question}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Testimonials />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-10 rounded-2xl bg-[#111113] border border-white/10 text-center"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Ready to work with a {roleTitle}?
          </h2>
          <p className="text-sm text-white/45 mb-6 flex items-center justify-center gap-2 flex-wrap">
            <Check className="w-4 h-4" style={{ color }} />
            Tell me about the project — I&apos;ll reply with scope and timeline within a day.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6F432] text-[#0A0A0B] text-sm font-semibold hover:bg-[#d4fc4a] transition-all"
          >
            Start a Conversation
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
