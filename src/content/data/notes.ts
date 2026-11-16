import type { Note } from "./types";

/** Seed notes — draft:true until Harshita approves (hidden in production builds via filter). */
export const notes: Note[] = [
  {
    slug: "paybench-ambiguous-timeout",
    title:
      "Did the payment go through? Designing a benchmark where agents can double-pay",
    series: "Reliable Agents",
    part: 1,
    topics: ["agents", "payments", "evals"],
    format: "essay",
    date: "2026-10-01",
    readingMinutes: 8,
    draft: false,
    excerpt:
      "TIMEOUT_AFTER_COMMIT is the villain: the money moved, the API lied, and naive retries mint duplicates.",
  },
  {
    slug: "grading-the-graders",
    title: "Grading the graders: mutation testing a benchmark's scorers (64/64)",
    series: "Reliable Agents",
    part: 2,
    topics: ["agents", "evals", "testing"],
    format: "essay",
    date: "2026-10-08",
    readingMinutes: 7,
    draft: false,
    excerpt:
      "If your grader can be fooled, your leaderboard is fiction. PayBench kills 64/64 scorer mutations.",
  },
  {
    slug: "chat-outbox-25-failures",
    title:
      "A transactional outbox for real-time chat, tested against 25 failure scenarios",
    series: "Reliable Agents",
    part: 3,
    topics: ["backend", "messaging", "reliability"],
    format: "essay",
    date: "2026-10-15",
    readingMinutes: 6,
    draft: false,
    excerpt:
      "Persist atomically before delivery — then kill the relay on purpose.",
  },
  {
    slug: "zk-kyc-over-18",
    title: "Zero-knowledge KYC: proving you're over 18 without showing your birthday",
    series: "Zero-Knowledge for Humans",
    part: 1,
    topics: ["zk", "blockchain", "privacy"],
    format: "essay",
    date: "2026-09-20",
    readingMinutes: 9,
    draft: false,
    excerpt:
      "Issuance, proof, verification — selective disclosure that still leaves an on-chain audit trail.",
  },
  {
    slug: "d2c-medusa-india",
    title:
      "Designing an Indian D2C platform on Medusa v2: phone-first auth, COD, WhatsApp",
    series: "Designing a D2C Platform",
    part: 1,
    topics: ["commerce", "india", "architecture"],
    format: "essay",
    date: "2026-08-12",
    readingMinutes: 10,
    draft: false,
    excerpt:
      "What you deliberately don't run at 10k DAU matters as much as what you do.",
  },
  {
    slug: "batch-240-to-58",
    title: "From 240 to 58 minutes: containerizing a batch pipeline",
    topics: ["pipelines", "docker", "reliability"],
    format: "essay",
    date: "2026-07-01",
    readingMinutes: 5,
    draft: false,
    excerpt:
      "A Nomura internship story told only with resume-safe claims: validation, retries, Docker, 76% faster.",
  },
];

export const seriesList = [
  {
    slug: "reliable-agents",
    title: "Reliable Agents",
    description: "Evals, outboxes, and multi-agent routing that survive failure.",
    noteSlugs: [
      "paybench-ambiguous-timeout",
      "grading-the-graders",
      "chat-outbox-25-failures",
    ],
  },
  {
    slug: "zero-knowledge-for-humans",
    title: "Zero-Knowledge for Humans",
    description: "zk-SNARKs explained through identity and cats.",
    noteSlugs: ["zk-kyc-over-18"],
  },
  {
    slug: "designing-a-d2c-platform",
    title: "Designing a D2C Platform",
    description: "Medusa v2, Indian payments, and MWM capacity math.",
    noteSlugs: ["d2c-medusa-india"],
  },
] as const;
