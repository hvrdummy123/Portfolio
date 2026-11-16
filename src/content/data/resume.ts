import type { ResumeVariant, Role } from "./types";

export type { ResumeVariant, Role };

export type ResumeProject = {
  slug: string;
  title: string;
  year: number;
  tools: string;
  bullets: string[];
};

export const resume = {
  identity: {
    name: "Harshita Ranka",
    fullName: "Harshita Vivek Ranka",
    phone: "+91 77180 05243",
    email: "harshitaranka2004@gmail.com",
    linkedin: "https://linkedin.com/in/harshita-vivek-ranka",
    linkedinDisplay: "linkedin.com/in/harshita-vivek-ranka",
    github: "https://github.com/hvrdummy123",
    githubDisplay: "github.com/hvrdummy123",
    location: "Mumbai, India",
    education: {
      school: "MPSTME, NMIMS Mumbai",
      degree: "B.Tech Computer Engineering",
      cgpa: "3.95/4",
      classOf: 2026,
    },
    certification: {
      name: "AWS Certified Cloud Practitioner",
      topics: ["EC2", "S3", "IAM"],
      verificationUrl: "",
    },
    achievements: [
      "Winner, Code for Good — JPMorgan Chase — built an AI-powered education platform",
      "Finalist in Flipkart GRID, IVP",
      "INMO Qualifier · RMO Top 30 Rank (2021) · Multiple mathematics competition wins",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Discrete Mathematics",
      "Probability & Statistics",
      "Microservices & Distributed Systems",
      "DBMS (NoSQL & Relational)",
      "Operating Systems",
      "Computer Networks",
      "AI / Machine Learning",
      "Image and Video Processing",
      "Computer Vision",
    ],
  },
  skills: {
    programming: [
      "Java",
      "Python",
      "C++",
      "JavaScript (ES6/ES7)",
      "TypeScript",
      "SQL",
      "HTML/CSS",
    ],
    frameworks: [
      "Spring Boot",
      "React.js",
      "Git",
      "Angular",
      "Node.js",
      "Redis",
      "Better Auth",
      "Express.js",
      "FastAPI",
      "Centrifugo",
      "PostgreSQL",
      "Solidity",
      "Circom",
      "ZoKrates",
      "MongoDB",
      "Firebase",
      "Jenkins",
      "Docker",
      "Ansible",
      "Liquibase",
      "Playwright",
    ],
    cloud:
      "GCP (private runtime, containerized deployments); AWS Certified Cloud Practitioner – EC2, S3, IAM",
    /** One-pager lines matched to the master Overleaf PDF. */
    achievementsLine:
      "Winner, Code for Good – JPMorgan Chase; Finalist, Flipkart Grid; Finalist, IVP",
    courseworkLine:
      "Data Structures & Algorithms, Microservices & Distributed Systems, DBMS (NoSQL & Relational), Operating Systems, Computer Networks, AI / Machine Learning",
  },
  experience: [
    {
      id: "atrium",
      title: "SDE",
      company: "Atrium",
      companyFull: "Atrium - E-Commerce Startup (Pre-launch)",
      companyNote: "AI-powered e-commerce startup (pre-launch)",
      location: "Remote / India",
      startLabel: "Aug 2026 – Present",
      start: "2026-08",
      end: "Present",
      stackLine:
        "TypeScript, React (Vite), Next.js, Node.js, PostgreSQL, Redis, Python, Centrifugo, Better Auth, Docker, GCP; AI-assisted development (Claude Code, Codex)",
      stack: [
        "TypeScript",
        "React (Vite)",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Python",
        "Centrifugo",
        "Better Auth",
        "Docker",
        "GCP",
        "Claude Code",
        "Codex",
      ],
      bullets: [
        {
          id: "atrium-auth",
          text: "Built the authentication module on Better Auth for a template-driven marketplace platform (Shopify-style), implementing separate merchant and consumer auth planes with Postgres-backed sessions and accounts.",
          projectSlug: "atrium-engineering",
        },
        {
          id: "atrium-chat",
          text: "Engineered a real-time chat pipeline using a PostgreSQL transactional outbox, relay service, Centrifugo, and Redis, designed and tested against 25 failure and edge-case scenarios so messages are persisted atomically before delivery and not lost if the relay or broker restarts; built the React + Vite chat interface on top.",
          projectSlug: "atrium-engineering",
        },
        {
          id: "atrium-admin",
          text: "Helped build the internal admin dashboard in Next.js (App Router) and TypeScript, packaged as a standalone non-root container on a private GCP runtime; implemented the charts as hand-rolled SVG with no chart libraries, and used postgres for data access and jose for JWT verification.",
          projectSlug: "atrium-engineering",
        },
        {
          id: "atrium-cli",
          text: "Built an AI chatroom CLI for multi-agent planning: one shared Markdown transcript across a human and two agents (Claude in plan mode, Codex in a read-only sandbox), with explicit @claude/@codex/@both routing and no agent-to-agent loops.",
          projectSlug: "atrium-engineering",
        },
      ],
      aiDisclosure: "",
    },
    {
      id: "nomura",
      title: "ITD Intern",
      company: "Nomura",
      companyFull: "Nomura Services India Pvt. Ltd.",
      companyNote: "Nomura Services India Pvt. Ltd.",
      location: "India",
      startLabel: "Jan 2026 – Jun 2026",
      start: "2026-01",
      end: "2026-06",
      stackLine:
        "Java, Spring Boot, React.js, Python, Jenkins, Liquibase, Docker, Ansible, Playwright, Git",
      stack: [
        "Java",
        "Spring Boot",
        "React.js",
        "Python",
        "Jenkins",
        "Liquibase",
        "Docker",
        "Ansible",
        "Playwright",
        "Git",
      ],
      bullets: [
        {
          id: "nomura-platform",
          text: "Integrated Spring Boot backend services with React interfaces for an enterprise real estate platform, driving design decisions across distributed, multi-tiered systems.",
          projectSlug: "nomura-engineering",
        },
        {
          id: "nomura-batch",
          text: "Built Python batch pipelines with algorithmic validation and retry logic for scheduled data processing; containerized the workflow with Docker, cutting execution time from 240 min to 58 min (76% faster).",
          projectSlug: "nomura-engineering",
        },
        {
          id: "nomura-cicd",
          text: "Automated database versioning and deployment via Liquibase and Jenkins CI/CD, and established containerized, tested release pipelines with Ansible and Playwright, improving deployment speed and release consistency across environments.",
          projectSlug: "nomura-engineering",
        },
      ],
    },
  ],
  projects: [
    {
      slug: "d2c-ecommerce",
      title: "D2C E-Commerce Platform",
      year: 2026,
      tools: "Medusa.js, Node.js, React.js, PostgreSQL, REST APIs",
      bullets: [
        "Architected and built a Shopify-style headless commerce platform on Medusa.js with a decoupled React storefront and Node.js backend, separating catalog, cart, checkout, order, and fulfillment domains.",
        "Extended Medusa with custom workflows and REST APIs for end-to-end cart/checkout — variant handling, pricing, validation, and order state transitions — on a relational PostgreSQL model.",
        "Designed configurable multi-region shipping/fulfillment and extension points (payments, auth, promotions, notifications) so merchants can grow without a rewrite.",
        "Delivered working demos to clients as a self-hosted Shopify-style replacement for Indian D2C (phone-first checkout, COD, WhatsApp post-purchase).",
      ],
    },
    {
      slug: "zkp-kyc",
      title: "Privacy-Preserving KYC Verification Platform",
      year: 2026,
      tools:
        "React.js, Node.js, Express.js, Solidity, Ethereum, Circom, ZoKrates, IPFS, MetaMask",
      bullets: [
        "Designed a full-stack KYC stack separating credential issuance, zero-knowledge proof generation, and verification into modular services for privacy-preserving identity checks.",
        "Built Solidity contracts for issuance, revocation, and zk-SNARK verification with immutable on-chain auditability on Ethereum; Circom circuits for proof generation.",
        "Integrated React + Node.js APIs with ZoKrates/Circom proofs so verifiers get selective attribute disclosure without raw PII.",
        "Achieved proof generation under 2 seconds for the selective-disclosure workflow claimed on the résumé, with MetaMask-driven local testnet flows.",
      ],
    },
    {
      slug: "etf-backtesting",
      title: "ETF Backtesting Framework",
      year: 2025,
      tools:
        "Python, Node.js, Express.js, React.js, Redux, REST APIs, MongoDB, SQLite, Jest, Plotly",
      bullets: [
        "Built a full-stack backtester (React/Redux + Express + Python) over MongoDB/SQLite evaluating strategies across 180,000+ historical NSE records.",
        "Implemented an OHLCV market-data pipeline that runs complete strategy simulations in under 3 seconds.",
        "Shipped REST APIs at ~120 ms average latency feeding Plotly dashboards that render in under 700 ms.",
        "Covered critical paths with Jest so regression risk stays low as strategies and data sources evolve.",
      ],
    },
    {
      slug: "paybench",
      title: "PayBench (Agent Payment Benchmark)",
      year: 2026,
      tools:
        "Python, TypeScript, Node.js, double-entry ledger, mutation-tested graders, GitHub Actions",
      bullets: [
        "Built a 50-task (25 core) agent payments benchmark with a double-entry ledger and 8 fault types — including TIMEOUT_AFTER_COMMIT — so agents are scored on final world state, not chat fluency.",
        "Designed policy checkers P1–P9 and mutation-tested scorers to a 64/64 (100%) kill rate, catching graders that can be fooled into false passes.",
        "Separated Oracle (idempotent, pass@1 1.00 on core) from Naive (double-pay under ambiguous timeouts) reference agents for calibrate-able evals.",
        "Shipped playground/compare flows that demonstrate verify-before-retry and idempotency-key replay when the API lies after money already moved.",
      ],
    },
    {
      slug: "incident-logger",
      title: "TraceIQ (Incident Logger)",
      year: 2026,
      tools:
        "TypeScript, FastAPI, React/Vite, Postgres + RLS, DuckDB, Parquet",
      bullets: [
        "Built a log-to-hypothesis incident assistant that turns messy outage JSONL into ranked suspects and a cited postmortem-style report — and abstains when evidence is thin.",
        "Used DuckDB/Parquet plus Postgres RLS patterns for efficient, access-controlled analysis of large local log corpora.",
        "Validated the pipeline with 56 pytest + 6 Vitest cases; demo eval oracle service top-1 = 1.00 (n=3) vs weaker deterministic baselines.",
        "Encoded decoy-deploy failure modes so operators and graders can separate real regressions from noisy latest-deploy heuristics.",
      ],
    },
    {
      slug: "job-finder",
      title: "Personal Job Radar",
      year: 2026,
      tools:
        "Python, FastAPI, Postgres 16, Playwright, React/Vite, ATS adapters",
      bullets: [
        "Built a single-user job aggregation radar with ATS adapters for Greenhouse, Lever, Ashby, Workday, plus generic careers pages into searchable Postgres.",
        "Implemented a resilient ingest fallback chain (JSON-LD → sitemap → XHR → HTML → Playwright) with explicit source-health signals when sites drift.",
        "Designed refresh + dedupe so the UI stays current without duplicate noise; Apply opens the original posting — no auto-apply.",
        "Focused reliability on connector health and query UX so silent scraper rot does not hide open roles.",
      ],
    },
    {
      slug: "mandarin-teacher",
      title: "duihua — Mandarin Speaking Coach",
      year: 2026,
      tools: "TypeScript, React/Vite, FastAPI, Whisper STT, Edge TTS, LLM tutors",
      bullets: [
        "Built a local-first speaking coach that chains STT → LLM tutor → TTS for real conversational practice with pinyin/hanzi/English transcripts.",
        "Shipped CC-CEDICT word lookup, topic role-play, and review-before-send so learners control what gets scored by the model.",
        "Used a hexagonal architecture so STT/LLM/TTS providers can swap without rewriting the practice loop.",
        "Kept demos honest: free-tier LLM 429s and unfinished tone scoring are documented limits, not hidden.",
      ],
    },
    {
      slug: "nomura-engineering",
      title: "Nomura — Platform & Batch Pipelines",
      year: 2026,
      tools:
        "Java, Spring Boot, React.js, Python, Liquibase, Jenkins, Docker, Ansible, Playwright",
      bullets: [
        "Integrated Spring Boot services with React for an enterprise real-estate platform across multi-tier systems.",
        "Containerized Python batch jobs with validation and retries, cutting runtime from 240 min to 58 min (76% faster).",
        "Automated Liquibase + Jenkins releases with Ansible and Playwright for consistent multi-environment deploys.",
        "Drove design decisions on distributed service boundaries so releases stayed testable end-to-end.",
      ],
    },
  ] satisfies ResumeProject[],
} as const;

