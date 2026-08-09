import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ==========================================================
     Development Indicators
     ========================================================== */

  devIndicators: false as any,

  /* ==========================================================
     Remote Image Configuration
     ----------------------------------------------------------
     Allows next/image to load images from approved domains.
     Unsplash is used for temporary furniture imagery.
     Wikimedia is currently used for temporary brand logos.
  ========================================================== */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;