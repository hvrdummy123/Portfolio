import type { Metadata } from "next";
import Link from "next/link";
import { resumeVariants } from "@/content/data/resume";

export const metadata: Metadata = {
  title: "Resumes",
  description: "Role-targeted resume variants generated from one source of truth.",
};

export default function ResumesPage() {
  return (
    <div className="container-site section-pad">
      <p className="eyebrow">Resumes</p>
      <h1 className="display text-4xl text-ink md:text-5xl">Pick your lens</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Same facts, re-ordered for the role. Diff toggle on each page shows what changed vs the
        general ordering.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {resumeVariants.map((v) => (
          <div key={v.slug} className="pixel-border flex flex-col p-5">
            <h2 className="display text-2xl text-ink">{v.title}</h2>
            <p className="mt-2 font-[family-name:var(--font-pixelify)] text-sm text-accent">
              {v.headline}
            </p>
            <p className="mt-3 text-sm text-ink-soft">{v.whyThisVersion}</p>
            <ul className="mt-3 list-disc pl-5 text-sm">
              {v.projectOrder.slice(0, 3).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              <Link href={`/resumes/${v.slug}?from=resumes`} className="btn">
                Preview
              </Link>
              <Link href={`/resumes/${v.slug}?from=resumes#download`} className="btn btn-secondary">
                Download
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
