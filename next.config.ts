import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Crew page is parked until crew runs actually have a date; the
      // route folders are src/app/_crew and src/app/pt-br/_crew. Temporary
      // (307) on purpose so the URLs come back when the runs start.
      {
        source: "/crew",
        destination: "/",
        permanent: false,
      },
      {
        source: "/pt-br/crew",
        destination: "/pt-br",
        permanent: false,
      },
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
