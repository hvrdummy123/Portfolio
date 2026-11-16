import Link from "next/link";
import type { Project } from "@/content/data/types";
import { STATUS_LABELS } from "@/content/data/types";
import { getNarrative } from "@/content/data/projectNarratives";
import { ProjectMedia } from "@/components/work/ProjectMedia";

export function CaseStudy({
  project,
  children,
  showSamples = true,
}: {
  project: Project;
  children?: React.ReactNode;
  showSamples?: boolean;
}) {
  const story = getNarrative(project.slug);
  const problem = story?.problem ?? project.pitch;
  const solution =
    story?.solution ??
    (project.decisions[0]
      ? `${project.decisions[0].decision} ${project.decisions[0].consequence}`
      : project.stack.map((s) => s.name).join(", "));
  const impact =
    story?.impact ??
    (project.stats.length
      ? project.stats.map((s) => `${s.label}: ${s.value}`).join(" · ")
      : undefined);

  return (
    <article className="container-site section-pad pb-16">
      <p className="eyebrow">
        <Link href="/work" className="no-underline">
          Work
        </Link>{" "}
        · {project.year} · {STATUS_LABELS[project.status]}
      </p>
      <h1 className="display mt-2 max-w-2xl text-4xl text-ink">{project.title}</h1>
      <p className="mt-3 max-w-xl text-lg text-ink-soft">{project.pitch}</p>

      <div className="mt-5 flex flex-wrap gap-4 text-sm">
        {project.links.repo && (
          <a href={project.links.repo} target="_blank" rel="noreferrer">
            Repository
          </a>
        )}
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noreferrer">
            Live demo
          </a>
        )}
        {story?.relatedNotes?.[0] && (
          <Link href={`/notes/${story.relatedNotes[0]}`}>Design note</Link>
        )}
      </div>

      {project.sourceNote && (
        <p className="mt-4 text-sm text-ink-soft">{project.sourceNote}</p>
      )}

      {project.stats.length > 0 && (
        <ul className="mt-8 space-y-2 border-y border-line py-5">
          {project.stats.map((s) => (
            <li key={s.label} className="flex flex-wrap items-baseline gap-x-3">
              <span className="stat-value text-lg">{s.value}</span>
              <span className="text-ink-soft">{s.label}</span>
              <span className="text-xs text-ink-soft">— {s.source}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="prose-narrow mt-10 space-y-10">
        <section id="problem">
          <h2 className="display text-xl text-ink">Problem</h2>
          <p className="mt-3 text-ink-soft">{problem}</p>
        </section>
        <section id="solution">
          <h2 className="display text-xl text-ink">Solution & why</h2>
          <p className="mt-3 text-ink-soft">{solution}</p>
        </section>
        <section id="impact">
          <h2 className="display text-xl text-ink">Why it helps</h2>
          <p className="mt-3 text-ink-soft">
            {impact ?? "See stack choices and design notes for the deeper rationale."}
          </p>
        </section>

        {children}

        {showSamples && project.kind === "github" && (
          <section id="samples">
            <h2 className="display text-xl text-ink">Samples</h2>
            <ProjectMedia slug={project.slug} />
          </section>
        )}

        {project.stack.length > 0 && (
          <section id="stack">
            <h2 className="display text-xl text-ink">Stack</h2>
            <ul className="mt-4 space-y-3">
              {project.stack.map((s) => (
                <li key={s.name} className="border-b border-line pb-3 text-sm">
                  <p className="font-medium text-ink">
                    {s.name}
                    <span className="font-normal text-ink-soft"> · {s.layer}</span>
                  </p>
                  {(s.why || s.alternative) && (
                    <p className="mt-1 text-ink-soft">
                      {s.why}
                      {s.alternative ? ` Alternative considered: ${s.alternative}.` : ""}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.decisions.length > 0 && (
          <section id="decisions">
            <h2 className="display text-xl text-ink">Trade-offs</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Longer write-ups: <Link href="/notes">Design notes</Link>.
            </p>
            <ul className="mt-4 space-y-5">
              {project.decisions.map((d, i) => (
                <li key={i} className="text-sm">
                  <p className="text-ink-soft">
                    <span className="font-medium text-ink">Context — </span>
                    {d.context}
                  </p>
                  <p className="mt-1 text-ink-soft">
                    <span className="font-medium text-ink">Choice — </span>
                    {d.decision}
                  </p>
                  <p className="mt-1 text-ink-soft">
                    <span className="font-medium text-ink">Result — </span>
                    {d.consequence}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {story?.relatedNotes && story.relatedNotes.length > 0 && (
          <section id="design-notes">
            <h2 className="display text-xl text-ink">Related design notes</h2>
            <ul className="mt-3 space-y-2">
              {story.relatedNotes.map((slug) => (
                <li key={slug}>
                  <Link href={`/notes/${slug}`}>{slug}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
