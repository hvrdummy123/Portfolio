"use client";

import { cn } from "@/lib/cn";

const COPY: Record<string, { label: string; tip: string }> = {
  verifiable: {
    label: "Verifiable",
    tip: "Checkable from a public repo, README, or CI run.",
  },
  private: {
    label: "Private",
    tip: "From résumé or proprietary work; not publicly reproducible.",
  },
  illustrative: {
    label: "Illustrative",
    tip: "Synthetic or demo data for teaching the idea.",
  },
};

export function EvidenceBadge({
  level,
  className,
}: {
  level: "verifiable" | "private" | "illustrative" | string;
  className?: string;
}) {
  const meta = COPY[level] ?? COPY.private;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-border/50 bg-surface px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-soft",
        className,
      )}
      title={meta.tip}
    >
      {meta.label}
    </span>
  );
}
