import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "MVP development, SaaS platforms, mobile apps, AI systems, automation, and dashboards. Production-ready software for startups and businesses.",
};

export default function Services() {
  return <ServicesPage />;
}
