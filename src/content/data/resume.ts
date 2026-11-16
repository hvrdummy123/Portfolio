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
      "Centrifugo",
      "PostgreSQL",
      "Solidity",
      "MongoDB",
      "Firebase",
      "Jenkins",
      "Docker",
      "Ansible",
      "Liquibase",
      "Playwright",
    ],
    cloud:
      "GCP (private runtime, containerized deployments); AWS Certified Cloud Practitioner — EC2, S3, IAM",
  },
  experience: [
    {
      id: "atrium",
      title: "SDE",
      company: "Atrium",
      companyFull: "Atrium - AI Powered E-Commerce Startup (Pre-launch)",
      companyNote: "AI-powered e-commerce startup (pre-launch)",
      location: "Remote / India",
      startLabel: "Aug 2026 -- Present",
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
      startLabel: "Jan 2026 -- Jun 2026",
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
        "Architected and built a full featured headless e-commerce platform on Medusa.js with a decoupled React storefront and Node.js backend, separating catalog, cart, checkout, order, and fulfillment domains.",
        "Extended Medusa's core commerce framework with custom backend workflows and REST APIs, implementing end-to-end cart/checkout flows -- variant handling, pricing, validation, order state transitions -- backed by a relational PostgreSQL data model.",
        "Designed configurable, multi-region shipping and fulfillment workflows and structured the system for extensibility (payments, auth, promotions, notifications) without major architectural rework.",
      ],
    },
    {
      slug: "zkp-kyc",
      title: "Privacy-Preserving KYC Verification Platform",
      year: 2026,
      tools: "React.js, Node.js, Express.js, Solidity, Ethereum, ZoKrates, IPFS, MetaMask",
      bullets: [
        "Designed a full-stack KYC platform separating credential issuance, zero-knowledge proof generation, and verification into modular services for privacy-preserving identity verification.",
        "Built Solidity smart contracts for credential issuance, revocation, and zk-SNARK verification with immutable on-chain auditability on Ethereum and used Circom circuits for proofs.",
        "Integrated React workflows with Node.js APIs and ZoKrates-generated proofs, enabling selective attribute disclosure with proof generation under 2 seconds.",
      ],
    },
    {
      slug: "etf-backtesting",
      title: "ETF Backtesting Framework",
      year: 2025,
      tools: "Python, Node.js, Express.js, React.js, Redux, REST APIs, MongoDB, SQLite, Jest, Plotly",
      bullets: [
        "Built a backtesting platform combining a React/Redux frontend, Express backend, and Python engine over MongoDB and SQLite, evaluating strategies across 180,000+ historical NSE records.",
        "Built a market-data pipeline normalizing OHLCV datasets, executing full strategy simulations in under 3 seconds.",
        "Engineered REST APIs (~120 ms avg latency) surfacing results through Plotly dashboards, covered by Jest tests, rendering in under 700 ms.",
      ],
    },
    {
      slug: "paybench",
      title: "PayBench (Agent Payment Benchmark)",
      year: 2026,
      tools: "Python, TypeScript, Node.js, double-entry ledger, mutation-tested graders",
      bullets: [
        "Built a seeded payments simulator with a double-entry ledger and scripted faults including TIMEOUT_AFTER_COMMIT so agents are graded on final world state, not chat fluency.",
        "Designed policy-aware graders (P1-P9) and mutation-tested scorers to a 64/64 kill rate, separating Oracle (idempotent) from Naive (double-pay) behavior.",
        "Shipped playground and compare media that demonstrate verify-before-retry and idempotency-key replay under ambiguous timeouts.",
      ],
    },
    {
      slug: "incident-logger",
      title: "TraceIQ (Incident Logger)",
      year: 2026,
      tools: "TypeScript, DuckDB, Parquet, RLS, log-to-hypothesis pipeline",
      bullets: [
        "Built a log-to-hypothesis incident assistant that ranks suspects from messy outage logs and abstains instead of inventing certainty.",
        "Used DuckDB/Parquet with row-level security patterns for efficient local analysis of large log corpora.",
        "Documented decoy-deploy failure modes so graders and operators can distinguish real regressions from noise.",
      ],
    },
    {
      slug: "job-finder",
      title: "Personal Job Radar",
      year: 2026,
      tools: "Python, Postgres, ATS adapters, search UI",
      bullets: [
        "Built a job-radar pipeline with ATS adapters that normalize listings into Postgres for searchable discovery.",
        "Designed refresh and dedupe flows so the search UI stays current without duplicate noise.",
        "Focused on reliable ingestion and query UX over scrapers that break silently.",
      ],
    },
    {
      slug: "mandarin-teacher",
      title: "duihua — Mandarin Speaking Coach",
      year: 2026,
      tools: "TypeScript, STT, LLM, TTS, React",
      bullets: [
        "Built a speaking-coach loop that chains speech-to-text, an LLM tutor, and text-to-speech for conversational practice.",
        "Shipped practice and feedback flows with honest in-progress roadmap items (tone scoring, image practice).",
        "Kept the product demoable via recorded conversation GIFs while features continue to land.",
      ],
    },
    {
      slug: "nomura-engineering",
      title: "Nomura — Platform & Batch Pipelines",
      year: 2026,
      tools: "Java, Spring Boot, React.js, Python, Liquibase, Jenkins, Docker, Ansible, Playwright",
      bullets: [
        "Integrated Spring Boot services with React for an enterprise real-estate platform across multi-tier systems.",
        "Containerized Python batch jobs with validation and retries, cutting runtime from 240 min to 58 min (76% faster).",
        "Automated Liquibase + Jenkins releases with Ansible and Playwright for consistent multi-environment deploys.",
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
    projectOrder: ["d2c-ecommerce", "etf-backtesting", "paybench"],
    experienceHighlights: ["nomura-batch", "atrium-chat", "atrium-auth"],
    whyThisVersion:
      "Same one-page Overleaf layout; projects lead with commerce, backtesting, and payment-agent reliability.",
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
    experienceHighlights: ["atrium-admin", "atrium-chat", "nomura-platform"],
    whyThisVersion:
      "Classic Overleaf project set (D2C, KYC, ETF) with full-stack skills emphasized first.",
  },
  {
    role: "ai-agents",
    slug: "ai-agents",
    title: "AI / Agent Engineer",
    headline: "Agent Engineer | Evals · Tool-Use Reliability · Multi-Agent Systems",
    summary:
      "Agent engineer who grades world state, not chat prose — benchmarks, multi-agent CLI routing, and failure taxonomies.",
    skillsOrder: [
      "Python",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    projectOrder: ["paybench", "incident-logger", "mandarin-teacher"],
    experienceHighlights: ["atrium-cli", "atrium-chat"],
    whyThisVersion:
      "One-page layout centered on PayBench, TraceIQ, and the speaking-coach loop.",
  },
  {
    role: "blockchain",
    slug: "blockchain",
    title: "Blockchain / Web3 Engineer",
    headline: "Blockchain Engineer | Solidity · zk-SNARKs · Privacy-Preserving Identity",
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
    experienceHighlights: ["atrium-auth"],
    whyThisVersion:
      "Leads with ZKP KYC, then commerce and payment-agent reliability — still one page.",
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
    experienceHighlights: ["nomura-batch", "atrium-chat"],
    whyThisVersion:
      "ETF backtester first, then PayBench and D2C payments — Overleaf one-pager.",
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
export function prioritizeSkills(all: readonly string[], preferred: readonly string[]) {
  const remaining = [...all];
  const head: string[] = [];
  for (const pref of preferred) {
    const idx = remaining.findIndex(
      (s) => s.toLowerCase() === pref.toLowerCase() || s.toLowerCase().includes(pref.toLowerCase()),
    );
    if (idx >= 0) head.push(remaining.splice(idx, 1)[0]!);
  }
  return [...head, ...remaining];
}
