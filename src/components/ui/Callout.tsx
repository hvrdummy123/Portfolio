import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Callout({
  children,
  tone = "info",
  title,
}: {
  children: ReactNode;
  tone?: "info" | "warning" | "decision";
  title?: string;
}) {
  return (
    <aside
      className={cn(
        "callout",
        tone === "warning" && "callout-warning",
        tone === "info" && "callout-info",
      )}
    >
      {title ? <p className="eyebrow mb-2">{title}</p> : null}
      <div className="text-sm text-ink-soft">{children}</div>
    </aside>
  );
}
