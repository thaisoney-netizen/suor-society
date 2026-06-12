import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /race-picks is the canonical home of the race guide; the article
      // briefly lived under the culture archive.
      {
        source: "/culture/open-entry-races-2026",
        destination: "/race-picks",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
