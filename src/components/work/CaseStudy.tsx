import Link from "next/link";
import type { Project } from "@/content/data/types";
import { STATUS_LABELS } from "@/content/data/types";
import { getNarrative } from "@/content/data/projectNarratives";
import { notes } from "@/content/data/notes";
import { projects } from "@/content/data/projects";
import { getProjectExtra } from "@/content/data/projectExtras";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import { Window } from "@/components/ui/Window";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { EvidenceBadge } from "@/components/ui/EvidenceBadge";
import { CaseStudyChrome } from "@/components/work/CaseStudyChrome";

const LAB_FOR: Record<string, { href: string; label: string }> = {
  paybench: { href: "/labs/paybench-timeout", label: "Break the payment" },
  "zkp-kyc": { href: "/labs/zk-cats", label: "Zero-knowledge with cats" },
  "d2c-ecommerce": { href: "/labs/d2c-order-lifecycle", label: "Order lifecycle" },
  "etf-backtesting": { href: "/labs/backtest-toy", label: "Backtest toy" },
  "atrium-engineering": { href: "/labs/outbox-playground", label: "Outbox playground" },
};

function noteTitle(slug: string) {
  return notes.find((n) => n.slug === slug)?.title ?? slug;
}

function evidenceForSource(source: string): "verifiable" | "private" | "illustrative" {
  const s = source.toLowerCase();
  if (s.includes("readme") || s.includes("repo") || s.includes("pytest") || s.includes("ci")) {
    return "verifiable";
  }
  if (s.includes("synthetic") || s.includes("illustrative") || s.includes("toy")) {
    return "illustrative";
  }
  return "private";
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
  const extra = getProjectExtra(project.slug);
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

  const toc = [
    { id: "tldr", label: "TL;DR" },
    project.stats.length ? { id: "metrics", label: "Metrics" } : null,
    children ? { id: "context", label: "Context" } : null,
    extra?.diagrams?.length ? { id: "architecture", label: "Architecture" } : null,
    project.stack.length ? { id: "stack", label: "Stack" } : null,
    project.decisions.length ? { id: "decisions", label: "Decisions" } : null,
    extra?.howTested?.length ? { id: "tested", label: "How tested" } : null,
    extra?.threatModel ? { id: "threat", label: "Threat model" } : null,
    extra?.research ? { id: "research", label: "Research" } : null,
    extra?.limitations ? { id: "limitations", label: "Limitations" } : null,
    lab ? { id: "try-it", label: "Try it" } : null,
    project.qa.length ? { id: "qa", label: "Q&A" } : null,
    project.roadmap.length ? { id: "roadmap", label: "Next" } : null,
    story?.relatedNotes?.length ? { id: "design-notes", label: "Notes" } : null,
  ].filter(Boolean) as { id: string; label: string }[];

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
          <div className="mt-6 overflow-hidden rounded-[var(--radius)] border-2 border-border bg-cream empty:hidden">
            <ProjectMedia slug={project.slug} />
          </div>
        ) : null}
      </Window>

      {project.sourceNote ? (
        <p className="mt-4 text-sm text-ink-soft">{project.sourceNote}</p>
      ) : null}

      <div className="mt-10">
        <CaseStudyChrome toc={toc}>
          <section id="tldr" className="case-section">
            <h2 className="display text-ink">TL;DR</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { id: "problem", title: "Problem", body: problem },
                { id: "built", title: "What I built", body: solution },
                {
                  id: "result",
                  title: "Result",
                  body: impact,
                },
              ]
                .filter((c) => c.body)
                .map((card) => (
                  <Window key={card.id} title={`${card.id}.txt`}>
                    <h3 className="display text-lg text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{card.body}</p>
                  </Window>
                ))}
            </div>
          </section>

          {project.stats.length > 0 ? (
            <section id="metrics" className="case-section">
              <h2 className="display text-ink">Key metrics</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.stats.map((s) => (
                  <div key={s.label} className="win" title={s.source}>
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
                      <div className="mt-2 flex justify-center">
                        <EvidenceBadge level={evidenceForSource(s.source)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {children ? (
            <section id="context" className="case-section">
              <h2 className="display text-ink">Context</h2>
              <div className="space-y-4">{children}</div>
            </section>
          ) : null}

          {extra?.diagrams?.map((d) => (
            <section id="architecture" className="case-section" key={d.title}>
              <h2 className="display text-ink">{d.title}</h2>
              <div
                className="diagram-frame"
                dangerouslySetInnerHTML={{ __html: d.svg }}
              />
              <p className="diagram-caption">{d.caption}</p>
            </section>
          ))}

          {project.stack.length > 0 ? (
            <section id="stack" className="case-section">
              <h2 className="display text-ink">
                {stackHasWhy ? "Stack · why this, not that" : "Stack"}
              </h2>
              {stackHasWhy ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-border text-left">
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
                <div className="flex flex-wrap gap-2">
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
            <section id="decisions" className="case-section">
              <h2 className="display text-ink">Key decisions</h2>
              <div className="space-y-3">
                {project.decisions.map((d, i) => (
                  <Window key={i} title={`adr-${i + 1}.md`}>
                    <p className="text-sm">
                      <span className="font-medium text-ink">Context — </span>
                      <span className="text-ink-soft">{d.context}</span>
                    </p>
                    <p className="mt-2 text-sm">
                      <span className="font-medium text-ink">Decision — </span>
                      <span className="text-ink-soft">{d.decision}</span>
                    </p>
                    <p className="mt-2 text-sm">
                      <span className="font-medium text-ink">Consequence — </span>
                      <span className="text-ink-soft">{d.consequence}</span>
                    </p>
                  </Window>
                ))}
              </div>
            </section>
          ) : null}

          {extra?.howTested?.length ? (
            <section id="tested" className="case-section">
              <h2 className="display text-ink">How I tested it</h2>
              <ul className="list-disc space-y-2 text-sm text-ink-soft">
                {extra.howTested.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {extra?.threatModel ? (
            <section id="threat" className="case-section">
              <h2 className="display text-ink">{extra.threatModel.title}</h2>
              <ul className="list-disc space-y-2 text-sm text-ink-soft">
                {extra.threatModel.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {extra?.research ? (
            <section id="research" className="case-section">
              <h2 className="display text-ink">Research</h2>
              <Callout title={extra.research.title} tone="info">
                <p>{extra.research.blurb}</p>
                <p className="mt-2">
                  <a href={extra.research.href} target="_blank" rel="noreferrer">
                    Open PDF
                  </a>
                </p>
              </Callout>
            </section>
          ) : null}

          {extra?.verifyCommands?.length ? (
            <section id="verify" className="case-section">
              <h2 className="display text-ink">Verify it yourself</h2>
              <pre className="overflow-x-auto rounded-[var(--radius)] border-2 border-border bg-surface-2 p-4 font-[family-name:var(--font-jetbrains)] text-xs">
                {extra.verifyCommands.join("\n")}
              </pre>
            </section>
          ) : null}

          {extra?.limitations ? (
            <section id="limitations" className="case-section">
              <h2 className="display text-ink">Limitations</h2>
              <Callout tone="warning" title="Honest limits">
                {extra.limitations}
              </Callout>
            </section>
          ) : null}

          {lab ? (
            <section id="try-it" className="case-section">
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

          {project.qa.length > 0 ? (
            <section id="qa" className="case-section">
              <h2 className="display text-ink">Recruiter Q&A</h2>
              <div className="space-y-2">
                {project.qa.map((item) => (
                  <details key={item.q} className="win">
                    <summary className="win-titlebar cursor-pointer list-none">
                      <div className="win-dots" aria-hidden>
                        <span />
                        <span />
                        <span />
                      </div>
                      <span className="flex-1 font-[family-name:var(--font-dm-sans)] text-sm text-ink">
                        {item.q}
                      </span>
                    </summary>
                    <div className="win-body text-sm text-ink-soft">{item.a}</div>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {project.roadmap.length > 0 ? (
            <section id="roadmap" className="case-section">
              <h2 className="display text-ink">If I had another month</h2>
              <ul className="space-y-2">
                {project.roadmap.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-ink-soft">
                    <span className="tag shrink-0" aria-hidden>
                      →
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {story?.relatedNotes && story.relatedNotes.length > 0 ? (
            <section id="design-notes" className="case-section">
              <h2 className="display text-ink">Related notes</h2>
              <ul className="space-y-2">
                {story.relatedNotes.map((slug) => (
                  <li key={slug}>
                    <Link href={`/notes/${slug}`}>{noteTitle(slug)}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/work" className="text-sm">
              ← Back to work
            </Link>
            <div className="flex flex-wrap gap-4 text-sm">
              {prev ? <Link href={`/work/${prev.slug}`}>← {prev.title}</Link> : <span />}
              {next ? <Link href={`/work/${next.slug}`}>{next.title} →</Link> : null}
            </div>
          </div>
        </CaseStudyChrome>
      </div>
    </article>
  );
}
