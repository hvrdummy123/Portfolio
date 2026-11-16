import Link from "next/link";
import type { Project } from "@/content/data/types";
import { STATUS_LABELS } from "@/content/data/types";
import { getNarrative } from "@/content/data/projectNarratives";
import { notes } from "@/content/data/notes";
import { projects } from "@/content/data/projects";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import { Window } from "@/components/ui/Window";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

const LAB_FOR: Record<string, { href: string; label: string }> = {
  paybench: { href: "/labs/paybench-timeout", label: "Break the payment" },
  "zkp-kyc": { href: "/labs/zk-cats", label: "Zero-knowledge with cats" },
  "d2c-ecommerce": { href: "/labs/d2c-order-lifecycle", label: "Order lifecycle" },
  "etf-backtesting": { href: "/labs/backtest-toy", label: "Backtest toy" },
  "atrium-engineering": { href: "/labs/outbox-playground", label: "Outbox playground" },
  "incident-logger": { href: "/labs/outbox-playground", label: "Related labs" },
};

function noteTitle(slug: string) {
  return notes.find((n) => n.slug === slug)?.title ?? slug;
}

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
  const lab = LAB_FOR[project.slug];
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null;
  const stackHasWhy = project.stack.some((s) => s.why || s.alternative);

  return (
    <article className="container-site section-pad pb-16">
      <nav className="eyebrow" aria-label="Breadcrumb">
        <Link href="/work" className="no-underline">
          Work
        </Link>
        <span aria-hidden> · </span>
        <span>{project.title}</span>
      </nav>
      <p className="mt-2">
        <Link href="/work" className="text-sm">
          ← Back to work
        </Link>
      </p>

      <Window
        title={`${project.slug}.case`}
        className="mt-4"
        status={`${project.year} · ${STATUS_LABELS[project.status]}`}
      >
        <div className="mb-3 flex flex-wrap gap-2">
          <Chip>{STATUS_LABELS[project.status]}</Chip>
          {project.featured ? <Chip tone="ai">Featured</Chip> : null}
          {project.domainTags.map((t) => (
            <Chip key={t} tone={t}>
              {t}
            </Chip>
          ))}
        </div>
        <h1 className="display max-w-2xl text-3xl text-ink md:text-4xl">{project.title}</h1>
        <p className="mt-3 max-w-xl text-ink-soft">{project.pitch}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.links.repo ? (
            <Button href={project.links.repo} variant="secondary">
              Repository
            </Button>
          ) : null}
          {project.links.live ? <Button href={project.links.live}>Live demo</Button> : null}
          {story?.relatedNotes?.[0] ? (
            <Button href={`/notes/${story.relatedNotes[0]}`} variant="ghost">
              Design note
            </Button>
          ) : null}
          {lab ? (
            <Button href={lab.href} variant="secondary">
              Try it · {lab.label}
            </Button>
          ) : null}
        </div>
        {showSamples ? (
          <div className="mt-6 overflow-hidden rounded-lg border-2 border-ink bg-cream empty:hidden">
            <ProjectMedia slug={project.slug} />
          </div>
        ) : null}
      </Window>

      {project.sourceNote ? (
        <p className="mt-4 text-sm text-ink-soft">{project.sourceNote}</p>
      ) : null}

      {project.stats.length > 0 ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {project.stats.map((s) => (
            <div key={s.label} className="win" title={`Source: ${s.source}`}>
              <div className="win-titlebar !py-1 !text-[10px]">
                <div className="win-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </div>
                {s.label}
              </div>
              <div className="win-body !py-3 text-center">
                <p className="stat-value text-xl">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { id: "problem", title: "Problem", body: problem },
          { id: "built", title: "What I built", body: solution },
          { id: "result", title: "Result", body: impact ?? "See stack and notes for the deeper rationale." },
        ].map((card) => (
          <Window key={card.id} title={`${card.id}.txt`}>
            <h2 className="display text-lg text-ink">{card.title}</h2>
            <p className="mt-2 text-sm text-ink-soft">{card.body}</p>
          </Window>
        ))}
      </div>

      <div className="prose-narrow mt-12 space-y-12">
        {children}

        {lab ? (
          <section id="try-it">
            <Window title="try-it.lab" status="interactive">
              <h2 className="display text-xl text-ink">Try it</h2>
              <p className="mt-2 text-sm text-ink-soft">
                A hands-on lab for the reliability idea behind this project.
              </p>
              <Button href={lab.href} className="mt-4">
                {lab.label} →
              </Button>
            </Window>
          </section>
        ) : null}

        {project.stack.length > 0 ? (
          <section id="stack">
            <h2 className="display text-2xl text-ink">
              {stackHasWhy ? "Stack · why this, not that" : "Stack"}
            </h2>
            {stackHasWhy ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-ink text-left">
                      <th className="py-2">Choice</th>
                      <th>Layer</th>
                      <th>Why</th>
                      <th>Alternative</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.stack
                      .filter((s) => s.why || s.alternative)
                      .map((s) => (
                        <tr key={s.name} className="border-b border-line">
                          <td className="py-2 pr-3 font-medium">{s.name}</td>
                          <td className="pr-3">
                            <Chip tone={s.layer === "frontend" ? "frontend" : "backend"}>
                              {s.layer}
                            </Chip>
                          </td>
                          <td className="pr-3 text-ink-soft">{s.why}</td>
                          <td className="text-ink-soft">{s.alternative}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <Chip key={s.name} tone={s.layer === "frontend" ? "frontend" : "backend"}>
                    {s.name}
                  </Chip>
                ))}
              </div>
            )}
          </section>
        ) : null}

        {project.decisions.length > 0 ? (
          <section id="decisions">
            <h2 className="display text-2xl text-ink">Decisions & trade-offs</h2>
            <div className="mt-4 space-y-3">
              {project.decisions.map((d, i) => (
                <Window key={i} title={`adr-${i + 1}.md`}>
                  <p className="text-sm">
                    <span className="font-medium">Context — </span>
                    <span className="text-ink-soft">{d.context}</span>
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium">Decision — </span>
                    <span className="text-ink-soft">{d.decision}</span>
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium">Consequence — </span>
                    <span className="text-ink-soft">{d.consequence}</span>
                  </p>
                </Window>
              ))}
            </div>
          </section>
        ) : null}

        {project.qa.length > 0 ? (
          <section id="qa">
            <h2 className="display text-2xl text-ink">Recruiter Q&A</h2>
            <div className="mt-4 space-y-2">
              {project.qa.map((item) => (
                <details key={item.q} className="win">
                  <summary className="win-titlebar cursor-pointer list-none">
                    <div className="win-dots" aria-hidden>
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="flex-1">{item.q}</span>
                  </summary>
                  <div className="win-body text-sm text-ink-soft">{item.a}</div>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {project.roadmap.length > 0 ? (
          <section id="roadmap">
            <h2 className="display text-2xl text-ink">If I had another month</h2>
            <ul className="mt-4 space-y-2">
              {project.roadmap.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-ink-soft">
                  <span className="tag shrink-0">→</span>
                  {r}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {story?.relatedNotes && story.relatedNotes.length > 0 ? (
          <section id="design-notes">
            <h2 className="display text-2xl text-ink">Related design notes</h2>
            <ul className="mt-3 space-y-2">
              {story.relatedNotes.map((slug) => (
                <li key={slug}>
                  <Link href={`/notes/${slug}`}>{noteTitle(slug)}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="flex flex-col gap-4 border-t-2 border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/work" className="text-sm">
            ← Back to work
          </Link>
          <div className="flex flex-wrap gap-4 text-sm">
            {prev ? (
              <Link href={`/work/${prev.slug}`}>← {prev.title}</Link>
            ) : (
              <span />
            )}
            {next ? <Link href={`/work/${next.slug}`}>{next.title} →</Link> : null}
          </div>
        </div>
      </div>
    </article>
  );
}
