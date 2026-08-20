"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Zap, Globe, Cpu, BarChart3, Smartphone } from "lucide-react";

// Heavy, desktop-only decorative widget (two live-simulated dashboards with
// timers + framer-motion AnimatePresence). It's CSS-hidden below the lg
// breakpoint but React doesn't skip effects for display:none elements, so
// without this it still mounts, runs its timers, and ships its JS to every
// mobile visitor — most of the site's real-world traffic — for zero visible
// benefit. Dynamically imported and gated behind an actual viewport check
// (see `isDesktop` below) so it's never fetched or mounted on mobile.
const DashboardVisual = dynamic(() => import("./DashboardVisual"), { ssr: false });

const trustBadges = [
  { icon: Zap, label: "SaaS Platforms" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Cpu, label: "Embedded Systems" },
  { icon: Cpu, label: "Automation" },
  { icon: BarChart3, label: "Dashboards" },
  { icon: Globe, label: "Remote Worldwide" },
];

const metrics = [
  { value: "5+", label: "Years" },
  { value: "30+", label: "Projects" },
  { value: "100%", label: "Remote" },
];

import { useRef } from "react";

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  // Starts false on both server and client so hydration always matches;
  // flips true after mount only on desktop viewports, which is also when
  // DashboardVisual actually becomes visible (it's `hidden` below lg).
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background with floating gradient blobs */}
      <div className="absolute inset-0 bg-dot-grid opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#C6F432]/4 rounded-full blur-[120px] pointer-events-none animate-blob-a" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#6DE7FF]/3 rounded-full blur-[100px] pointer-events-none animate-blob-b" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
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

            {/* Headline — no fade-in: this is the LCP element, so it must
                paint immediately instead of waiting on JS to animate opacity.
                Names the two core roles directly (Flutter/Django developer)
                instead of generic nouns, since this is the page's strongest
                on-page ranking signal for those exact search terms. */}
            <h1 className="font-display text-[2.75rem] sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight text-white mb-5">
              I&apos;m a{" "}
              <span className="text-gradient">Flutter developer</span> &{" "}
              <span className="text-gradient">Django developer</span>{" "}
              building scalable SaaS platforms.
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 max-w-lg"
            >
              Full-stack engineer helping startups and businesses build
              production-ready software — Flutter, Django, Python, automation tools,
              and cloud infrastructure.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6F432] text-[#0A0A0B] text-sm font-semibold hover:bg-[#d4fc4a] transition-all hover:shadow-[0_0_20px_rgba(198,244,50,0.3)] active:scale-95"
                >
                  Start a Project
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/6 border border-white/10 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                >
                  View Case Studies
                </Link>
              </Magnetic>
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

          {/* Right: Dashboard Visual — the wrapper is `hidden lg:flex` via
              CSS, so it takes zero layout space below lg regardless of
              whether the widget is mounted, meaning gating the mount on
              `isDesktop` introduces no layout shift on mobile. On desktop it
              mounts one tick after hydration once the viewport check runs. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex items-center justify-center"
          >
            {isDesktop && <DashboardVisual />}
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
