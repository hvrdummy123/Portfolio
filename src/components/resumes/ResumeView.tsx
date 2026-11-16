"use client";

import { useMemo, useState } from "react";
import {
  pdfFilename,
  projectsForVariant,
  resume as resumeData,
  type ResumeVariant,
} from "@/content/data/resume";
import { OverleafResume } from "@/components/resumes/OverleafResume";
import "@/app/resumes/overleaf.css";

type Props = {
  variant: ResumeVariant;
};

export function ResumeView({ variant }: Props) {
  const [showDiff, setShowDiff] = useState(false);
  const projects = projectsForVariant(variant);
  const file = pdfFilename(variant.slug);

  const plain = useMemo(() => {
    const id = resumeData.identity;
    const lines = [
      id.name,
      id.phone,
      id.email,
      id.linkedinDisplay,
      id.githubDisplay,
      `${id.education.degree}, ${id.education.school}`,
      `${id.education.cgpa} CGPA · Class of ${id.education.classOf}`,
      "",
      "WORK EXPERIENCE",
      ...resumeData.experience.flatMap((job) => [
        `${job.title} | ${job.company}  ${job.startLabel}`,
        job.stackLine,
        ...job.bullets.map((b) => `• ${b.text}`),
        "",
      ]),
      "PROJECTS",
      ...projects.flatMap((p) => [
        `${p.title} (${p.year})`,
        `Tools: ${p.tools}`,
        ...p.bullets.map((b) => `• ${b}`),
        "",
      ]),
      "TECHNICAL SKILLS",
      `Programming: ${resumeData.skills.programming.join(", ")}`,
      `Frameworks: ${resumeData.skills.frameworks.join(", ")}`,
      `Cloud: ${resumeData.skills.cloud}`,
      `Achievements: ${id.achievements.join("; ")}`,
      `Course Work: ${id.coursework.join(", ")}`,
    ];
    return lines.join("\n");
  }, [projects]);

  return (
    <div className="mt-6">
      <div className="mb-4 flex flex-wrap gap-2 print:hidden">
        <a className="btn" href={`/resumes/${file}`} download={file} id="download">
          Download PDF
        </a>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShowDiff((v) => !v)}
        >
          {showDiff ? "Hide emphasis" : "What this version emphasizes"}
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
        <button type="button" className="btn btn-ghost" onClick={() => window.print()}>
          Print
        </button>
      </div>

      {showDiff ? (
        <p className="mb-4 rounded-lg border-2 border-ink bg-butter/40 p-3 text-sm print:hidden">
          Green highlights mark experience bullets and the project set chosen for this role. Layout
          matches the Overleaf one-pager.
        </p>
      ) : null}

      <div className="mx-auto overflow-x-auto rounded-[12px] border-2 border-ink bg-[#e8e4dc] p-3 shadow-[4px_4px_0_var(--ink)] print:border-0 print:bg-transparent print:p-0 print:shadow-none">
        <OverleafResume
          variant={variant}
          showDiff={showDiff}
          className="shadow-[0_8px_24px_rgba(0,0,0,0.12)] print:shadow-none"
        />
      </div>
      <p className="mt-3 text-center text-xs text-ink-soft print:hidden">
        Preview of the one-page Overleaf résumé ·{" "}
        <a href={`/resumes/${file}`} download={file}>
          {file}
        </a>
      </p>
    </div>
  );
}
