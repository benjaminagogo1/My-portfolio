import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { siteOrigin, siteUrl } from "@/lib/site";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  return [
    { url: siteUrl("/")!, priority: 1 },
    ...projects.map((project) => ({
      url: siteUrl(`/projects/${project.slug}/`)!,
      priority: 0.8,
    })),
  ];
}
