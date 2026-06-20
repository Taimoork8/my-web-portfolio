"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { projects } from "@/lib/data";

export default function CaseStudiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "saas" | "mobile" | "iot">("all");

  const filteredProjects = projects.filter((project) => {
    // Search query match
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.stack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filter tab match
    if (activeFilter === "all") return true;
    if (activeFilter === "saas") {
      return project.category.toLowerCase().includes("saas");
    }
    if (activeFilter === "mobile") {
      return project.category.toLowerCase().includes("mobile") || project.stack.some(t => t.toLowerCase() === "flutter");
    }
    if (activeFilter === "iot") {
      return project.category.toLowerCase().includes("iot") || project.stack.some(t => t.toLowerCase().includes("esp32") || t.toLowerCase().includes("ble"));
    }
    return true;
  });

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-5">Case Studies</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Products built from zero to launch
          </h1>
          <p className="text-base text-white/50 max-w-xl leading-relaxed">
            Real projects with real impact — covering SaaS products, mobile apps, and IoT systems.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          {/* Tabs */}
          <div className="flex bg-white/4 border border-white/6 rounded-xl p-1 w-full md:w-auto">
            {[
              { id: "all", label: "All Projects" },
              { id: "saas", label: "SaaS Platforms" },
              { id: "mobile", label: "Mobile Apps" },
              { id: "iot", label: "IoT Systems" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-semibold font-sans cursor-pointer transition-all duration-300 ${
                  activeFilter === tab.id
                    ? "bg-white/10 text-white border border-white/10"
                    : "text-white/40 hover:text-white/70 border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search stack or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111113] border border-white/8 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-white/30 focus:border-white/20 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
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
                          <p className="text-sm text-white/45 mb-4 leading-relaxed">{project.tagline}</p>
                          <p className="text-sm text-white/55 leading-relaxed mb-6 max-w-xl">{project.description}</p>

                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.stack.map((tech) => (
                              <span key={tech} className="px-2 py-0.5 rounded-md text-[11px] text-white/35 bg-white/4 border border-white/6 font-mono">
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
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-[#111113] border border-white/6 rounded-2xl"
              >
                <p className="text-white/40 text-sm">No projects match your search query.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
