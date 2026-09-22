import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import WhatIBuild from "@/components/home/WhatIBuild";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";

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
  openGraph: {
    url: "/",
  },
};

// Ties the homepage to the sitewide Person/WebSite @ids already minted in
// app/layout.tsx, since every other top-level route has at least a
// BreadcrumbList and the homepage otherwise has no page-specific JSON-LD.
const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "Taimoor Khan — Full-Stack Engineer | Flutter & Django",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#person` },
  mainEntity: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-US",
};

export default function HomePage() {
  return (
    <>
      <JsonLd id="profilepage-jsonld" data={profilePageJsonLd} />
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
