import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
  // Only used for small badge/metric labels well below the LCP headline —
  // not worth a render-blocking preload hint competing with the fonts that
  // actually gate first paint.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Taimoor Khan — Full-Stack Engineer | Flutter & Django",
    template: "%s | Taimoor Khan",
  },
  description:
    "Full-stack product engineer building SaaS platforms, Flutter apps, and Django backends with BLE/IoT integrations. 5+ years shipping production systems.",
  keywords: [
    "SaaS developer",
    "Flutter developer",
    "Django developer",
    "Django DRF developer",
    "MVP developer",
    "AI automation engineer",
    "full-stack engineer",
    "startup software engineer",
    "mobile app developer",
    "React developer",
    "Next.js developer",
    "product engineer",
    "BLE IoT developer",
    "ESP32 Flutter developer",
    "multi-tenant SaaS developer",
    "freelance full-stack developer",
    "Taimoor Khan",
  ],
  authors: [{ name: "Taimoor Khan", url: SITE_URL }],
  creator: "Taimoor Khan",
  publisher: "Taimoor Khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Taimoor Khan — Full-Stack Product Engineer",
    description:
      "I build scalable SaaS platforms, Flutter mobile apps, Django backends, and BLE/IoT hardware integrations for startups and businesses.",
    siteName: "Taimoor Khan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taimoor Khan — Full-Stack Product Engineer",
    description:
      "I build scalable SaaS platforms, Flutter mobile apps, Django backends, and BLE/IoT hardware integrations.",
    creator: "@taimoor405",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Taimoor Khan",
  url: SITE_URL,
  jobTitle: "Full-Stack Product Engineer",
  description:
    "Full-stack product engineer specializing in Flutter mobile development, Django/DRF backends, BLE/IoT hardware integration, and multi-tenant SaaS platforms.",
  knowsAbout: [
    "Flutter",
    "Django",
    "Django REST Framework",
    "BLE",
    "IoT",
    "ESP32",
    "STM32",
    "SaaS Development",
    "Next.js",
    "React",
  ],
  sameAs: [
    "https://github.com/Taimoork8",
    "https://linkedin.com/in/taimoorkhan405",
    "https://x.com/taimoor405",
  ],
};

// Site-wide entity: establishes the site itself as a distinct node in the
// knowledge graph and ties it back to the Person via `publisher`. Rendered
// on every route (including the homepage, which otherwise carried no JSON-LD).
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Portfolio and case studies of Taimoor Khan, a full-stack product engineer specializing in Flutter development, Django development, and SaaS platforms.",
  publisher: {
    "@id": `${SITE_URL}/#person`,
  },
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${bricolage.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-[#0A0A0B] text-[#F0EDE6] min-h-screen">
        <JsonLd id="person-jsonld" data={personJsonLd} />
        <JsonLd id="website-jsonld" data={websiteJsonLd} />
        <MotionConfig reducedMotion="user">
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTopButton />
        </MotionConfig>
        <SpeedInsights />
        <GoogleAnalytics gaId="G-0BYDLYFRVM" />
      </body>
    </html>
  );
}
