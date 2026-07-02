import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The race guide article used to render at /race-picks.
      {
        source: "/race-picks",
        destination: "/culture/open-entry-races-2026",
        permanent: true,
      },
      // The pt-BR posts used to be translations of the US race guide and
      // HYROX schedule; they were replaced by Brazil-specific regional pages.
      {
        source: "/pt-br/culture/open-entry-races-2026",
        destination: "/pt-br/culture/corridas-brasil-2026",
        permanent: true,
      },
      {
        source: "/pt-br/dispatch/hyrox-fall-2026-schedule",
        destination: "/pt-br/dispatch/hyrox-brasil-2026",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
