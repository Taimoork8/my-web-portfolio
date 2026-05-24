import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project or book a call. Available for SaaS, mobile app, AI, and automation projects. Usually responds within 24 hours.",
};

export default function Contact() {
  return <ContactPage />;
}
