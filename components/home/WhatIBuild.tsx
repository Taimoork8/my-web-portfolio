"use client";

import { MouseEvent } from "react";
import { motion } from "framer-motion";
import { Layers, Smartphone, Brain, Users, LayoutDashboard, Wrench } from "lucide-react";

const items = [
  {
    icon: Layers,
    title: "SaaS Platforms",
    description: "End-to-end SaaS with auth, billing, multi-tenancy, and scalable backends — from idea to production-ready.",
    accent: "#C6F432",
    gridClass: "lg:col-span-2",
    meta: (
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="text-[10px] font-mono bg-white/5 border border-white/8 text-white/50 px-2 py-0.5 rounded">Multi-Tenancy</span>
        <span className="text-[10px] font-mono bg-white/5 border border-white/8 text-white/50 px-2 py-0.5 rounded">Stripe Billing</span>
        <span className="text-[10px] font-mono bg-[#C6F432]/10 border border-[#C6F432]/20 text-[#C6F432] px-2 py-0.5 rounded">OAuth2 & MFA</span>
      </div>
    ),
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Cross-platform Flutter apps with polished UI, offline-first architecture, and deep cloud integrations.",
    accent: "#6DE7FF",
    gridClass: "lg:col-span-1",
    meta: null,
  },
  {
    icon: Brain,
    title: "AI & Automation",
    description: "LLM integrations, intelligent scoring systems, and automated pipelines that work in production.",
    accent: "#C6F432",
    gridClass: "lg:col-span-1",
    meta: null,
  },
  {
    icon: Users,
    title: "CRM Systems",
    description: "Custom CRM platforms with lead management, sales pipelines, and team dashboards tailored to your workflow.",
    accent: "#FF6B3D",
    gridClass: "lg:col-span-1",
    meta: null,
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards",
    description: "Real-time analytics dashboards with interactive charts, KPIs, and role-based access for teams.",
    accent: "#6DE7FF",
    gridClass: "lg:col-span-1",
    meta: null,
  },
  {
    icon: Wrench,
    title: "Internal Tools",
    description: "Admin panels and custom operations tools that eliminate manual work and give your team leverage.",
    accent: "#a855f7",
    gridClass: "lg:col-span-2",
    meta: (
      <div className="mt-5 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-white/40">Services: Online</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 w-16 bg-white/5 rounded overflow-hidden">
            <div className="h-full w-[65%] bg-[#a855f7] rounded" />
          </div>
          <span className="text-[10px] font-mono text-white/30">CPU: 32%</span>
        </div>
      </div>
    ),
  },
];

export default function WhatIBuild() {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-3">
            What I Build
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white max-w-md leading-tight">
            Software that drives real business outcomes
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.015, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                onMouseMove={handleMouseMove}
                className={`group cursor-glow-card cursor-glow-bg relative p-6 rounded-2xl bg-[#111113] border border-white/8 hover:border-white/14 transition-all duration-300 cursor-default overflow-hidden ${item.gridClass}`}
                style={{ "--glow-color": `${item.accent}06` } as any}
              >
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${item.accent}14`, border: `1px solid ${item.accent}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.accent }} />
                    </div>

                    <h3 className="font-display text-base font-semibold text-white mb-2 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/45 leading-relaxed max-w-lg">
                      {item.description}
                    </p>
                  </div>
                  {item.meta}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
