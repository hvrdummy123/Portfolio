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
  "Agent evals",
  "Idempotency & failure handling",
  "Zero-knowledge",
  "Payments & fintech",
  "D2C commerce",
];

export default function AboutPage() {
  return (
    <div className="container-site section-pad prose-narrow">
      <p className="eyebrow">About</p>
      <h1 className="display text-4xl text-ink md:text-5xl">Hi — I&apos;m Harshita.</h1>

      <Window
        title="portrait.mochi"
        className="mt-6"
        status={`${siteConfig.location} · Class of ${siteConfig.classOf}`}
      >
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="shrink-0 rounded-lg border-2 border-ink bg-blush/40 p-4">
            <PixelCat pose="think" scale={4} title="Mochi, portrait stand-in" />
          </div>
          <div>
            <p className="display text-xl">Harshita Ranka</p>
            <p className="mt-1 text-sm text-ink-soft">
              Software engineer in Mumbai. Mochi is holding this spot until a photo lands here.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button href="/resumes" variant="secondary">
                Résumé
              </Button>
              <Button href="/contact">Hire me</Button>
            </div>
          </div>
        </div>
      </Window>

      <div className="mt-8 space-y-4 text-ink">
        <p>
          I&apos;m a B.Tech Computer Engineering student at MPSTME, NMIMS Mumbai (CGPA{" "}
          {siteConfig.cgpa}, class of {siteConfig.classOf}). My favourite subject — you guessed it —
          has always been math. I like creative problems and the quiet click of a creative solution.
        </p>
        <p>
          That same instinct shows up in the systems I build. I care about software that survives the
          ugly path: timeouts after commit, relay crashes, webhook replays, graders that can be
          mutated. Lately that looks like transactional outboxes for chat at Atrium, Better Auth for
          marketplace planes, agent benchmarks that score ledgers instead of prose, and a
          Medusa-based D2C design for Indian beverage commerce — plus a Nomura internship on batch
          pipelines and releases.
        </p>
        <p>
          Outside of code I love solving puzzles (Sudoku included), singing, and learning the
          ukulele.{" "}
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
          Fonts: Pixelify Sans, DM Sans, JetBrains Mono.
        </p>
      </section>
    </div>
  );
}
