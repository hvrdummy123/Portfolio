"use client";

import { useRef, useState } from "react";

const SIZE = 12;
const COLORS = ["#FFF8F0", "#FFD6E0", "#D9C8F5", "#CDEFE0", "#FFF1B8", "#3B3355"];

export function CrochetPad() {
  const [grid, setGrid] = useState(() =>
    Array.from({ length: SIZE * SIZE }, () => 0),
  );
  const [color, setColor] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const paint = (i: number) => {
    setGrid((g) => {
      const next = [...g];
      next[i] = color;
      return next;
    });
  };

  const exportPng = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const scale = 16;
    c.width = SIZE * scale;
    c.height = SIZE * scale;
    for (let i = 0; i < grid.length; i++) {
      ctx.fillStyle = COLORS[grid[i]];
      ctx.fillRect((i % SIZE) * scale, Math.floor(i / SIZE) * scale, scale, scale);
    }
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "crochet-pattern.png";
    a.click();
  };

  return (
    <div className="pixel-border p-4">
      <div className="mb-3 flex flex-wrap gap-2">
        {COLORS.map((c, i) => (
          <button
            key={c}
            type="button"
            aria-label={`Color ${i}`}
            className="h-8 w-8 rounded-full border-2 border-ink"
            style={{ background: c, outline: color === i ? "3px solid var(--accent)" : undefined }}
            onClick={() => setColor(i)}
          />
        ))}
        <button type="button" className="btn btn-secondary" onClick={exportPng}>
          Export PNG
        </button>
      </div>
      <div
        className="inline-grid gap-0.5 border-2 border-ink bg-ink p-0.5"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 1.5rem)` }}
      >
        {grid.map((cell, i) => (
          <button
            key={i}
            type="button"
            className="h-6 w-6"
            style={{ background: COLORS[cell] }}
            onClick={() => paint(i)}
            aria-label={`Stitch ${i}`}
          />
        ))}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
