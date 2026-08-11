import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";
import { fullServices } from "@/lib/data";

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

// serviceType values per offering. Maps each catalog entry onto the concrete
// search terms this site targets (e.g. "Flutter Development", "Django
// Development") in addition to its own title, without inventing offerings
// that aren't listed in lib/data.ts.
const serviceTypesById: Record<string, string[]> = {
  mvp: ["MVP Development", "Startup Software Development"],
  saas: ["SaaS Development", "Django Development", "Full-Stack Development"],
  mobile: ["Mobile App Development", "Flutter Development"],
  ai: ["AI Systems Development", "LLM Integration"],
  automation: ["Automation Workflow Development"],
  dashboard: ["Dashboard & Analytics Development"],
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": fullServices.map((service) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/services#${service.id}`,
    name: service.title,
    serviceType: serviceTypesById[service.id] ?? [service.title],
    description: service.description,
    provider: {
      "@type": "Person",
      name: "Taimoor Khan",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    url: `${SITE_URL}/services#${service.id}`,
  })),
};

export default function Services() {
  return (
    <>
      <JsonLd id="breadcrumb-jsonld" data={breadcrumb} />
      <JsonLd id="services-jsonld" data={servicesJsonLd} />
      <ServicesPage />
    </>
  );
}
