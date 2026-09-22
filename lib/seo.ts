// Shared SEO helpers: canonical site URL and JSON-LD serialization.
// Live site currently serves from www (taikha.dev redirects here) — kept in
// sync with that so canonical/schema URLs never point at a redirecting URL.
export const SITE_URL = "https://www.taikha.dev";
export const SITE_NAME = "Taimoor Khan";

// Reference to the single canonical Person node minted in app/layout.tsx,
// so BlogPosting.author, CreativeWork.author/creator, and Service.provider
// all point at one entity instead of each creating their own disconnected
// inline Person object with the same name.
export const PERSON_REF = { "@id": `${SITE_URL}/#person` };

// The specific English-speaking markets this site targets, used on Service
// schema instead of a generic "Worldwide" Place so search/AI engines doing
// geographic matching for "hire a Flutter/Django developer" have something
// more specific to match against.
export const INTERNATIONAL_AREA_SERVED = [
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Country", name: "Canada" },
  { "@type": "Country", name: "Australia" },
  { "@type": "Country", name: "Germany" },
  { "@type": "Country", name: "Netherlands" },
];

// Next.js's own docs recommend a plain <script> tag (not next/script) for
// JSON-LD, since next/script's loading strategies don't apply to inert data
// and can keep it out of the initial server-rendered HTML that non-JS
// crawlers (AI bots, schema validators) actually see.
export function jsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
