import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@senlo/ui", "@senlo/core", "@senlo/editor"],
};

export default nextConfig;
