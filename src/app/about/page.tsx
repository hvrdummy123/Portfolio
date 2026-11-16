import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";
import { PixelCat } from "@/components/cats/PixelCat";
import { Window } from "@/components/ui/Window";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — software engineer in Mumbai.`,
};

const topics = [
  "Mathematics & puzzles",
  "Reliable systems",
  "Agent evaluations",
  "Idempotency & failure handling",
  "Zero-knowledge proofs",
  "Payments & fintech",
  "D2C commerce",
];

export default function AboutPage() {
  return (
    <div className="container-site section-pad prose-narrow">
      <p className="eyebrow">About</p>
      <h1 className="display text-4xl text-ink md:text-5xl">Harshita Ranka</h1>

      <Window
        title="portrait.mochi"
        className="mt-6"
        status={`${siteConfig.location} · Class of ${siteConfig.classOf}`}
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="shrink-0 rounded-lg border-2 border-ink bg-blush/40 p-4">
            <PixelCat pose="think" scale={4} title="Harshita Ranka" />
          </div>
          <div>
            <p className="display text-xl">Software Engineer</p>
            <p className="mt-1 text-sm text-ink-soft">
              Mumbai · B.Tech Computer Engineering, MPSTME, NMIMS · CGPA {siteConfig.cgpa} ·{" "}
              {siteConfig.graduationLabel}
            </p>
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
          I studied B.Tech Computer Engineering at MPSTME, NMIMS Mumbai (CGPA {siteConfig.cgpa},{" "}
          {siteConfig.graduationLabel}). Mathematics has always been the through-line — I am drawn
          to precise problems and solutions that hold under scrutiny.
        </p>
        <p>
          That same instinct shapes how I engineer systems. I focus on software that survives the
          failure path: timeouts after commit, relay crashes, webhook replays, and graders that can
          be mutated. Recent work includes transactional outboxes for chat and Better Auth marketplace
          planes at Atrium; agent benchmarks that score ledger state rather than prose; a
          Medusa-based D2C architecture for Indian beverage commerce; and a Nomura internship on
          batch pipelines and release automation.
        </p>
        <p>
          Outside of engineering I enjoy puzzles (including Sudoku), singing, and learning the
          ukulele.{" "}
          <Link href="/beyond-code">Beyond Code ↗</Link>
        </p>
      </div>

      <section className="mt-10">
        <h2 className="display text-2xl">Focus areas</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl">Elsewhere</h2>
        <ul className="mt-3 space-y-1">
          <li>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={siteConfig.links.email}>Email</a>
          </li>
          <li>
            <Link href="/resumes?from=about">Résumés</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
