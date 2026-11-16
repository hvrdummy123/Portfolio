import type { Project } from "./types";

/** Single source of project cards + case-study metadata. Status badges editable here. */
export const projects: Project[] = [
  {
    slug: "d2c-ecommerce",
    title: "D2C E-Commerce Platform",
    pitch:
      "Indian D2C beverage commerce on Medusa v2 — phone-first, WhatsApp post-purchase, COD-ready.",
    year: 2026,
    status: "in-progress",
    kind: "personal",
    roles: ["backend", "fullstack", "quant-fintech"],
    weight: {
      backend: 90,
      fullstack: 95,
      "ai-agents": 40,
      blockchain: 50,
      "quant-fintech": 80,
    },
    stack: [
      { name: "Medusa.js", layer: "commerce", why: "Open-source modular commerce primitives" },
      { name: "Node.js", layer: "backend" },
      { name: "React.js", layer: "frontend" },
      { name: "TypeScript", layer: "language" },
      { name: "PostgreSQL", layer: "data" },
      { name: "REST APIs", layer: "api" },
    ],
    stats: [
      {
        label: "10k DAU topology",
        value: "Designed",
        source: "mwm-system-design.md",
      },
    ],
    links: {},
    domainTags: ["backend", "frontend", "fintech"],
    featured: true,
    sourceNote: "Source is private / proprietary design + resume-backed build.",
    qa: [
      {
        q: "Why Medusa v2 instead of Shopify or from-scratch?",
        a: "Medusa gives self-hosted commerce primitives (cart, order, fulfillment modules) without reinventing them, while custom modules cover Indian phone-auth, Razorpay, Shiprocket, and WhatsApp.",
      },
    ],
    decisions: [
      {
        context: "Indian D2C users are mobile-centric and often prefer COD.",
        decision: "Phone+password auth at launch; Razorpay + COD; WhatsApp for post-purchase.",
        consequence: "Lower SMS cost before PMF; familiar Indian payment UX; no native app required (PWA).",
      },
    ],
    roadmap: [
      "OTP passwordless login once repeat-purchase rates justify SMS",
      "Meilisearch when catalog > 50 products",
      "Redis/queues when webhook backlog or fan-out needs grow",
    ],
  },
  {
    slug: "paybench",
    title: "PayBench (Agent-Pro-Paybench)",
    pitch:
      "Can your agent move ₹8,000 when the API returns TIMEOUT after the money already moved — without double-paying?",
    year: 2026,
    status: "built",
    kind: "github",
    roles: ["ai-agents", "quant-fintech", "backend"],
    weight: {
      backend: 70,
      fullstack: 50,
      "ai-agents": 100,
      blockchain: 30,
      "quant-fintech": 95,
    },
    stack: [
      { name: "Python 3.11+", layer: "runtime" },
      { name: "TypeScript", layer: "language" },
      { name: "Node.js", layer: "backend" },
      { name: "Double-entry ledger", layer: "domain" },
      { name: "Mutation-tested graders", layer: "eval" },
      { name: "GitHub Actions", layer: "ci" },
    ],
    stats: [
      {
        label: "Grader mutation kill rate",
        value: "100% (64/64)",
        source: "Agent-Pro-Paybench README / validate",
        href: "/work/paybench",
      },
      {
        label: "Oracle pass@1 (core)",
        value: "1.00",
        source: "Agent-Pro-Paybench README leaderboard",
      },
      {
        label: "Tasks",
        value: "50 (25 core)",
        source: "Agent-Pro-Paybench README",
      },
      {
        label: "Fault types",
        value: "8",
        source: "Agent-Pro-Paybench README",
      },
    ],
    links: {
      repo: "https://github.com/hvrdummy123/Agent-Pro-Paybench",
    },
    domainTags: ["ai", "fintech", "backend"],
    featured: true,
    qa: [
      {
        q: "Why grade world state instead of chat prose?",
        a: "Prose can sound correct while the ledger is wrong. Graders score final balances, idempotency, and policy checkers (P1–P9).",
      },
      {
        q: "What is TIMEOUT_AFTER_COMMIT?",
        a: "The payment API commits the transfer then returns TIMEOUT — naive retries double-pay; correct agents verify then retry with idempotency keys.",
      },
    ],
    decisions: [
      {
        context: "LLM agent evals often reward fluent explanations over correct side effects.",
        decision: "Seeded payments simulator + graders on final world state with mutation-tested scorers.",
        consequence: "Oracle 100%; Naive fails adversarial/fault tasks; 64/64 mutation kill rate.",
      },
    ],
    roadmap: ["Optional provider baselines", "More fault taxonomies"],
  },
  {
    slug: "zkp-kyc",
    title: "Privacy-Preserving KYC",
    pitch:
      "Prove state-of-residence with Circom + Groth16 without handing over the full credential. Age-gate and other selective attributes are supported as extensions.",
    year: 2026,
    status: "built",
    kind: "github",
    roles: ["blockchain", "fullstack", "backend"],
    weight: {
      backend: 60,
      fullstack: 70,
      "ai-agents": 20,
      blockchain: 100,
      "quant-fintech": 40,
    },
    stack: [
      { name: "Circom + snarkJS", layer: "zk" },
      { name: "Solidity / Hardhat", layer: "blockchain" },
      { name: "React.js", layer: "frontend" },
      { name: "Node.js / Express", layer: "backend" },
      { name: "Ethereum", layer: "blockchain" },
      { name: "ZoKrates / IPFS", layer: "zk" },
    ],
    stats: [
      {
        label: "Proof generation",
        value: "< 2 seconds",
        source: "resume",
        href: "/work/zkp-kyc",
      },
    ],
    links: {
      repo: "https://github.com/hvrdummy123/ZKP-KYC-System-Blockchain",
    },
    domainTags: ["blockchain", "backend", "frontend"],
    featured: true,
    qa: [
      {
        q: "What can a user prove without revealing?",
        a: "The public demo focuses on proving state-of-residence via Circom/Groth16 without revealing the full credential. Selective attribute proofs (for example age ≥ 18) are part of the broader design; Circom is what the README walks through.",
      },
    ],
    decisions: [
      {
        context: "Traditional KYC leaks full identity documents to every verifier.",
        decision: "Circom circuit + snarkJS proofs; Solidity verifier + role registry on Hardhat.",
        consequence: "On-chain auditability with minimal disclosure; /try sandbox for visitors.",
      },
    ],
    roadmap: ["Expand attribute set beyond state-of-residence"],
  },
  {
    slug: "etf-backtesting",
    title: "ETF Backtesting Framework",
    pitch:
      "Backtest strategies across 180,000+ NSE records in under 3 seconds with Plotly dashboards.",
    year: 2025,
    status: "built",
    kind: "personal",
    roles: ["quant-fintech", "fullstack", "backend"],
    weight: {
      backend: 75,
      fullstack: 80,
      "ai-agents": 30,
      blockchain: 10,
      "quant-fintech": 100,
    },
    stack: [
      { name: "Python", layer: "engine", why: "Numerical/strategy simulation", alternative: "C++ engine" },
      { name: "Node/Express", layer: "api", why: "REST surface for the UI", alternative: "FastAPI-only" },
      { name: "React/Redux", layer: "frontend" },
      { name: "MongoDB", layer: "data" },
      { name: "SQLite", layer: "data" },
      { name: "Plotly", layer: "viz" },
      { name: "Jest", layer: "testing" },
    ],
    stats: [
      { label: "NSE records", value: "180,000+", source: "resume", href: "/work/etf-backtesting" },
      { label: "Full simulation", value: "< 3 s", source: "resume" },
      { label: "REST avg latency", value: "~120 ms", source: "resume" },
      { label: "Dashboard render", value: "< 700 ms", source: "resume" },
    ],
    links: {},
    domainTags: ["fintech", "backend", "frontend"],
    featured: true,
    sourceNote: "Source not public. Visuals on this site use synthetic illustrative data.",
    qa: [
      {
        q: "Why Python for the engine and Node for the API?",
        a: "Python fits numerical backtests and data pipelines; Express keeps a familiar JS REST boundary for the React/Redux UI.",
      },
    ],
    decisions: [
      {
        context: "Need interactive dashboards over large OHLCV history.",
        decision: "Normalize OHLCV in a market-data pipeline; expose results via REST + Plotly.",
        consequence: "Simulations <3s; dashboards <700ms.",
      },
    ],
    roadmap: ["Public sample dataset", "More strategy templates"],
  },
  {
    slug: "mandarin-teacher",
    title: "duihua · Mandarin speaking coach",
    pitch:
      "Voice-first Mandarin practice on your machine — pinyin/hanzi/English transcripts, word lookup, topic role-play.",
    year: 2025,
    status: "in-progress",
    kind: "github",
    roles: ["ai-agents", "fullstack"],
    weight: {
      backend: 40,
      fullstack: 60,
      "ai-agents": 80,
      blockchain: 10,
      "quant-fintech": 10,
    },
    stack: [
      { name: "TypeScript", layer: "language" },
      { name: "React / Vite", layer: "frontend" },
      { name: "FastAPI / SQLite", layer: "backend" },
      { name: "Whisper (STT)", layer: "speech" },
      { name: "Edge TTS", layer: "speech" },
      { name: "LLM tutors", layer: "llm" },
    ],
    stats: [],
    links: { repo: "https://github.com/hvrdummy123/Mandarin-Teacher" },
    domainTags: ["ai", "frontend"],
    featured: false,
    qa: [
      {
        q: "What does it do?",
        a: "Personal Mandarin speaking coach: mic chat, rich transcripts, CC-CEDICT word lookup, topic role-play, review-before-send. Hexagonal architecture (README).",
      },
    ],
    decisions: [
      {
        context: "Language apps rarely force real speaking practice.",
        decision: "Local-first coach with STT → LLM → TTS and dictionary overlays.",
        consequence: "No account/subscription; free-tier LLM 429s are an honest limit.",
      },
    ],
    roadmap: [
      "Image practice",
      "Tone drills / pronunciation scoring (README: not done yet)",
    ],
  },
  {
    slug: "incident-logger",
    title: "TraceIQ (Incident Logger)",
    pitch:
      "Turn messy outage logs into ranked suspects and a postmortem-style report — abstain instead of inventing certainty.",
    year: 2025,
    status: "built",
    kind: "github",
    roles: ["ai-agents", "backend"],
    weight: {
      backend: 70,
      fullstack: 40,
      "ai-agents": 90,
      blockchain: 10,
      "quant-fintech": 20,
    },
    stack: [
      { name: "TypeScript", layer: "language" },
      { name: "FastAPI", layer: "backend" },
      { name: "React / Vite", layer: "frontend" },
      { name: "Postgres + RLS", layer: "data" },
      { name: "Parquet / DuckDB", layer: "logs" },
      { name: "Log-to-hypothesis", layer: "domain" },
    ],
    stats: [
      {
        label: "pytest",
        value: "56 passed",
        source: "Incident-Logger REPORT.md (2026-11-14)",
      },
      {
        label: "Demo eval oracle top-1",
        value: "1.00 (n=3)",
        source: "Incident-Logger REPORT.md",
      },
    ],
    links: { repo: "https://github.com/hvrdummy123/Incident-Logger" },
    domainTags: ["ai", "infra"],
    featured: false,
    qa: [
      {
        q: "What does it do?",
        a: "BYO JSONL logs → deterministic briefing + suspect ranking → read-only agent investigation → cited report with data gaps (README: TraceIQ).",
      },
      {
        q: "How did you validate it?",
        a: "REPORT.md: pytest 56 passed, Vitest 6 passed; demo eval n=3 oracle service_top1=1.00 vs deterministic 0.67 / latest_deploy 0.33. Live LLM path deferred.",
      },
    ],
    decisions: [
      {
        context: "Black-box RCA tools invent tidy root causes from incomplete data.",
        decision: "Explainable analytics first; LLM optional and redacted; abstain when thin.",
        consequence: "Auditable multi-factor leans instead of fake certainty.",
      },
    ],
    roadmap: [],
  },
  {
    slug: "job-finder",
    title: "Personal Job Radar",
    pitch:
      "Aggregate jobs across Greenhouse, Lever, Ashby, Workday, and generic careers pages into one searchable radar.",
    year: 2025,
    status: "built",
    kind: "github",
    roles: ["ai-agents", "fullstack"],
    weight: {
      backend: 50,
      fullstack: 70,
      "ai-agents": 85,
      blockchain: 10,
      "quant-fintech": 20,
    },
    stack: [
      { name: "Python", layer: "language" },
      { name: "FastAPI", layer: "backend" },
      { name: "Postgres 16", layer: "data" },
      { name: "Playwright", layer: "scrape" },
      { name: "React / Vite", layer: "frontend" },
      { name: "ATS adapters", layer: "domain" },
    ],
    stats: [],
    links: { repo: "https://github.com/hvrdummy123/Job-Finder" },
    domainTags: ["ai", "frontend"],
    featured: false,
    qa: [
      {
        q: "What does it do?",
        a: "Single-user job aggregation over a curated company list with ATS connectors + Playwright fallbacks; Apply opens the original posting — no auto-apply (README).",
      },
    ],
    decisions: [
      {
        context: "Many careers sites lack public ATS APIs.",
        decision: "Fallback chain: JSON-LD → sitemap → XHR → HTML → Playwright.",
        consequence: "Broader coverage with explicit source-health signals.",
      },
    ],
    roadmap: [],
  },
  {
    slug: "atrium-engineering",
    title: "Atrium: Auth, Chat & Admin",
    pitch:
      "SDE at an AI-powered e-commerce startup — Better Auth marketplace planes, transactional outbox chat, Next.js admin, multi-agent CLI.",
    year: 2026,
    status: "shipped",
    kind: "work",
    roles: ["backend", "fullstack", "ai-agents"],
    weight: {
      backend: 98,
      fullstack: 92,
      "ai-agents": 95,
      blockchain: 25,
      "quant-fintech": 40,
    },
    stack: [
      { name: "TypeScript", layer: "language" },
      { name: "Next.js", layer: "frontend" },
      { name: "React (Vite)", layer: "frontend" },
      { name: "Node.js", layer: "backend" },
      { name: "PostgreSQL", layer: "data" },
      { name: "Redis", layer: "infra" },
      { name: "Centrifugo", layer: "realtime" },
      { name: "Better Auth", layer: "auth" },
      { name: "Docker", layer: "infra" },
      { name: "GCP", layer: "cloud" },
    ],
    stats: [
      {
        label: "Chat failure scenarios",
        value: "25",
        source: "Résumé · Atrium",
        href: "/work/atrium-engineering",
      },
    ],
    links: {},
    domainTags: ["backend", "frontend", "ai"],
    featured: true,
    sourceNote: "Source is private / proprietary.",
    qa: [
      {
        q: "What did you ship at Atrium?",
        a: "Better Auth for separate merchant and consumer planes, a PostgreSQL transactional outbox chat pipeline tested against 25 failure scenarios, a Next.js admin dashboard on GCP, and a multi-agent planning CLI.",
      },
    ],
    decisions: [
      {
        context: "Realtime chat must not lose messages if the relay or broker restarts.",
        decision: "Persist via a PostgreSQL transactional outbox before delivery through Centrifugo/Redis.",
        consequence: "Messages survive relay crashes; 25 failure/edge-case scenarios covered in testing.",
      },
    ],
    roadmap: [],
  },
  {
    slug: "nomura-engineering",
    title: "Nomura: Platform + Pipelines",
    pitch:
      "Spring Boot + React real-estate platform; batch jobs 240→58 min; Liquibase/Jenkins/Ansible/Playwright releases.",
    year: 2026,
    status: "shipped",
    kind: "work",
    roles: ["backend", "fullstack", "quant-fintech"],
    weight: {
      backend: 100,
      fullstack: 75,
      "ai-agents": 20,
      blockchain: 10,
      "quant-fintech": 70,
    },
    stack: [
      { name: "Java", layer: "language" },
      { name: "Spring Boot", layer: "backend" },
      { name: "React.js", layer: "frontend" },
      { name: "Python", layer: "pipelines" },
      { name: "Docker", layer: "infra" },
      { name: "Liquibase", layer: "db" },
      { name: "Jenkins", layer: "ci" },
      { name: "Ansible", layer: "deploy" },
      { name: "Playwright", layer: "testing" },
    ],
    stats: [
      {
        label: "Batch pipeline speedup",
        value: "76% (240→58 min)",
        source: "resume",
        href: "/work/nomura-engineering",
      },
    ],
    links: {},
    domainTags: ["backend", "infra", "frontend"],
    featured: true,
    sourceNote: "Source is private / proprietary.",
    qa: [
      {
        q: "How did the batch job get 76% faster?",
        a: "Containerized Python pipelines with algorithmic validation and retry logic — the same run dropped from about 240 minutes to 58.",
      },
    ],
    decisions: [],
    roadmap: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsForRole(role: Project["roles"][number]) {
  return [...projects].sort(
    (a, b) => (b.weight[role] ?? 0) - (a.weight[role] ?? 0),
  );
}

export const recruiterStats = [
  {
    label: "CGPA",
    value: "3.95/4",
    source: "Résumé · Education",
    href: "/experience",
  },
  {
    label: "Batch pipeline",
    value: "240→58 min",
    source: "Résumé · Nomura",
    href: "/work/nomura-engineering",
  },
  {
    label: "Chat outbox",
    value: "25 scenarios",
    source: "Résumé · Atrium",
    href: "/work/atrium-engineering",
  },
  {
    label: "Scorer mutations",
    value: "64/64",
    source: "PayBench README",
    href: "/work/paybench",
  },
  {
    label: "JPMorgan CFG",
    value: "Winner",
    source: "Résumé · Achievements",
    href: "/experience",
  },
] as const;
