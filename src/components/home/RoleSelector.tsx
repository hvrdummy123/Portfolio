"use client";

import { ROLE_LABELS, type Role } from "@/content/data/types";
import { usePrefs } from "@/components/providers/PrefsProvider";
import { cn } from "@/lib/cn";

const roles = Object.keys(ROLE_LABELS) as Role[];

export function RoleSelector() {
  const { role, setRole } = usePrefs();

  return (
    <section aria-label="Role selector">
      <p className="eyebrow mb-2">Hiring for</p>
      <div className="flex flex-wrap gap-2">
        {roles.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={cn(
              "tag focus-ring transition",
              role === r ? "bg-blush" : "bg-surface hover:bg-surface-2",
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
