import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://taikha.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Taimoor Khan — Full-Stack Product Engineer | Flutter, Django & IoT",
    template: "%s | Taimoor Khan",
  },
  description:
    "Full-stack product engineer building scalable SaaS platforms, Flutter mobile apps, Django/DRF backends, and BLE/IoT hardware integrations (ESP32, STM32, Raspberry Pi) for startups and businesses. 5+ years of experience shipping production systems end-to-end.",
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
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Taimoor Khan — Full-Stack Product Engineer",
    description:
      "I build scalable SaaS platforms, Flutter mobile apps, Django backends, and BLE/IoT hardware integrations for startups and businesses.",
    siteName: "Taimoor Khan",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Taimoor Khan — Full-Stack Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taimoor Khan — Full-Stack Product Engineer",
    description:
      "I build scalable SaaS platforms, Flutter mobile apps, Django backends, and BLE/IoT hardware integrations.",
    images: ["/og-image.png"],
    creator: "@your_twitter_handle",
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
  verification: {
    google: "your-google-search-console-verification-code",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
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
    "https://github.com/your-github-handle",
    "https://www.linkedin.com/in/your-linkedin-handle",
    "https://x.com/your_twitter_handle",
  ],
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0BYDLYFRVM" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0BYDLYFRVM');
          `}
        </Script>
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(personJsonLd)}
        </Script>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}