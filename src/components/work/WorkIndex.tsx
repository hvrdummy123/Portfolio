"use client";

import { useMemo, useState } from "react";
import { projects } from "@/content/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ROLE_LABELS, STATUS_LABELS, type Role, type Status } from "@/content/data/types";
import { usePrefs } from "@/components/providers/PrefsProvider";
import { cn } from "@/lib/cn";

const GROUPS: { id: string; title: string; match: (slug: string, kind: string) => boolean }[] = [
  {
    id: "flagship",
    title: "Flagship",
    match: (slug) => slug === "d2c-ecommerce",
  },
  {
    id: "agents",
    title: "Agents & reliability",
    match: (slug) => ["paybench", "traceiq", "personal-job-radar"].includes(slug),
  },
  {
    id: "fintech",
    title: "Fintech & blockchain",
    match: (slug) => ["zkp-kyc", "etf-backtesting"].includes(slug),
  },
  {
    id: "work",
    title: "Work experience",
    match: (_s, kind) => kind === "work",
  },
  {
    id: "tools",
    title: "Personal tools",
    match: (slug) => ["duihua", "personal-job-radar"].includes(slug),
  },
];

type Layout = "grid" | "list";

export function WorkIndex() {
  const { role, setRole } = usePrefs();
  const [status, setStatus] = useState<Status | "all">("all");
  const [q, setQ] = useState("");
  const [layout, setLayout] = useState<Layout>("grid");

  const filtered = useMemo(() => {
    return projects
      .filter((p) => p.roles.includes(role) || p.weight[role] >= 50)
      .filter((p) => (status === "all" ? true : p.status === status))
      .filter((p) => {
        if (!q.trim()) return true;
        const hay = `${p.title} ${p.pitch} ${p.stack.map((s) => s.name).join(" ")}`.toLowerCase();
        return hay.includes(q.trim().toLowerCase());
      })
      .sort((a, b) => (b.weight[role] ?? 0) - (a.weight[role] ?? 0));
  }, [role, status, q]);

  const grouped = GROUPS.map((g) => ({
    ...g,
    items: filtered.filter((p) => g.match(p.slug, p.kind)),
  })).filter((g) => g.items.length > 0);

  const leftover = filtered.filter(
    (p) => !GROUPS.some((g) => g.match(p.slug, p.kind)),
  );

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4 rounded-[12px] border-2 border-ink bg-surface p-4 shadow-[4px_4px_0_var(--ink)]">
        <div>
          <p className="eyebrow mb-2">Role</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                className={cn("tag focus-ring", role === r ? "bg-blush" : "")}
                onClick={() => setRole(r)}
                aria-pressed={role === r}
              >
                {ROLE_LABELS[r]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              {(["all", "shipped", "built", "designed", "in-progress"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  className={cn("tag focus-ring", status === s ? "bg-mint" : "")}
                  onClick={() => setStatus(s)}
                >
                  {s === "all" ? "All" : STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
          <label className="block text-sm">
            <span className="eyebrow mb-1 block">Stack search</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full min-w-[200px] rounded-md border-2 border-ink bg-cream px-3 py-2 focus-ring"
              placeholder="e.g. Medusa, Circom…"
            />
          </label>
          <div>
            <p className="eyebrow mb-2">Layout</p>
            <div className="flex gap-2">
              {(["grid", "list"] as Layout[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  className={cn("tag focus-ring capitalize", layout === l ? "bg-butter" : "")}
                  onClick={() => setLayout(l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-ink-soft" aria-live="polite">
          {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-ink-soft">No projects match these filters. Clear search or switch role.</p>
      ) : (
        <div className="mt-10 space-y-10">
          {grouped.map((g) => (
            <section key={g.id}>
              <h2 className="display mb-4 text-2xl text-ink">{g.title}</h2>
              <div
                className={
                  layout === "grid"
                    ? "grid gap-4 md:grid-cols-2"
                    : "flex flex-col gap-3"
                }
              >
                {g.items.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </section>
          ))}
          {leftover.length > 0 ? (
            <section>
              <h2 className="display mb-4 text-2xl text-ink">More</h2>
              <div
                className={
                  layout === "grid"
                    ? "grid gap-4 md:grid-cols-2"
                    : "flex flex-col gap-3"
                }
              >
                {leftover.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}
