import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack product engineer with 5+ years building SaaS platforms, AI systems, and mobile apps. Based in Islamabad, working remotely worldwide.",
  alternates: {
    canonical: "/about",
  },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
]);

export default function About() {
  return (
    <>
      <JsonLd id="breadcrumb-jsonld" data={breadcrumb} />
      <AboutPage />
    </>
  );
}
