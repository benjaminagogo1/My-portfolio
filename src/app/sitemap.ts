import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];
  return [
    { url: `${origin}/`, priority: 1 },
    ...projects.map((project) => ({
      url: `${origin}/projects/${project.slug}/`,
      priority: 0.8,
    })),
  ];
}
