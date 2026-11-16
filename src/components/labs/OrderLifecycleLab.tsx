"use client";

import { useState } from "react";

const states = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "return_requested",
  "returned",
  "refunded",
] as const;

const events: Record<(typeof states)[number], string[]> = {
  pending: ["email: order received", "whatsapp: order received"],
  processing: ["shiprocket: create shipment"],
  shipped: ["whatsapp: shipped + AWB", "email: shipped"],
  delivered: ["whatsapp: delivered"],
  cancelled: ["email: cancelled", "inventory restore"],
  return_requested: ["whatsapp: return received"],
  returned: ["reverse pickup complete"],
  refunded: ["razorpay: refund", "email: refunded"],
};

export function OrderLifecycleLab() {
  const [state, setState] = useState<(typeof states)[number]>("pending");

  return (
    <div className="pixel-border p-5">
      <p className="text-sm text-ink-soft">
        Order states from the D2C design docs. Click a state to see which notifications/webhooks
        fire.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {states.map((s) => (
          <button
            key={s}
            type="button"
            className={s === state ? "btn" : "btn btn-secondary"}
            onClick={() => setState(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <ul className="mt-4 list-disc pl-5 text-sm">
        {events[state].map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  );
}
