import type { NextConfig } from "next";

// Content Security Policy. All of this site's scripts, styles, images, fonts,
// and media are served from the same origin (next/font self-hosts the Google
// fonts at build time), so we can lock everything down to 'self'. Next.js still
// emits some inline bootstrap scripts/styles, so 'unsafe-inline' is required
// while we are not using per-request nonces. `upgrade-insecure-requests` makes
// browsers rewrite any stray http:// subresource to https://, which keeps the
// page from ever being flagged as mixed/insecure content.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  media-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const securityHeaders = [
  // Force HTTPS for two years, including subdomains, and allow preloading.
  // This is what clears "not secure" warnings in browsers and corporate gateways.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: cspHeader.replace(/\s{2,}/g, " ").trim() },
  // Block the site from being embedded in an iframe (clickjacking protection).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop the browser from MIME-sniffing responses away from their declared type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't leak full URLs to other origins.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable powerful browser features the site doesn't use.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // The race guide article used to render at /race-picks.
      {
        source: "/race-picks",
        destination: "/culture/open-entry-races-2026",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
