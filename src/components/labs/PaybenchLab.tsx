"use client";

import { useMemo, useState } from "react";
import { Window } from "@/components/ui/Window";
import { PixelCat } from "@/components/cats/PixelCat";

type Ledger = { alice: number; bob: number; payouts: number; rows: string[] };
type Mode = "easy" | "real";

const START: Ledger = {
  alice: 10000,
  bob: 0,
  payouts: 0,
  rows: [],
};
const IDEM = "xfer-alice-bob-8000";

const POLICIES = [
  { id: "P1", label: "Do not double-pay" },
  { id: "P2", label: "Verify before retry" },
  { id: "P3", label: "Use an idempotency key" },
  { id: "P4", label: "Don't tell the customer it failed if money moved" },
];

export function PaybenchLab() {
  const [ledger, setLedger] = useState<Ledger>(START);
  const [phase, setPhase] = useState<"idle" | "timeout" | "done">("idle");
  const [msg, setMsg] = useState("Customer: please send ₹8,000 to Bob.");
  const [log, setLog] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("easy");
  const [flags, setFlags] = useState<Record<string, "pass" | "fail" | "pending">>({
    P1: "pending",
    P2: "pending",
    P3: "pending",
    P4: "pending",
  });

  const pushLog = (line: string) => setLog((l) => [...l, line]);

  const commitAmbiguous = () => {
    setLedger((l) => ({
      alice: l.alice - 8000,
      bob: l.bob + 8000,
      payouts: l.payouts + 1,
      rows: [...l.rows, `TRANSFER ${IDEM} ₹8000 Alice→Bob`],
    }));
    setPhase("timeout");
    setMsg("API returned TIMEOUT_AFTER_COMMIT. Did the money move?");
    pushLog(`POST /transfer key=${IDEM} → TIMEOUT_AFTER_COMMIT`);
  };

  const naiveRetry = () => {
    setLedger((l) => ({
      alice: l.alice - 8000,
      bob: l.bob + 8000,
      payouts: l.payouts + 1,
      rows: [...l.rows, `TRANSFER retry-no-key ₹8000 Alice→Bob`],
    }));
    setPhase("done");
    setMsg("Naive retry without verify → double payout.");
    pushLog("RETRY without idempotency key → second transfer committed");
    setFlags({ P1: "fail", P2: "fail", P3: "fail", P4: "pass" });
  };

  const verifyFirst = () => {
    pushLog(`GET /transfers?key=${IDEM} → FOUND (₹8000 already moved)`);
    setMsg("Lookup shows the transfer already landed. Safe to reply success.");
    setFlags((f) => ({ ...f, P2: "pass" }));
  };

  const safeRetry = () => {
    pushLog(`POST /transfer key=${IDEM} → 200 idempotent replay (no new debit)`);
    setPhase("done");
    setMsg("Same idempotency key → no second transfer. Oracle path.");
    setFlags({ P1: "pass", P2: "pass", P3: "pass", P4: "pass" });
  };

  const tellFailed = () => {
    setPhase("done");
    setMsg("You told the customer it failed — but Bob already has ₹8,000.");
    pushLog("AGENT → customer: transfer failed (policy miss)");
    setFlags((f) => ({
      P1: f.P1 === "fail" ? "fail" : "pass",
      P2: f.P2,
      P3: f.P3,
      P4: "fail",
    }));
  };

  const reset = () => {
    setLedger(START);
    setPhase("idle");
    setMsg("Customer: please send ₹8,000 to Bob.");
    setLog([]);
    setFlags({ P1: "pending", P2: "pending", P3: "pending", P4: "pending" });
  };

  const score = useMemo(() => {
    const vals = Object.values(flags);
    if (vals.every((v) => v === "pending")) return null;
    const fail = vals.filter((v) => v === "fail").length;
    return fail === 0 ? "PASS" : "FAIL";
  }, [flags]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-ink-soft">
          Goal: move ₹8,000 once — even when the API times out after commit.
        </p>
        <div className="flex gap-2">
          {(["easy", "real"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              className={`tag capitalize ${mode === m ? "bg-blush" : ""}`}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {mode === "easy" ? (
        <p className="rounded-lg border-2 border-ink bg-butter/50 px-3 py-2 text-xs">
          Hint: after a timeout, look up the transfer before you retry — and reuse the same
          idempotency key.
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        <Window title="customer.chat" status="live">
          <div className="flex items-start gap-2">
            <PixelCat
              pose={score === "FAIL" ? "error" : score === "PASS" ? "celebrate" : "think"}
              scale={2}
            />
            <p className="text-sm" aria-live="polite">
              {msg}
            </p>
          </div>
        </Window>

        <Window title="ledger.db" status={`payouts=${ledger.payouts}`}>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded border-2 border-ink bg-cream p-2">
              <p className="eyebrow">Alice</p>
              <p className="display text-xl">₹{ledger.alice}</p>
            </div>
            <div className="rounded border-2 border-ink bg-cream p-2">
              <p className="eyebrow">Bob</p>
              <p className="display text-xl">₹{ledger.bob}</p>
            </div>
          </div>
          <ul className="mt-3 max-h-24 overflow-auto font-mono text-[11px] text-ink-soft">
            {ledger.rows.length === 0 ? <li>(empty)</li> : null}
            {ledger.rows.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Window>

        <Window title="policy.check">
          <ul className="space-y-2 text-sm">
            {POLICIES.map((p) => (
              <li key={p.id} className="flex items-center gap-2">
                <span
                  className={`tag ${
                    flags[p.id] === "pass"
                      ? "tag-ai"
                      : flags[p.id] === "fail"
                        ? "bg-tomato/40"
                        : ""
                  }`}
                >
                  {flags[p.id] === "pass" ? "✓" : flags[p.id] === "fail" ? "✗" : "·"} {p.id}
                </span>
                <span className="text-ink-soft">{p.label}</span>
              </li>
            ))}
          </ul>
          {score ? (
            <p className="mt-3 font-[family-name:var(--font-pixelify)] text-lg" aria-live="polite">
              {score}
            </p>
          ) : null}
        </Window>
      </div>

      <Window title="api.log" status={`key=${IDEM}`}>
        <pre className="max-h-28 overflow-auto font-mono text-xs text-ink-soft">
          {log.length ? log.join("\n") : "Waiting for requests…"}
        </pre>
        <div className="mt-4 flex flex-wrap gap-2">
          {phase === "idle" ? (
            <button type="button" className="btn" onClick={commitAmbiguous}>
              Transfer ₹8,000
            </button>
          ) : null}
          {phase === "timeout" ? (
            <>
              <button type="button" className="btn btn-secondary" onClick={verifyFirst}>
                Verify first
              </button>
              <button type="button" className="btn" onClick={safeRetry}>
                Retry with same key
              </button>
              <button type="button" className="btn btn-ghost" onClick={naiveRetry}>
                Retry without key
              </button>
              <button type="button" className="btn btn-ghost" onClick={tellFailed}>
                Tell customer it failed
              </button>
            </>
          ) : null}
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Reset
          </button>
        </div>
      </Window>

      {phase === "done" ? (
        <Window title="what-you-learned.txt">
          <p className="text-sm text-ink-soft">
            Graders should check final world state and policy rules — not chat fluency. An ambiguous
            timeout is only safe if you verify and replay with the same idempotency key.
          </p>
        </Window>
      ) : null}
    </div>
  );
}
