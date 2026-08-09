import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upskilling-egypt.com",
        port: "3006",
      },
    ],
  },
};

export default nextConfig;