export const resumeVariants: ResumeVariant[] = [
  {
    role: "backend",
    slug: "backend",
    title: "Backend / Software Engineer",
    headline: "Backend SWE | Distributed Systems | Reliable Data Pipelines",
    summary:
      "Backend engineer focused on reliable pipelines, transactional messaging, and commerce systems. Comfortable owning failure modes end-to-end.",
    skillsOrder: [
      "Java",
      "TypeScript",
      "Python",
      "Spring Boot",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Jenkins",
      "Liquibase",
    ],
    projectOrder: ["d2c-ecommerce", "paybench", "etf-backtesting"],
    experienceHighlights: ["nomura-batch", "atrium-chat", "atrium-auth", "nomura-cicd"],
    whyThisVersion:
      "Commerce platform, payment-agent reliability, and high-throughput data pipelines — failure modes first.",
  },
  {
    role: "fullstack",
    slug: "fullstack",
    title: "Full-stack Engineer",
    headline: "Full-Stack SWE | React · Next.js · Node · PostgreSQL",
    summary:
      "Full-stack engineer shipping storefronts, admin dashboards, and real-time UIs on solid Postgres backends.",
    skillsOrder: [
      "TypeScript",
      "React.js",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Better Auth",
      "Vite",
      "Docker",
    ],
    projectOrder: ["d2c-ecommerce", "zkp-kyc", "etf-backtesting"],
    experienceHighlights: ["atrium-admin", "atrium-chat", "atrium-auth", "nomura-platform"],
    whyThisVersion:
      "D2C storefront/backend, privacy KYC full-stack, and ETF dashboards — UI + API ownership.",
  },
  {
    role: "ai-agents",
    slug: "ai-agents",
    title: "AI / Agent Engineer",
    headline:
      "Agent Engineer | Evals · Tool-Use Reliability · Multi-Agent Systems",
    summary:
      "Agent engineer who grades world state, not chat prose — payment-agent evals, incident hypothesis ranking, tool-using ingest pipelines, and multi-agent CLI routing.",
    skillsOrder: [
      "Python",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Playwright",
      "FastAPI",
    ],
    projectOrder: ["paybench", "incident-logger", "job-finder"],
    experienceHighlights: [
      "atrium-cli",
      "atrium-chat",
      "atrium-auth",
      "atrium-admin",
    ],
    whyThisVersion:
      "PayBench (64/64 graders), TraceIQ (abstaining RCA), Job Radar (ATS tool-use) — plus multi-agent CLI at Atrium.",
  },
  {
    role: "blockchain",
    slug: "blockchain",
    title: "Blockchain / Web3 Engineer",
    headline:
      "Blockchain Engineer | Solidity · zk-SNARKs · Privacy-Preserving Identity",
    summary:
      "Blockchain engineer building privacy-preserving KYC with selective disclosure and on-chain auditability.",
    skillsOrder: [
      "Solidity",
      "Circom",
      "ZoKrates",
      "Ethereum",
      "React.js",
      "Node.js",
      "IPFS",
    ],
    projectOrder: ["zkp-kyc", "d2c-ecommerce", "paybench"],
    experienceHighlights: ["atrium-auth", "atrium-chat", "atrium-cli"],
    whyThisVersion:
      "ZKP KYC first, then self-hosted commerce and payment-agent integrity — privacy + correctness.",
  },
  {
    role: "quant-fintech",
    slug: "quant-fintech",
    title: "Quant / Fintech Software Engineer",
    headline: "Fintech & Quant SWE | Backtesting · Payments · Data Pipelines",
    summary:
      "Fintech-minded SWE spanning ETF backtesting, payment-agent reliability, and high-throughput data pipelines.",
    skillsOrder: [
      "Python",
      "Node.js",
      "React.js",
      "MongoDB",
      "SQLite",
      "PostgreSQL",
      "Jest",
      "Plotly",
    ],
    projectOrder: ["etf-backtesting", "paybench", "d2c-ecommerce"],
    experienceHighlights: ["nomura-batch", "atrium-chat", "nomura-cicd", "atrium-cli"],
    whyThisVersion:
      "ETF backtester metrics first, then PayBench ledger integrity and commerce payments.",
  },
];

