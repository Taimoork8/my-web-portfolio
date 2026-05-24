"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Zap, Globe, Cpu, BarChart3, Smartphone, Bot } from "lucide-react";

const trustBadges = [
  { icon: Zap, label: "SaaS Platforms" },
  { icon: Bot, label: "AI Systems" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Cpu, label: "Automation" },
  { icon: BarChart3, label: "Dashboards" },
  { icon: Globe, label: "Remote Worldwide" },
];

const leads = [
  { company: "Acme SaaS", intent: "Building CRM", score: 94, live: true },
  { company: "TechFlow", intent: "Need MVP dev", score: 87, live: false },
  { company: "StartupX", intent: "Flutter app", score: 82, live: false },
  { company: "DataSync", intent: "AI pipeline", score: 76, live: false },
  { company: "Rocket.io", intent: "Dashboard", score: 71, live: false },
];

const metrics = [
  { value: "4.5+", label: "Years" },
  { value: "30+", label: "Projects" },
  { value: "100%", label: "Remote" },
];

function DashboardVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow behind card */}
      <div className="absolute inset-0 bg-[#C6F432]/6 rounded-2xl blur-3xl scale-95" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative bg-[#111113] border border-white/10 rounded-2xl p-5 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
            <span className="text-xs text-white/50 font-mono">LeadSignal — Live</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#C6F432]/10 border border-[#C6F432]/20 rounded-md px-2.5 py-1">
            <span className="text-[10px] text-[#C6F432] font-semibold font-mono">47 leads / 2h</span>
          </div>
        </div>

        {/* Lead score bars */}
        <div className="space-y-3">
          {leads.map((lead, i) => (
            <motion.div
              key={lead.company}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: lead.live ? "#C6F432" : "rgba(255,255,255,0.15)" }} />
              <div className="w-20 flex-shrink-0">
                <span className="text-xs text-white/60 truncate block">{lead.company}</span>
                <span className="text-[10px] text-white/30 truncate block">{lead.intent}</span>
              </div>
              <div className="flex-1 bg-white/5 rounded-full h-1 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: lead.score > 85 ? "#C6F432" : lead.score > 75 ? "#6DE7FF" : "rgba(255,255,255,0.25)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${lead.score}%` }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-mono text-white/50 w-6 text-right">{lead.score}</span>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-white/6 flex items-center justify-between">
          <span className="text-[10px] text-white/30 font-mono">AI intent scoring</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-[#C6F432]"
                animate={{ height: [8, 16, 10, 20, 8] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating metric cards */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute -right-8 -top-6 bg-[#16161A] border border-white/10 rounded-xl px-3.5 py-2.5 shadow-xl"
      >
        <p className="text-lg font-bold font-display text-white">91%</p>
        <p className="text-[10px] text-white/40">Score accuracy</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute -left-8 -bottom-4 bg-[#16161A] border border-white/10 rounded-xl px-3.5 py-2.5 shadow-xl"
      >
        <p className="text-lg font-bold font-display text-[#6DE7FF]">20h</p>
        <p className="text-[10px] text-white/40">Saved per week</p>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#C6F432]/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6DE7FF]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C6F432]/8 border border-[#C6F432]/20 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432] animate-pulse" />
              <span className="text-xs text-[#C6F432] font-medium">Available for new projects</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-[2.75rem] sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight text-white mb-5"
            >
              I build scalable{" "}
              <span className="text-gradient">SaaS platforms</span>,{" "}
              AI systems, and mobile apps.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 max-w-lg"
            >
              Full-stack engineer helping startups and businesses build
              production-ready software — Flutter, Django, Python, AI workflows,
              and cloud infrastructure.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6F432] text-[#0A0A0B] text-sm font-semibold hover:bg-[#d4fc4a] transition-all hover:shadow-[0_0_20px_rgba(198,244,50,0.3)] active:scale-95"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/6 border border-white/10 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-95"
              >
                View Case Studies
              </Link>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-8 mb-8"
            >
              {metrics.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold font-display text-white">{value}</p>
                  <p className="text-xs text-white/40">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/4 border border-white/8 text-xs text-white/50"
                >
                  <Icon className="w-3 h-3 text-white/30" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex items-center justify-center"
          >
            <DashboardVisual />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] text-white/25 tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
