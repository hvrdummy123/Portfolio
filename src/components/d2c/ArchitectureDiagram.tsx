"use client";

import { useState } from "react";

type Tier = "launch" | "mwm" | "scale";

const nodes: Record<
  string,
  { role: string; why: string; cost: string; failure: string; tiers: Tier[] }
> = {
  Cloudflare: {
    role: "CDN · WAF · SSL · DNS",
    why: "Edge cache + security without ops overhead",
    cost: "Free tier at launch",
    failure: "Origin still reachable if edge rules misconfigured — keep DNS simple",
    tiers: ["launch", "mwm", "scale"],
  },
  Vercel: {
    role: "Next.js storefront (+ admin UI)",
    why: "Best Next.js DX; SSR/ISR",
    cost: "Hobby→Pro as traffic grows",
    failure: "Static/ISR pages remain available during brief API blips",
    tiers: ["launch", "mwm", "scale"],
  },
  "Medusa A": {
    role: "Medusa v2 commerce API",
    why: "Modular monolith for cart/order/fulfillment",
    cost: "Railway 2 vCPU / 2 GB",
    failure: "With 2 replicas, one instance can die without total outage",
    tiers: ["launch", "mwm", "scale"],
  },
  "Medusa B": {
    role: "Second Medusa replica",
    why: "Zero-downtime deploys + fault tolerance",
    cost: "Second Railway instance",
    failure: "LB shifts traffic to healthy replica",
    tiers: ["mwm", "scale"],
  },
  Supabase: {
    role: "PostgreSQL + PgBouncer",
    why: "Managed Postgres; Medusa schema + custom_ tables",
    cost: "Free→Pro at MWM",
    failure: "Connection pooler protects against stampede",
    tiers: ["launch", "mwm", "scale"],
  },
  Razorpay: {
    role: "Payments + COD path",
    why: "India-first UPI/cards",
    cost: "~2% GMV fees (example in cost calc)",
    failure: "Webhook HMAC + reconcile jobs",
    tiers: ["launch", "mwm", "scale"],
  },
  Shiprocket: {
    role: "Fulfillment aggregation",
    why: "17+ couriers + COD",
    cost: "Per-shipment",
    failure: "Webhook-driven status; admin can retry",
    tiers: ["launch", "mwm", "scale"],
  },
};

export function ArchitectureDiagram() {
  const [tier, setTier] = useState<Tier>("mwm");
  const [active, setActive] = useState<string | null>("Cloudflare");
  const info = active ? nodes[active] : null;

  const visible = (name: string) => nodes[name].tiers.includes(tier);

  return (
    <div className="mt-3">
      <div className="mb-3 flex flex-wrap gap-2">
        {(
          [
            ["launch", "Launch (0–100 orders/mo)"],
            ["mwm", "MWM (10,000 DAU)"],
            ["scale", "Growth / Scale"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tier === id ? "btn" : "btn btn-secondary"}
            onClick={() => setTier(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <svg
        viewBox="0 0 720 320"
        className="w-full rounded-xl border-2 border-border bg-surface"
        role="img"
        aria-label="System architecture diagram"
      >
        <title>D2C architecture</title>
        <desc>Browser through Cloudflare to Vercel and Medusa on Railway into Supabase and SaaS.</desc>
        {[
          ["Cloudflare", 280, 30],
          ["Vercel", 80, 120],
          ["Medusa A", 300, 120],
          ["Medusa B", 500, 120],
          ["Supabase", 300, 220],
          ["Razorpay", 120, 260],
          ["Shiprocket", 480, 260],
        ].map(([name, x, y]) =>
          visible(String(name)) ? (
            <g
              key={String(name)}
              className="cursor-pointer"
              onClick={() => setActive(String(name))}
            >
              <rect
                x={Number(x)}
                y={Number(y)}
                width={140}
                height={44}
                rx={10}
                fill={active === name ? "var(--lavender)" : "var(--surface-2)"}
                stroke="var(--ink)"
                strokeWidth="2"
              />
              <text
                x={Number(x) + 70}
                y={Number(y) + 27}
                textAnchor="middle"
                fontSize="13"
                fill="var(--ink)"
                fontFamily="var(--font-dm-sans), system-ui, sans-serif"
              >
                {String(name)}
              </text>
            </g>
          ) : null,
        )}
      </svg>

      {info && active && (
        <div className="card mt-3 p-4 text-sm">
          <p className="display text-lg">{active}</p>
          <p>
            <strong>Role:</strong> {info.role}
          </p>
          <p>
            <strong>Why:</strong> {info.why}
          </p>
          <p>
            <strong>Cost:</strong> {info.cost}
          </p>
          <p>
            <strong>Failure:</strong> {info.failure}
          </p>
        </div>
      )}
    </div>
  );
}
