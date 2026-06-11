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
    ];
  },
};

export default nextConfig;
