/** Story blocks for project pages — problem → solution → impact. */
export type ProjectNarrative = {
  problem: string;
  solution: string;
  impact: string;
  relatedNotes?: string[];
};

export const projectNarratives: Record<string, ProjectNarrative> = {
  "d2c-ecommerce": {
    problem:
      "Indian D2C merchants need a Shopify-style storefront and backend they control — phone-first checkout, COD, and WhatsApp updates — without reinventing cart/order primitives.",
    solution:
      "Medusa v2 modular monolith for cart/order/fulfillment, custom modules for phone auth, Razorpay+COD, Shiprocket, and Interakt WhatsApp. Demo stack on Railway + Vercel + Supabase; scale topology documented for 10k DAU.",
    impact:
      "Demo platform built and served to clients as a self-hosted Shopify-style replacement — storefront + commerce backend with clear growth triggers.",
    relatedNotes: ["d2c-medusa-india"],
  },
  paybench: {
    problem:
      "Payment-agent demos often look fluent while still double-paying after an ambiguous TIMEOUT — most benchmarks score chat prose, not ledger truth.",
    solution:
      "A seeded payments simulator with a double-entry ledger, scripted faults (including TIMEOUT_AFTER_COMMIT), and graders that check final world state plus policy rules P1–P9. Mutation-tested scorers (64/64).",
    impact:
      "Oracle pass@1 1.00 on core; Naive fails adversarial/fault traps. Recruiters can scrub playground/compare media and see idempotency done right.",
    relatedNotes: ["paybench-ambiguous-timeout", "grading-the-graders"],
  },
  "zkp-kyc": {
    problem:
      "KYC verifiers usually demand raw identity documents, leaking more personal data than any single check requires.",
    solution:
      "Circom circuits + snarkJS Groth16 proofs with Solidity verifiers on Hardhat — prove attributes (e.g. state of residence / age gate) without handing over the full credential.",
    impact:
      "Selective disclosure with on-chain auditability; resume-measured proof generation under 2 seconds for the workflow claimed.",
    relatedNotes: ["zk-kyc-over-18"],
  },
  "etf-backtesting": {
    problem:
      "Evaluating trading strategies across large NSE histories needs a fast simulation loop and readable dashboards — not a notebook you re-run by hand.",
    solution:
      "Python engine + Express REST + React/Redux UI over MongoDB/SQLite, with an OHLCV normalization pipeline and Plotly-style result views.",
    impact:
      "180,000+ historical records; full simulations under 3s; REST ~120ms avg; dashboards under 700ms. Sample charts here are synthetic/illustrative.",
    relatedNotes: [],
  },
  "mandarin-teacher": {
    problem:
      "Language apps rarely force real speaking practice — learners study characters but don’t talk.",
    solution:
      "Local-first voice coach (duihua): browser STT → Whisper fallback, FastAPI + SQLite, LLM replies with pinyin/hanzi/English, dictionary lookup, topic role-play.",
    impact:
      "A usable speaking loop on a laptop without accounts. Tone scoring and image practice are still in progress (honest README roadmap).",
    relatedNotes: [],
  },
  "incident-logger": {
    problem:
      "During outages you get messy logs and decoy deploys — black-box “AI RCA” tools invent tidy root causes from incomplete data.",
    solution:
      "TraceIQ: deterministic briefing + suspect ranking first, then a read-only agent loop with redaction, citations, and explicit abstain when evidence is thin.",
    impact:
      "REPORT.md: 56 pytest / 6 Vitest; demo eval oracle top-1 1.00 (n=3). Designed for auditability, not confident fiction.",
    relatedNotes: [],
  },
  "job-finder": {
    problem:
      "Job hunting across Greenhouse/Lever/Ashby/Workday plus generic careers pages means ten tabs and no single search.",
    solution:
      "Personal Job Radar aggregates a curated company list via ATS APIs and a Playwright/HTML fallback chain into one Postgres-backed searchable UI.",
    impact:
      "One local radar for open roles with source health signals — Apply opens the original posting (no auto-apply).",
    relatedNotes: [],
  },
  "atrium-engineering": {
    problem:
      "A pre-launch marketplace needed solid auth planes, chat that survives relay crashes, and an internal admin — without losing messages or mixing merchant and consumer sessions.",
    solution:
      "Better Auth with separate merchant/consumer planes; PostgreSQL transactional outbox + Centrifugo/Redis chat tested against 25 failure scenarios; Next.js admin on GCP; multi-agent planning CLI.",
    impact:
      "Current SDE role: auth, realtime chat, admin dashboard, and agent tooling shipped on TypeScript / Postgres / GCP.",
    relatedNotes: ["chat-outbox-25-failures"],
  },
  "nomura-engineering": {
    problem:
      "Enterprise real-estate workflows needed reliable Spring/React integration plus batch jobs that were too slow and fragile for the release cadence.",
    solution:
      "Spring Boot + React platform work; containerized Python batch pipelines with validation/retries; Liquibase + Jenkins + Ansible + Playwright release pipelines.",
    impact:
      "Batch execution cut from 240 → 58 minutes (76% faster). DB versioning and tested releases across environments.",
    relatedNotes: ["batch-240-to-58"],
  },
};

export function getNarrative(slug: string): ProjectNarrative | undefined {
  return projectNarratives[slug];
}
