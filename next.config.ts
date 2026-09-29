import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  async rewrites() {
    const strapiUrl =
      process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
    return [
      {
        source: "/uploads/:path*",
        destination: `${strapiUrl}/uploads/:path*`,
      },
      {
        source: "/arch_transparencia/:path*",
        destination: "http://legacy_files:80/arch_transparencia/:path*",
      },
      {
        source: "/downloads/:path*",
        destination: "http://legacy_files:80/downloads/:path*",
      },
    ];
  },
  images: {
    qualities: [25, 50, 75, 85, 90, 100],
  },
};

export default nextConfig;
