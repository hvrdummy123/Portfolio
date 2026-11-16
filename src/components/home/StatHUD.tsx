"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { claims, getClaim } from "@/content/profile";
import { EvidenceBadge } from "@/components/ui/EvidenceBadge";

const PROOF_IDS = [
  "batch-speedup-pct",
  "chat-outbox-scenarios",
  "paybench-mutations",
  "jpmorgan-winner",
  "aws-ccp",
] as const;

function CountUp({ value }: { value: string }) {
  const simple = /^(?:\d+(?:\.\d+)?)(?:\/\d+(?:\.\d+)?)?$/.test(value.trim());
  const [shown, setShown] = useState(simple ? "0" : value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!simple || prefersReduced()) {
      setShown(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const parts = value.split("/");
    const target = parseFloat(parts[0]);
    const denom = parts[1];
    const isInt = !parts[0].includes(".");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const dur = 900;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const n = target * p;
          const head = isInt ? String(Math.round(n)) : n.toFixed(2);
          setShown(denom ? `${head}/${denom}` : head);
          if (p < 1) requestAnimationFrame(tick);
          else setShown(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, simple]);

  return (
    <span ref={ref} className="stat-value text-lg md:text-xl">
      {shown}
    </span>
  );
}

function prefersReduced() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("reduce-motion")
  );
}

function displayValue(id: string) {
  const c = getClaim(id);
  if (!c) return "";
  if (id === "batch-speedup-pct") return "76%";
  if (id === "chat-outbox-scenarios") return "25";
  return `${c.value}${c.unit && !c.unit.startsWith("/") ? "" : c.unit || ""}`.trim() || c.value;
}

export function StatHUD() {
  const items = PROOF_IDS.map((id) => getClaim(id)).filter(Boolean);

  return (
    <section className="mt-8 overflow-x-auto" aria-label="Key proofs">
      <div className="flex min-w-max gap-3 md:grid md:min-w-0 md:grid-cols-5">
        {items.map((s) => (
          <Link
            key={s!.id}
            href={s!.href ?? "/work"}
            className="win w-[160px] no-underline md:w-auto"
            title={s!.linkOrNote}
          >
            <div className="win-titlebar !py-1 !text-[10px]">
              <div className="win-dots" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <span className="truncate">{s!.label}</span>
            </div>
            <div className="win-body !py-3 text-center">
              <CountUp value={displayValue(s!.id)} />
              <p className="mt-1 text-xs text-ink-soft">{s!.label}</p>
              <div className="mt-2 flex justify-center">
                <EvidenceBadge level={s!.evidenceLevel} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* keep claims import used for future role-aware strips */}
      <span className="sr-only">{claims.length} claims loaded</span>
    </section>
  );
}
