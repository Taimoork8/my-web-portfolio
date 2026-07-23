import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project or book a call. Available for SaaS, mobile app, AI, and automation projects. Usually responds within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Contact", url: "/contact" },
]);

export default function Contact() {
  return (
    <>
      <JsonLd id="breadcrumb-jsonld" data={breadcrumb} />
      <ContactPage />
    </>
  );
}
