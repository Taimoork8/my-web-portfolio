import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import WhatIBuild from "@/components/home/WhatIBuild";
import FeaturedProjects from "@/components/home/FeaturedProjects";

// Below-the-fold sections: code-split out of the initial bundle so the
// critical path (Hero's LCP text + above-fold content) has less JS to
// parse/execute/hydrate competing for the main thread.
const Process = dynamic(() => import("@/components/home/Process"));
const TechStack = dynamic(() => import("@/components/home/TechStack"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const CTA = dynamic(() => import("@/components/home/CTA"));

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIBuild />
      <FeaturedProjects />
      <Process />
      <TechStack />
      <Testimonials />
      <CTA />
    </>
  );
}
