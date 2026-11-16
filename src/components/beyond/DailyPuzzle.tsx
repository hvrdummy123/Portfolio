"use client";

import { useMemo, useState } from "react";

function seeded(date: string) {
  let h = 0;
  for (const ch of date) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 0xffffffff;
  };
}

export function DailyPuzzle() {
  const today = new Date().toISOString().slice(0, 10);
  const puzzle = useMemo(() => {
    const rnd = seeded(today);
    const target = 1 + Math.floor(rnd() * 9);
    const clues = [
      `The number is ${target % 2 === 0 ? "even" : "odd"}.`,
      `It is ${target > 5 ? "greater" : "at most"} 5.`,
      `If you add the number to itself, the sum is ${target + target}.`,
    ];
    return { target, clues };
  }, [today]);

  const [guess, setGuess] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div className="pixel-border p-4">
      <p className="pixel-label">Daily · {today}</p>
      <ul className="mt-2 list-disc pl-5 text-sm">
        {puzzle.clues.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <div className="mt-3 flex gap-2">
        <input
          className="w-24 rounded-lg border-2 border-border px-2"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          inputMode="numeric"
          aria-label="Guess"
        />
        <button
          type="button"
          className="btn"
          onClick={() =>
            setMsg(Number(guess) === puzzle.target ? "Correct!" : "Not quite — try again.")
          }
        >
          Check
        </button>
      </div>
      {msg && <p className="mt-2 text-sm">{msg}</p>}
    </div>
  );
}
