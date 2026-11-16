"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type TocItem = { id: string; label: string };

export function CaseStudyChrome({
  toc,
  children,
}: {
  toc: TocItem[];
  children: React.ReactNode;
}) {
  const [skim, setSkim] = useState(false);
  const [active, setActive] = useState(toc[0]?.id);

  const ids = useMemo(() => toc.map((t) => t.id), [toc]);

  useEffect(() => {
    if (!ids.length) return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return (
    <div className={cn(skim && "skim-mode")} data-skim={skim ? "1" : "0"}>
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="btn btn-ghost !text-xs"
          aria-pressed={skim}
          onClick={() => setSkim((v) => !v)}
        >
          Skim mode {skim ? "on" : "off"}
        </button>
      </div>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10">
        <div className="min-w-0">{children}</div>
        {toc.length > 1 ? (
          <aside className="toc-sticky no-print hidden lg:block" aria-label="On this page">
            <p className="eyebrow mb-2">On this page</p>
            <ul className="space-y-1 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "block rounded px-2 py-1 no-underline",
                      active === item.id ? "bg-blush text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
