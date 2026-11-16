"use client";

import { useEffect, useRef, useState } from "react";

type Obstacle = { x: number; y: number; w: number; h: number; label: string; duck?: boolean };
type Pickup = { x: number; y: number; kind: "yarn" | "check" };

const LABELS = ["NullPointer", "Race Condition", "Timeout"];

export function YarnRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [paused, setPaused] = useState(false);
  const [alive, setAlive] = useState(true);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    setBest(Number(localStorage.getItem("yarn-best") || 0));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setSlow(true);

    let raf = 0;
    let t = 0;
    let y = 120;
    let vy = 0;
    let ducking = false;
    let localScore = 0;
    let running = true;
    const ground = 150;
    const obstacles: Obstacle[] = [];
    const pickups: Pickup[] = [];
    let spawn = 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (y >= ground - 1) vy = -8;
      }
      if (e.code === "ArrowDown") ducking = true;
      if (e.code === "KeyP") setPaused((p) => !p);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown") ducking = false;
    };
    const onTap = () => {
      if (y >= ground - 1) vy = -8;
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("pointerdown", onTap);

    const loop = () => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (document.hidden || paused || !alive) return;

      const speed = (slow ? 2.2 : 4) + Math.min(3, localScore / 40);
      t += 1;
      vy += 0.45;
      y = Math.min(ground, y + vy);
      if (y >= ground) vy = 0;

      spawn += 1;
      if (spawn > 70) {
        spawn = 0;
        if (Math.random() > 0.35) {
          const duck = Math.random() > 0.7;
          obstacles.push({
            x: 480,
            y: duck ? ground - 28 : ground - 18,
            w: 22,
            h: duck ? 16 : 18,
            label: LABELS[Math.floor(Math.random() * LABELS.length)],
            duck,
          });
        } else {
          pickups.push({
            x: 480,
            y: ground - 40 - Math.random() * 30,
            kind: Math.random() > 0.5 ? "yarn" : "check",
          });
        }
      }

      for (const o of obstacles) o.x -= speed;
      for (const p of pickups) p.x -= speed;
      while (obstacles[0] && obstacles[0].x < -40) obstacles.shift();
      while (pickups[0] && pickups[0].x < -20) pickups.shift();

      const catH = ducking ? 14 : 22;
      const catY = ducking ? ground - 14 : y - 22;
      const cat = { x: 60, y: catY, w: 22, h: catH };

      for (const o of obstacles) {
        if (
          cat.x < o.x + o.w &&
          cat.x + cat.w > o.x &&
          cat.y < o.y + o.h &&
          cat.y + cat.h > o.y
        ) {
          running = false;
          setAlive(false);
          setBest((b) => {
            const n = Math.max(b, localScore);
            localStorage.setItem("yarn-best", String(n));
            return n;
          });
        }
      }

      for (let i = pickups.length - 1; i >= 0; i--) {
        const p = pickups[i];
        if (
          cat.x < p.x + 12 &&
          cat.x + cat.w > p.x &&
          cat.y < p.y + 12 &&
          cat.y + cat.h > p.y
        ) {
          localScore += p.kind === "yarn" ? 5 : 10;
          setScore(localScore);
          pickups.splice(i, 1);
        }
      }

      if (t % 15 === 0) {
        localScore += 1;
        setScore(localScore);
      }

      ctx.fillStyle = "#FFF8F0";
      ctx.fillRect(0, 0, 480, 180);
      ctx.fillStyle = "#E9DDF0";
      ctx.fillRect(0, ground + 2, 480, 40);

      ctx.fillStyle = "#3B3355";
      ctx.fillRect(cat.x, cat.y, cat.w, cat.h);
      ctx.fillStyle = "#FFD6E0";
      ctx.fillRect(cat.x + 4, cat.y + 6, 6, 4);

      ctx.fillStyle = "#B8456F";
      for (const o of obstacles) {
        ctx.fillRect(o.x, o.y, o.w, o.h);
        ctx.font = "8px monospace";
        ctx.fillText(o.label.slice(0, 8), o.x - 4, o.y - 4);
      }

      for (const p of pickups) {
        ctx.fillStyle = p.kind === "yarn" ? "#6C5BD6" : "#2f9e44";
        ctx.beginPath();
        ctx.arc(p.x + 6, p.y + 6, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "#3B3355";
      ctx.font = "12px monospace";
      ctx.fillText(`score ${localScore}`, 12, 18);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointerdown", onTap);
    };
  }, [paused, alive, slow]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={480}
        height={180}
        className="pixel-border w-full max-w-[480px] bg-[color:#FFF8F0]"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <span>
          Score {score} · Best {best}
        </span>
        <button type="button" className="btn btn-secondary" onClick={() => setPaused((p) => !p)}>
          {paused ? "Resume" : "Pause"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setSlow((s) => !s)}>
          {slow ? "Normal" : "Slow mode"}
        </button>
        {!alive && (
          <button
            type="button"
            className="btn"
            onClick={() => {
              setAlive(true);
              setScore(0);
            }}
          >
            Retry
          </button>
        )}
        {score >= 50 && <span className="tag tag-ai">Unlocked: lavender cat</span>}
      </div>
    </div>
  );
}
