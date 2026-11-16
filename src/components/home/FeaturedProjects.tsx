"use client";

import Link from "next/link";
import { projectsForRole } from "@/content/data/projects";
import { STATUS_LABELS } from "@/content/data/types";
import { usePrefs } from "@/components/providers/PrefsProvider";
import { getNarrative } from "@/content/data/projectNarratives";
import { Window } from "@/components/ui/Window";
import { Chip } from "@/components/ui/Chip";

export function FeaturedProjects() {
  const { role } = usePrefs();
  const ranked = projectsForRole(role).slice(0, 6);
  const [flagship, midA, midB, ...rest] = ranked;

  return (
    <section className="section-pad">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="display text-2xl text-ink">Featured work</h2>
        <Link href="/work" className="text-sm">
          All projects
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-6">
        {flagship ? (
          <Link
            href={`/work/${flagship.slug}`}
            className="no-underline md:col-span-4 md:row-span-2"
          >
            <Window
              title={`${flagship.slug}.app`}
              status={flagship.stack
                .slice(0, 4)
                .map((s) => s.name)
                .join(" · ")}
              className="h-full"
              bodyClassName="min-h-[200px]"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                <Chip>{STATUS_LABELS[flagship.status]}</Chip>
                {flagship.domainTags.slice(0, 2).map((d) => (
                  <Chip key={d} tone="fintech">
                    {d}
                  </Chip>
                ))}
              </div>
              <h3 className="display text-2xl text-ink md:text-3xl">{flagship.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">
                {getNarrative(flagship.slug)?.impact ??
                  getNarrative(flagship.slug)?.solution ??
                  flagship.pitch}
              </p>
              <div className="mt-4 h-28 rounded-lg border-2 border-ink bg-gradient-to-br from-mint via-sky to-lavender" />
            </Window>
          </Link>
        ) : null}

        {[midA, midB].filter(Boolean).map((p) => (
          <Link key={p!.slug} href={`/work/${p!.slug}`} className="no-underline md:col-span-2">
            <Window title={`${p!.slug}.exe`} status={STATUS_LABELS[p!.status]} className="h-full">
              <h3 className="display text-lg text-ink">{p!.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-ink-soft">
                {getNarrative(p!.slug)?.impact ??
                  getNarrative(p!.slug)?.solution ??
                  p!.pitch}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {p!.stack.slice(0, 3).map((s) => (
                  <Chip key={s.name} tone="backend">
                    {s.name}
                  </Chip>
                ))}
              </div>
            </Window>
          </Link>
        ))}

        {rest.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="no-underline md:col-span-2">
            <Window title={p.slug} status={STATUS_LABELS[p.status]} className="h-full">
              <h3 className="display text-base text-ink">{p.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{p.pitch}</p>
            </Window>
          </Link>
        ))}
      </div>
    </section>
  );
}
