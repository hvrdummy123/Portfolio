"use client";

import { useState } from "react";
import { Window } from "@/components/ui/Window";

export function IdempotencyLab() {
  const [withKey, setWithKey] = useState(true);
  const [charges, setCharges] = useState(0);
  const [requests, setRequests] = useState(0);
  const [seen, setSeen] = useState<Set<string>>(new Set());

  const fire = () => {
    const key = "pay-42";
    setRequests((n) => n + 1);
    if (withKey) {
      if (seen.has(key)) return;
      setSeen(new Set(seen).add(key));
      setCharges((n) => n + 1);
    } else {
      setCharges((n) => n + 1);
    }
  };

  const reset = () => {
    setCharges(0);
    setRequests(0);
    setSeen(new Set());
  };

  return (
    <Window title="idempotency.exe" status={withKey ? "keys on" : "keys off"}>
      <p className="text-sm text-ink-soft">
        Fire the same payment request repeatedly. With an idempotency key, only the first charge
        sticks.
      </p>
      <label className="mt-4 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={withKey}
          onChange={(e) => {
            setWithKey(e.target.checked);
            reset();
          }}
        />
        Use idempotency key
      </label>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn" onClick={fire}>
          Send payment
        </button>
        <button type="button" className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>
      <p className="mt-4 font-[family-name:var(--font-jetbrains)] text-sm" aria-live="polite">
        Requests: {requests} · Charges applied: {charges}
        {charges > 1 ? " — double charge!" : charges === 1 ? " — safe" : ""}
      </p>
    </Window>
  );
}
