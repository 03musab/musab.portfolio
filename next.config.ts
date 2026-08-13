import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: ["*.monkeycode-ai.live", ".monkeycode-ai.live"],
};

export default nextConfig;
