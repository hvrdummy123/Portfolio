"use client";

import { ROLE_LABELS, type Role } from "@/content/data/types";
import { usePrefs } from "@/components/providers/PrefsProvider";
import { cn } from "@/lib/cn";

const roles = Object.keys(ROLE_LABELS) as Role[];

export function RoleSelector() {
  const { role, setRole } = usePrefs();

  return (
    <section aria-label="Role selector" className="border-y border-line py-5">
      <p className="eyebrow mb-3">Hiring for</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {roles.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={cn(
              "text-sm transition",
              role === r
                ? "font-semibold text-ink underline decoration-accent underline-offset-4"
                : "text-ink-soft hover:text-ink",
            )}
            aria-pressed={role === r}
          >
            {ROLE_LABELS[r]}
          </button>
        ))}
      </div>
    </section>
  );
}
