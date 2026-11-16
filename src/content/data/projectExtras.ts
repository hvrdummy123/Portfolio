/** Per-project case-study extras — only real facts; omit empty sections in UI. */

export type ProjectExtra = {
  limitations?: string;
  howTested?: string[];
  threatModel?: { title: string; points: string[] };
  research?: { title: string; href: string; blurb: string };
  diagrams?: { title: string; caption: string; svg: string }[];
  verifyCommands?: string[];
};

export const projectExtras: Record<string, ProjectExtra> = {
  "zkp-kyc": {
    limitations:
      "The public demo proves state-of-residence; age-gate circuits are supported in the design but are not the headline demo. A trusted setup (Groth16) is assumed; an MPC ceremony would strengthen production deployment.",
    howTested: [
      "Local Hardhat workflows for issuance, proof generation, and on-chain verification",
      "Role registry and verifier contracts exercised in the repo demo path",
    ],
    threatModel: {
      title: "Threat model (from research paper)",
      points: [
        "Semi-honest participants may try to infer or correlate hidden attributes.",
        "Attester is trusted for credential accuracy at issuance, not for storing raw PII long-term.",
        "Data linkage mitigated with unique salts and proof-specific nullifiers.",
        "Replay mitigated with request-specific challenges in public inputs.",
        "Credential forgery infeasible when verifiers check proofs against on-chain attester commitments.",
        "Heavy proof generation stays off-chain; on-chain checks are constant-time and fee-protected.",
        "Groth16 requires a trusted setup; MPC ceremonies reduce risk if at least one participant is honest.",
      ],
    },
    research: {
      title: "Research paper",
      href: "/research/Springer_Lecture_Notes_in_Computer_Science.pdf",
      blurb:
        "Privacy-Preserving Identity Verification using Zero-Knowledge Proofs and Blockchain (Bandekar, Ranka, Reddy). Circom v2.1.6, snarkJS, Poseidon hashing, Solidity on a local Ethereum testnet. Proof-generation timing on the résumé remains “under 2 seconds”; paper gas/latency figures from comparable systems are not presented as our measurements.",
    },
  },
  "nomura-engineering": {
    limitations:
      "Details stay at résumé scope: problem, approach, and outcome only — no internal system names, stage timings, or client data.",
    howTested: [
      "Playwright coverage in the containerized release path",
      "Liquibase + Jenkins CI/CD for database versioning and deploys",
    ],
    diagrams: [
      {
        title: "Release pipeline",
        caption: "Generic tool chain: Liquibase → Jenkins → Ansible → Playwright.",
        svg: `<svg viewBox="0 0 640 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Release pipeline">
  <rect x="8" y="36" width="130" height="48" rx="8" fill="var(--diagram-2)" stroke="currentColor" stroke-width="2"/>
  <text x="73" y="66" text-anchor="middle" font-family="var(--font-dm-sans), system-ui, sans-serif" font-size="14" fill="currentColor">Liquibase</text>
  <path d="M142 60 H170" stroke="currentColor" stroke-width="2"/>
  <rect x="174" y="36" width="130" height="48" rx="8" fill="var(--diagram-3)" stroke="currentColor" stroke-width="2"/>
  <text x="239" y="66" text-anchor="middle" font-family="var(--font-dm-sans), system-ui, sans-serif" font-size="14" fill="currentColor">Jenkins</text>
  <path d="M308 60 H336" stroke="currentColor" stroke-width="2"/>
  <rect x="340" y="36" width="130" height="48" rx="8" fill="var(--diagram-4)" stroke="currentColor" stroke-width="2"/>
  <text x="405" y="66" text-anchor="middle" font-family="var(--font-dm-sans), system-ui, sans-serif" font-size="14" fill="currentColor">Ansible</text>
  <path d="M474 60 H502" stroke="currentColor" stroke-width="2"/>
  <rect x="506" y="36" width="126" height="48" rx="8" fill="var(--diagram-5)" stroke="currentColor" stroke-width="2"/>
  <text x="569" y="66" text-anchor="middle" font-family="var(--font-dm-sans), system-ui, sans-serif" font-size="14" fill="currentColor">Playwright</text>
</svg>`,
      },
    ],
  },
  "atrium-engineering": {
    limitations:
      "Proprietary product — public write-up covers auth planes, outbox chat, admin, and CLI at a problem/approach/outcome level only.",
    howTested: [
      "Chat pipeline designed and tested against 25 failure and edge-case scenarios",
      "Messages persist via PostgreSQL transactional outbox before Centrifugo/Redis delivery",
    ],
    diagrams: [
      {
        title: "Chat outbox path",
        caption: "Write → outbox row → relay → Centrifugo/Redis → client; relay/broker kills do not drop committed messages.",
        svg: `<svg viewBox="0 0 720 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Outbox chat path">
  <rect x="10" y="40" width="110" height="50" rx="8" fill="var(--diagram-1)" stroke="currentColor" stroke-width="2"/>
  <text x="65" y="70" text-anchor="middle" font-size="13" font-family="var(--font-dm-sans), system-ui, sans-serif" fill="currentColor">API write</text>
  <rect x="140" y="40" width="130" height="50" rx="8" fill="var(--diagram-2)" stroke="currentColor" stroke-width="2"/>
  <text x="205" y="70" text-anchor="middle" font-size="13" font-family="var(--font-dm-sans), system-ui, sans-serif" fill="currentColor">Postgres outbox</text>
  <rect x="290" y="40" width="100" height="50" rx="8" fill="var(--diagram-3)" stroke="currentColor" stroke-width="2"/>
  <text x="340" y="70" text-anchor="middle" font-size="13" font-family="var(--font-dm-sans), system-ui, sans-serif" fill="currentColor">Relay</text>
  <rect x="410" y="40" width="140" height="50" rx="8" fill="var(--diagram-4)" stroke="currentColor" stroke-width="2"/>
  <text x="480" y="70" text-anchor="middle" font-size="13" font-family="var(--font-dm-sans), system-ui, sans-serif" fill="currentColor">Centrifugo / Redis</text>
  <rect x="570" y="40" width="130" height="50" rx="8" fill="var(--diagram-5)" stroke="currentColor" stroke-width="2"/>
  <text x="635" y="70" text-anchor="middle" font-size="13" font-family="var(--font-dm-sans), system-ui, sans-serif" fill="currentColor">React client</text>
  <path d="M120 65 H140 M270 65 H290 M390 65 H410 M550 65 H570" stroke="currentColor" stroke-width="2"/>
</svg>`,
      },
    ],
  },
  paybench: {
    limitations:
      "Reference agents (Oracle / Naive) are for calibration. Real-LLM leaderboard numbers are intentionally not published here.",
    howTested: [
      "Mutation-tested scorers with 64/64 kill rate",
      "Fault injection including TIMEOUT_AFTER_COMMIT",
      "Policy checkers P1–P9 on final ledger state",
    ],
    verifyCommands: [
      "# From the Agent-Pro-Paybench repo root (see README)",
      "# Run the mutation-testing / validate path documented there (64/64 kill rate).",
      "# Run the Oracle and Naive reference agents for the TIMEOUT_AFTER_COMMIT scenarios.",
    ],
  },
  "incident-logger": {
    limitations:
      "Demo eval figures, if shown, always include sample size. Expanded evaluation numbers are not featured on the home proof strip.",
    howTested: ["56 pytest cases", "6 Vitest cases"],
  },
  "etf-backtesting": {
    limitations:
      "Source is private. The Backtest toy lab uses illustrative synthetic data, not the production dataset.",
  },
  "d2c-ecommerce": {
    limitations:
      "Client demos are private. Capacity figures for the 10k DAU topology are design targets, not live traffic measurements.",
  },
};

export function getProjectExtra(slug: string): ProjectExtra | undefined {
  return projectExtras[slug];
}
