"use client";

import { useRef, useState } from "react";
import { PixelCat } from "@/components/cats/PixelCat";

const CHORDS: Record<string, number[]> = {
  C: [261.63, 329.63, 392.0, 523.25],
  G: [196.0, 246.94, 293.66, 392.0],
  Am: [220.0, 261.63, 329.63, 440.0],
  F: [174.61, 220.0, 261.63, 349.23],
};

export function Ukulele() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [pose, setPose] = useState<"ukulele" | "celebrate">("ukulele");

  const ensure = async () => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
    return ctxRef.current;
  };

  const strum = async (name: string) => {
    const ctx = await ensure();
    const freqs = CHORDS[name];
    freqs.forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      g.gain.value = 0.04;
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.03);
      o.stop(ctx.currentTime + 0.85);
    });
    setPose("celebrate");
    window.setTimeout(() => setPose("ukulele"), 600);
  };

  return (
    <div className="pixel-border flex flex-wrap items-center gap-4 p-4">
      <PixelCat pose={pose} palette="lavender" scale={4} />
      <div className="flex flex-wrap gap-2">
        {Object.keys(CHORDS).map((c) => (
          <button key={c} type="button" className="btn" onClick={() => strum(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
