import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cms.sortafamous.in' },
    ],
  },
  // Pin Turbopack's workspace root to this project. A stray lockfile in a
  // parent dir otherwise makes Next infer `~/` as the root and crash trying
  // to scan sibling dirs macOS blocks (e.g. ~/Documents).
  turbopack: {
    root: __dirname,
  },
  // The WordPress CMS is on shared hosting that returns 508 when a build hits
  // it with many parallel requests, so pages are generated a few at a time.
  experimental: {
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 100,
    staticGenerationRetryCount: 2,
  },
  async redirects() {
    return [
      // One canonical host: www.sortafamous.in otherwise serves a duplicate copy.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sortafamous.in" }],
        destination: "https://sortafamous.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
