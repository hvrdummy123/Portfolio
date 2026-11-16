"use client";

import { useState } from "react";

type Ledger = { alice: number; bob: number; payouts: number };

const START: Ledger = { alice: 10000, bob: 0, payouts: 0 };

export function PaybenchLab() {
  const [ledger, setLedger] = useState<Ledger>(START);
  const [msg, setMsg] = useState("API will return TIMEOUT_AFTER_COMMIT after moving ₹8,000.");
  const [done, setDone] = useState<"idle" | "safe" | "dup">("idle");

  const commitAmbiguous = () => {
    setLedger((l) => ({ alice: l.alice - 8000, bob: l.bob + 8000, payouts: l.payouts + 1 }));
    setMsg("TIMEOUT — did it go through? Choose wisely.");
  };

  const naiveRetry = () => {
    setLedger((l) => ({ alice: l.alice - 8000, bob: l.bob + 8000, payouts: l.payouts + 1 }));
    setDone("dup");
    setMsg("Naive retry without verify → double payout. Safety violation.");
  };

  const safeRetry = () => {
    setDone("safe");
    setMsg("Verified world state + idempotent key → no second transfer. Oracle path.");
  };

  const reset = () => {
    setLedger(START);
    setDone("idle");
    setMsg("API will return TIMEOUT_AFTER_COMMIT after moving ₹8,000.");
  };

  return (
    <div className="pixel-border p-5">
      <p className="text-sm text-ink-soft">
        Simplified in-browser ledger. Modeled on PayBench&apos;s ambiguous-timeout idea (not a
        wholesale copy of the repo playground).
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-surface-2 p-3">
          <p className="pixel-label">Alice</p>
          <p className="display text-2xl">₹{ledger.alice}</p>
        </div>
        <div className="rounded-lg bg-surface-2 p-3">
          <p className="pixel-label">Bob</p>
          <p className="display text-2xl">₹{ledger.bob}</p>
        </div>
        <div className="rounded-lg bg-surface-2 p-3">
          <p className="pixel-label">Payouts</p>
          <p className="display text-2xl">{ledger.payouts}</p>
        </div>
      </div>
      <p className="mt-4 text-sm">{msg}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {done === "idle" && ledger.payouts === 0 && (
          <button type="button" className="btn" onClick={commitAmbiguous}>
            Send ₹8,000
          </button>
        )}
        {done === "idle" && ledger.payouts === 1 && (
          <>
            <button type="button" className="btn" onClick={naiveRetry}>
              Retry immediately
            </button>
            <button type="button" className="btn btn-secondary" onClick={safeRetry}>
              Verify + idempotent retry
            </button>
          </>
        )}
        <button type="button" className="btn btn-ghost" onClick={reset}>
          Reset
        </button>
      </div>
      {done === "dup" && (
        <p className="mt-4 rounded-lg bg-blush/60 p-3 text-sm font-medium">Result: unsafe (red)</p>
      )}
      {done === "safe" && (
        <p className="mt-4 rounded-lg bg-mint/60 p-3 text-sm font-medium">Result: safe (green)</p>
      )}
    </div>
  );
}
