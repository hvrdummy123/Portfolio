import type { Metadata } from "next";
import Link from "next/link";
import { resume } from "@/content/data/resume";
import { Window } from "@/components/ui/Window";
import { Chip } from "@/components/ui/Chip";
import { PixelCat } from "@/components/cats/PixelCat";

export const metadata: Metadata = {
  title: "Experience",
  description: "Atrium, Nomura, education, certifications, and achievements.",
};

const BULLET_LINKS: Record<string, string> = {
  "atrium-chat": "/labs/outbox-playground",
  "nomura-platform": "/work/nomura-engineering",
  "nomura-batch": "/work/nomura-engineering",
  "nomura-cicd": "/work/nomura-engineering",
};

export default function ExperiencePage() {
  const { identity, experience } = resume;
  const certUrl = identity.certification.verificationUrl;

  return (
    <div className="container-site section-pad pb-16">
      <h1 className="display text-4xl text-ink">Experience</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        A pixel path from internship to startup — expandable bullets, coloured stack chips.
      </p>

      <div className="relative mt-10 space-y-6 before:absolute before:bottom-8 before:left-5 before:top-8 before:w-0.5 before:bg-ink/25">
        {experience.map((job, i) => (
          <div key={job.id} className="relative pl-12">
            <div className="absolute left-2 top-4 grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-butter">
              <PixelCat pose={i === 0 ? "sit" : "walk"} scale={1.1} />
            </div>
            <Window
              title={`${job.company.toLowerCase().replace(/\s+/g, "-")}.role`}
              status={`${job.start} – ${job.end}`}
            >
              <h2 className="display text-2xl text-ink">
                {job.title}, {job.company}
              </h2>
              {"companyNote" in job && job.companyNote ? (
                <p className="mt-1 text-sm text-ink-soft">{job.companyNote}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.stack.map((s) => (
                  <Chip
                    key={s}
                    tone={
                      /auth|postgres|node|java|spring|docker|redis/i.test(s)
                        ? "backend"
                        : /react|next|vite/i.test(s)
                          ? "frontend"
                          : /claude|codex|ai/i.test(s)
                            ? "ai"
                            : "infra"
                    }
                  >
                    {s}
                  </Chip>
                ))}
              </div>
              <ul className="mt-4 space-y-3">
                {job.bullets.map((b) => {
                  const href =
                    ("projectSlug" in b && b.projectSlug
                      ? `/work/${b.projectSlug}`
                      : BULLET_LINKS[b.id]) ?? null;
                  return (
                    <li key={b.id} className="text-sm text-ink-soft">
                      <details>
                        <summary className="cursor-pointer font-medium text-ink">
                          {b.text.slice(0, 90)}
                          {b.text.length > 90 ? "…" : ""}
                        </summary>
                        <p className="mt-2">{b.text}</p>
                        {href ? (
                          <Link href={href} className="mt-2 inline-block text-sm">
                            Open detail →
                          </Link>
                        ) : null}
                      </details>
                    </li>
                  );
                })}
              </ul>
            </Window>
          </div>
        ))}

        <div className="relative pl-12">
          <div className="absolute left-2 top-4 grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-mint">
            <PixelCat pose="think" scale={1.1} />
          </div>
          <Window title="education.node" status={`Class of ${identity.education.classOf}`}>
            <h2 className="display text-xl text-ink">Education</h2>
            <p className="mt-2 font-medium">
              {identity.education.degree}, {identity.education.school}
            </p>
            <p className="text-sm text-ink-soft">CGPA {identity.education.cgpa}</p>
          </Window>
        </div>

        <div className="relative pl-12">
          <div className="absolute left-2 top-4 grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-lavender">
            <PixelCat pose="celebrate" scale={1.1} />
          </div>
          <Window title="cert.badge">
            <h2 className="display text-xl text-ink">Certification</h2>
            <p className="mt-2">{identity.certification.name}</p>
            <p className="text-sm text-ink-soft">{identity.certification.topics.join(", ")}</p>
            {certUrl ? (
              <a href={certUrl} className="mt-2 inline-block text-sm" target="_blank" rel="noreferrer">
                Verify credential
              </a>
            ) : null}
          </Window>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="display text-2xl text-ink">Achievements</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {identity.achievements.map((a) => (
            <Window key={a} title="trophy.card">
              <p className="text-sm font-medium text-ink">{a}</p>
            </Window>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="display text-xl text-ink">Coursework</h2>
        <p className="mt-2 text-sm text-ink-soft">{identity.coursework.join(" · ")}</p>
      </section>
    </div>
  );
}
