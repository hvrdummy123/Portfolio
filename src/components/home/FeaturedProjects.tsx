"use client";

import Link from "next/link";
import { projectsForRole } from "@/content/data/projects";
import { STATUS_LABELS } from "@/content/data/types";
import { usePrefs } from "@/components/providers/PrefsProvider";
import { getNarrative } from "@/content/data/projectNarratives";

export function FeaturedProjects() {
  const { role } = usePrefs();
  const ranked = projectsForRole(role).slice(0, 5);

  return (
    <section className="section-pad pt-4">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <h2 className="display text-2xl text-ink">Work</h2>
        <Link href="/work" className="text-sm">
          All projects
        </Link>
      </div>
      <div>
        {ranked.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="list-row">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="list-row-title font-medium text-ink">{p.title}</span>
              <span className="text-sm text-ink-soft">{STATUS_LABELS[p.status]}</span>
            </div>
            <p className="mt-1 text-sm text-ink-soft">
              {getNarrative(p.slug)?.problem ?? p.pitch}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
