import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description:
    "MVP development, SaaS platforms, mobile apps, AI systems, automation, and dashboards. Production-ready software for startups and businesses.",
  alternates: {
    canonical: "/services",
  },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
]);

export default function Services() {
  return (
    <>
      <JsonLd id="breadcrumb-jsonld" data={breadcrumb} />
      <ServicesPage />
    </>
  );
}
