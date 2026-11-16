"use client";

import { useEffect, useState } from "react";
import { PixelCat } from "./PixelCat";
import { usePrefs } from "@/components/providers/PrefsProvider";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEggs() {
  const { sound } = usePrefs();
  const [parade, setParade] = useState(false);
  const [hearts, setHearts] = useState(false);

  useEffect(() => {
    let buf: string[] = [];
    let meow = "";

    const onKey = (e: KeyboardEvent) => {
      buf = [...buf, e.key].slice(-KONAMI.length);
      if (buf.join(",") === KONAMI.join(",")) {
        setParade(true);
        window.setTimeout(() => setParade(false), 4000);
        buf = [];
      }

      if (/^[a-z]$/i.test(e.key) && !(e.target instanceof HTMLInputElement)) {
        meow = (meow + e.key.toLowerCase()).slice(-4);
        if (meow === "meow") {
          setHearts(true);
          window.setTimeout(() => setHearts(false), 1200);
          meow = "";
          if (sound) {
            try {
              const ctx = new AudioContext();
              const o = ctx.createOscillator();
              const g = ctx.createGain();
              o.frequency.value = 880;
              g.gain.value = 0.03;
              o.connect(g);
              g.connect(ctx.destination);
              o.start();
              o.stop(ctx.currentTime + 0.12);
            } catch {
              /* ignore */
            }
          }
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sound]);

  return (
    <>
      {parade && (
        <div className="pointer-events-none fixed inset-x-0 bottom-8 z-[80] flex justify-around" aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => (
            <PixelCat key={i} pose="run" palette={i % 2 ? "lavender" : "ginger"} scale={2} fps={8} />
          ))}
        </div>
      )}
      {hearts && (
        <div className="pointer-events-none fixed inset-0 z-[80] grid place-items-center text-4xl" aria-hidden>
          ❤️ 🩷 ❤️
        </div>
      )}
    </>
  );
}
