"use client";

import { useEffect, useState } from "react";

const razorpaySteps = [
  "Frontend → Medusa: create PaymentSession",
  "Medusa → Razorpay: create order",
  "Razorpay Checkout → user pays",
  "Webhook payment.captured → HMAC verify",
  "Complete cart → create Order",
  "Decrement inventory",
  "Notifications + Shiprocket shipment",
];

const codSteps = [
  "Checkout selects COD",
  "Order created with payment pending",
  "Shiprocket ships",
  "Delivered → capture COD payment",
  "Notifications",
];

const refundSteps = [
  "Return approved",
  "Razorpay refund API",
  "Inventory restore",
  "Notify customer",
];

type Mode = "razorpay" | "cod" | "refund";

export function PaymentSequence() {
  const [mode, setMode] = useState<Mode>("razorpay");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const steps =
    mode === "razorpay" ? razorpaySteps : mode === "cod" ? codSteps : refundSteps;

  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [mode]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStep((s) => {
        if (s >= steps.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 900);
    return () => window.clearInterval(id);
  }, [playing, steps.length]);

  return (
    <div className="mt-3 card p-4">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["razorpay", "Razorpay"],
            ["cod", "COD"],
            ["refund", "Refund"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={mode === id ? "btn" : "btn btn-secondary"}
            onClick={() => setMode(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <ol className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <li
            key={s}
            className={`rounded-lg px-3 py-2 text-sm ${
              i === step ? "bg-lavender font-medium" : i < step ? "bg-mint/40" : "bg-surface-2"
            }`}
          >
            {i + 1}. {s}
          </li>
        ))}
      </ol>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn" onClick={() => setPlaying((p) => !p)}>
          {playing ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
        >
          Step
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => setStep(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}
