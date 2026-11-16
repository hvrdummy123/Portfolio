"use client";

import { useMemo, useState } from "react";
import { Window } from "@/components/ui/Window";

function series(lookahead: boolean) {
  const prices = [100, 102, 101, 105, 104, 108, 107, 112, 110, 115];
  let cash = 1000;
  let shares = 0;
  const equity: number[] = [];
  for (let i = 1; i < prices.length; i++) {
    const signal = lookahead ? prices[i]! - prices[i - 1]! : prices[i - 1]! - (prices[i - 2] ?? prices[0]!);
    if (signal > 0 && cash > 0) {
      shares = cash / prices[i - (lookahead ? 0 : 1)]!;
      cash = 0;
    } else if (signal < 0 && shares > 0) {
      cash = shares * prices[i - (lookahead ? 0 : 1)]!;
      shares = 0;
    }
    equity.push(cash + shares * prices[i]!);
  }
  return equity;
}

export function LookaheadLab() {
  const [bias, setBias] = useState(false);
  const honest = useMemo(() => series(false), []);
  const inflated = useMemo(() => series(true), []);
  const curve = bias ? inflated : honest;
  const max = Math.max(...curve);

  return (
    <Window title="lookahead.exe" status={bias ? "biased" : "honest"}>
      <p className="text-sm text-ink-soft">
        Same toy strategy on synthetic prices. Toggle look-ahead bias to see an inflated equity
        curve — illustrative only.
      </p>
      <label className="mt-4 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={bias} onChange={(e) => setBias(e.target.checked)} />
        Enable look-ahead bias
      </label>
      <svg viewBox="0 0 320 120" className="mt-4 w-full border-2 border-ink bg-surface" role="img" aria-label="Equity curve">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={curve
            .map((v, i) => `${(i / (curve.length - 1)) * 300 + 10},${110 - ((v - 900) / (max - 900 + 1)) * 90}`)
            .join(" ")}
        />
      </svg>
      <p className="mt-2 font-[family-name:var(--font-jetbrains)] text-sm" aria-live="polite">
        Final equity ≈ {curve[curve.length - 1]?.toFixed(0)}
      </p>
    </Window>
  );
}
