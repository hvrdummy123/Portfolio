import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { notes, seriesList } from "@/content/data/notes";

export function generateStaticParams() {
  return seriesList.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = seriesList.find((s) => s.slug === slug);
  return { title: series?.title ?? "Series" };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = seriesList.find((s) => s.slug === slug);
  if (!series) notFound();

  const parts = series.noteSlugs
    .map((s) => notes.find((n) => n.slug === s))
    .filter(Boolean);

  return (
    <div className="container-site section-pad">
      <p className="pixel-label">Series</p>
      <h1 className="display text-4xl text-ink">{series.title}</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">{series.description}</p>
      <ol className="mt-8 space-y-3">
        {parts.map((n, i) => (
          <li key={n!.slug} className="pixel-border p-4">
            <p className="pixel-label">Part {i + 1}</p>
            <Link href={`/notes/${n!.slug}`} className="display text-xl text-ink">
              {n!.title}
            </Link>
            <p className="mt-1 text-sm text-ink-soft">{n!.excerpt}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
