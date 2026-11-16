import type { MetadataRoute } from "next";
import { projects } from "@/content/data/projects";
import { notes, seriesList } from "@/content/data/notes";
import { resumeVariants } from "@/content/data/resume";
import { siteConfig } from "@/content/data/site.config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/work",
    "/experience",
    "/resumes",
    "/notes",
    "/series",
    "/labs",
    "/arcade",
    "/puzzles",
    "/beyond-code",
    "/stack",
    "/about",
    "/contact",
    "/work/d2c-ecommerce",
    "/work/chat-outbox",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...projects.map((p) => ({
      url: `${base}/work/${p.slug}`,
      lastModified: new Date(),
    })),
    ...notes.map((n) => ({
      url: `${base}/notes/${n.slug}`,
      lastModified: new Date(n.date),
    })),
    ...seriesList.map((s) => ({
      url: `${base}/series/${s.slug}`,
      lastModified: new Date(),
    })),
    ...resumeVariants.map((r) => ({
      url: `${base}/resumes/${r.slug}`,
      lastModified: new Date(),
    })),
  ];
}