export function getResumeVariant(role: Role) {
  return resumeVariants.find((v) => v.role === role) ?? resumeVariants[0];
}

export function getResumeProject(slug: string) {
  return resume.projects.find((p) => p.slug === slug);
}

export function projectsForVariant(variant: ResumeVariant) {
  return variant.projectOrder
    .map((slug) => getResumeProject(slug))
    .filter((p): p is (typeof resume.projects)[number] => Boolean(p))
    .slice(0, 3);
}

export function pdfFilename(slug: string) {
  const label =
    slug === "ai-agents"
      ? "AI_Agents"
      : slug === "quant-fintech"
        ? "Quant_Fintech"
        : slug === "fullstack"
          ? "Fullstack"
          : slug.charAt(0).toUpperCase() + slug.slice(1);
  return `Harshita_Ranka_Resume_${label}.pdf`;
}

/** Legacy filenames kept as redirects/aliases during transition. */
export function pdfFilenameLegacy(slug: string) {
  const label =
    slug === "ai-agents"
      ? "AI-Agents"
      : slug === "quant-fintech"
        ? "Quant-Fintech"
        : slug.charAt(0).toUpperCase() + slug.slice(1);
  return `Harshita-Ranka-${label}-Resume.pdf`;
}

/** Reorder a list so preferred names appear first (case-insensitive contains/exact). */
export function prioritizeSkills(
  all: readonly string[],
  preferred: readonly string[],
) {
  const remaining = [...all];
  const head: string[] = [];
  for (const pref of preferred) {
    const idx = remaining.findIndex(
      (s) =>
        s.toLowerCase() === pref.toLowerCase() ||
        s.toLowerCase().includes(pref.toLowerCase()),
    );
    if (idx >= 0) head.push(remaining.splice(idx, 1)[0]!);
  }
  return [...head, ...remaining];
}
