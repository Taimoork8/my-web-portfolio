"use client";

import { motion } from "framer-motion";
import { Layers, Smartphone, Brain, Users, LayoutDashboard, Wrench } from "lucide-react";

const items = [
  {
    icon: Layers,
    title: "SaaS Platforms",
    description: "End-to-end SaaS with auth, billing, multi-tenancy, and scalable backends — from idea to production-ready.",
    accent: "#C6F432",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Cross-platform Flutter apps with polished UI, offline-first architecture, and deep cloud integrations.",
    accent: "#6DE7FF",
  },
  {
    icon: Brain,
    title: "AI & Automation",
    description: "LLM integrations, intelligent scoring systems, and automated pipelines that work in production.",
    accent: "#C6F432",
  },
  {
    icon: Users,
    title: "CRM Systems",
    description: "Custom CRM platforms with lead management, sales pipelines, and team dashboards tailored to your workflow.",
    accent: "#FF6B3D",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards",
    description: "Real-time analytics dashboards with interactive charts, KPIs, and role-based access for teams.",
    accent: "#6DE7FF",
  },
  {
    icon: Wrench,
    title: "Internal Tools",
    description: "Admin panels and custom operations tools that eliminate manual work and give your team leverage.",
    accent: "#a855f7",
  },
];

export default function WhatIBuild() {
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

        {/* Grid */}
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
                whileHover={{ y: -2 }}
                className="group relative p-6 rounded-2xl bg-[#111113] border border-white/8 hover:border-white/14 transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 20% 20%, ${item.accent}08 0%, transparent 70%)` }}
                />

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
                <p className="text-sm text-white/45 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
