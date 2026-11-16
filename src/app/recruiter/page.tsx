import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { getClaim } from "@/content/profile";
import { getProject } from "@/content/data/projects";
import { Button } from "@/components/ui/Button";
import { Window } from "@/components/ui/Window";
import { Chip } from "@/components/ui/Chip";

export const metadata: Metadata = {
  title: "Recruiter summary",
  description: "One-page hiring summary for Harshita Ranka.",
};

const TOP = ["paybench", "atrium-engineering", "zkp-kyc"] as const;

export default function RecruiterPage() {
  const proofs = ["batch-speedup-pct", "chat-outbox-scenarios", "paybench-mutations"]
    .map((id) => getClaim(id))
    .filter(Boolean);

  return (
    <div className="container-site section-pad print:max-w-none">
      <p className="eyebrow no-print">Recruiter mode</p>
      <h1 className="display text-4xl text-ink">{profile.name}</h1>
      <p className="mt-2 text-ink-soft">
        {profile.title} · {profile.location} · {profile.graduationLabel} · CGPA{" "}
        {profile.education.cgpa}
      </p>
      <p className="mt-2 text-sm text-ink-soft">{profile.availability}</p>
      <p className="mt-4 max-w-2xl">{profile.hero.headline}</p>

      <div className="mt-6 flex flex-wrap gap-3 no-print">
        <Button href="/resumes">Download résumé</Button>
        <Button href={`mailto:${profile.email}`} variant="secondary">
          Email
        </Button>
        <Button href={profile.linkedin} variant="ghost">
          LinkedIn
        </Button>
      </div>

      <section className="mt-10">
        <h2 className="display text-2xl">Top proofs</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {proofs.map((c) => (
            <li key={c!.id} className="win">
              <div className="win-body">
                <p className="stat-value text-xl">
                  {c!.value}
                  {c!.unit ? ` ${c!.unit}` : ""}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{c!.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl">Top projects</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {TOP.map((slug) => {
            const p = getProject(slug);
            if (!p) return null;
            return (
              <Window key={slug} title={slug}>
                <h3 className="display text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{p.pitch}</p>
                <Link href={`/work/${slug}`} className="mt-3 inline-block text-sm no-print">
                  Case study →
                </Link>
              </Window>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl">Experience</h2>
        <ul className="mt-3 space-y-4">
          {profile.experience.map((job) => (
            <li key={job.id}>
              <p className="font-medium">
                {job.title}, {job.company}{" "}
                <span className="text-sm text-ink-soft">({job.startLabel})</span>
              </p>
              <ul className="mt-1 list-disc pl-5 text-sm text-ink-soft">
                {job.bullets.slice(0, 2).map((b) => (
                  <li key={b.id}>{b.text}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl">Skills</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[...profile.skills.languages, ...profile.skills.frameworks.slice(0, 6)].map((s) => (
            <Chip key={s} tone="backend">
              {s}
            </Chip>
          ))}
        </div>
      </section>
    </div>
  );
}
