"use client";

import { useMemo, useState } from "react";
import { PixelCat } from "@/components/cats/PixelCat";
import { Window } from "@/components/ui/Window";

export function ZkCatsLab() {
  const [tab, setTab] = useState<"flow" | "cave">("flow");
  const [year, setYear] = useState(2004);
  const [issued, setIssued] = useState(false);
  const [proved, setProved] = useState(false);
  const [view, setView] = useState<"proof" | "kyc">("proof");
  const [rounds, setRounds] = useState(0);
  const [caveMsg, setCaveMsg] = useState("Pick a tunnel. The prover exits the other side.");

  const ageOk = useMemo(() => new Date().getFullYear() - year >= 18, [year]);
  const confidence = rounds === 0 ? 0 : 1 - 1 / 2 ** rounds;

  const playCave = (pick: 0 | 1) => {
    setRounds((r) => r + 1);
    setCaveMsg(
      `You called tunnel ${pick + 1}. Prover exited the other side. Confidence ≈ ${(
        (1 - 1 / 2 ** (rounds + 1)) *
        100
      ).toFixed(1)}%`,
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          className={`tag ${tab === "flow" ? "bg-blush" : ""}`}
          onClick={() => setTab("flow")}
        >
          Credential flow
        </button>
        <button
          type="button"
          className={`tag ${tab === "cave" ? "bg-blush" : ""}`}
          onClick={() => setTab("cave")}
        >
          Where&apos;s the cat?
        </button>
      </div>

      {tab === "flow" ? (
        <>
          <p className="text-sm text-ink-soft">
            Illustrative simulation — prove age ≥ 18 without revealing the birth year.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Window title="issuer.notary">
              <PixelCat pose="sit" scale={2} />
              <label className="mt-3 block text-sm">
                Birth year
                <input
                  type="number"
                  value={year}
                  onChange={(e) => {
                    setYear(Number(e.target.value));
                    setIssued(false);
                    setProved(false);
                  }}
                  className="mt-1 w-full rounded border-2 border-ink bg-cream px-2 py-1"
                />
              </label>
              <button
                type="button"
                className="btn mt-3 !text-xs"
                onClick={() => {
                  setIssued(true);
                  setProved(false);
                }}
              >
                Issue credential
              </button>
              {issued ? (
                <p className="mt-2 font-mono text-xs">cred: birthYear={year} (signed)</p>
              ) : null}
            </Window>

            <Window title="prover.cat">
              <PixelCat pose="think" scale={2} />
              <button
                type="button"
                className="btn mt-3 !text-xs"
                disabled={!issued}
                onClick={() => setProved(true)}
              >
                Generate proof
              </button>
              {proved ? (
                <p className="mt-2 font-mono text-xs" aria-live="polite">
                  proof: age≥18 = {ageOk ? "true" : "false"}
                </p>
              ) : (
                <p className="mt-2 text-xs text-ink-soft">Waiting for issuance…</p>
              )}
            </Window>

            <Window title="verifier.bouncer">
              <PixelCat pose={proved && ageOk ? "celebrate" : "idle"} scale={2} />
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className={`tag ${view === "proof" ? "bg-mint" : ""}`}
                  onClick={() => setView("proof")}
                >
                  Verifier view
                </button>
                <button
                  type="button"
                  className={`tag ${view === "kyc" ? "bg-butter" : ""}`}
                  onClick={() => setView("kyc")}
                >
                  Traditional KYC
                </button>
              </div>
              <p className="mt-3 font-mono text-xs" aria-live="polite">
                {view === "proof"
                  ? proved
                    ? `sees: age≥18=${ageOk} (no birth year)`
                    : "sees: nothing yet"
                  : issued
                    ? `leaks: birthYear=${year}, full credential`
                    : "leaks: full document once shared"}
              </p>
            </Window>
          </div>
        </>
      ) : (
        <Window title="cave.analogy" status={`rounds=${rounds}`}>
          <PixelCat pose="peek" scale={3} />
          <p className="mt-3 text-sm text-ink-soft">{caveMsg}</p>
          <p className="mt-1 text-xs text-ink-soft">
            Confidence the prover knows the secret: {(confidence * 100).toFixed(1)}%
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" className="btn" onClick={() => playCave(0)}>
              Call tunnel 1
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => playCave(1)}>
              Call tunnel 2
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setRounds(0);
                setCaveMsg("Pick a tunnel. The prover exits the other side.");
              }}
            >
              Reset
            </button>
          </div>
        </Window>
      )}

      <Window title="what-you-learned.txt">
        <p className="text-sm text-ink-soft">
          Zero-knowledge lets a verifier learn a statement is true without learning the underlying
          data. Traditional KYC hands over the whole document.
        </p>
      </Window>
    </div>
  );
}
