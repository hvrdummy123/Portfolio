import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";
import { PixelCat } from "@/components/cats/PixelCat";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — software engineer in Mumbai.`,
};

const topics = [
  "Reliable systems",
  "Agent evals",
  "Idempotency & failure handling",
  "Zero-knowledge",
  "Payments & fintech",
  "D2C commerce",
  "Developer tooling",
];

export default function AboutPage() {
  return (
    <div className="container-site section-pad prose-narrow">
      <p className="eyebrow">About</p>
      <h1 className="display text-4xl text-ink md:text-5xl">Hi — I&apos;m Harshita.</h1>

      <div className="mt-6 flex items-start gap-4">
        <div className="pixel-border shrink-0 bg-surface-2 p-3">
          <PixelCat pose="think" scale={4} title="Photo placeholder — Mochi" />
        </div>
        <p className="text-sm text-ink-soft">
          Photo slot: drop <code>/public/me.jpg</code> when ready (TODO_FROM_HARSHITA).
        </p>
      </div>

      <div className="mt-8 space-y-4 text-ink">
        <p>
          I&apos;m a B.Tech Computer Engineering student at MPSTME, NMIMS Mumbai (CGPA{" "}
          {siteConfig.cgpa}, class of {siteConfig.classOf}). I care about systems that survive the
          ugly path: timeouts after commit, relay crashes, webhook replays, graders that can be
          mutated.
        </p>
        <p>
          Lately that looks like transactional outboxes for chat, Better Auth for marketplace planes,
          agent benchmarks that score ledgers instead of prose, and a Medusa-based D2C design for
          Indian beverage commerce.
        </p>
        <p>
          I use AI tools (Claude Code, Codex) where the resume says so — as accelerators with tests
          and failure scenarios, not as a substitute for understanding.
        </p>
        <p>
          Outside of code I crochet, solve puzzles, and mess around with a ukulele.{" "}
          <Link href="/beyond-code">Beyond Code ↗</Link>
        </p>
      </div>

      <section className="mt-10">
        <h2 className="display text-2xl">Topics I keep returning to</h2>
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

      <section id="colophon" className="mt-12 border-t-2 border-line pt-8">
        <h2 className="display text-2xl">Colophon</h2>
        <p className="mt-3 text-sm text-ink-soft">
          Built with Next.js, TypeScript, Tailwind CSS, and a hand-rolled pixel-cat sprite engine.
          Structural inspiration from{" "}
          <a href="https://divagr.com" target="_blank" rel="noreferrer">
            divagr.com
          </a>{" "}
          (layout ideas only — not visual identity or content). AI-assisted tools were used to help
          build this site. Fonts: Pixelify Sans, DM Sans, JetBrains Mono.
        </p>
      </section>
    </div>
  );
}
