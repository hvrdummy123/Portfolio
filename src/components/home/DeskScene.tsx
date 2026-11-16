"use client";

import Link from "next/link";
import { useState } from "react";
import { PixelCat } from "@/components/cats/PixelCat";
import { cn } from "@/lib/cn";

type Hotspot = {
  id: string;
  label: string;
  href: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const HOTSPOTS: Hotspot[] = [
  { id: "laptop", label: "Work", href: "/work", x: 30, y: 36, w: 32, h: 30 },
  { id: "beyond", label: "Beyond code", href: "/beyond-code", x: 6, y: 50, w: 20, h: 26 },
  { id: "d2c", label: "D2C platform", href: "/work/d2c-ecommerce", x: 68, y: 52, w: 18, h: 18 },
  { id: "resume", label: "Résumé", href: "/resumes", x: 44, y: 66, w: 12, h: 12 },
  { id: "mail", label: "Contact", href: "/contact", x: 88, y: 42, w: 10, h: 20 },
];

/** Shared baseline: desk top sits at ~66% of scene height */
export function DeskScene() {
  const [hover, setHover] = useState<string | null>(null);
  const [poke, setPoke] = useState(false);
  const label = HOTSPOTS.find((h) => h.id === hover)?.label;

  return (
    <div className="w-full">
      <div
        className="relative mx-auto aspect-[5/4] w-full max-w-[480px] overflow-hidden rounded-[12px] border-2 border-ink shadow-[4px_4px_0_var(--ink)]"
        role="img"
        aria-label="Clean desk scene with clickable hotspots"
      >
        {/* Wall */}
        <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--sky)_65%,white)]" />

        {/* Window — wall, top-left */}
        <div className="absolute left-[9%] top-[9%] h-[30%] w-[28%] overflow-hidden rounded-md border-2 border-ink bg-gradient-to-b from-[#a8d0ff] to-[#ffd6e6]">
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-ink/35" />
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-ink/35" />
          <div className="absolute right-2 top-2 h-3 w-3 rounded-full border-2 border-ink bg-butter" />
        </div>

        {/* Floor */}
        <div className="absolute inset-x-0 bottom-0 h-[34%] border-t-2 border-ink bg-[color-mix(in_srgb,var(--peach)_40%,var(--cream))]" />

        {/* Desk surface — one clean plane */}
        <div className="absolute bottom-[16%] left-[6%] right-[6%] z-[1] h-[14%] rounded-sm border-2 border-ink bg-butter">
          <div className="absolute inset-x-0 top-0 h-1/3 bg-white/25" />
        </div>
        <div className="absolute bottom-[5%] left-[12%] z-[1] h-[11%] w-[2.5%] border-2 border-ink bg-peach" />
        <div className="absolute bottom-[5%] right-[12%] z-[1] h-[11%] w-[2.5%] border-2 border-ink bg-peach" />

        {/* LEFT: beyond-code cluster, sitting on desk */}
        <div className="pointer-events-none absolute bottom-[28%] left-[8%] z-[2] flex h-[24%] w-[18%] items-end gap-1">
          {/* ukulele */}
          <div className="relative h-[95%] w-[22%] rounded-full border-2 border-ink bg-peach">
            <div className="absolute left-1/2 top-[58%] h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-ink bg-butter" />
            <div className="absolute -top-1 left-1/2 h-[20%] w-[40%] -translate-x-1/2 rounded-sm border-2 border-ink bg-peach" />
          </div>
          {/* yarn ball */}
          <div className="mb-0.5 h-[42%] w-[38%] rounded-full border-2 border-ink bg-berry/80" />
          {/* puzzle */}
          <div className="mb-0.5 h-[40%] w-[36%] border-2 border-ink">
            <div className="grid h-full grid-cols-2 grid-rows-2">
              <span className="bg-mint" />
              <span className="border-l border-ink bg-butter" />
              <span className="border-t border-ink bg-blush" />
              <span className="border-l border-t border-ink bg-sky" />
            </div>
          </div>
        </div>

        {/* CENTER: laptop on desk */}
        <div className="pointer-events-none absolute bottom-[28%] left-[32%] z-[2] h-[36%] w-[30%]">
          <div className="absolute inset-x-[4%] top-0 h-[76%] rounded-t-md border-2 border-ink bg-ink">
            <div className="relative m-[4%] h-[88%] overflow-hidden rounded-sm bg-[#c8ead9]">
              <div className="m-[8%] space-y-1.5">
                <div className="h-2 w-3/4 rounded-sm bg-berry/75" />
                <div className="h-1.5 w-full rounded-sm bg-grape/35" />
                <div className="h-1.5 w-5/6 rounded-sm bg-grape/30" />
                <div className="h-1.5 w-2/3 rounded-sm bg-grape/25" />
                <div className="mt-2 grid grid-cols-3 gap-1">
                  <div className="h-4 rounded-sm border border-ink/30 bg-surface/80" />
                  <div className="h-4 rounded-sm border border-ink/30 bg-surface/80" />
                  <div className="h-4 rounded-sm border border-ink/30 bg-surface/80" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[22%] rounded-sm border-2 border-ink bg-lavender" />
        </div>

        {/* FRONT CENTER: résumé on desk */}
        <div className="pointer-events-none absolute bottom-[18%] left-[44%] z-[3] h-[12%] w-[11%] rounded-sm border-2 border-ink bg-paper">
          <div className="absolute -top-1 left-1/2 h-2 w-3.5 -translate-x-1/2 rounded-sm border-2 border-ink bg-blush" />
          <div className="mx-1 mt-2 space-y-1">
            <div className="h-0.5 bg-ink/40" />
            <div className="h-0.5 w-4/5 bg-ink/30" />
            <div className="h-0.5 bg-ink/30" />
          </div>
        </div>

        {/* RIGHT: D2C on desk */}
        <div className="pointer-events-none absolute bottom-[28%] left-[68%] z-[2] flex h-[20%] w-[18%] items-end gap-1.5">
          <div className="relative h-[85%] w-[28%] rounded-b-md border-2 border-ink bg-blush">
            <div className="mx-auto h-2 w-1 bg-ink" />
          </div>
          <div className="flex h-[75%] flex-1 items-center justify-center rounded-sm border-2 border-ink bg-surface">
            <span className="font-[family-name:var(--font-pixelify)] text-[10px] text-ink">
              D2C
            </span>
          </div>
        </div>

        {/* WALL RIGHT: mailbox */}
        <div className="pointer-events-none absolute bottom-[36%] right-[4%] z-[2] w-[9%]">
          <div className="h-12 rounded-t-md border-2 border-ink bg-lavender">
            <div className="mx-auto mt-2 h-2.5 w-4 border-2 border-ink bg-surface" />
          </div>
          <div className="mx-auto h-2 w-2 border-x-2 border-ink bg-peach" />
        </div>

        {/* Mochi on cushion, desk right-center */}
        <button
          type="button"
          className="absolute bottom-[27%] left-[56%] z-[4] rounded focus-ring"
          onClick={() => setPoke((v) => !v)}
          aria-label="Poke Mochi"
        >
          <div className="absolute -bottom-0.5 left-1/2 h-1.5 w-9 -translate-x-1/2 rounded-full bg-blush/90" />
          <PixelCat pose={poke ? "stretch" : hover ? "sit" : "loaf"} scale={2.2} fps={5} />
        </button>

        {HOTSPOTS.map((h) => (
          <Link
            key={h.id}
            href={h.href}
            className={cn(
              "absolute z-10 block rounded-md border-2 focus-ring",
              hover === h.id
                ? "border-grape bg-grape/15"
                : "border-transparent hover:border-grape/40 hover:bg-grape/10",
            )}
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              width: `${h.w}%`,
              height: `${h.h}%`,
            }}
            onMouseEnter={() => setHover(h.id)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(h.id)}
            onBlur={() => setHover(null)}
            title={h.label}
          >
            <span className="sr-only">{h.label}</span>
          </Link>
        ))}

        {label ? (
          <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 rounded-md border-2 border-ink bg-surface px-2.5 py-1 font-[family-name:var(--font-pixelify)] text-xs shadow-[2px_2px_0_var(--ink)]">
            {label}
          </div>
        ) : null}
      </div>

      <ul className="mt-3 flex flex-wrap justify-center gap-2" aria-label="Desk hotspots">
        {HOTSPOTS.map((h) => (
          <li key={h.id}>
            <Link
              href={h.href}
              className="tag no-underline hover:bg-blush"
              onMouseEnter={() => setHover(h.id)}
              onMouseLeave={() => setHover(null)}
            >
              {h.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
