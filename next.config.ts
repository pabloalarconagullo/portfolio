import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

// Permite usar los bindings de Cloudflare (getCloudflareContext) durante `next dev`.
initOpenNextCloudflareForDev();
