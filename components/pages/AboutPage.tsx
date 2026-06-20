"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MapPin, Globe, Zap } from "lucide-react";

const experience = [
  {
    role: "Software Engineer",
    company: "Noki System",
    period: "03/2026 — Present",
    description: "Building BLE-based IoT authentication systems and firmware communication layers using Flutter and ESP32.",
    tags: ["Flutter", "BLE", "ESP32", "IoT"],
  },
  {
    role: "Full Stack Engineer",
    company: "Wi3bit",
    period: "03/2025 — 03/2026",
    description: "Led development of a school management SaaS deployed across multiple institutions. Built attendance systems, student portals, and admin dashboards.",
    tags: ["Flutter", "Django", "PostgreSQL", "REST APIs"],
  },
  {
    role: "Lead Mobile Engineer",
    company: "Wi3bit",
    period: "09/2023 — 03/2025",
    description: "Led the mobile team building cross-platform Flutter apps for healthcare and education clients.",
    tags: ["Flutter", "Firebase", "UI/UX"],
  },
  {
    role: "Contract Flutter Developer",
    company: "SDH",
    period: "05/2023 — 09/2023",
    description: "Developed and shipped modular Flutter features, integrating payment gateways and live notifications.",
    tags: ["Flutter", "Dart", "REST APIs"],
  },
  {
    role: "Flutter Developer Intern",
    company: "Softech Square Solution",
    period: "10/2022 — 03/2023",
    description: "Assisted in writing clean Dart code, debugging state management issues, and building responsive screens.",
    tags: ["Flutter", "Dart", "Firebase"],
  },
  {
    role: "Freelance Engineer",
    company: "Independent",
    period: "05/2022 — Present",
    description: "Delivered 15+ projects for international clients including CRM platforms, mobile apps, and automation tools.",
    tags: ["Flutter", "Django", "Python"],
  },
];

const certifications = [
  { title: "Communicating with Emotional Intelligence", issuer: "LinkedIn" },
  { title: "Speaking Confidently and Effectively", issuer: "LinkedIn" },
  { title: "Usable Security", issuer: "University of Maryland" },
  { title: "Version Control", issuer: "Meta" },
  { title: "Intro to IoT", issuer: "Cisco" },
  { title: "Python (Basic)", issuer: "HackerRank" },
];

const values = [
  {
    title: "Product thinking first",
    description: "I don't just build what's asked — I ask why. Every feature should move a business metric.",
  },
  {
    title: "Production-ready from day one",
    description: "No shortcuts. Clean architecture, proper error handling, and code someone else can maintain.",
  },
  {
    title: "Communication that doesn't slow you down",
    description: "Clear updates, async-first, and honest about timelines. No surprises.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-5">About</p>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            I build software that{" "}
            <span className="text-gradient">solves real problems</span>.
          </h1>

          <div className="flex flex-wrap gap-4 mb-8">
            <span className="flex items-center gap-1.5 text-sm text-white/45">
              <MapPin className="w-3.5 h-3.5" />
              Islamabad, Pakistan
            </span>
            <span className="flex items-center gap-1.5 text-sm text-white/45">
              <Globe className="w-3.5 h-3.5" />
              Available remotely worldwide
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[#C6F432]">
              <Zap className="w-3.5 h-3.5" />
              Open to new projects
            </span>
          </div>

          <div className="space-y-4 text-white/60 text-base leading-relaxed max-w-2xl">
            <p>
              I&apos;m a full-stack product engineer with 4.5+ years of experience building
              SaaS platforms, AI systems, mobile apps, and automation tools. My work spans
              everything from early-stage MVP development to production systems handling
              thousands of users.
            </p>
            <p>
              My background is unusually broad: I&apos;ve built Flutter apps for IoT hardware,
              Django backends powering multi-tenant SaaS, AI pipelines for lead generation,
              and school management systems used by real institutions. That breadth means I
              can see the full picture — from database design to mobile UI — and make
              decisions that hold up.
            </p>
            <p>
              I care about shipping software that works in production, not just demos. I
              ask hard questions before writing code, document decisions, and build systems
              that teams can actually maintain.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-8">How I work</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-[#111113] border border-white/8"
              >
                <h3 className="font-display text-sm font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-8">Experience</h2>
          <div className="space-y-1">
            {experience.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 rounded-2xl hover:bg-[#111113] border border-transparent hover:border-white/8 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">{exp.role}</h3>
                    <p className="text-sm text-white/45">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-white/30 flex-shrink-0 pt-0.5">{exp.period}</span>
                </div>
                <p className="text-sm text-white/55 leading-relaxed mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-[11px] text-white/35 bg-white/4 border border-white/6">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-8">Education</h2>
          <div className="p-6 rounded-2xl bg-[#111113] border border-white/8 hover:border-white/12 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <h3 className="font-display text-base font-semibold text-white">Bachelor of Science in Software Engineering</h3>
                <p className="text-sm text-[#C6F432] font-medium">CECOS University</p>
                <p className="text-xs text-white/40 mt-1">Peshawar, Pakistan</p>
              </div>
              <span className="text-xs font-mono text-white/30 pt-0.5">2018 — 2022</span>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-8">Certifications</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl bg-[#111113] border border-white/8 hover:border-white/12 transition-all duration-300 flex items-start justify-between gap-4"
              >
                <div>
                  <h3 className="font-display text-sm font-semibold text-white mb-1 leading-snug">{cert.title}</h3>
                  <p className="text-xs text-white/40">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl bg-[#111113] border border-white/10 text-center"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Let&apos;s build something together
          </h2>
          <p className="text-sm text-white/45 mb-6">
            Available for new projects. Usually responds within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6F432] text-[#0A0A0B] text-sm font-semibold hover:bg-[#d4fc4a] transition-all"
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
