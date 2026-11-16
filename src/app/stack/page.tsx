import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { projects } from "@/content/data/projects";
import { Chip } from "@/components/ui/Chip";

export const metadata: Metadata = {
  title: "Stack",
  description: "Skills grouped by area, linked to projects that used them.",
};

const GROUPS: { key: keyof typeof profile.skills; title: string }[] = [
  { key: "languages", title: "Languages" },
  { key: "frameworks", title: "Backend & frameworks" },
  { key: "data", title: "Data" },
  { key: "devops", title: "DevOps" },
  { key: "blockchain", title: "Blockchain / ZK" },
  { key: "aiAgents", title: "AI / Agents" },
  { key: "cloud", title: "Cloud" },
];

function projectsForSkill(skill: string) {
  const needle = skill.toLowerCase().split(/[\/(]/)[0]!.trim();
  return projects.filter((p) =>
    p.stack.some(
      (s) =>
        s.name.toLowerCase().includes(needle) ||
        needle.includes(s.name.toLowerCase().slice(0, 6)),
    ),
  );
}

export default function StackPage() {
  return (
    <div className="container-site section-pad">
      <p className="eyebrow">Skills</p>
      <h1 className="display text-4xl text-ink">Skills matrix</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Grouped from the résumé. Each chip links to projects that list related tech — no percentage
        bars.
      </p>

      <div className="mt-10 space-y-10">
        {GROUPS.map((g) => (
          <section key={g.key}>
            <h2 className="display text-2xl text-ink">{g.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.skills[g.key].map((skill) => {
                const hits = projectsForSkill(skill);
                const href = hits[0] ? `/work/${hits[0].slug}` : "/work";
                return (
                  <Link key={skill} href={href} className="no-underline" title={hits.map((p) => p.title).join(", ") || undefined}>
                    <Chip tone="backend">{skill}</Chip>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
