import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { notes } from "@/content/data/notes";
import { getNoteBody } from "@/content/data/noteBodies";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) return { title: "Design note" };
  const title = note.title.slice(0, 55);
  const description = note.excerpt.slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      title,
      description,
      url: `/notes/${note.slug}`,
      type: "article",
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) notFound();

  const body = getNoteBody(note.slug);
  const idx = notes.findIndex((n) => n.slug === slug);
  const prev = notes[idx - 1];
  const next = notes[idx + 1];

  return (
    <article className="container-site section-pad prose-narrow">
      <nav className="eyebrow" aria-label="Breadcrumb">
        <Link href="/notes" className="no-underline">
          Notes
        </Link>
        <span aria-hidden> · </span>
        <span>{note.title}</span>
        {note.series ? (
          <>
            <span aria-hidden> · </span>
            <span>
              {note.series}
              {note.part ? ` · Part ${note.part}` : ""}
            </span>
          </>
        ) : null}
      </nav>
      <h1 className="display mt-2 text-4xl text-ink">{note.title}</h1>
      <p className="mt-3 text-sm text-ink-soft">
        {note.date} · {note.readingMinutes} min read
      </p>
      <p className="mt-6 text-lg text-ink-soft">{note.excerpt}</p>

      <div className="mt-8 space-y-5">
        {body.map((para) => (
          <p key={para.slice(0, 48)} className="text-ink">
            {para}
          </p>
        ))}
      </div>

      <aside className="mt-10 border-t border-line pt-6 text-sm text-ink-soft">
        <p>
          These notes are the long-form companions to project pages: problem framing, alternatives,
          and why the chosen design was better under real constraints.
        </p>
        <p className="mt-3">
          <Link href="/work">Projects</Link>
          {" · "}
          <Link href="/notes">All design notes</Link>
        </p>
      </aside>

      <nav className="mt-10 flex justify-between gap-4 border-t border-line pt-6 text-sm">
        {prev ? (
          <Link href={`/notes/${prev.slug}`} className="max-w-[45%]">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/notes/${next.slug}`} className="max-w-[45%] text-right">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
