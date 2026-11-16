"use client";

import { useMemo, useState } from "react";

/** Synthetic OHLCV-ish closes — illustrative only, not NSE data. */
const SYNTHETIC = [
  100, 101, 102, 101, 103, 105, 104, 106, 108, 107, 109, 111, 110, 112, 115, 114,
  113, 116, 118, 117, 119, 121, 120, 122, 125, 124, 123, 126, 128, 127,
];

function sma(data: number[], window: number) {
  return data.map((_, i) => {
    if (i < window - 1) return null;
    const slice = data.slice(i - window + 1, i + 1);
    return slice.reduce((a, b) => a + b, 0) / window;
  });
}

export function BacktestToy() {
  const [fast, setFast] = useState(3);
  const [slow, setSlow] = useState(8);

  const { fastLine, slowLine, signals } = useMemo(() => {
    const f = sma(SYNTHETIC, fast);
    const s = sma(SYNTHETIC, slow);
    const sig: { i: number; type: "buy" | "sell" }[] = [];
    for (let i = 1; i < SYNTHETIC.length; i++) {
      if (f[i] == null || s[i] == null || f[i - 1] == null || s[i - 1] == null) continue;
      if (f[i - 1]! <= s[i - 1]! && f[i]! > s[i]!) sig.push({ i, type: "buy" });
      if (f[i - 1]! >= s[i - 1]! && f[i]! < s[i]!) sig.push({ i, type: "sell" });
    }
    return { fastLine: f, slowLine: s, signals: sig };
  }, [fast, slow]);

  const w = 560;
  const h = 220;
  const min = Math.min(...SYNTHETIC) - 2;
  const max = Math.max(...SYNTHETIC) + 2;
  const x = (i: number) => (i / (SYNTHETIC.length - 1)) * (w - 40) + 20;
  const y = (v: number) => h - 20 - ((v - min) / (max - min)) * (h - 40);

  const path = (vals: (number | null)[]) =>
    vals
      .map((v, i) => (v == null ? null : `${i === 0 || vals[i - 1] == null ? "M" : "L"}${x(i)},${y(v)}`))
      .filter(Boolean)
      .join(" ");

  return (
    <div className="pixel-border p-5">
      <p className="rounded-lg bg-butter/50 p-2 text-xs">
        Illustrative, synthetic data — not real NSE output.
      </p>
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <label>
          Fast SMA{" "}
          <input
            type="range"
            min={2}
            max={6}
            value={fast}
            onChange={(e) => setFast(Number(e.target.value))}
          />{" "}
          {fast}
        </label>
        <label>
          Slow SMA{" "}
          <input
            type="range"
            min={5}
            max={15}
            value={slow}
            onChange={(e) => setSlow(Number(e.target.value))}
          />{" "}
          {slow}
        </label>
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="mt-4 w-full"
        role="img"
        aria-label="Synthetic moving-average crossover chart"
      >
        <title>Synthetic MA crossover</title>
        <desc>Line chart of synthetic prices with fast and slow moving averages.</desc>
        <path d={path(SYNTHETIC)} fill="none" stroke="var(--ink)" strokeWidth="2" />
        <path d={path(fastLine)} fill="none" stroke="var(--accent)" strokeWidth="2" />
        <path d={path(slowLine)} fill="none" stroke="var(--accent-2)" strokeWidth="2" />
        {signals.map((s) => (
          <circle
            key={`${s.type}-${s.i}`}
            cx={x(s.i)}
            cy={y(SYNTHETIC[s.i])}
            r={4}
            fill={s.type === "buy" ? "#2f9e44" : "#c92a2a"}
          />
        ))}
      </svg>
      <p className="mt-2 text-sm text-ink-soft">
        Signals: {signals.filter((s) => s.type === "buy").length} buy ·{" "}
        {signals.filter((s) => s.type === "sell").length} sell
      </p>
    </div>
  );
}
