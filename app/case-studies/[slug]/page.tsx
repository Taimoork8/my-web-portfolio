import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import CaseStudyDetail from "@/components/pages/CaseStudyDetail";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/case-studies/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/case-studies/${project.slug}`,
    image: `${SITE_URL}/case-studies/${project.slug}/opengraph-image`,
    keywords: project.stack,
    about: project.category,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: "Taimoor Khan",
      url: SITE_URL,
    },
    creator: {
      "@type": "Person",
      name: "Taimoor Khan",
      url: SITE_URL,
    },
    ...(project.liveUrl ? { sameAs: [project.liveUrl] } : {}),
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
    { name: project.title, url: `/case-studies/${project.slug}` },
  ]);

  return (
    <>
      <JsonLd id="creativework-jsonld" data={creativeWorkJsonLd} />
      <JsonLd id="breadcrumb-jsonld" data={breadcrumb} />
      <CaseStudyDetail project={project} />
    </>
  );
}
