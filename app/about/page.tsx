import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack product engineer with 4.5+ years building SaaS platforms, AI systems, and mobile apps. Based in Islamabad, working remotely worldwide.",
};

export default function About() {
  return <AboutPage />;
}
