import Link from "next/link";
import type { Project } from "@/content/data/types";
import { STATUS_LABELS } from "@/content/data/types";
import { getNarrative } from "@/content/data/projectNarratives";
import { Window } from "@/components/ui/Window";
import { Chip } from "@/components/ui/Chip";

const LAB_FOR: Record<string, string> = {
  paybench: "/labs/paybench-timeout",
  "zkp-kyc": "/labs/zk-cats",
  "d2c-ecommerce": "/labs/d2c-order-lifecycle",
  "etf-backtesting": "/labs/backtest-toy",
};

export function ProjectCard({ project }: { project: Project }) {
  const story = getNarrative(project.slug);
  const lab = LAB_FOR[project.slug];
  const outcome = story?.impact ?? project.pitch;

  return (
    <Link href={`/work/${project.slug}`} className="block no-underline">
      <Window
        title={`${project.slug}.${project.kind === "github" ? "git" : "app"}`}
        status={project.stack
          .slice(0, 4)
          .map((s) => s.name)
          .join(" · ")}
        className="h-full transition-transform hover:-translate-x-px hover:-translate-y-px"
      >
        <div className="mb-2 flex flex-wrap gap-2">
          <Chip>{STATUS_LABELS[project.status]}</Chip>
          {project.domainTags.slice(0, 2).map((t) => (
            <Chip key={t} tone={t === "ai" ? "ai" : "backend"}>
              {t}
            </Chip>
          ))}
          {lab ? <Chip tone="ai">Try it</Chip> : null}
        </div>
        <h2 className="display text-xl text-ink">{project.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{outcome}</p>
        {project.stats.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stats.slice(0, 3).map((s) => (
              <span
                key={s.label}
                className="rounded border border-ink/30 bg-cream px-2 py-0.5 text-xs"
                title={s.source}
              >
                <span className="font-[family-name:var(--font-pixelify)] text-berry">
                  {s.value}
                </span>{" "}
                {s.label}
              </span>
            ))}
          </div>
        ) : null}
      </Window>
    </Link>
  );
}
