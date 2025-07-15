import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "commondatastorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "download.blender.org",
      },
      {
        protocol: "https",
        hostname: "mango.blender.org",
      },
      {
        protocol: "https",
        hostname: "peach.blender.org",
      },
      {
        protocol: "http",
        hostname: "uhdtv.io",
      },
      {
        protocol: "https",
        hostname: "resizing.flixster.com",
      },
    ],
  },
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
