"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { fullServices } from "@/lib/data";

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-5">Services</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            What I can build for you
          </h1>
          <p className="text-base text-white/50 max-w-xl leading-relaxed">
            From MVPs to production SaaS platforms — I handle the full stack so you can focus on your business.
          </p>
        </motion.div>

        {/* Services */}
        <div className="space-y-6">
          {fullServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="p-8 rounded-2xl bg-[#111113] border border-white/8 hover:border-white/12 transition-colors group"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Main info */}
                <div className="lg:col-span-2">
                  <h2 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-sm text-[#C6F432]/80 mb-4">{service.tagline}</p>
                  <p className="text-sm text-white/55 leading-relaxed mb-6">{service.description}</p>

                  {/* Benefits */}
                  <div className="grid sm:grid-cols-2 gap-2 mb-6">
                    {service.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C6F432] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/60">{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.stack.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md text-xs text-white/40 bg-white/4 border border-white/6">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Deliverables */}
                <div className="p-5 rounded-xl bg-white/3 border border-white/6">
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
                    Deliverables
                  </p>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/25 mt-2 flex-shrink-0" />
                        <span className="text-sm text-white/50">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-10 rounded-2xl bg-[#111113] border border-white/10 text-center"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Not sure which service fits your project?
          </h2>
          <p className="text-sm text-white/45 mb-6">
            Let&apos;s talk. I&apos;ll help you figure out the right scope and approach.
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
