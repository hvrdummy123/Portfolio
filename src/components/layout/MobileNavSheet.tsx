"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/content/data/site.config";
import { cn } from "@/lib/cn";

export function MobileNavSheet() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const panel = document.getElementById(panelId);
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [open, panelId]);

  const links = [...siteConfig.navPrimary, ...siteConfig.navMore];

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="focus-ring rounded-md border-2 border-ink bg-surface px-3 py-2 text-sm"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        Menu
      </button>
      {open ? (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Site menu">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id={panelId}
            className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-2 border-ink bg-surface p-4 shadow-[0_-4px_0_var(--ink)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="display text-lg">Navigate</p>
              <button
                ref={closeRef}
                type="button"
                className="focus-ring min-h-11 min-w-11 rounded-md border-2 border-ink px-3"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <ul className="space-y-1">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "focus-ring flex min-h-11 items-center rounded-lg px-3 text-base text-ink no-underline hover:bg-blush",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
