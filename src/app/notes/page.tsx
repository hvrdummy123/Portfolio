import type { Metadata } from "next";
import Link from "next/link";
import { notes, seriesList } from "@/content/data/notes";

export const metadata: Metadata = {
  title: "Design notes",
  description:
    "System design decisions — alternatives considered, trade-offs, and why the final choice won.",
};

export default function NotesPage() {
  return (
    <div className="container-site section-pad pb-16">
      <h1 className="display text-4xl text-ink">Design notes</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Longer writing on system design: what the options were, what we picked, and why it was
        better for the constraints.
      </p>

      <p className="mt-6 text-sm text-ink-soft">
        Series:{" "}
        {seriesList.map((s, i) => (
          <span key={s.slug}>
            {i > 0 && " · "}
            <Link href={`/series/${s.slug}`}>{s.title}</Link>
          </span>
        ))}
      </p>

      <div className="mt-8">
        {notes.map((n) => (
          <Link key={n.slug} href={`/notes/${n.slug}`} className="list-row">
            <p className="list-row-title font-medium text-ink">{n.title}</p>
            <p className="mt-1 text-sm text-ink-soft">{n.excerpt}</p>
            <p className="mt-2 text-xs text-ink-soft">
              {n.date} · {n.readingMinutes} min
              {n.series ? ` · ${n.series}` : ""}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
