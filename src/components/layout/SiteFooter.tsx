"use client";

import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";
import { usePrefs } from "@/components/providers/PrefsProvider";

export function SiteFooter() {
  const { theme, toggleTheme } = usePrefs();

  return (
    <footer className="mt-auto border-t border-line">
      <div className="container-site flex flex-col gap-4 py-10 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
        <p>
          {siteConfig.name} ·{" "}
          <Link href="/about#colophon" className="text-ink-soft">
            Colophon
          </Link>
        </p>
        <div className="flex flex-wrap gap-4">
          <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <Link href="/notes">Notes</Link>
          <Link href="/resumes?from=footer">Résumé</Link>
          <button type="button" className="text-ink-soft" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </footer>
  );
}
