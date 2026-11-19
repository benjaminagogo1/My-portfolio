import type { MetadataRoute } from "next";
import { isSiteConfigured, siteUrl } from "@/lib/site";

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: isSiteConfigured
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: siteUrl("/sitemap.xml"),
  };
}
