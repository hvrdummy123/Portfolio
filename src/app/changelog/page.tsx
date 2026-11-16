import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Site updates for Harshita Ranka's portfolio.",
};

const ENTRIES = [
  {
    date: "2026-11-16",
    title: "Portfolio upgrade pass",
    items: [
      "Single profile.json / claims.json source of truth with content guards",
      "Role lens, evidence badges, case-study TOC/skim mode",
      "Puzzles page, chat-outbox case study, new labs",
      "SEO JSON-LD, RSS, recruiter summary, CI",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="container-site section-pad prose-narrow">
      <p className="eyebrow">Changelog</p>
      <h1 className="display text-4xl text-ink">Site updates</h1>
      <div className="mt-8 space-y-8">
        {ENTRIES.map((e) => (
          <section key={e.date}>
            <h2 className="display text-2xl text-ink">{e.title}</h2>
            <p className="mt-1 text-sm text-ink-soft">{e.date}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-soft">
              {e.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
