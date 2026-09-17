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
      // Ebco product photography (partner brand — used in
      // EbcoShowcase.tsx and the ItemSection-2 hardware tabs)
      {
        protocol: "https",
        hostname: "s3.ap-south-1.amazonaws.com",
        pathname: "/ebco-dev-assets/**",
      },
      {
        protocol: "https",
        hostname: "ebco-dev-assets.s3.ap-south-1.amazonaws.com",
      },
      // Amulya Mica product photography (plywood & laminate
      // images — Shopify serves these under both /cdn/shop/files/
      // and /cdn/shop/products/, so both are allowed here)
      {
        protocol: "https",
        hostname: "www.amulyamica.com",
        pathname: "/cdn/shop/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/I/**",
      },
      {
        protocol: "https",
        hostname: "5.imimg.com",
        pathname: "/data5/SELLER/**",
      },
      {
        protocol: "https",
        hostname: "5.imimg.com",
        pathname: "/data5/GLADMIN/**",
      },
      // // Kayapalat product images
      // {
      //   protocol: "https",
      //   hostname: "kayapalat.co",
      //   pathname: "/product_images/**",
      // },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/product_images/**",
      },
    ],
  },
};

export default nextConfig;