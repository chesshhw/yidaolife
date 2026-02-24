import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/cities/:city", destination: "/city/:city", permanent: true },
    ];
  },
};

export default nextConfig;
