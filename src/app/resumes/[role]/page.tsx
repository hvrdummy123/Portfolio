import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resume, resumeVariants } from "@/content/data/resume";
import { getProject } from "@/content/data/projects";
import { ResumeView } from "@/components/resumes/ResumeView";

export function generateStaticParams() {
  return resumeVariants.map((v) => ({ role: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  const variant = resumeVariants.find((v) => v.slug === role);
  return { title: variant ? `${variant.title} résumé` : "Résumé" };
}

export default async function ResumeRolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const variant = resumeVariants.find((v) => v.slug === role);
  if (!variant) notFound();

  const orderedProjects = variant.projectOrder
    .map((slug) => getProject(slug))
    .filter(Boolean);

  return (
    <div className="container-site section-pad">
      <p className="pixel-label">Résumé · {variant.title}</p>
      <h1 className="display text-3xl text-ink md:text-4xl">{variant.headline}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">{variant.whyThisVersion}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/resumes" className="btn btn-ghost">
          ← All variants
        </Link>
        <a className="btn btn-secondary" href="#download" id="download">
          Print / Save PDF
        </a>
      </div>
      <ResumeView variant={variant} resume={resume} projects={orderedProjects} />
    </div>
  );
}
