import { ImageResponse } from "next/og";
import { projects } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const accent = project?.color ?? "#C6F432";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A0A0B",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: accent,
            fontSize: 22,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 40,
          }}
        >
          {project?.category ?? "Case Study"}
        </div>
        <div
          style={{
            color: "#F0EDE6",
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.2,
            maxWidth: 1000,
          }}
        >
          {project?.title ?? "Case Study"}
        </div>
        <div
          style={{
            marginTop: 20,
            color: "rgba(240,237,230,0.6)",
            fontSize: 28,
            maxWidth: 900,
          }}
        >
          {project?.tagline ?? ""}
        </div>
      </div>
    ),
    { ...size }
  );
}
