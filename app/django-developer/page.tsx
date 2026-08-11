import type { Metadata } from "next";
import RoleLandingPage, { Capability } from "@/components/pages/RoleLandingPage";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";
import { projects } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Django Developer for Hire",
  description:
    "Django developer with 5+ years building scalable backends — multi-tenant SaaS architecture, real-time systems, Celery background processing, and zero-downtime legacy upgrades.",
  alternates: {
    canonical: "/django-developer",
  },
};

const capabilities: Capability[] = [
  {
    icon: "server",
    title: "REST API design (DRF)",
    description: "Clean, versioned Django REST Framework APIs built to be consumed by Flutter, Next.js, or any client.",
  },
  {
    icon: "layers",
    title: "Multi-tenant SaaS backends",
    description: "Tenant isolation, subscription billing, and role-based access built for products that scale past one customer.",
  },
  {
    icon: "activity",
    title: "Real-time systems",
    description: "Django Channels and WebSockets for live dispatch queues and dashboards that update without a refresh.",
  },
  {
    icon: "refresh-cw",
    title: "Background processing",
    description: "Celery and Redis for scheduled jobs, ledger audits, and anything that shouldn't block a request.",
  },
  {
    icon: "trending-up",
    title: "Legacy upgrades",
    description: "Phased migrations off old Django versions — deprecated APIs refactored, security patched, zero downtime.",
  },
  {
    icon: "cloud",
    title: "Cloud deployment & CI/CD",
    description: "Dockerized deployments, automated test suites, and pipelines that ship without drama.",
  },
];

const djangoProjects = projects.filter((p) => p.stack.some((s) => s.startsWith("Django")));
const djangoPosts = getAllPosts()
  .filter((p) => p.tags.includes("django"))
  .map(({ slug, title, description }) => ({ slug, title, description }));

const content = {
  eyebrow: "Django Development",
  roleTitle: "Django Developer",
  headlinePrefix: "Hire a",
  headlineRole: "Django Developer",
  headlineSuffix: "for scalable backends and SaaS platforms",
  subheadline:
    "5+ years building Django/DRF backends — multi-tenant SaaS architecture, real-time systems with Channels, background processing with Celery, and zero-downtime legacy upgrades from Django 2.x to 5.x.",
  color: "#C6F432",
  stats: [
    { value: "5+", label: "Years building with Django" },
    { value: "100%", label: "Flagged security risk resolved in a live 2.x → 5.x upgrade" },
    { value: "0", label: "Downtime during that migration" },
  ],
  capabilities,
  proofProjects: djangoProjects,
  techChips: ["Django", "Django REST Framework", "PostgreSQL", "Celery & Redis", "Python", "Docker / CI-CD"],
  posts: djangoPosts,
  qa: [
    {
      question: "What Django projects have you shipped?",
      answer:
        "Backends for an ad-free Qur'an platform with a Postgres-enforced data-integrity guarantee, a multi-school student portal SaaS, a real-time charitable-pharmacy dispatch system on Channels, and a zero-downtime Django 2.x to 5.x migration for an enterprise app. See the case studies below.",
    },
    {
      question: "Can you upgrade a legacy Django app without downtime?",
      answer:
        "Yes — a phased migration approach that refactors deprecated APIs and database routing incrementally. On the most recent 2.x to 5.x upgrade this resolved 100% of the flagged security risk and delivered a 35% query performance gain with zero downtime.",
    },
    {
      question: "Do you build REST APIs or full-stack apps?",
      answer:
        "Both. Django REST Framework backends paired with a Next.js or Flutter frontend when the project needs one, or a standalone API when it doesn't.",
    },
    {
      question: "How do we get started?",
      answer:
        "Send a brief description of the backend and its constraints via the contact page — I typically reply with scope and a rough timeline within a day.",
    },
  ],
};

const roleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Django Backend Development",
  serviceType: ["Django Development", "Django REST Framework Development", "SaaS Backend Development", "Legacy Django Upgrades"],
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
  url: `${SITE_URL}/django-developer`,
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Django Developer", url: "/django-developer" },
]);

export default function DjangoDeveloperRoute() {
  return (
    <>
      <JsonLd id="django-service-jsonld" data={roleJsonLd} />
      <JsonLd id="django-breadcrumb-jsonld" data={breadcrumb} />
      <RoleLandingPage content={content} />
    </>
  );
}
