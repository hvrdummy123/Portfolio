import type { Metadata } from "next";
import Link from "next/link";
import { resume } from "@/content/data/resume";
import { profile } from "@/content/profile";
import { Window } from "@/components/ui/Window";
import { Chip } from "@/components/ui/Chip";
import { PixelCat } from "@/components/cats/PixelCat";

export const metadata: Metadata = {
  title: "Experience",
  description: "Atrium, Nomura, education, certifications, and achievements.",
};

const BULLET_LINKS: Record<string, string> = {
  "atrium-auth": "/work/atrium-engineering",
  "atrium-chat": "/work/atrium-engineering",
  "atrium-admin": "/work/atrium-engineering",
  "atrium-cli": "/work/atrium-engineering",
  "nomura-platform": "/work/nomura-engineering",
  "nomura-batch": "/work/nomura-engineering",
  "nomura-cicd": "/work/nomura-engineering",
};

function formatDates(start: string, end: string) {
  const label = (s: string) => {
    if (s === "Present") return "Present";
    const [y, m] = s.split("-");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[Number(m) - 1] ?? m} ${y}`;
  };
  return `${label(start)} – ${label(end)}`;
}

export default function ExperiencePage() {
  const { identity, experience } = resume;

  return (
    <div className="container-site section-pad pb-16">
      <h1 className="display text-4xl text-ink">Experience</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Two roles that matter for hiring: <strong className="text-ink">Atrium</strong> (SDE,
        current) and <strong className="text-ink">Nomura</strong> (ITD Intern). Same bullets as the
        résumé.
      </p>

      <div className="relative mt-10 space-y-6 before:absolute before:bottom-8 before:left-5 before:top-8 before:w-0.5 before:bg-ink/25">
        {experience.map((job, i) => (
          <div key={job.id} className="relative pl-12">
            <div className="absolute left-2 top-4 grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-butter">
              <PixelCat pose={i === 0 ? "sit" : "walk"} scale={1.1} />
            </div>
            <Window
              title={`${job.company.toLowerCase()}.role`}
              status={formatDates(job.start, job.end)}
            >
              <div className="mb-2 flex flex-wrap gap-2">
                <Chip tone={job.id === "atrium" ? "ai" : "fintech"}>
                  {job.id === "atrium" ? "Current role" : "Internship"}
                </Chip>
              </div>
              <h2 className="display text-2xl text-ink">
                {job.title}, {job.company}
              </h2>
              {"companyNote" in job && job.companyNote ? (
                <p className="mt-1 text-sm text-ink-soft">{job.companyNote}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.stack
                  .filter((s) => !/claude|codex/i.test(s))
                  .map((s) => (
                    <Chip
                      key={s}
                      tone={
                        /auth|postgres|node|java|spring|docker|redis/i.test(s)
                          ? "backend"
                          : /react|next|vite/i.test(s)
                            ? "frontend"
                            : "infra"
                      }
                    >
                      {s}
                    </Chip>
                  ))}
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-soft">
                {job.bullets.map((b) => {
                  const href =
                    BULLET_LINKS[b.id] ??
                    ("projectSlug" in b && typeof b.projectSlug === "string"
                      ? `/work/${b.projectSlug}`
                      : null);
                  return (
                    <li key={b.id}>
                      <span className="text-ink">{b.text}</span>
                      {href ? (
                        <>
                          {" "}
                          <Link href={href} className="text-sm">
                            Detail →
                          </Link>
                        </>
                      ) : null}
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
            <p className="text-sm text-ink-soft">
              CGPA {identity.education.cgpa} · June 2026
            </p>
          </Window>
        </div>

        <div className="relative pl-12">
          <div className="absolute left-2 top-4 grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-lavender">
            <PixelCat pose="celebrate" scale={1.1} />
          </div>
          <Window title="cert.badge">
            <h2 className="display text-xl text-ink">Certification</h2>
            <p className="mt-2">{profile.certification.name}</p>
            <p className="text-sm text-ink-soft">{profile.certification.topics.join(" · ")}</p>
          </Window>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="display text-2xl text-ink">Achievements</h2>
        <p className="mt-1 text-sm text-ink-soft">Hackathons, olympiads, and math competitions.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profile.achievements.map((a) => {
            const math = /INMO|RMO|math/i.test(a.title);
            return (
              <Window
                key={a.id}
                title={math ? "math.trophy" : a.id === "jpmorgan-cfg" ? "cfg.trophy" : "trophy.card"}
                className={math ? "ring-2 ring-butter" : undefined}
              >
                <p className="text-sm font-medium text-ink">{a.title}</p>
                {"detail" in a && a.detail ? (
                  <p className="mt-2 text-xs text-ink-soft">{a.detail}</p>
                ) : null}
              </Window>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="display text-xl text-ink">Coursework</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.coursework.map((c) => (
            <Chip key={c} tone="backend">
              {c}
            </Chip>
          ))}
        </div>
      </section>
    </div>
  );
}
