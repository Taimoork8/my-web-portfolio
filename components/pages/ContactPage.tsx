"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Clock, CheckCircle, FileText } from "lucide-react";

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
  {
    icon: FileText,
    label: "Download CV",
    value: "View & download resume",
    href: "https://drive.google.com/file/d/1VePGviqwT_plZD8toHNKNcDkkcegr8mg/view?usp=sharing",
    description: "Opens in Google Drive",
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
    "w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C6F432] focus:ring-1 focus:ring-[#C6F432]/30 focus:bg-[#16161a]/60 transition-all duration-300";

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      {/* Glow ambient background elements */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#C6F432]/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-[#FF5E5B]/2 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-5">Contact</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Let&apos;s build something together
          </h1>
          <div className="flex items-center gap-2 text-sm text-white/45">
            <Clock className="w-3.5 h-3.5 text-[#C6F432] animate-pulse" />
            Usually responds within 24 hours · Remote worldwide
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 glass-premium p-6 sm:p-8 rounded-2xl border border-white/8 relative"
          >
            {status === "done" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center py-20 text-center"
              >
                <CheckCircle className="w-12 h-12 text-[#C6F432] mb-4 animate-bounce" />
                <h2 className="font-display text-2xl font-bold text-white mb-2">Message sent!</h2>
                <p className="text-sm text-white/45">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : status === "error" ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center py-20 text-center"
              >
                <p className="text-sm text-red-400 mb-3">Something went wrong. Please try again or email me directly.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-[#C6F432] underline underline-offset-2 hover:text-[#d4fc4a] transition-colors"
                >
                  Try again
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5 ml-0.5 uppercase tracking-wider">Your Name</label>
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
                    <label className="block text-xs font-semibold text-white/40 mb-1.5 ml-0.5 uppercase tracking-wider">Email</label>
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
                  <label className="block text-xs font-semibold text-white/40 mb-1.5 ml-0.5 uppercase tracking-wider">Project Type</label>
                  <div className="relative">
                    <select
                      name="project"
                      value={form.project}
                      onChange={handleChange}
                      required
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled className="bg-[#111113]">Select a project type</option>
                      <option value="saas" className="bg-[#111113]">SaaS Platform</option>
                      <option value="mobile" className="bg-[#111113]">Mobile App</option>
                      <option value="ai" className="bg-[#111113]">AI / Automation</option>
                      <option value="mvp" className="bg-[#111113]">MVP Development</option>
                      <option value="crm" className="bg-[#111113]">CRM / Dashboard</option>
                      <option value="other" className="bg-[#111113]">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/40 mb-1.5 ml-0.5 uppercase tracking-wider">Message</label>
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

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#C6F432] text-[#0A0A0B] text-sm font-bold hover:bg-[#d4fc4a] disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_30px_rgba(198,244,50,0.35)] cursor-pointer"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right: Contact options */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactOptions.map(({ icon: Icon, label, value, href, description }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/6 hover:border-white/12 hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C6F432]/10 group-hover:border-[#C6F432]/35 transition-all duration-300">
                  <Icon className="w-4 h-4 text-white/40 group-hover:text-[#C6F432] transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{label}</p>
                  <p className="text-xs text-white/40 truncate">{value}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{description}</p>
                </div>
              </a>
            ))}

            {/* Availability card */}
            <div className="p-5 rounded-xl bg-[#C6F432]/8 border border-[#C6F432]/15 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C6F432]/3 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C6F432] animate-pulse" />
                <span className="text-sm font-bold text-[#C6F432] uppercase tracking-wider">Available for work</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Currently taking on new SaaS, mobile app, and AI projects. Remote worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
