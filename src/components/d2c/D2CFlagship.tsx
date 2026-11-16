"use client";

import { useEffect, useState } from "react";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { PaymentSequence } from "./PaymentSequence";
import { CostCalculator } from "./CostCalculator";

const phases = [
  {
    id: 1,
    title: "Authentication",
    goal: "Phone + password via custom phonepass provider on Medusa auth.",
    custom: "phonepass provider, custom_otp, JWT cookies, MSG91 OTP reset",
  },
  {
    id: 2,
    title: "Profile & addresses",
    goal: "India address form: landmark, state dropdown, 6-digit pincode.",
    custom: "Address UX on storefront",
  },
  {
    id: 3,
    title: "Catalog",
    goal: "Product, variant, option, category, collection, tag + metadata JSON.",
    custom: "Images via Supabase Storage/R2 + Cloudflare CDN",
  },
  {
    id: 4,
    title: "Product detail",
    goal: "PDP data requirements for beverage SKUs.",
    custom: "Storefront PDP composition",
  },
  {
    id: 5,
    title: "Cart",
    goal: "Guest vs logged-in merge; 30-day idle expiry; reserve stock at checkout.",
    custom: "Merge rules",
  },
  {
    id: 6,
    title: "Wishlist",
    goal: "Custom Medusa module with wishlist tables + store routes.",
    custom: "custom_wishlist, custom_wishlist_item",
  },
  {
    id: 7,
    title: "Checkout",
    goal: "Address → Shiprocket rates → coupon → summary → payment.",
    custom: "Checkout orchestration",
  },
  {
    id: 8,
    title: "Razorpay + COD",
    goal: "AbstractPaymentProvider + HMAC webhooks; COD pending→captured.",
    custom: "Payment providers",
  },
  {
    id: 9,
    title: "Orders",
    goal: "pending → processing → shipped → delivered (+ cancel/return paths).",
    custom: "Status UX",
  },
  {
    id: 10,
    title: "Shiprocket fulfillment",
    goal: "AbstractFulfillmentProvider, AWB, webhooks, custom_shipment.",
    custom: "custom_shipment",
  },
  {
    id: 11,
    title: "Notifications",
    goal: "Resend email, Interakt WhatsApp, MSG91 OTP-only SMS.",
    custom: "custom_notification_log + subscribers",
  },
  {
    id: 12,
    title: "Promotions",
    goal: "Medusa promotion module capabilities.",
    custom: "Config / admin",
  },
  {
    id: 13,
    title: "Returns & refunds",
    goal: "Reverse pickup, Razorpay refund, inventory restore, notify.",
    custom: "Return workflows",
  },
  {
    id: 14,
    title: "Admin panel",
    goal: "Medusa admin + widgets: shipments, notification logs, COD, analytics.",
    custom: "Admin widgets",
  },
];

const decisions = [
  ["Auth", "Phone + password first", "Phone OTP / Google", "Zero SMS cost before PMF"],
  ["Payments", "Razorpay", "PayU / CCAvenue", "India-first UPI + cards"],
  ["COD", "Supported", "Online-only", "Large share of Indian D2C orders"],
  ["Shipping", "Shiprocket", "Shiping / ClickPost", "17+ couriers + COD"],
  ["WhatsApp", "Interakt", "WATI / AiSensy", "Transactional templates"],
  ["Email", "Resend", "SendGrid / Postmark", "DX + deliverability"],
  ["Search", "None at launch", "Meilisearch now", "Add when catalog > 50"],
  ["Cache/queue", "No Redis at launch", "Redis from day one", "Add on backlog pressure"],
  ["Orchestration", "No Kubernetes", "K8s", "Railway replicas suffice"],
  ["Realtime", "No WS/FCM at MWM", "Firebase push", "WhatsApp is the push channel"],
  ["Mobile", "PWA only", "Native apps", "Prove demand first"],
];

const customTables = [
  "custom_otp",
  "custom_wishlist",
  "custom_wishlist_item",
  "custom_shipment",
  "custom_notification_log",
];

