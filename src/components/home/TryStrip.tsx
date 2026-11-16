"use client";

import Link from "next/link";
import { useState } from "react";
import { Window } from "@/components/ui/Window";
import { PixelCat } from "@/components/cats/PixelCat";

function MiniPay() {
  const [state, setState] = useState<"idle" | "dup" | "safe">("idle");
  return (
    <div>
      <p className="text-xs text-ink-soft">Alice ₹10k → Bob. Timeout after commit.</p>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          className="btn !px-2 !py-1 !text-[10px]"
          onClick={() => setState("dup")}
        >
          Blind retry
        </button>
        <button
          type="button"
          className="btn btn-secondary !px-2 !py-1 !text-[10px]"
          onClick={() => setState("safe")}
        >
          Verify first
        </button>
      </div>
      <p className="mt-2 text-xs" aria-live="polite">
        {state === "idle" && "Waiting…"}
        {state === "dup" && "💥 Double payout. Cat panics."}
        {state === "safe" && "✓ Idempotent. Ledger intact."}
      </p>
    </div>
  );
}

function MiniZk() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div>
      <p className="text-xs text-ink-soft">Prove age ≥ 18 without the birth year.</p>
      <button
        type="button"
        className="btn mt-2 !px-2 !py-1 !text-[10px]"
        onClick={() => setRevealed((v) => !v)}
      >
        {revealed ? "Hide proof" : "Show proof"}
      </button>
      <p className="mt-2 font-mono text-xs" aria-live="polite">
        {revealed ? "proof: age≥18 = true" : "credential: ••••••"}
      </p>
    </div>
  );
}

function MiniOutbox() {
  const [alive, setAlive] = useState(true);
  const [sent, setSent] = useState(0);
  return (
    <div>
      <p className="text-xs text-ink-soft">Kill the relay. Outbox still has the row.</p>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          className="btn btn-secondary !px-2 !py-1 !text-[10px]"
          onClick={() => setAlive((v) => !v)}
        >
          Relay {alive ? "UP" : "DOWN"}
        </button>
        <button
          type="button"
          className="btn !px-2 !py-1 !text-[10px]"
          onClick={() => {
            if (alive) setSent((n) => n + 1);
          }}
        >
          Deliver
        </button>
      </div>
      <p className="mt-2 text-xs" aria-live="polite">
        Delivered: {sent} · Relay {alive ? "healthy" : "down — queued"}
      </p>
    </div>
  );
}

const CARDS = [
  {
    title: "break-payment.lab",
    heading: "Break the payment",
    href: "/labs/paybench-timeout",
    body: MiniPay,
  },
  {
    title: "zk-cats.lab",
    heading: "Zero-knowledge with cats",
    href: "/labs/zk-cats",
    body: MiniZk,
  },
  {
    title: "kill-relay.lab",
    heading: "Kill the relay",
    href: "/labs/outbox-playground",
    body: MiniOutbox,
  },
];

export function TryStrip() {
  return (
    <section className="section-pad">
      <div className="mb-4 flex items-center gap-3">
        <PixelCat pose="typing" scale={2} />
        <div>
          <h2 className="display text-2xl text-ink">Try something</h2>
          <p className="text-sm text-ink-soft">Mini toys — no install, one click.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {CARDS.map((c) => {
          const Body = c.body;
          return (
            <Window key={c.title} title={c.title} status="live preview">
              <h3 className="display text-lg">{c.heading}</h3>
              <div className="mt-3">
                <Body />
              </div>
              <Link href={c.href} className="btn mt-4 !text-xs">
                Open full lab →
              </Link>
            </Window>
          );
        })}
      </div>
    </section>
  );
}
