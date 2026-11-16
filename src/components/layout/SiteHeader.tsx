"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/content/data/site.config";
import { cn } from "@/lib/cn";
import { PixelCat } from "@/components/cats/PixelCat";
import { usePrefs } from "@/components/providers/PrefsProvider";
import { ROLE_LABELS, type Role } from "@/content/data/types";
import { MobileNavSheet } from "@/components/layout/MobileNavSheet";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme, setRole } = usePrefs();

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
      if (resumeRef.current && !resumeRef.current.contains(e.target as Node)) setResumeOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-surface/95 backdrop-blur-sm">
      <div className="container-site flex items-center justify-between gap-3 py-2.5">
        <Link href="/" className="focus-ring flex items-center gap-2 text-ink no-underline">
          <PixelCat pose="sit" scale={1.5} />
          <span className="display text-lg">{siteConfig.name.split(" ")[0]}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {siteConfig.navPrimary.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring rounded-md px-2.5 py-1.5 text-sm font-medium no-underline",
                  active ? "bg-blush text-ink" : "text-ink-soft hover:bg-surface-2 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              className="focus-ring rounded-md px-2.5 py-1.5 text-sm font-medium text-ink-soft hover:bg-surface-2 hover:text-ink"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
            >
              More ▾
            </button>
            {moreOpen ? (
              <div className="absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-lg border-2 border-border bg-surface p-1 shadow-[4px_4px_0_var(--border)]">
                {siteConfig.navMore.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm text-ink no-underline hover:bg-blush"
                    onClick={() => setMoreOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block" ref={resumeRef}>
            <button
              type="button"
              className="btn btn-secondary !px-3 !py-1.5 !text-xs"
              aria-expanded={resumeOpen}
              onClick={() => setResumeOpen((v) => !v)}
            >
              Résumé ▾
            </button>
            {resumeOpen ? (
              <div className="absolute right-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border-2 border-border bg-surface p-1 shadow-[4px_4px_0_var(--border)]">
                <Link
                  href="/resumes"
                  className="block rounded-md px-3 py-2 text-sm text-ink no-underline hover:bg-blush"
                  onClick={() => setResumeOpen(false)}
                >
                  All variants
                </Link>
                {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    className="block w-full rounded-md px-3 py-2 text-left text-sm text-ink hover:bg-blush"
                    onClick={() => {
                      setRole(r);
                      setResumeOpen(false);
                      router.push(`/resumes/${r}`);
                    }}
                  >
                    {ROLE_LABELS[r]}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <Link href="/contact" className="btn !hidden !px-3 !py-1.5 !text-xs sm:!inline-flex">
            Contact
          </Link>

          <button
            type="button"
            className="focus-ring grid h-9 w-9 place-items-center rounded-md border-2 border-border bg-butter"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to night" : "Switch to day"}
          >
            <PixelCat pose={theme === "light" ? "sleep" : "idle"} scale={1.2} />
          </button>

          <MobileNavSheet />
        </div>
      </div>
    </header>
  );
}
