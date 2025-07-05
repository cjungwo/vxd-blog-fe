import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    }
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer, dev }) => {
    if (!dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '__dev__': false
      };
    }
    return config;
  }
};

export default nextConfig;
