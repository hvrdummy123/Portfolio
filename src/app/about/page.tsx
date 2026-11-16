import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";
import { profile } from "@/content/profile";
import { PixelCat } from "@/components/cats/PixelCat";
import { Window } from "@/components/ui/Window";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — software engineer in Mumbai.`,
};

const topics: { label: string; href: string }[] = [
  { label: "Reliable systems", href: "/notes/batch-240-to-58" },
  { label: "Agent evaluations", href: "/work/paybench" },
  { label: "Idempotency & failure handling", href: "/labs/paybench-timeout" },
  { label: "Zero-knowledge proofs", href: "/work/zkp-kyc" },
  { label: "Payments & fintech", href: "/work/etf-backtesting" },
  { label: "D2C commerce", href: "/work/d2c-ecommerce" },
  { label: "Puzzles", href: "/puzzles" },
];

export default function AboutPage() {
  return (
    <div className="container-site section-pad prose-narrow">
      <p className="eyebrow">About</p>
      <h1 className="display text-4xl text-ink md:text-5xl">{profile.name}</h1>

      <Window
        title="portrait.mochi"
        className="mt-6"
        status={`${profile.location} · ${profile.graduationLabel}`}
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="shrink-0 rounded-lg border-2 border-border bg-blush/40 p-4">
            <PixelCat pose="think" scale={4} title={profile.name} />
          </div>
          <div>
            <p className="display text-xl">{profile.title}</p>
            <p className="mt-1 text-sm text-ink-soft">
              {profile.location} · {profile.education.degree}, {profile.education.school} · CGPA{" "}
              {profile.education.cgpa} · {profile.graduationLabel}
            </p>
            <p className="mt-2 text-sm text-ink-soft">{profile.availability}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button href="/resumes" variant="secondary">
                Résumé
              </Button>
              <Button href="/contact">Contact</Button>
            </div>
          </div>
        </div>
      </Window>

      <div className="mt-8 space-y-4 text-ink">
        <p>
          I studied B.Tech Computer Engineering at {profile.education.school} (CGPA{" "}
          {profile.education.cgpa}, {profile.graduationLabel}). Mathematics has always been the
          through-line — I am drawn to precise problems and solutions that hold under scrutiny.
        </p>
        <p>
          That same instinct shapes how I engineer systems. I focus on software that survives the
          failure path: timeouts after commit, relay crashes, webhook replays, and graders that can
          be mutated. Recent work includes transactional outboxes for chat and Better Auth marketplace
          planes at Atrium; agent benchmarks that score ledger state rather than prose; a
          Medusa-based Shopify-style D2C platform demoed for clients; and a Nomura internship on
          batch pipelines and release automation.
        </p>
        <p>
          Outside of engineering I enjoy puzzles (including Sudoku), singing, and learning the
          ukulele.{" "}
          <Link href="/puzzles">Puzzles ↗</Link>
        </p>
      </div>

      <section className="mt-10">
        <h2 className="display text-2xl">How I work</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-soft">
          <li>Test failure modes first — timeouts, retries, and mutation-tested graders over happy-path demos.</li>
          <li>Prefer evidence you can re-run: public repos, CI, and labs that remount cleanly after Reset.</li>
          <li>Use AI tools for scaffolding and drafting; verify facts, architecture, and copy before shipping.</li>
          <li>Write short design notes that name the alternatives I rejected and why.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl">Topics I keep returning to</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <Link key={t.label} href={t.href} className="tag no-underline">
              {t.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl">Elsewhere</h2>
        <ul className="mt-3 space-y-1">
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
          <li>
            <Link href="/resumes?from=about">Résumés</Link>
          </li>
        </ul>
      </section>

      <section id="colophon" className="mt-12 border-t-2 border-line pt-8">
        <h2 className="display text-2xl">Colophon</h2>
        <p className="mt-3 text-sm text-ink-soft">
          Built with Next.js, TypeScript, and Tailwind. AI tools assisted drafting and scaffolding; I
          verified facts, architecture, and copy before shipping. Fonts: Outfit, DM Sans, Pixelify Sans,
          JetBrains Mono.
        </p>
      </section>
    </div>
  );
}
