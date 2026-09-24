import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/cities/:city", destination: "/city/:city", permanent: true },
      { source: "/city/tongren-diqu", destination: "/city/tongren", permanent: true },
    ];
  },
};

export default nextConfig;
