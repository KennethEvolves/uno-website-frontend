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
};

export default nextConfig;
