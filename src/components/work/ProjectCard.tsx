import Link from "next/link";
import type { Project } from "@/content/data/types";
import { STATUS_LABELS } from "@/content/data/types";
import { getNarrative } from "@/content/data/projectNarratives";

export function ProjectCard({ project }: { project: Project }) {
  const story = getNarrative(project.slug);
  return (
    <Link href={`/work/${project.slug}`} className="list-row">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="list-row-title font-medium text-ink">{project.title}</span>
        <span className="text-sm text-ink-soft">{STATUS_LABELS[project.status]}</span>
        <span className="text-sm text-ink-soft">{project.year}</span>
      </div>
      <p className="mt-1 text-sm text-ink-soft">{story?.problem ?? project.pitch}</p>
      <p className="mt-2 text-xs text-ink-soft">
        {project.stack
          .slice(0, 5)
          .map((s) => s.name)
          .join(" · ")}
      </p>
    </Link>
  );
}
