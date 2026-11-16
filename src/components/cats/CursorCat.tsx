"use client";

import { useEffect, useRef, useState } from "react";
import { PixelCat } from "./PixelCat";
import { usePrefs } from "@/components/providers/PrefsProvider";

export function CursorCat() {
  const { cursorCat } = usePrefs();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [sleeping, setSleeping] = useState(false);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const idleTimer = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!cursorCat) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX + 16, y: e.clientY + 16 };
      setSleeping(false);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setSleeping(true), 10000);
    };

    const tick = () => {
      if (!document.hidden) {
        current.current.x += (target.current.x - current.current.x) * 0.12;
        current.current.y += (target.current.y - current.current.y) * 0.12;
        setPos({ x: current.current.x, y: current.current.y });
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [cursorCat]);

  if (!cursorCat) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[90] hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <PixelCat pose={sleeping ? "sleep" : "run"} scale={2} fps={6} />
    </div>
  );
}
