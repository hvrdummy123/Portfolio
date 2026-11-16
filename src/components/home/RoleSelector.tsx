"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ROLE_LABELS, type Role } from "@/content/data/types";
import { usePrefs } from "@/components/providers/PrefsProvider";
import { cn } from "@/lib/cn";
import roles from "../../../content/roles.json";

const roleKeys = Object.keys(ROLE_LABELS) as Role[];

export function RoleSelector() {
  const { role, setRole } = usePrefs();
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const why = roles[role as keyof typeof roles]?.whyFit ?? [];
  const subline = roles[role as keyof typeof roles]?.subline;

  useEffect(() => {
    const fromUrl = search.get("role") as Role | null;
    if (fromUrl && roleKeys.includes(fromUrl) && fromUrl !== role) {
      setRole(fromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync once from URL
  }, []);

  function pick(r: Role) {
    setRole(r);
    const params = new URLSearchParams(search.toString());
    params.set("role", r);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <section aria-label="I'm hiring for">
      <p className="eyebrow mb-2">I&apos;m hiring for</p>
      <div className="flex flex-wrap gap-2">
        {roleKeys.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => pick(r)}
            className={cn(
              "tag focus-ring min-h-11 transition",
              role === r ? "bg-blush" : "bg-surface hover:bg-surface-2",
            )}
            aria-pressed={role === r}
          >
            {ROLE_LABELS[r]}
          </button>
        ))}
      </div>
      {subline ? <p className="mt-3 text-sm text-ink-soft">{subline}</p> : null}
      {why.length ? (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          {why.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
