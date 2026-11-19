import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

const cvPath = process.env.NEXT_PUBLIC_CV_PATH?.trim();
if (
  cvPath &&
  (!/^\/cv\/[a-zA-Z0-9._-]+\.pdf$/.test(cvPath) ||
    !existsSync(join(process.cwd(), "public", cvPath.slice(1))))
) {
  throw new Error(
    "NEXT_PUBLIC_CV_PATH must point to an existing PDF in public/cv, such as /cv/otete-benjamin-agogo-cv.pdf.",
  );
}

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
