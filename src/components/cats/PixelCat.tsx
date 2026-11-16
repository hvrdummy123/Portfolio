"use client";

import { useEffect, useId, useState } from "react";
import {
  CatPaletteName,
  CatPose,
  GRID,
  PALETTES,
  SPRITES,
} from "./sprites";
import { cn } from "@/lib/cn";

type PixelCatProps = {
  pose?: CatPose;
  palette?: CatPaletteName;
  scale?: number;
  animate?: boolean;
  className?: string;
  title?: string;
  fps?: number;
};

export function PixelCat({
  pose = "idle",
  palette = "cream",
  scale = 3,
  animate = true,
  className,
  title = "Pixel cat",
  fps = 4,
}: PixelCatProps) {
  const frames = SPRITES[pose];
  const [frame, setFrame] = useState(0);
  const uid = useId();
  const colors = PALETTES[palette];
  const size = GRID * scale;

  useEffect(() => {
    if (!animate || frames.length < 2) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      setFrame((f) => (f + 1) % frames.length);
    }, 1000 / fps);
    return () => window.clearInterval(id);
  }, [animate, frames.length, fps, pose]);

  const pixels = frames[Math.min(frame, frames.length - 1)];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${GRID} ${GRID}`}
      className={cn("inline-block", className)}
      style={{ imageRendering: "pixelated" }}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <desc>A pixel-art cat named Mochi in the {pose} pose.</desc>
      {pixels.map((colorIndex, i) => {
        if (colorIndex === 0) return null;
        const x = i % GRID;
        const y = Math.floor(i / GRID);
        return (
          <rect
            key={`${uid}-${i}`}
            x={x}
            y={y}
            width={1}
            height={1}
            fill={colors[colorIndex] ?? "transparent"}
          />
        );
      })}
    </svg>
  );
}
