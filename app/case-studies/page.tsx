import type { Metadata } from "next";
import CaseStudiesPage from "@/components/pages/CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real projects built from zero to launch — AI platforms, SaaS products, mobile apps, and IoT systems.",
};

export default function CaseStudies() {
  return <CaseStudiesPage />;
}
