"use client";

import { useEffect, useState } from "react";
import { PixelCat } from "./PixelCat";

export function HeroCat() {
  const [phase, setPhase] = useState<"walk" | "jump" | "sit">("walk");
  const [x, setX] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("sit");
      setX(72);
      return;
    }

    let start: number | null = null;
    let raf = 0;
    const duration = 2200;

    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      setX(p * 72);
      if (p < 0.85) setPhase("walk");
      else if (p < 0.95) setPhase("jump");
      else setPhase("sit");
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16" aria-hidden>
      <div
        className="absolute bottom-0 transition-transform"
        style={{ left: `${x}%`, transform: "translateX(-50%)" }}
      >
        <PixelCat
          pose={phase === "sit" ? "sit" : phase === "jump" ? "jump" : "walk"}
          scale={3}
          fps={8}
        />
      </div>
    </div>
  );
}
