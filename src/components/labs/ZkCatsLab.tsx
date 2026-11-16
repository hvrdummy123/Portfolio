"use client";

import { useState } from "react";
import { PixelCat } from "@/components/cats/PixelCat";

const steps = [
  {
    title: "Issuer signs a credential",
    body: "A trusted issuer attests attributes (e.g. date of birth) into a credential.",
    pose: "sit" as const,
  },
  {
    title: "Prover makes a proof",
    body: "You prove age ≥ 18 without revealing the birthday — selective disclosure.",
    pose: "think" as const,
  },
  {
    title: "Verifier checks on-chain",
    body: "A verifier checks the zk-SNARK; the chain keeps an audit trail without the raw PII.",
    pose: "celebrate" as const,
  },
  {
    title: "Where's the cat? (cave analogy)",
    body: "Mochi knows which tunnel has the yarn. She exits the other side. You learn she knows — not which tunnel.",
    pose: "peek" as const,
  },
];

export function ZkCatsLab() {
  const [i, setI] = useState(0);
  const step = steps[i];

  return (
    <div className="pixel-border p-5">
      <div className="flex items-center gap-4">
        <PixelCat pose={step.pose} scale={4} />
        <div>
          <p className="pixel-label">
            Step {i + 1} / {steps.length}
          </p>
          <h2 className="display text-2xl">{step.title}</h2>
          <p className="mt-2 text-sm text-ink-soft">{step.body}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          disabled={i === 0}
          onClick={() => setI((v) => Math.max(0, v - 1))}
        >
          Back
        </button>
        <button
          type="button"
          className="btn"
          disabled={i === steps.length - 1}
          onClick={() => setI((v) => Math.min(steps.length - 1, v + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
