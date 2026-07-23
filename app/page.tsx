import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WhatIBuild from "@/components/home/WhatIBuild";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Process from "@/components/home/Process";
import TechStack from "@/components/home/TechStack";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

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
