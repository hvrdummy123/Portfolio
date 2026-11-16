import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsForRole } from "@/content/data/projects";
import { resumeVariants } from "@/content/data/resume";
import { ROLE_LABELS, type Role } from "@/content/data/types";
import { siteConfig } from "@/content/data/site.config";
import { Window } from "@/components/ui/Window";
import { Button } from "@/components/ui/Button";
import { getNarrative } from "@/content/data/projectNarratives";
import { RefGreeting } from "@/components/for/RefGreeting";

const ROLES = Object.keys(ROLE_LABELS) as Role[];

const HERO: Record<Role, string> = {
  backend: "I design backends that survive timeouts, replays, and relay crashes.",
  fullstack: "I ship full-stack products with clear failure modes and honest status.",
  "ai-agents": "I evaluate agents on ledger truth — not fluent chat.",
  blockchain: "I build zero-knowledge and on-chain proofs that reveal only what's needed.",
  "quant-fintech": "I care about payments, pipelines, and numbers that stay honest under load.",
};

const LAB: Record<Role, { href: string; label: string }> = {
  backend: { href: "/labs/outbox-playground", label: "Kill the relay" },
  fullstack: { href: "/labs/d2c-order-lifecycle", label: "D2C order lifecycle" },
  "ai-agents": { href: "/labs/paybench-timeout", label: "Break the payment" },
  blockchain: { href: "/labs/zk-cats", label: "Zero-knowledge with cats" },
  "quant-fintech": { href: "/labs/backtest-toy", label: "Backtest toy" },
};

export function generateStaticParams() {
  return ROLES.map((role) => ({ role }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  if (!ROLES.includes(role as Role)) return { title: "For recruiters" };
  const label = ROLE_LABELS[role as Role];
  return {
    title: `For ${label} roles`,
    description: `${siteConfig.name} — tailored ${label} landing with top projects and résumé.`,
  };
}

export default async function ForRolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role: roleParam } = await params;
  if (!ROLES.includes(roleParam as Role)) notFound();
  const role = roleParam as Role;
  const top = projectsForRole(role).slice(0, 3);
  const variant = resumeVariants.find((v) => v.role === role || v.slug === role);
  const lab = LAB[role];

  return (
    <div className="container-site section-pad pb-16">
      <RefGreeting />
      <p className="eyebrow">
        Tailored for {ROLE_LABELS[role]} · {siteConfig.name}
      </p>
      <h1 className="display mt-2 max-w-2xl text-4xl text-ink md:text-5xl">{HERO[role]}</h1>
      <p className="mt-4 max-w-xl text-ink-soft">{siteConfig.valueProp}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={variant ? `/resumes/${variant.slug}` : "/resumes"}>
          {ROLE_LABELS[role]} résumé
        </Button>
        <Button href={lab.href} variant="secondary">
          Try: {lab.label}
        </Button>
        <Button href="/contact" variant="ghost">
          Hire me
        </Button>
      </div>

      <section className="mt-12">
        <h2 className="display text-2xl text-ink">Top three for this role</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {top.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="no-underline">
              <Window title={p.slug} className="h-full">
                <h3 className="display text-lg text-ink">{p.title}</h3>
                <p className="mt-2 line-clamp-4 text-sm text-ink-soft">
                  {getNarrative(p.slug)?.impact ?? p.pitch}
                </p>
              </Window>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-10 text-sm text-ink-soft">
        Switch role:{" "}
        {ROLES.map((r, i) => (
          <span key={r}>
            {i > 0 ? " · " : null}
            <Link href={`/for/${r}`}>{ROLE_LABELS[r]}</Link>
          </span>
        ))}
      </p>
    </div>
  );
}
