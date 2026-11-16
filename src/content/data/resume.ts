import type { ResumeVariant, Role } from "./types";

export type { ResumeVariant, Role };

export const resume = {
  identity: {
    name: "Harshita Ranka",
    fullName: "Harshita Vivek Ranka",
    email: "harshitaranka2004@gmail.com",
    linkedin: "https://linkedin.com/in/harshita-vivek-ranka",
    github: "https://github.com/hvrdummy123",
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
      verificationUrl: "TODO_FROM_HARSHITA",
    },
    achievements: [
      "Winner, Code for Good — JPMorgan Chase",
      "Finalist, Flipkart Grid",
      "Finalist, IVP",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Microservices & Distributed Systems",
      "DBMS (NoSQL & Relational)",
      "Operating Systems",
      "Computer Networks",
      "AI / Machine Learning",
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
    cloud: ["GCP (private runtime, containerized deployments)", "AWS (EC2, S3, IAM)"],
  },
  experience: [
    {
      id: "atrium",
      title: "SDE",
      company: "Atrium",
      companyNote: "E-commerce startup, pre-launch",
      location: "Remote / India",
      start: "2026-08",
      end: "Present",
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
          text: "Built the authentication module on Better Auth for a template-driven marketplace platform (Shopify-style) with separate merchant and consumer auth planes and Postgres-backed sessions/accounts.",
        },
        {
          id: "atrium-chat",
          text: "Engineered a real-time chat pipeline: PostgreSQL transactional outbox, relay service, Centrifugo, Redis; designed and tested against 25 failure/edge-case scenarios so messages persist atomically before delivery and are not lost if relay or broker restarts; built the React + Vite chat UI.",
        },
        {
          id: "atrium-admin",
          text: "Helped build the internal admin dashboard in Next.js (App Router) + TypeScript, packaged as a standalone non-root container on a private GCP runtime; charts are hand-rolled SVG (no chart libraries); postgres for data access, jose for JWT verification.",
        },
        {
          id: "atrium-cli",
          text: "Built an AI chatroom CLI for multi-agent planning: one shared Markdown transcript across a human and two agents (Claude in plan mode, Codex in read-only sandbox), explicit @claude/@codex/@both routing, no agent-to-agent loops.",
        },
      ],
      aiDisclosure:
        "AI-assisted development listed on resume: Claude Code, Codex.",
    },
    {
      id: "nomura",
      title: "ITD Intern",
      company: "Nomura Services India Pvt. Ltd.",
      location: "India",
      start: "2026-01",
      end: "2026-06",
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
          text: "Integrated Spring Boot backend services with React interfaces for an enterprise real-estate platform.",
          projectSlug: "nomura-engineering",
        },
        {
          id: "nomura-batch",
          text: "Built Python batch pipelines with algorithmic validation and retry logic; containerized with Docker, cutting execution time from 240 min to 58 min (76% faster).",
          projectSlug: "nomura-engineering",
        },
        {
          id: "nomura-cicd",
          text: "Automated DB versioning/deployment via Liquibase + Jenkins CI/CD; containerized, tested release pipelines with Ansible + Playwright.",
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
      stack: ["Medusa.js", "Node.js", "React.js", "PostgreSQL", "REST APIs"],
      summary:
        "Headless platform with decoupled React storefront + Node backend; custom workflows/REST APIs; cart/checkout; multi-region shipping/fulfillment.",
    },
    {
      slug: "zkp-kyc",
      title: "Privacy-Preserving KYC Verification Platform",
      year: 2026,
      stack: [
        "React",
        "Node/Express",
        "Solidity",
        "Ethereum",
        "ZoKrates",
        "IPFS",
        "MetaMask",
        "Circom",
      ],
      summary:
        "Modular credential issuance / ZK proof generation / verification; selective attribute disclosure; proof generation under 2 seconds.",
    },
    {
      slug: "etf-backtesting",
      title: "ETF Backtesting Framework",
      year: 2025,
      stack: [
        "Python",
        "Node/Express",
        "React",
        "Redux",
        "REST",
        "MongoDB",
        "SQLite",
        "Jest",
        "Plotly",
      ],
      summary:
        "180,000+ historical NSE records; full strategy simulation under 3 s; REST APIs ~120 ms average; Plotly dashboards under 700 ms.",
    },
  ],
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
    projectOrder: [
      "nomura-engineering",
      "d2c-ecommerce",
      "etf-backtesting",
      "paybench",
    ],
    experienceHighlights: ["nomura-batch", "atrium-chat", "atrium-auth"],
    whyThisVersion:
      "Leads with Nomura pipeline reliability and Atrium experience bullets (on the résumé) plus commerce/backtesting projects.",
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
    projectOrder: [
      "d2c-ecommerce",
      "etf-backtesting",
      "nomura-engineering",
      "zkp-kyc",
    ],
    experienceHighlights: ["atrium-admin", "atrium-chat", "nomura-platform"],
    whyThisVersion:
      "Surfaces D2C + dashboards on the project list; Atrium admin/chat stay in résumé experience bullets only.",
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
      "Claude Code",
      "Codex",
      "PostgreSQL",
    ],
    projectOrder: [
      "paybench",
      "incident-logger",
      "job-finder",
      "mandarin-teacher",
    ],
    experienceHighlights: ["atrium-cli", "atrium-chat"],
    whyThisVersion:
      "Centers PayBench and open agent tools; Atrium multi-agent CLI stays on the résumé experience section only.",
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
    projectOrder: ["zkp-kyc", "d2c-ecommerce", "paybench", "nomura-engineering"],
    experienceHighlights: ["atrium-auth"],
    whyThisVersion:
      "Leads with the ZKP KYC platform (proofs under 2s); marketplace auth experience stays on the résumé.",
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
    projectOrder: [
      "etf-backtesting",
      "paybench",
      "d2c-ecommerce",
      "nomura-engineering",
    ],
    experienceHighlights: ["nomura-batch", "atrium-chat"],
    whyThisVersion:
      "Pairs the ETF backtester metrics with PayBench ledger/idempotency and Razorpay-oriented D2C payments design.",
  },
];

export function getResumeVariant(role: Role) {
  return resumeVariants.find((v) => v.role === role) ?? resumeVariants[0];
}
