"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Clock, CheckCircle } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const contactOptions = [
  {
    icon: Mail,
    label: "Email",
    value: "kingtaimoor405@gmail.com",
    href: "mailto:kingtaimoor405@gmail.com",
    description: "Best for detailed project briefs",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/Taimoork8",
    href: "https://github.com/Taimoork8",
    description: "See my open source work",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/taimoorkhan405",
    href: "https://linkedin.com/in/taimoorkhan405",
    description: "Professional background",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `New contact from ${form.name} — ${form.project}`,
          ...form,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-[#111113] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#C6F432]/40 focus:ring-1 focus:ring-[#C6F432]/20 transition-all";

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
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-5">Contact</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Let&apos;s build something together
          </h1>
          <div className="flex items-center gap-2 text-sm text-white/45">
            <Clock className="w-3.5 h-3.5" />
            Usually responds within 24 hours · Remote worldwide
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {status === "done" ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                <CheckCircle className="w-12 h-12 text-[#C6F432] mb-4" />
                <h2 className="font-display text-2xl font-bold text-white mb-2">Message sent!</h2>
                <p className="text-sm text-white/45">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : status === "error" ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm text-red-400 mb-3">Something went wrong. Please try again or email me directly.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-[#C6F432] underline underline-offset-2"
                >
                  Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 ml-0.5">Your Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 ml-0.5">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@startup.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 ml-0.5">Project Type</label>
                  <select
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="" disabled>Select a project type</option>
                    <option value="saas">SaaS Platform</option>
                    <option value="mobile">Mobile App</option>
                    <option value="ai">AI / Automation</option>
                    <option value="mvp">MVP Development</option>
                    <option value="crm">CRM / Dashboard</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 ml-0.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#C6F432] text-[#0A0A0B] text-sm font-semibold hover:bg-[#d4fc4a] disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_20px_rgba(198,244,50,0.3)] active:scale-[0.99]"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Contact options */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-3"
          >
            {contactOptions.map(({ icon: Icon, label, value, href, description }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-4 p-4 rounded-xl bg-[#111113] border border-white/8 hover:border-white/14 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C6F432]/10 group-hover:border-[#C6F432]/20 transition-all">
                  <Icon className="w-4 h-4 text-white/40 group-hover:text-[#C6F432] transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{label}</p>
                  <p className="text-xs text-white/35 truncate">{value}</p>
                  <p className="text-[11px] text-white/25 mt-0.5">{description}</p>
                </div>
              </a>
            ))}

            {/* Availability card */}
            <div className="p-4 rounded-xl bg-[#C6F432]/6 border border-[#C6F432]/15">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                <span className="text-sm font-semibold text-[#C6F432]">Available for work</span>
              </div>
              <p className="text-xs text-white/45">
                Currently taking on new SaaS, mobile, and AI projects. Remote worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
