import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Verification builds run with NEXT_DIST_DIR set so they never clobber the dev server's
  // cache. Vercel does not set it, so production builds use the default .next.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
