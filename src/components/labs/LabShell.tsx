"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Window } from "@/components/ui/Window";

type LabShellProps = {
  goal: string;
  steps: [string, string, string];
  caseHref: string;
  caseLabel: string;
  outcome?: string;
  onReset: () => void;
  children: ReactNode;
};

export function LabShell({
  goal,
  steps,
  caseHref,
  caseLabel,
  outcome = "",
  onReset,
  children,
}: LabShellProps) {
  const [checked, setChecked] = useState([false, false, false]);

  const toggleStep = (index: number) => {
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const handleReset = () => {
    setChecked([false, false, false]);
    onReset();
  };

  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm text-ink-soft">{goal}</p>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,17rem)_1fr]">
        <aside className="space-y-4">
          <Window title="what-to-try.txt" status={`${checked.filter(Boolean).length}/3 done`}>
            <p className="eyebrow">What to try</p>
            <ul className="mt-2 space-y-2">
              {steps.map((step, index) => (
                <li key={step}>
                  <label className="flex cursor-pointer items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="mt-0.5"
                      checked={checked[index]}
                      onChange={() => toggleStep(index)}
                    />
                    <span className={checked[index] ? "text-ink-soft line-through" : ""}>
                      {step}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn-ghost mt-4 w-full" onClick={handleReset}>
              Reset lab
            </button>
          </Window>

          <Link href={caseHref} className="text-sm no-underline hover:underline">
            {caseLabel} →
          </Link>

          <div
            className="rounded-lg border-2 border-ink bg-butter/30 px-3 py-2 text-sm"
            aria-live="polite"
          >
            {outcome ? (
              outcome
            ) : (
              <span className="text-ink-soft">Outcomes and scores appear here as you play.</span>
            )}
          </div>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}