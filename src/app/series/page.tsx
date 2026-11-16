import type { Metadata } from "next";
import Link from "next/link";
import { seriesList } from "@/content/data/notes";

export const metadata: Metadata = { title: "Series" };

export default function SeriesIndexPage() {
  return (
    <div className="container-site section-pad">
      <p className="eyebrow">Series</p>
      <h1 className="display text-4xl text-ink">Read in order</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {seriesList.map((s) => (
          <Link key={s.slug} href={`/series/${s.slug}`} className="pixel-border block p-5 no-underline">
            <h2 className="display text-2xl text-ink">{s.title}</h2>
            <p className="mt-2 text-sm text-ink-soft">{s.description}</p>
            <p className="mt-3 text-xs text-ink-soft">{s.noteSlugs.length} parts</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
