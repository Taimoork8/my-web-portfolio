import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          {
            key: "Content-Security-Policy",
            // Scoped to the origins this site actually loads: self-hosted
            // fonts/assets, Google Analytics (gtag.js + collect endpoint),
            // Vercel Speed Insights, and the web3forms contact-form API.
            // script-src/style-src keep 'unsafe-inline' because Next.js
            // injects inline hydration data and Tailwind emits inline
            // styles; a nonce-based policy would need middleware, which is
            // a larger change than this pass covers.
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://api.web3forms.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self' https://api.web3forms.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
