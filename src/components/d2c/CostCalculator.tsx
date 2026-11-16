"use client";

import { useMemo, useState } from "react";

const tiers = [
  { id: "launch", label: "Launch", dau: 200, orders: 50, range: [2000, 6500] },
  { id: "growth", label: "Growth", dau: 2000, orders: 500, range: [8000, 15000] },
  { id: "mwm", label: "MWM", dau: 10000, orders: 1500, range: [11000, 16000] },
  { id: "scale", label: "Scale", dau: 30000, orders: 5000, range: [20000, 40000] },
] as const;

export function CostCalculator() {
  const [idx, setIdx] = useState(2);
  const [aov, setAov] = useState(300);
  const tier = tiers[idx];

  const razorpayFees = useMemo(() => {
    const gmv = tier.orders * aov;
    return { gmv, fees: Math.round(gmv * 0.02) };
  }, [tier.orders, aov]);

  return (
    <div className="mt-3 card p-4">
      <p className="rounded bg-butter/50 p-2 text-xs">
        Estimates from the design doc — excludes one-off setup; Razorpay fees shown separately.
      </p>
      <label className="mt-4 block text-sm">
        Tier: {tier.label} ({tier.dau.toLocaleString()} DAU · ~{tier.orders} orders/mo)
        <input
          type="range"
          min={0}
          max={tiers.length - 1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
          className="mt-2 block w-full"
        />
      </label>
      <label className="mt-4 block text-sm">
        AOV ₹{aov}
        <input
          type="range"
          min={100}
          max={800}
          step={50}
          value={aov}
          onChange={(e) => setAov(Number(e.target.value))}
          className="mt-2 block w-full"
        />
      </label>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-surface-2 p-3">
          <p className="eyebrow">Infra (ex-Razorpay)</p>
          <p className="display text-2xl">
            ₹{tier.range[0].toLocaleString()}–{tier.range[1].toLocaleString()}/mo
          </p>
        </div>
        <div className="rounded-lg bg-surface-2 p-3">
          <p className="eyebrow">Razorpay ~2% example</p>
          <p className="display text-2xl">₹{razorpayFees.fees.toLocaleString()}/mo</p>
          <p className="text-xs text-ink-soft">
            GMV ₹{razorpayFees.gmv.toLocaleString()} ({tier.orders} × ₹{aov})
          </p>
        </div>
      </div>
      <ul className="mt-4 list-disc pl-5 text-sm text-ink-soft">
        <li>Railway Medusa replicas</li>
        <li>Vercel storefront</li>
        <li>Supabase Postgres (+ Pro at MWM)</li>
        <li>Cloudflare, Resend, Interakt, MSG91</li>
      </ul>
    </div>
  );
}
