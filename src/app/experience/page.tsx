import type { Metadata } from "next";
import Link from "next/link";
import { resume } from "@/content/data/resume";

export const metadata: Metadata = {
  title: "Experience",
  description: "Atrium, Nomura, education, certifications, and achievements.",
};

export default function ExperiencePage() {
  const { identity, experience } = resume;

  return (
    <div className="container-site section-pad pb-16">
      <h1 className="display text-4xl text-ink">Experience</h1>

      <ol className="mt-8">
        {experience.map((job) => (
          <li key={job.id} className="list-row">
            <h2 className="font-medium text-ink">
              {job.title}, {job.company}
            </h2>
            <p className="text-sm text-ink-soft">
              {job.start} – {job.end}
              {"companyNote" in job && job.companyNote ? ` · ${job.companyNote}` : ""}
            </p>
            <p className="mt-2 text-xs text-ink-soft">{job.stack.join(" · ")}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-soft">
              {job.bullets.map((b) => (
                <li key={b.id}>
                  {b.text}
                  {"projectSlug" in b && b.projectSlug ? (
                    <>
                      {" "}
                      <Link href={`/work/${b.projectSlug}`}>Case study</Link>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
            {"aiDisclosure" in job && job.aiDisclosure && (
              <p className="mt-3 text-xs text-ink-soft">{job.aiDisclosure}</p>
            )}
          </li>
        ))}
      </ol>

      <section className="mt-12 space-y-6 border-t border-line pt-8">
        <div>
          <h2 className="display text-xl text-ink">Education</h2>
          <p className="mt-2 font-medium">
            {identity.education.degree}, {identity.education.school}
          </p>
          <p className="text-sm text-ink-soft">
            CGPA {identity.education.cgpa} · Class of {identity.education.classOf}
          </p>
        </div>
        <div>
          <h2 className="display text-xl text-ink">Certification</h2>
          <p className="mt-2">{identity.certification.name}</p>
          <p className="text-sm text-ink-soft">{identity.certification.topics.join(", ")}</p>
        </div>
        <div>
          <h2 className="display text-xl text-ink">Achievements</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
            {identity.achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="display text-xl text-ink">Coursework</h2>
          <p className="mt-2 text-sm text-ink-soft">{identity.coursework.join(" · ")}</p>
        </div>
      </section>
    </div>
  );
}
