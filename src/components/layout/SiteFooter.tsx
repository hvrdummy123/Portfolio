"use client";

import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";
import { usePrefs } from "@/components/providers/PrefsProvider";
import { PixelCat } from "@/components/cats/PixelCat";

export function SiteFooter() {
  const { theme, toggleTheme, sound, setSound, cursorCat, setCursorCat, reducedMotion, setReducedMotion } =
    usePrefs();

  return (
    <footer className="mt-auto border-t-2 border-ink bg-surface">
      <div className="container-site flex flex-col gap-6 py-10 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <PixelCat pose="loaf" scale={1.5} />
            <p className="display text-lg text-ink">{siteConfig.name}</p>
          </div>
          <p className="mt-2 max-w-xs text-sm text-ink-soft">
            Software Engineer · {siteConfig.availability}
          </p>
          <p className="mt-3 max-w-sm text-xs text-ink-soft" id="colophon">
            Colophon: built with Next.js, TypeScript, and Tailwind. AI tools assisted drafting and
            scaffolding; I verified facts, architecture, and copy before shipping.
          </p>
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-soft">
            <Link href="/about" className="text-ink-soft">
              About
            </Link>
            <Link href="/puzzles" className="text-ink-soft">
              Puzzles
            </Link>
            <Link href="/arcade" className="text-ink-soft">
              Arcade
            </Link>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={siteConfig.links.email}>Email</a>
          </p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/notes">Notes</Link>
          <Link href="/resumes?from=footer">Résumé</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-secondary !text-xs" onClick={toggleTheme}>
            {theme === "light" ? "Night" : "Day"}
          </button>
          <button
            type="button"
            className="btn btn-ghost !text-xs"
            onClick={() => setSound(!sound)}
          >
            Sound {sound ? "on" : "off"}
          </button>
          <button
            type="button"
            className="btn btn-ghost !text-xs"
            onClick={() => setCursorCat(!cursorCat)}
          >
            Cursor cat {cursorCat ? "on" : "off"}
          </button>
          <button
            type="button"
            className="btn btn-ghost !text-xs"
            onClick={() => setReducedMotion(!reducedMotion)}
          >
            Reduce motion {reducedMotion ? "on" : "off"}
          </button>
        </div>
      </div>
    </footer>
  );
}
