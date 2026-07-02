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

export const metadata: Metadata = {
  title: {
    default: "Taimoor Khan — Full-Stack Product Engineer",
    template: "%s | Taimoor Khan",
  },
  description:
    "Full-stack product engineer building scalable SaaS platforms, AI systems, mobile apps, and automation tools for startups and businesses. 5+ years with Flutter, Django, Python, and Next.js.",
  keywords: [
    "SaaS developer",
    "Flutter developer",
    "Django developer",
    "MVP developer",
    "AI automation engineer",
    "full-stack engineer",
    "startup software engineer",
    "mobile app developer",
    "React developer",
    "Next.js developer",
    "product engineer",
    "Taimoor Khan",
  ],
  authors: [{ name: "Taimoor Khan" }],
  creator: "Taimoor Khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://taikha.dev",
    title: "Taimoor Khan — Full-Stack Product Engineer",
    description:
      "I build scalable SaaS platforms, AI systems, mobile apps, and automation tools for startups and businesses.",
    siteName: "Taimoor Khan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taimoor Khan — Full-Stack Product Engineer",
    description:
      "I build scalable SaaS platforms, AI systems, mobile apps, and automation tools.",
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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
