"use client";

import { MouseEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Layers, Smartphone, Brain, Users, LayoutDashboard, Wrench } from "lucide-react";

const items = [
  {
    icon: Layers,
    title: "SaaS Platforms",
    description: "End-to-end SaaS with auth, billing, multi-tenancy, and scalable backends — from idea to production-ready.",
    accent: "#C6F432",
    gridClass: "lg:col-span-2",
    meta: (
      <div className="mt-5">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] font-mono bg-white/5 border border-white/8 text-white/50 px-2 py-0.5 rounded">Multi-Tenancy</span>
          <span className="text-[10px] font-mono bg-white/5 border border-white/8 text-white/50 px-2 py-0.5 rounded">Stripe Billing</span>
          <span className="text-[10px] font-mono bg-[#C6F432]/10 border border-[#C6F432]/20 text-[#C6F432] px-2 py-0.5 rounded">OAuth2 & MFA</span>
        </div>
        <Link
          href="/django-developer"
          className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-[#C6F432] transition-colors"
        >
          Hire a Django developer
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    ),
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Cross-platform Flutter apps with polished UI, offline-first architecture, and deep cloud integrations.",
    accent: "#6DE7FF",
    gridClass: "lg:col-span-1",
    meta: (
      <Link
        href="/flutter-developer"
        className="mt-5 inline-flex items-center gap-1 text-xs text-white/40 hover:text-[#6DE7FF] transition-colors"
      >
        Hire a Flutter developer
        <ArrowUpRight className="w-3 h-3" />
      </Link>
    ),
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

import { useState, useRef } from "react";

function TiltCard({ item, i, handleMouseMove, children }: { item: typeof items[0], i: number, handleMouseMove: (e: any) => void, children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    const rX = -(mouseY / height) * 10; 
    const rY = (mouseX / width) * 10; 
    
    setRotateX(rX);
    setRotateY(rY);
    handleMouseMove(e);
  };

  const onMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
      }}
      className={`group cursor-glow-card cursor-glow-bg relative p-6 rounded-2xl bg-[#111113] border border-white/8 hover:border-white/14 transition-all duration-200 cursor-default overflow-hidden ${item.gridClass}`}
      style={{
        "--glow-color": `${item.accent}06`,
        transformStyle: "preserve-3d",
      } as any}
    >
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="relative z-10 flex flex-col h-full justify-between">
        {children}
      </div>
    </motion.div>
  );
}

export default function WhatIBuild() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="py-10 relative">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ perspective: "1000px" }}>
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <TiltCard key={item.title} item={item} i={i} handleMouseMove={handleMouseMove}>
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
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

