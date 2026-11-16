"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { siteConfig } from "@/content/data/site.config";
import { usePrefs } from "@/components/providers/PrefsProvider";
import { ROLE_LABELS, type Role } from "@/content/data/types";

type Item = { id: string; label: string; hint?: string; run: () => void };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const { toggleTheme, setCursorCat, cursorCat, setRole } = usePrefs();

  const items = useMemo<Item[]>(
    () => [
      ...[...siteConfig.navPrimary, ...siteConfig.navMore].map((n) => ({
        id: n.href,
        label: `Go to ${n.label}`,
        hint: n.href,
        run: () => router.push(n.href),
      })),
      {
        id: "resume",
        label: "Download résumé hub",
        hint: "/resumes?from=cmdk",
        run: () => router.push("/resumes?from=cmdk"),
      },
      {
        id: "theme",
        label: "Toggle day/night cat theme",
        run: () => toggleTheme(),
      },
      {
        id: "cat",
        label: cursorCat ? "Turn cursor cat off" : "Turn cursor cat on",
        run: () => setCursorCat(!cursorCat),
      },
      ...(Object.keys(ROLE_LABELS) as Role[]).map((role) => ({
        id: `role-${role}`,
        label: `I'm hiring for ${ROLE_LABELS[role]}`,
        run: () => setRole(role),
      })),
    ],
    [router, toggleTheme, setCursorCat, cursorCat, setRole],
  );

  const fuse = useMemo(
    () => new Fuse(items, { keys: ["label", "hint"], threshold: 0.4 }),
    [items],
  );

  const results = q.trim() ? fuse.search(q).map((r) => r.item) : items;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/40 p-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
    >
      <div
        className="pixel-border w-full max-w-lg overflow-hidden bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search pages, roles, toggles…"
          className="w-full border-b-2 border-line bg-transparent px-4 py-3 outline-none"
          aria-label="Command search"
        />
        <ul className="max-h-80 overflow-auto p-2">
          {results.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-surface-2"
                onClick={() => {
                  item.run();
                  setOpen(false);
                  setQ("");
                }}
              >
                <span>{item.label}</span>
                {item.hint && (
                  <span className="font-mono text-xs text-ink-soft">{item.hint}</span>
                )}
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-3 py-4 text-sm text-ink-soft">No matches.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
