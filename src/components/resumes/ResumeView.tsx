"use client";

import { useMemo, useState } from "react";
import { resume as resumeData, type ResumeVariant } from "@/content/data/resume";
import type { Project } from "@/content/data/types";

type Props = {
  variant: ResumeVariant;
  resume: typeof resumeData;
  projects: (Project | undefined)[];
};

export function ResumeView({ variant, resume, projects }: Props) {
  const [showDiff, setShowDiff] = useState(false);
  const generalOrder = resume.projects.map((p) => p.slug);

  const plain = useMemo(() => {
    const lines = [
      resume.identity.name,
      variant.headline,
      resume.identity.email,
      resume.identity.linkedin,
      resume.identity.github,
      "",
      variant.summary,
      "",
      "SKILLS",
      variant.skillsOrder.join(", "),
      "",
      "EXPERIENCE",
      ...resume.experience.flatMap((job) => [
        `${job.title} | ${job.company} | ${job.start} – ${job.end}`,
        ...job.bullets.map((b) => `• ${b.text}`),
        "",
      ]),
      "PROJECTS",
      ...projects.filter(Boolean).map((p) => `• ${p!.title}: ${p!.pitch}`),
      "",
      `EDUCATION: ${resume.identity.education.degree}, ${resume.identity.education.school}, CGPA ${resume.identity.education.cgpa}`,
      `ACHIEVEMENTS: ${resume.identity.achievements.join("; ")}`,
    ];
    return lines.join("\n");
  }, [variant, resume, projects]);

  return (
    <div className="mt-8">
      <div className="mb-4 flex flex-wrap gap-2 print:hidden">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowDiff((v) => !v)}
        >
          {showDiff ? "Hide diff" : "What changed vs general"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={async () => {
            await navigator.clipboard.writeText(plain);
          }}
        >
          Copy plain text
        </button>
        <button type="button" className="btn" onClick={() => window.print()}>
          Print / PDF
        </button>
      </div>

      {showDiff && (
        <p className="mb-4 rounded-lg border-2 border-ink bg-butter/40 p-3 text-sm print:hidden">
          Highlighted items differ in order/emphasis from the general resume project list (
          {generalOrder.join(", ")}).
        </p>
      )}

      <article className="card mx-auto max-w-[720px] bg-surface p-6 text-[13px] leading-snug print:border-0 print:shadow-none">
        <header className="border-b-2 border-ink pb-3 text-center">
          <h2 className="display text-2xl">{resume.identity.name}</h2>
          <p className="font-medium">{variant.headline}</p>
          <p className="text-ink-soft">
            {resume.identity.email} · linkedin.com/in/harshita-vivek-ranka · github.com/hvrdummy123
          </p>
        </header>

        <section className="mt-3">
          <h3 className="font-[family-name:var(--font-pixelify)] text-sm uppercase">Summary</h3>
          <p>{variant.summary}</p>
        </section>

        <section className="mt-3">
          <h3 className="font-[family-name:var(--font-pixelify)] text-sm uppercase">Skills</h3>
          <p className={showDiff ? "bg-mint/50" : undefined}>{variant.skillsOrder.join(" · ")}</p>
        </section>

        <section className="mt-3">
          <h3 className="font-[family-name:var(--font-pixelify)] text-sm uppercase">Experience</h3>
          {resume.experience.map((job) => (
            <div key={job.id} className="mt-2">
              <p className="font-semibold">
                {job.title} | {job.company} | {job.start} – {job.end}
              </p>
              <ul className="list-disc pl-4">
                {job.bullets.map((b) => (
                  <li
                    key={b.id}
                    className={
                      showDiff && variant.experienceHighlights.includes(b.id)
                        ? "bg-mint/50"
                        : undefined
                    }
                  >
                    {b.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-3">
          <h3 className="font-[family-name:var(--font-pixelify)] text-sm uppercase">Projects</h3>
          <ul className="mt-1 list-disc pl-4">
            {projects.filter(Boolean).map((p) => (
              <li key={p!.slug} className={showDiff ? "bg-mint/50" : undefined}>
                <strong>{p!.title}</strong> — {p!.pitch}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-3">
          <h3 className="font-[family-name:var(--font-pixelify)] text-sm uppercase">Education</h3>
          <p>
            {resume.identity.education.degree}, {resume.identity.education.school} · CGPA{" "}
            {resume.identity.education.cgpa} · Class of {resume.identity.education.classOf}
          </p>
        </section>

        <section className="mt-3">
          <h3 className="font-[family-name:var(--font-pixelify)] text-sm uppercase">
            Achievements
          </h3>
          <p>{resume.identity.achievements.join(" · ")}</p>
        </section>
      </article>
    </div>
  );
}