const notAtMwm = [
  { name: "Redis", trigger: "Webhook backlog / hot session fan-out" },
  { name: "Queues / separate worker", trigger: "Slow Shiprocket/Razorpay fan-out" },
  { name: "Firebase / FCM", trigger: "Native apps" },
  { name: "Meilisearch", trigger: "Catalog > 50 products" },
  { name: "Kubernetes", trigger: "Multi-region / custom orchestration needs" },
  { name: "WebSocket server", trigger: "Live in-app tracking beyond WhatsApp+poll" },
  { name: "Mobile app", trigger: "Proven repeat demand + push UX needs" },
];

const security = [
  "HTTPS via Cloudflare",
  "HttpOnly JWT cookies",
  "bcrypt password hashes",
  "Webhook HMAC verification",
  "Cloudflare rate limits (e.g. 100 req/min/IP on auth)",
  "Admin on /app with optional IP allowlist",
  "Secrets in env management",
  "ORM-parameterized queries",
  "CORS limited to storefront domain",
  "OTP brute-force lockout (max 3, then 15-min)",
];

const milestones = [
  "M1 Core Commerce",
  "M2 Transactional",
  "M3 Payments",
  "M4 Fulfillment",
  "M5 Post-Purchase",
  "M6 Production",
];

const toc = [
  "Overview",
  "Architecture",
  "Stack",
  "Decisions",
  "Phases",
  "Payments",
  "Data model",
  "Endpoints",
  "Flows",
  "Notifications",
  "MWM capacity",
  "Cost calculator",
  "Security",
  "Not at MWM",
  "Milestones",
  "Folder structure",
  "Q&A",
];

