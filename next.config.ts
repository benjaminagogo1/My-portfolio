import type { NextConfig } from "next";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const cvPath =
  process.env.NEXT_PUBLIC_CV_PATH?.trim() || "/cv/otete-benjamin-agogo-cv.pdf";
if (
  !/^\/cv\/[a-zA-Z0-9._-]+\.pdf$/.test(cvPath) ||
  !existsSync(join(process.cwd(), "public", cvPath.slice(1)))
) {
  throw new Error(
    "NEXT_PUBLIC_CV_PATH must point to an existing PDF in public/cv, such as /cv/otete-benjamin-agogo-cv.pdf.",
  );
}

const cvVersion = createHash("sha256")
  .update(readFileSync(join(process.cwd(), "public", cvPath.slice(1))))
  .digest("hex")
  .slice(0, 12);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_CV_URL: `${cvPath}?v=${cvVersion}`,
  },
  experimental: {
    useTypeScriptCli: false,
    cpus: 2,
  },
};

export default nextConfig;
