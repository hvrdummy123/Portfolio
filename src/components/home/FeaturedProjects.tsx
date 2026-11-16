"use client";

import Link from "next/link";
import { getProject, projectsForRole } from "@/content/data/projects";
import { resume } from "@/content/data/resume";
import { STATUS_LABELS } from "@/content/data/types";
import { usePrefs } from "@/components/providers/PrefsProvider";
import { getNarrative } from "@/content/data/projectNarratives";
import { Window } from "@/components/ui/Window";
import { Chip } from "@/components/ui/Chip";
import type { Project } from "@/content/data/types";
import roles from "../../../content/roles.json";

const STACK_LIMIT = 6;

/** Always surface both employers so the timeline doesn't look Nomura-only. */
const WORK_SLUGS = ["atrium-engineering", "nomura-engineering"] as const;

const WORK_EXP_ID: Record<(typeof WORK_SLUGS)[number], string> = {
  "atrium-engineering": "atrium",
  "nomura-engineering": "nomura",
};

function stackTags(project: Project): string[] {
  const expId = WORK_EXP_ID[project.slug as (typeof WORK_SLUGS)[number]];
  if (expId) {
    const exp = resume.experience.find((e) => e.id === expId);
    if (exp?.stack?.length) return exp.stack.slice(0, STACK_LIMIT);
  }
  return project.stack.map((s) => s.name).slice(0, STACK_LIMIT);
}

function featuredForRole(role: Project["roles"][number]): {
  work: Project[];
  rest: Project[];
} {
  const roleFeatured = (roles[role as keyof typeof roles]?.featured ?? []) as string[];
  const preferred = [
    ...WORK_SLUGS,
    ...roleFeatured.filter((s) => !WORK_SLUGS.includes(s as (typeof WORK_SLUGS)[number])),
  ];
  const seen = new Set<string>();
  const work: Project[] = [];
  for (const slug of preferred) {
    const p = getProject(slug);
    if (p && !seen.has(p.slug)) {
      seen.add(p.slug);
      work.push(p);
    }
  }
  const rest = projectsForRole(role)
    .filter((p) => !seen.has(p.slug))
    .slice(0, 4);
  return { work: work.slice(0, 3), rest };
}

function ProjectStack({ project }: { project: Project }) {
  const tags = stackTags(project);
  if (!tags.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tags.map((name) => (
        <Chip key={name} tone="backend">
          {name}
        </Chip>
      ))}
    </div>
  );
}

function FeatureCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="no-underline md:col-span-2">
      <Window title={`${project.slug}.app`} status={STATUS_LABELS[project.status]} className="h-full">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.kind === "work" ? <Chip tone="fintech">Work experience</Chip> : null}
          {project.featured ? <Chip tone="ai">Featured</Chip> : null}
        </div>
        <h3 className="display text-xl text-ink md:text-2xl">{project.title}</h3>
        <p className="mt-2 text-sm text-ink-soft">
          {getNarrative(project.slug)?.impact ??
            getNarrative(project.slug)?.solution ??
            project.pitch}
        </p>
        <ProjectStack project={project} />
      </Window>
    </Link>
  );
}

export function FeaturedProjects() {
  const { role } = usePrefs();
  const { work: featured, rest } = featuredForRole(role);

  return (
    <section className="section-pad">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="display text-2xl text-ink">Featured work</h2>
        <Link href="/work" className="text-sm">
          All projects
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-6">
        {featured.map((p) => (
          <FeatureCard key={p.slug} project={p} />
        ))}

        {rest.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="no-underline md:col-span-2">
            <Window title={p.slug} status={STATUS_LABELS[p.status]}>
              <h3 className="display text-base text-ink">{p.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{p.pitch}</p>
              <ProjectStack project={p} />
            </Window>
          </Link>
        ))}
      </div>
    </section>
  );
}
