import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/data/projects";
import { CaseStudy } from "@/components/work/CaseStudy";

export function generateStaticParams() {
  return projects
    .filter((p) => p.slug !== "d2c-ecommerce")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  const title = project.title.slice(0, 55);
  const description = project.pitch.slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description,
      url: `/work/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "d2c-ecommerce") notFound();
  const project = getProject(slug);
  if (!project) notFound();

  return <CaseStudy project={project} />;
}
