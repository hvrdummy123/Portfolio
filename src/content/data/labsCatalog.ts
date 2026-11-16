export type LabTopic = "agents" | "zk" | "backend" | "commerce" | "fintech";

export type LabCatalogEntry = {
  slug: string;
  title: string;
  topic: LabTopic;
  tone: "ai" | "blockchain" | "backend" | "frontend" | "fintech";
  time: string;
  difficulty: string;
  blurb: string;
  goal: string;
  steps: [string, string, string];
  caseHref: string;
  caseLabel: string;
};

export const LABS_CATALOG: LabCatalogEntry[] = [
  {
    slug: "paybench-timeout",
    title: "You are the agent",
    topic: "agents",
    tone: "ai",
    time: "~3 min",
    difficulty: "Easy",
    blurb: "TIMEOUT_AFTER_COMMIT ledger lab — retry safely or double-pay.",
    goal: "Move ₹8,000 once—even when the API times out after commit.",
    steps: [
      "Run Transfer ₹8,000 and read the TIMEOUT_AFTER_COMMIT response.",
      "Verify the ledger before choosing a retry path.",
      "Retry with the same idempotency key and check policy flags.",
    ],
    caseHref: "/work/paybench",
    caseLabel: "PayBench case study",
  },
  {
    slug: "zk-cats",
    title: "Zero-knowledge, explained with cats",
    topic: "zk",
    tone: "blockchain",
    time: "~4 min",
    difficulty: "Easy",
    blurb: "Issuance → proof → verify, plus a Where's the cat? cave analogy.",
    goal: "Prove you meet a rule without revealing the underlying private data.",
    steps: [
      "Issue a credential from a birth year and open the proof view.",
      "Compare what the verifier sees in proof-only vs full KYC mode.",
      "Run a few cave rounds and watch confidence rise.",
    ],
    caseHref: "/work/zkp-kyc",
    caseLabel: "ZKP KYC case study",
  },
  {
    slug: "outbox-playground",
    title: "Outbox playground",
    topic: "backend",
    tone: "backend",
    time: "~3 min",
    difficulty: "Easy",
    blurb: "Kill the relay mid-flight and watch messages recover.",
    goal: "Show that messages survive a relay crash when you persist to an outbox first.",
    steps: [
      "Enqueue a few messages in outbox mode, then kill the relay.",
      "Restart the relay and run a relay tick to deliver queued rows.",
      "Switch to naive mode and repeat the kill to see messages disappear.",
    ],
    caseHref: "/work/atrium-engineering",
    caseLabel: "Atrium engineering case study",
  },
  {
    slug: "d2c-order-lifecycle",
    title: "D2C order-lifecycle simulator",
    topic: "commerce",
    tone: "frontend",
    time: "~5 min",
    difficulty: "Medium",
    blurb: "Click order states; watch notifications and webhooks fire.",
    goal: "Walk an order through states and see which notifications and webhooks fire.",
    steps: [
      "Advance from pending through processing to shipped.",
      "Mark delivered and note customer-facing channels.",
      "Try cancel or return paths and read the event log.",
    ],
    caseHref: "/work/d2c-ecommerce",
    caseLabel: "D2C platform case study",
  },
  {
    slug: "backtest-toy",
    title: "Backtest toy",
    topic: "fintech",
    tone: "fintech",
    time: "~3 min",
    difficulty: "Easy",
    blurb: "Moving-average crossover on synthetic data (illustrative).",
    goal: "Tune MA windows on synthetic prices and spot crossover buy/sell signals.",
    steps: [
      "Set fast and slow windows and scan the chart for crossovers.",
      "Compare buy vs sell markers against the equity readout.",
      "Reseed or nudge sliders to see how signal count changes.",
    ],
    caseHref: "/work/etf-backtesting",
    caseLabel: "ETF backtesting case study",
  },
  {
    slug: "idempotency-keys",
    title: "Idempotency key playground",
    topic: "backend",
    tone: "backend",
    time: "~2 min",
    difficulty: "Easy",
    blurb: "Fire the same payment N times with and without keys.",
    goal: "See how an idempotency key prevents double charges on retries.",
    steps: [
      "Turn keys on and click Send payment several times.",
      "Reset, turn keys off, and repeat — watch charges climb.",
      "Compare the request vs charge counters.",
    ],
    caseHref: "/work/paybench",
    caseLabel: "PayBench case study",
  },
  {
    slug: "lookahead-bias",
    title: "Look-ahead bias",
    topic: "fintech",
    tone: "fintech",
    time: "~2 min",
    difficulty: "Easy",
    blurb:
      "Same strategy with/without look-ahead — inflated equity curve (illustrative).",
    goal: "Spot how peeking at future prices inflates a toy backtest.",
    steps: [
      "Read the honest equity curve with bias off.",
      "Enable look-ahead bias and compare the final equity.",
      "Toggle a few times to feel the gap.",
    ],
    caseHref: "/work/etf-backtesting",
    caseLabel: "ETF backtesting case study",
  },
];

export const LAB_TOPICS = [
  "all",
  "agents",
  "zk",
  "backend",
  "commerce",
  "fintech",
] as const;
export type LabTopicFilter = (typeof LAB_TOPICS)[number];

export function getLabBySlug(slug: string): LabCatalogEntry | undefined {
  return LABS_CATALOG.find((lab) => lab.slug === slug);
}
