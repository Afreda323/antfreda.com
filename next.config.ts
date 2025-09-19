import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: { turbopackScopeHoisting: false },
};

export default nextConfig;
