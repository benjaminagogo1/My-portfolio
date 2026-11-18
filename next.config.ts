import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: {
    useTypeScriptCli: false,
    cpus: 2,
  },
};

export default nextConfig;
