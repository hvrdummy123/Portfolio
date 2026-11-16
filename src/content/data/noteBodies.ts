/** Longer design-note bodies keyed by slug. */
export const noteBodies: Record<string, string[]> = {
  "paybench-ambiguous-timeout": [
    "The hard case in payments agents is not “call the transfer API.” It’s what happens when the API returns TIMEOUT after the money already moved. A naive retry without an idempotency key creates a second payout. A careful agent verifies world state, then retries safely.",
    "Most agent demos hide this behind fluent chat. PayBench grades the ledger and case log instead. That forces the failure mode into the open: TIMEOUT_AFTER_COMMIT is a first-class fault, not an afterthought.",
    "Alternatives considered: (1) grade the transcript with an LLM judge — cheap, but gameable; (2) only unit-test tools — misses multi-step policy; (3) score final balances + policy checkers with seeded faults — chosen, because it is falsifiable and reproducible.",
  ],
  "grading-the-graders": [
    "If a benchmark’s grader can be mutated into accepting a wrong world state, the leaderboard is fiction. PayBench ships grader mutations (a)–(g) and requires a 100% kill rate (64/64).",
    "Why mutation-test scorers? Because agent evals often silently reward the wrong thing. Killing broken graders is how you keep Oracle=100% and Naive=fail meaningful.",
    "Alternative: trust hand-written asserts forever. Rejected — asserts drift. Mutation testing makes the scoring contract itself adversarial.",
  ],
  "chat-outbox-25-failures": [
    "Realtime chat feels simple until the relay dies after the DB commit, or the broker restarts mid-fanout. The fix is not “more retries from the UI.” It’s durable intent: write the message to an outbox in the same transaction as business state, then let a relay publish.",
    "We designed the Atrium path as Postgres outbox → relay → Centrifugo + Redis, and walked 25 failure/edge scenarios so persistence wins over delivery luck.",
    "Alternatives: fire-and-forget websocket from the API (loses on crash); dual-write DB + broker without a transaction (split brain). Outbox is the boring reliable choice.",
  ],
  "zk-kyc-over-18": [
    "KYC usually means uploading a full document to every verifier. Zero-knowledge lets you prove a predicate — age ≥ 18, state of residence — without handing over the raw credential.",
    "The public repo emphasizes Circom + snarkJS Groth16 with a Solidity verifier and role registry. The resume also mentions ZoKrates and sub-2s proof generation for the selective-disclosure workflow.",
    "Alternatives: centralized attestation APIs (simple, privacy-poor); fully on-chain PII (auditability without privacy). ZK proofs split the difference: audit trail without oversharing.",
  ],
  "d2c-medusa-india": [
    "Indian D2C constraints are specific: phone-first identity, COD, WhatsApp as the post-purchase channel, and a hard budget against premature infra.",
    "Choice: Medusa v2 for commerce primitives; custom modules for phonepass auth, Razorpay+COD, Shiprocket, Interakt. No Redis/K8s/native app at the Minimum Working Model — add them when triggers fire.",
    "Alternatives: Shopify (less control / India COD friction), from-scratch Express (reinvent cart/order), email-first auth (worse fit). Phone+password at launch keeps SMS cost at zero until PMF.",
  ],
  "batch-240-to-58": [
    "A scheduled batch that takes four hours is not just slow — it compresses the release window and amplifies failure cost. When the job owns the night, every retry eats the morning release.",
    "At Nomura I worked on Python batch pipelines with algorithmic validation and retry logic, then containerized the workflow with Docker. The same run dropped from about 240 minutes to 58 (76% faster). That is the entire public claim: problem, approach, outcome.",
    "Releases were automated with Liquibase for database versioning, Jenkins CI/CD, and Ansible plus Playwright for tested, containerized deploys across environments. The point was consistency, not a stage-by-stage timing autopsy.",
    "What I would do differently next time: publish a one-page runbook for the failure modes the retries cover, so the next owner inherits the invariants instead of rediscovering them under pressure.",
    "Alternatives we rejected: keep the bare-metal/cron path and tune queries only — that can help latency, but it does not buy reproducible environments. Containers made the speedup shippable across machines.",
  ],
};

export function getNoteBody(slug: string): string[] {
  return (
    noteBodies[slug] ?? [
      "This note expands the case study into alternatives, constraints, and the decision that won. More detail can be added from the project docs.",
    ]
  );
}