export function D2CFlagship() {
  const [openPhase, setOpenPhase] = useState<number | null>(1);
  const [audit, setAudit] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("audit") === "1") setAudit(true);
  }, []);

  const Source = ({ children }: { children: string }) =>
    audit ? (
      <span className="ml-1 rounded bg-butter px-1 font-mono text-[10px]">{children}</span>
    ) : null;

  return (
    <div className="container-site pb-16 lg:grid lg:grid-cols-[200px_1fr] lg:gap-8">
      <nav
        className="sticky top-20 hidden max-h-[70vh] overflow-auto text-sm lg:block"
        aria-label="Flagship TOC"
      >
        <p className="eyebrow mb-2">On this page</p>
        <ul className="space-y-1">
          {toc.map((t) => (
            <li key={t}>
              <a href={`#${t.toLowerCase().replace(/\s+/g, "-")}`} className="text-ink-soft no-underline hover:text-accent">
                {t}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-secondary mt-4 text-xs"
          onClick={() => setAudit((v) => !v)}
        >
          Audit mode {audit ? "on" : "off"}
        </button>
      </nav>

      <div className="space-y-12">
        <section id="overview">
          <h2 className="display text-3xl">Overview & principles</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
            <li>Phone-first (Indian users are mobile-centric)</li>
            <li>WhatsApp for all post-purchase communication</li>
            <li>Medusa v2 for commerce primitives; custom modules for the rest</li>
            <li>Never reinvent what Medusa already does well — modular monolith</li>
          </ul>
          <Source>system-design.md · Project Overview</Source>
        </section>

        <section id="architecture">
          <h2 className="display text-3xl">Interactive architecture</h2>
          <ArchitectureDiagram />
        </section>

        <section id="stack">
          <h2 className="display text-3xl">Tech stack</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-ink text-left">
                  <th className="py-2">Layer</th>
                  <th>Choice</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Commerce", "Medusa v2", "Open-source, modular, self-hosted"],
                  ["Database", "Supabase PostgreSQL", "Managed Postgres, generous free tier"],
                  ["Storefront", "Next.js 14 App Router", "SSR/ISR/SEO"],
                  ["Backend host", "Railway", "Simple deploy, replicas"],
                  ["Frontend host", "Vercel", "Best Next.js platform"],
                  ["CDN/Security", "Cloudflare", "CDN, WAF, SSL, DNS"],
                  ["Payments", "Razorpay", "UPI/cards/netbanking + COD path"],
                  ["Shipping", "Shiprocket", "17+ couriers, COD"],
                  ["Email", "Resend", "DX + deliverability"],
                  ["WhatsApp", "Interakt", "Order + shipping templates"],
                  ["OTP/SMS", "MSG91 / 2Factor", "Indian SMS"],
                  ["Storage", "Supabase Storage / R2", "Product images"],
                  ["Search (future)", "Meilisearch", "When catalog grows"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-line">
                    <td className="py-2 pr-3">{row[0]}</td>
                    <td className="pr-3 font-medium">{row[1]}</td>
                    <td className="text-ink-soft">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Source>system-design.md · Tech Stack</Source>
        </section>

        <section id="decisions">
          <h2 className="display text-3xl">Key decisions</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-ink text-left">
                  <th className="py-2">Topic</th>
                  <th>Choice</th>
                  <th>Alternative</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {decisions.map((d) => (
                  <tr key={d[0]} className="border-b border-line">
                    {d.map((cell) => (
                      <td key={cell} className="py-2 pr-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="phases">
          <h2 className="display text-3xl">14 phases</h2>
          <div className="mt-3 space-y-2">
            {phases.map((p) => (
              <details
                key={p.id}
                className="card p-3"
                open={openPhase === p.id}
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) setOpenPhase(p.id);
                }}
              >
                <summary className="cursor-pointer font-medium">
                  Phase {p.id}: {p.title}
                </summary>
                <p className="mt-2 text-sm">{p.goal}</p>
                <p className="mt-1 text-xs text-ink-soft">Custom: {p.custom}</p>
              </details>
            ))}
          </div>
          <Source>system-design.md · Phases 1–14</Source>
        </section>

        <section id="payments">
          <h2 className="display text-3xl">Payment sequence</h2>
          <PaymentSequence />
        </section>

        <section id="data-model">
          <h2 className="display text-3xl">Data model explorer</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Medusa manages its own tables via migrations. Custom tables are prefixed{" "}
            <code>custom_</code>.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {customTables.map((t) => (
              <span key={t} className="tag tag-backend">
                I build · {t}
              </span>
            ))}
            <span className="tag">Medusa manages · cart/order/payment/…</span>
          </div>
          <svg
            viewBox="0 0 640 180"
            className="mt-4 w-full"
            role="img"
            aria-label="Simplified ER: customer to return"
          >
            <title>ER sketch</title>
            <desc>customer → cart → order → payment → fulfillment → return</desc>
            {["Customer", "Cart", "Order", "Payment", "Fulfillment", "Return"].map((label, i) => (
              <g key={label}>
                <rect x={20 + i * 100} y={60} width={88} height={40} rx={8} fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
                <text x={64 + i * 100} y={85} textAnchor="middle" fontSize="11" fill="var(--ink)">
                  {label}
                </text>
                {i < 5 && (
                  <line
                    x1={108 + i * 100}
                    y1={80}
                    x2={120 + i * 100}
                    y2={80}
                    stroke="var(--ink)"
                    strokeWidth="2"
                  />
                )}
              </g>
            ))}
          </svg>
        </section>

        <section id="endpoints">
          <h2 className="display text-3xl">Endpoint coverage</h2>
          <p className="mt-2 text-sm text-ink-soft">
            A full 61 / 7 / 22 native·partial·custom split appears in the portfolio brief but{" "}
            <strong>was not found</strong> in the attached design docs — so it is not shown as a
            fact. Documented custom routes instead:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            <li>
              Wishlist: <code>GET/POST/DELETE /store/wishlist…</code>
            </li>
            <li>
              Webhooks: <code>POST /webhooks/razorpay</code>, <code>POST /webhooks/shiprocket</code>
            </li>
            <li>Plus Medusa-native store/admin routes for catalog, cart, orders, promotions</li>
          </ul>
          <Source>d2c-facts.md §6 — unverified 61/7/22 omitted</Source>
        </section>

        <section id="flows">
          <h2 className="display text-3xl">Customer & admin flows</h2>
          <p className="mt-2 text-sm text-ink-soft">
            MWM screen map lists <strong>18 screens</strong> (not “35 flows” — that count is only in
            the portfolio brief). Admin maps to ~10 sections.
            <Source>mwm-system-design.md · Part 2</Source>
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {[
              "Home / PLP / PDP",
              "Login / Register / Forgot",
              "My Account / Profile / Addresses",
              "Wishlist / Cart",
              "Checkout ×3 (address, shipping, pay)",
              "Order confirm / My Orders / Detail",
              "Return request",
              "Admin: Products & inventory",
              "Admin: Orders & shipping",
              "Admin: COD reconciliation",
            ].map((f) => (
              <div key={f} className="rounded-lg border-2 border-ink bg-surface px-3 py-2 text-sm">
                {f}
              </div>
            ))}
          </div>
        </section>

        <section id="notifications">
          <h2 className="display text-3xl">Notifications matrix</h2>
          <p className="mt-2 text-sm">
            Channels: Email (Resend) · WhatsApp (Interakt, 6 templates) · SMS (MSG91 OTP-only).
            Meta template approval takes 24–48 h.
            <Source>system-design / mwm docs · Notifications</Source>
          </p>
        </section>

        <section id="mwm-capacity">
          <h2 className="display text-3xl">Minimum Working Model @ 10,000 DAU</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
            <li>10,000 DAU</li>
            <li>Peak hour ≈ 20% → 2,000 concurrent</li>
            <li>~20 requests/session → ≈ 11 RPS sustained, spikes 30–50 RPS</li>
            <li>One 2 vCPU / 2 GB Medusa instance ≈ 50–100 RPS</li>
            <li>Two Railway replicas for zero-downtime + fault tolerance</li>
            <li>Supabase Pro + PgBouncer; 60 max connections from Medusa (30/instance)</li>
            <li>Cloudflare cache for static + cacheable API responses</li>
          </ol>
          <Source>mwm-system-design.md</Source>
        </section>

        <section id="cost-calculator">
          <h2 className="display text-3xl">Interactive cost calculator</h2>
          <CostCalculator />
        </section>

        <section id="security">
          <h2 className="display text-3xl">Security checklist</h2>
          <ul className="mt-3 space-y-2">
            {security.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm">
                <span aria-hidden>🐱</span>
                <span className="rounded bg-mint/50 px-2 py-1">{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="not-at-mwm">
          <h2 className="display text-3xl">Deliberately NOT running at MWM</h2>
          <div className="mt-3 space-y-2">
            {notAtMwm.map((n) => (
              <div key={n.name} className="card p-3 text-sm">
                <strong>{n.name}</strong>
                <p className="text-ink-soft">Add when: {n.trigger}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="milestones">
          <h2 className="display text-3xl">Development sequence</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {milestones.map((m) => (
              <span key={m} className="tag">
                ☐ {m}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            Step statuses live in data (default: resume-supported = done/built; else planned).
            TODO_FROM_HARSHITA: mark real M1–M6 progress.
          </p>
        </section>

        <section id="folder-structure">
          <h2 className="display text-3xl">Folder structure</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg border-2 border-ink bg-surface p-4 font-mono text-xs">{`src/
  api/
  modules/
  workflows/
  subscribers/
  jobs/
  lib/`}</pre>
        </section>

        <section id="q&a">
          <h2 className="display text-3xl">Recruiter Q&A</h2>
          {[
            [
              "Why Medusa v2 instead of Shopify or from scratch?",
              "Self-hosted modular commerce primitives without reinventing cart/order/fulfillment; custom modules for India-specific auth/payments/shipping.",
            ],
            [
              "Why phone + password first?",
              "Phone is the primary identifier in India; password keeps SMS cost at zero before PMF. OTP is Phase 2.",
            ],
            [
              "How is COD reconciled?",
              "COD provider keeps payment pending until delivery capture; admin COD reconciliation widget. TODO_FROM_HARSHITA: ops detail.",
            ],
            [
              "Idempotency / webhook replay?",
              "HMAC verification on Razorpay/Shiprocket webhooks; complete cart only after verified capture. Exact replay store: TODO_FROM_HARSHITA if beyond docs.",
            ],
            [
              "Why no Redis/queue yet?",
              "MWM RPS fits two Medusa instances; WhatsApp handles push. Add Redis when backlog or fan-out demands it.",
            ],
            [
              "What's built vs designed?",
              "Resume: built headless Medusa platform with cart/checkout/fulfillment extensibility. 10k DAU MWM topology: Designed.",
            ],
          ].map(([q, a]) => (
            <details key={q} className="card mt-2 p-3">
              <summary className="cursor-pointer font-medium">{q}</summary>
              <p className="mt-2 text-sm text-ink-soft">{a}</p>
            </details>
          ))}
        </section>

        <section id="downloads">
          <h2 className="display text-3xl">Design docs</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Full design doc downloads are gated (`publishDesignDocs: false` in site config) until
            you confirm publishing.
          </p>
        </section>
      </div>
    </div>
  );
}
