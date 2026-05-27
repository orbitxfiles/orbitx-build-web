import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/api/projects";
import { getArticles } from "@/lib/api/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticRoutes = ["", "/projects", "/learn", "/what-broke", "/resources", "/about", "/search"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const [projects, articles] = await Promise.all([
    getProjects().catch(() => ({ items: [] })),
    getArticles().catch(() => ({ items: [] })),
  ]);

  const dynamic = [
    ...projects.items.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...articles.items.map((a) => ({
      url: `${base}/learn/${a.slug}`,
      lastModified: new Date(a.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticRoutes, ...dynamic];
}
