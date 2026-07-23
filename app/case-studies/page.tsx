import type { Metadata } from "next";
import CaseStudiesPage from "@/components/pages/CaseStudiesPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real projects built from zero to launch — AI platforms, SaaS products, mobile apps, and IoT systems.",
  alternates: {
    canonical: "/case-studies",
  },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Case Studies", url: "/case-studies" },
]);

export default function CaseStudies() {
  return (
    <>
      <JsonLd id="breadcrumb-jsonld" data={breadcrumb} />
      <CaseStudiesPage />
    </>
  );
}
