import type { Metadata } from "next";
import Link from "next/link";
import {
  getResumeProject,
  pdfFilename,
  resumeVariants,
} from "@/content/data/resume";
import { ROLE_LABELS } from "@/content/data/types";
import { Window } from "@/components/ui/Window";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Resumes",
  description:
    "One-page Overleaf résumé variants — preview in-browser and download PDF.",
};

export default function ResumesPage() {
  return (
    <div className="container-site section-pad">
      <p className="eyebrow">Resumes</p>
      <h1 className="display text-4xl text-ink md:text-5xl">Pick your lens</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Same Overleaf one-page format as the master résumé — project order and skill emphasis
        change per role. Preview looks like the PDF; download is the compiled file.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {resumeVariants.map((v) => {
          const file = pdfFilename(v.slug);
          return (
            <Window
              key={v.slug}
              title={file}
              status={ROLE_LABELS[v.role] ?? v.title}
              className="flex flex-col"
            >
              <h2 className="display text-2xl text-ink">{v.title}</h2>
              <p className="mt-2 font-medium text-sm text-berry">
                {v.headline}
              </p>
              <p className="mt-3 text-sm text-ink-soft">{v.whyThisVersion}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {v.projectOrder.slice(0, 3).map((slug) => {
                  const p = getResumeProject(slug);
                  return <li key={slug}>• {p?.title ?? slug}</li>;
                })}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <Button href={`/resumes/${v.slug}?from=resumes`}>Preview</Button>
                <Button href={`/resumes/${file}`} variant="secondary">
                  Download PDF
                </Button>
                <Link href={`/for/${v.slug}`} className="self-center text-sm">
                  Role landing →
                </Link>
              </div>
            </Window>
          );
        })}
      </div>
    </div>
  );
}
