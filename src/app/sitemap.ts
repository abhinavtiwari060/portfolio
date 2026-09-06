import { MetadataRoute } from "next";
import { getPortfolioData } from "@/lib/data/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const { projects, articles } = await getPortfolioData();

  const projectUrls = projects.map((p: any) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.createdAt || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleUrls = articles.map((a: any) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: new Date(a.updatedAt || a.publishedAt || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...projectUrls,
    ...articleUrls,
  ];
}
