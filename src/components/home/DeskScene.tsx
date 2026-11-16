"use client";

import Link from "next/link";
import { useState } from "react";
import { PixelCat } from "@/components/cats/PixelCat";

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
  { id: "laptop", label: "Work", href: "/work", x: 28, y: 40, w: 28, h: 24 },
  { id: "d2c", label: "D2C flagship", href: "/work/d2c-ecommerce", x: 62, y: 54, w: 18, h: 18 },
  { id: "etf", label: "ETF Backtesting", href: "/work/etf-backtesting", x: 48, y: 36, w: 12, h: 12 },
  { id: "beyond", label: "Beyond code", href: "/beyond-code", x: 6, y: 48, w: 20, h: 34 },
  { id: "zk", label: "ZK lab", href: "/labs/zk-cats", x: 40, y: 36, w: 8, h: 8 },
  { id: "resume", label: "Résumé", href: "/resumes", x: 42, y: 68, w: 14, h: 10 },
  { id: "mail", label: "Contact", href: "/contact", x: 82, y: 42, w: 12, h: 14 },
];

export function DeskScene() {
  const [hover, setHover] = useState<string | null>(null);
  const [poke, setPoke] = useState(false);

  return (
    <div className="w-full">
      <div
        className="relative mx-auto aspect-[4/3] w-full max-w-[480px] overflow-hidden rounded-[12px] border-2 border-ink bg-sky shadow-[4px_4px_0_var(--ink)]"
        role="img"
        aria-label="Pixel desk scene with clickable hotspots"
      >
        {/* Window sky */}
        <div className="absolute left-[8%] top-[8%] h-[28%] w-[28%] rounded-md border-2 border-ink bg-gradient-to-b from-sky to-blush">
          <div className="absolute right-2 top-2 h-4 w-4 rounded-full border border-ink bg-butter" />
        </div>

        {/* Wall */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] border-t-2 border-ink bg-peach/80" />

        {/* Desk surface */}
        <div className="absolute inset-x-[4%] bottom-[18%] h-[12%] rounded-sm border-2 border-ink bg-butter" />

        {/* Laptop */}
        <div className="absolute left-[28%] top-[40%] h-[24%] w-[30%] rounded-t-md border-2 border-ink bg-ink">
          <div className="m-1 h-[70%] rounded-sm bg-mint/90 p-1">
            <div className="h-1.5 w-3/4 animate-pulse rounded-sm bg-berry/80" />
            <div className="mt-1 h-1 w-1/2 rounded-sm bg-grape/60" />
          </div>
        </div>
        <div className="absolute left-[26%] top-[63%] h-[4%] w-[34%] rounded-sm border-2 border-ink bg-lavender" />

        {/* Beyond-code corner: ukulele + yarn + puzzle (one hotspot) */}
        <div className="pointer-events-none absolute left-[7%] top-[48%] h-[34%] w-[20%]">
          <div className="absolute left-[10%] top-0 h-[85%] w-[28%] rounded-full border-2 border-ink bg-peach">
            <div className="mx-auto mt-[40%] h-2.5 w-2.5 rounded-full border border-ink bg-butter" />
          </div>
          <div className="absolute bottom-[8%] left-[35%] h-[28%] w-[40%] rounded-full border-2 border-ink bg-berry/70" />
          <div className="absolute bottom-[6%] right-0 h-[30%] w-[36%] border-2 border-ink bg-grape/40">
            <div className="grid h-full grid-cols-2 grid-rows-2">
              <span className="border border-ink bg-mint" />
              <span className="border border-ink bg-butter" />
              <span className="border border-ink bg-blush" />
              <span className="border border-ink bg-sky" />
            </div>
          </div>
        </div>

        {/* Boba + D2C box */}
        <div className="absolute left-[64%] top-[54%] h-[14%] w-[6%] rounded-b-md border-2 border-ink bg-blush">
          <div className="mx-auto h-2 w-1 bg-ink" />
        </div>
        <div className="absolute left-[72%] top-[58%] h-[12%] w-[12%] rounded-sm border-2 border-ink bg-surface">
          <span className="block p-0.5 text-center font-[family-name:var(--font-pixelify)] text-[8px]">
            D2C
          </span>
        </div>

        {/* ETF chart sticker on monitor */}
        <div className="absolute left-[48%] top-[36%] h-[10%] w-[12%] rounded-sm border-2 border-ink bg-paper p-0.5">
          <svg viewBox="0 0 24 16" className="h-full w-full" aria-hidden>
            <polyline
              fill="none"
              stroke="var(--berry)"
              strokeWidth="2"
              points="1,12 6,10 10,13 14,5 18,7 23,2"
            />
          </svg>
          <span className="absolute -bottom-4 left-0 font-[family-name:var(--font-pixelify)] text-[7px] text-ink">
            ETF
          </span>
        </div>

        {/* Clipboard resume */}
        <div className="absolute left-[44%] top-[68%] h-[10%] w-[12%] rounded-sm border-2 border-ink bg-paper">
          <div className="mx-1 mt-1 space-y-0.5">
            <div className="h-0.5 w-full bg-ink/40" />
            <div className="h-0.5 w-3/4 bg-ink/30" />
            <div className="h-0.5 w-full bg-ink/30" />
          </div>
        </div>

        {/* Mailbox */}
        <div className="absolute left-[84%] top-[42%] h-[14%] w-[10%] rounded-t-md border-2 border-ink bg-lavender">
          <div className="mx-auto mt-1 h-2 w-4 border border-ink bg-surface" />
        </div>

        {/* ZK lock sticker */}
        <div className="absolute left-[40%] top-[36%] grid h-5 w-5 place-items-center rounded border-2 border-ink bg-butter text-[10px]">
          🔒
        </div>

        {/* Mochi */}
        <button
          type="button"
          className="absolute bottom-[20%] left-[52%] rounded focus-ring"
          onClick={() => setPoke(true)}
          onAnimationEnd={() => setPoke(false)}
          aria-label="Poke Mochi"
        >
          <PixelCat pose={poke ? "stretch" : hover ? "walk" : "sleep"} scale={2.5} fps={6} />
        </button>

        {HOTSPOTS.map((h) => (
          <Link
            key={h.id}
            href={h.href}
            className="absolute z-10 block rounded-sm border-2 border-transparent hover:border-grape hover:bg-grape/20 focus-ring"
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

        {hover ? (
          <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 rounded-md border-2 border-ink bg-surface px-2 py-1 font-[family-name:var(--font-pixelify)] text-xs shadow-[2px_2px_0_var(--ink)]">
            {HOTSPOTS.find((h) => h.id === hover)?.label}
          </div>
        ) : null}
      </div>

      <ul className="mt-3 flex flex-wrap justify-center gap-2" aria-label="Desk hotspots">
        {HOTSPOTS.map((h) => (
          <li key={h.id}>
            <Link href={h.href} className="tag no-underline hover:bg-blush">
              {h.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
