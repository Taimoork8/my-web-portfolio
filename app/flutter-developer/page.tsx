import type { Metadata } from "next";
import RoleLandingPage, { Capability } from "@/components/pages/RoleLandingPage";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";
import { projects } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Flutter Developer for Hire",
  description:
    "Flutter developer with 5+ years shipping production cross-platform apps — offline-first architecture, BLE/IoT hardware integration, and AI-powered features for iOS and Android.",
  alternates: {
    canonical: "/flutter-developer",
  },
};

const capabilities: Capability[] = [
  {
    icon: "smartphone",
    title: "Cross-platform apps",
    description: "One Flutter codebase for iOS and Android with native-quality UX, animations, and performance.",
  },
  {
    icon: "refresh-cw",
    title: "Offline-first architecture",
    description: "Local caching, sync queues, and conflict resolution so the app keeps working without a connection.",
  },
  {
    icon: "cpu",
    title: "BLE / IoT hardware integration",
    description: "Bluetooth Low Energy scanning, pairing, and encrypted device authentication against ESP32/STM32 firmware.",
  },
  {
    icon: "brain",
    title: "AI-powered mobile features",
    description: "LLM-backed chat, summarization, and smart suggestions built directly into the app.",
  },
  {
    icon: "bell",
    title: "Push notifications & deep linking",
    description: "Firebase Cloud Messaging, deep links, and background services wired up end to end.",
  },
  {
    icon: "rocket",
    title: "App Store & Play Store shipping",
    description: "Versioning, CI/CD, and store submission — not just a working build on your laptop.",
  },
];

const flutterProjects = projects.filter((p) => p.stack.includes("Flutter"));
const flutterPosts = getAllPosts()
  .filter((p) => p.tags.includes("flutter"))
  .map(({ slug, title, description }) => ({ slug, title, description }));

const content = {
  eyebrow: "Flutter Development",
  roleTitle: "Flutter Developer",
  headlinePrefix: "Hire a",
  headlineRole: "Flutter Developer",
  headlineSuffix: "for production-ready mobile apps",
  subheadline:
    "5+ years shipping cross-platform Flutter apps for iOS and Android — offline-first architecture, BLE/IoT hardware integrations, and AI-powered features. Not prototypes; production systems real users depend on.",
  color: "#6DE7FF",
  stats: [
    { value: "5+", label: "Years building with Flutter" },
    { value: "15+", label: "BLE device variants shipped" },
    { value: "99%", label: "BLE pairing success rate in production" },
  ],
  capabilities,
  proofProjects: flutterProjects,
  techChips: ["Flutter", "Dart", "Firebase", "REST APIs", "BLE/IoT", "ESP32 & STM Firmware"],
  posts: flutterPosts,
  qa: [
    {
      question: "What Flutter apps have you built?",
      answer:
        "Production apps including a BLE/IoT device-authentication app pairing with 15+ ESP32/STM32 device variants, a multi-role school management app used by 2,000+ students, and a Flutter CRM & inventory app tracking 5,000+ SKUs. See the case studies below for specifics.",
    },
    {
      question: "Do you build for both iOS and Android?",
      answer:
        "Yes — a single Flutter codebase targeting both platforms, including App Store and Play Store submission.",
    },
    {
      question: "Can you integrate hardware into a Flutter app?",
      answer:
        "Yes. I've shipped BLE scanning, pairing, and encrypted authentication against ESP32 and STM32 firmware in production, with a 99% pairing success rate.",
    },
    {
      question: "How do we get started?",
      answer:
        "Send a brief description of the app and its constraints via the contact page — I typically reply with scope and a rough timeline within a day.",
    },
  ],
};

const roleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Flutter App Development",
  serviceType: ["Flutter Development", "Mobile App Development", "BLE/IoT Mobile Integration"],
  description: metadata.description,
  provider: {
    "@type": "Person",
    name: "Taimoor Khan",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  url: `${SITE_URL}/flutter-developer`,
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Flutter Developer", url: "/flutter-developer" },
]);

export default function FlutterDeveloperRoute() {
  return (
    <>
      <JsonLd id="flutter-service-jsonld" data={roleJsonLd} />
      <JsonLd id="flutter-breadcrumb-jsonld" data={breadcrumb} />
      <RoleLandingPage content={content} />
    </>
  );
}
