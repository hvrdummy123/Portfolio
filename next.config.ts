import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static-first portfolio; deploy to Vercel / Cloudflare Pages / GitHub Pages.
  output: "export",
  images: { unoptimized: true },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
