import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://127.0.0.1:1337/uploads/:path*",
      },
    ];
  },
  images: {
    qualities: [25, 50, 75, 85, 90, 100],
  },
};

export default nextConfig;
