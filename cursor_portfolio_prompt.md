# CURSOR MASTER PROMPT: Harshita Ranka's Portfolio ("pixel cat" edition)

You are a senior full-stack engineer and product designer. Build a complete, production-quality personal portfolio website for **Harshita Vivek Ranka**, a software engineer (class of 2026) targeting backend, full-stack, AI/agent engineering, blockchain and quant/fintech SWE roles.

The goal: a recruiter or hiring manager opens the site and within 30 seconds feels "this person is serious, shipped real systems, and is fun to work with." It must look **professional first, playful second**: pastel pixel-cat theme, tasteful motion, deep technical content underneath.

Read this entire document before writing code. Then follow the build plan in section 17.

---

## 0. INPUTS YOU HAVE (attached or linked in this workspace)

1. **Resume PDF** (`Harshita_Ranka_Resume2026.pdf`). Source of truth for experience, education, skills, achievements, and project claims.
2. **GitHub repos** (read each repo's README, docs folder, file tree, package/pyproject files, and any screenshots/GIFs before writing its page):
   - https://github.com/hvrdummy123/Agent-Pro-Paybench
   - https://github.com/hvrdummy123/ZKP-KYC-System-Blockchain
   - https://github.com/hvrdummy123/Mandarin-Teacher
   - https://github.com/hvrdummy123/Incident-Logger
   - https://github.com/hvrdummy123/Job-Finder
3. **D2C e-commerce design docs** (attached files): `system-design.md`, `mwm-system-design.md`, `D2C_Platform_SASDD.docx`, `Boba_Store_System_Design_Document.docx`, `D2C_Boba_E-Commerce_Architecture.pdf`, `D2C_Boba_system-design_md.pdf`, `D2C_mwm-system-design_md.pdf`. These power the flagship e-commerce case study (section 8). Some documents overlap or differ in version; prefer the newest/most detailed value and note the version in the data file.
4. **Reference site**: https://divagr.com (a researcher's portfolio). Section 2 explains exactly which of its ideas to borrow. Do not copy its code, text, or visual identity.

### Truthfulness rules (non-negotiable)
- Never invent metrics, employers, users, revenue, traffic, GitHub stars, or "production" claims. Every number on the site must come from the resume, a repo README/docs, or the attached design docs. If a number is not available, omit it or use a clearly marked `TODO_FROM_HARSHITA` field in the content file.
- Every project gets a **status badge** from this set: `Shipped`, `Built (working prototype)`, `Designed (architecture + spec)`, `In progress`. Default the D2C e-commerce platform to `Built` only for what the resume claims; mark the 10,000-DAU "Minimum Working Model" material as `Designed`. Make badges editable in one data file.
- The resume states CGPA as **3.95/4**; use that unless the data file says otherwise.
- AI-assisted development is disclosed honestly where the resume mentions it (Atrium role lists Claude Code, Codex).

---

## 1. FACT SHEET (from the resume, use verbatim where possible)

**Identity**: Harshita Ranka. B.Tech Computer Engineering, MPSTME, NMIMS Mumbai. Class of 2026. CGPA 3.95/4. Based in Mumbai, India.
**Links**: LinkedIn https://linkedin.com/in/harshita-vivek-ranka · GitHub https://github.com/hvrdummy123 · Email harshitaranka2004@gmail.com · Phone shown only on the downloadable resume, not in page text (anti-scrape).

### Experience
**SDE, Atrium (E-commerce startup, pre-launch), Aug 2026 - Present.**
Stack: TypeScript, React (Vite), Next.js, Node.js, PostgreSQL, Redis, Python, Centrifugo, Better Auth, Docker, GCP; AI-assisted dev (Claude Code, Codex).
- Built the authentication module on Better Auth for a template-driven marketplace platform (Shopify-style) with separate merchant and consumer auth planes and Postgres-backed sessions/accounts.
- Engineered a real-time chat pipeline: PostgreSQL transactional outbox, relay service, Centrifugo, Redis; designed and tested against 25 failure/edge-case scenarios so messages persist atomically before delivery and are not lost if relay or broker restarts; built the React + Vite chat UI.
- Helped build the internal admin dashboard in Next.js (App Router) + TypeScript, packaged as a standalone non-root container on a private GCP runtime; charts are hand-rolled SVG (no chart libraries); `postgres` for data access, `jose` for JWT verification.
- Built an AI chatroom CLI for multi-agent planning: one shared Markdown transcript across a human and two agents (Claude in plan mode, Codex in read-only sandbox), explicit @claude/@codex/@both routing, no agent-to-agent loops.

**ITD Intern, Nomura Services India Pvt. Ltd., Jan 2026 - Jun 2026.**
Stack: Java, Spring Boot, React.js, Python, Jenkins, Liquibase, Docker, Ansible, Playwright, Git.
- Integrated Spring Boot backend services with React interfaces for an enterprise real-estate platform.
- Built Python batch pipelines with algorithmic validation and retry logic; containerized with Docker, cutting execution time from 240 min to 58 min (76% faster).
- Automated DB versioning/deployment via Liquibase + Jenkins CI/CD; containerized, tested release pipelines with Ansible + Playwright.

### Resume projects
1. **D2C E-Commerce Platform (2026)**: Medusa.js, Node.js, React.js, PostgreSQL, REST APIs. Headless platform, decoupled React storefront + Node backend; custom workflows/REST APIs; cart/checkout (variants, pricing, validation, order state transitions); multi-region shipping/fulfillment; extensible for payments, auth, promotions, notifications.
2. **Privacy-Preserving KYC Verification Platform (2026)**: React, Node/Express, Solidity, Ethereum, ZoKrates, IPFS, MetaMask (and Circom circuits per resume text). Modular credential issuance / ZK proof generation / verification; Solidity contracts for issuance, revocation, zk-SNARK verification with on-chain auditability; selective attribute disclosure, proof generation under 2 seconds. (Repo: ZKP-KYC-System-Blockchain.)
3. **ETF Backtesting Framework (2025)**: Python, Node/Express, React, Redux, REST, MongoDB, SQLite, Jest, Plotly. 180,000+ historical NSE records; full strategy simulation under 3 s; REST APIs ~120 ms average; Plotly dashboards render under 700 ms; Jest tests. (No repo: build as a normal project page.)

### Skills
Programming: Java, Python, C++, JavaScript (ES6/ES7), TypeScript, SQL, HTML/CSS.
Frameworks/tech: Spring Boot, React.js, Git, Angular, Node.js, Redis, Better Auth, Express.js, Centrifugo, PostgreSQL, Solidity, MongoDB, Firebase, Jenkins, Docker, Ansible, Liquibase, Playwright.
Cloud: GCP (private runtime, containerized deployments); AWS Certified Cloud Practitioner (EC2, S3, IAM).
Coursework: DSA, Microservices & Distributed Systems, DBMS (NoSQL & Relational), Operating Systems, Computer Networks, AI/ML.
Achievements: Winner, Code for Good (JPMorgan Chase); Finalist, Flipkart Grid; Finalist, IVP.

### Known repo facts: Agent-Pro-Paybench (verified from its README)
- "A deterministic benchmark for LLM agents that operate a payments back office." Hook: *Can your agent move ₹8,000 when the API returns TIMEOUT after the money already moved, without double-paying?*
- Seeded payments simulator on a double-entry ledger with a virtual clock and scripted faults; **graders score final world state, not chat prose**.
- 50 tasks (25 core), 26 tools, 8 fault types (incl. `TIMEOUT_AFTER_COMMIT`), policy rules P1-P9 with machine checkers, baselines Oracle/Null/Random/Naive/MockLLM + optional Anthropic/OpenAI/Google providers.
- Metrics: pass@1 with seeded bootstrap 95% CI, pass^k, safety-violation rate, partial credit, steps, cost/success, failure taxonomy F1-F15.
- Validation: Oracle 100%; Naive fails adversarial/fault tasks; **grader mutation kill rate 100% (64/64)** across mutations (a)-(g).
- Determinism: same seed + actions give identical `state_hash`, traces, grades.
- Baseline leaderboard (core, 1 trial): Oracle pass@1 1.00 / safety 1.00; Naive 0.00 / 0.12; Null 0.00 / 1.00; Random 0.00 / 0.00.
- Ships a static site with `playground.html` (you are the agent), `compare.html` (Oracle vs Naive scrub), leaderboard, failure taxonomy, methodology, tasks catalog; docs: ARCHITECTURE, DESIGN, METHODOLOGY, DECISIONS, HUMAN_TEST, WRITEUP_DRAFT.
- Python 3.11+, Apache-2.0, GitHub Actions workflow present.

For ZKP-KYC-System-Blockchain, Mandarin-Teacher, Incident-Logger and Job-Finder: **read the repos yourself** and extract problem, stack, architecture, features, results, and screenshots. Do not guess.

---

## 2. WHAT TO BORROW FROM divagr.com (and how to adapt it)

I walked the reference site. These are the features that make it feel important; implement the equivalents:

| divagr.com feature | What it does | Your adaptation |
|---|---|---|
| Minimal top nav: My writing, Series, Attention Lab, Chipformer, My work, About, Résumé ↗, Contact ↗ | Every section one click away; Résumé and Contact are emphasized | Nav: Work, Flagship (E-commerce), Notes, Series, Labs, Experience, Resumes, Beyond Code, About, Contact. Resumes + Contact are pill buttons |
| Home: huge headline ("Thinking in *systems.*"), one-line role, then **Notebook** (featured essay + recent posts) and **My work** (3 projects with category tags) | Shows thinking AND building above the fold | Home hero + role-selector + Notebook + Featured projects + Beyond Code teaser |
| **Résumé link carries `?from=home/about/blog/series/contact/essay`** | Knows which page drove the resume click | Replicate `?from=` on every resume link and log it (privacy-friendly analytics event or console-only if no analytics) |
| Résumé is a dense one-page PDF headed by a role line ("Applied AI Engineer \| Production AI Systems \| Agents & Evals \| AI Infrastructure") | The headline is positioned for a role | **Multiple role-targeted resumes** (section 9), each with its own headline line |
| Blog with search, topic filters, format filter (Essay / Interactive lab), series filter, year, order, RSS, email subscribe | Content is browsable like a real publication | Notes page with the same filters, RSS, subscribe form (static mailto fallback if no backend) |
| Essays have: reading time, date, series badge ("Part 1 of 3"), table of contents, numbered footnotes with back-links, related posts, newer/older, share, **"Markdown version" link for agents/LLMs**, BibTeX/citation block, "Try it" code blocks | Feels rigorous and citable | Same: TOC, footnotes, series part badge, related, prev/next, `.md` endpoint per post, "Cite this" block on project pages |
| **Series** pages (connected essays, "Read in order") | Shows depth on one theme | Series: "Reliable Agents", "Zero-Knowledge for Humans", "Designing a D2C Platform" |
| **Attention Lab**: 8 interactive guides, filter by bottleneck and model family | Interactive explainers prove understanding | **Labs** page (section 10): interactive explainers of her own projects |
| **Chipformer**: a fully playable showpiece (Tetris inside a transformer) with stat tiles (Layers 18, Heads 42, Weights 139,229) | One memorable "wow" artifact | **Cat Arcade** showpiece (section 11) plus project stat tiles on every case study |
| About: a first-person narrative, "Topics I keep returning to", "Recent work", "Elsewhere" links, personal interests (movies, travel, photography) | Humanizes the engineer | About + dedicated **Beyond Code** page (crochet, puzzles, music) |
| Social/OG image per page, canonical URLs, rich meta descriptions, sitemap | Link previews look sharp | Generate OG images per page (pixel-cat template), full meta, JSON-LD `Person`, sitemap, RSS |
| Hidden agent/LLM affordances (markdown pages) | Machine readable | `/llms.txt` + `.md` versions of key pages |

Do **not** copy: his color palette, typography, copy, project content, or the "agent game" link.

---

## 3. THEME & VISUAL SYSTEM: "PASTEL PIXEL CAT"

### Personality
Warm, clever, calm, a little mischievous. Think "well-designed indie game meets clean engineering docs." The pixel cats are **characters and delight moments**, never clutter. Body content stays highly readable.

### Palette (CSS variables; define light + dark)
Light ("Day cat"):
- `--bg: #FFF8F0` (cream) · `--surface: #FFFFFF` · `--surface-2: #FFF0F5`
- `--blush: #FFD6E0` · `--lavender: #D9C8F5` · `--mint: #CDEFE0` · `--butter: #FFF1B8` · `--sky: #CFE6FF` · `--peach: #FFD9C0`
- `--ink: #3B3355` (text, deep plum) · `--ink-soft: #6B6285` · `--line: #E9DDF0`
- `--accent: #B8456F` (berry; links/buttons, must pass WCAG AA on cream) · `--accent-2: #6C5BD6` (grape)
Dark ("Night cat", `prefers-color-scheme: dark` + manual toggle): `--bg: #1E1A2E`, `--surface: #2A2540`, `--ink: #F4EEFF`, same pastels slightly desaturated, accents `#FF8FB5` / `#A99BFF`. Verify AA contrast for all text pairs.

Rule: pastels are for backgrounds, tags, cards, illustrations. Text uses `--ink`. Never pastel-on-pastel text.

### Typography
- Display / pixel accents: **Pixelify Sans** (or Silkscreen) for headings, tags, stat numbers, nav accents only.
- Body: **DM Sans** or **Inter** (readable, 16-18px, 1.65 line height).
- Code/mono: **JetBrains Mono**.
- Load via `next/font`, with fallbacks. Giant hero headline in the spirit of "Thinking in systems.": e.g. **"Building things that don't *break.*"** with a pixel-cat sitting on the italic word. Make the hero headline editable in the data file; offer 3 alternates in comments.

### Pixel cat system
Create a reusable `<PixelCat />` component driven by **sprite data (arrays of palette indexes) rendered to inline SVG or canvas**, with `image-rendering: pixelated`. No external image assets required. Provide at least these states and use them throughout:
- `idle` (tail flick, blink), `sit`, `sleep` (zzz pixels), `walk` (4-frame cycle), `run`, `jump`, `loaf`, `stretch`, `peek` (head peeking from screen edges), `typing` (paws on tiny laptop), `yarn` (batting a ball of yarn), `ukulele` (holding a tiny ukulele), `think` (? bubble), `celebrate` (confetti pixels), `error` (404 cat with unplugged cable).
- Palette variants: cream tabby, lavender, grey tuxedo, ginger. The **mascot** is configurable (name `Mochi` as default; stored in `site.config.ts`).
- Cats are 16x16 or 32x32 base grids scaled by integer factors.

### Motion (all respect `prefers-reduced-motion`: replace with static poses)
1. **Hero**: a cat walks across the hero baseline, hops onto the headline's last word, sits, and blinks. Subtle pixel-star parallax in the background (3 layers, very slow).
2. **Cursor companion**: a small cat that follows the cursor with easing and sleeps after 10 s idle (desktop only; toggle in a footer "Cat on/off" switch; off by default on mobile).
3. **Scroll**: cat "paw-prints" trail along the left gutter as you scroll long pages (pixel dots), section dividers made of repeating pixel paw/fish-bone patterns.
4. **Cards**: project cards lift with a pixel-shadow (hard offset 4px) and a tiny cat ear peeks over the top edge on hover.
5. **Page transitions**: quick pixel-dissolve (CSS clip/mask) or a cat running across the viewport (under 500 ms; skippable).
6. **Loading state**: a cat chasing a yarn ball.
7. **Easter eggs**: Konami code releases a parade of cats; clicking the mascot makes it meow (sound is OFF by default, user opt-in toggle); `console.log` ASCII cat + "hire me" message; 404 page with the unplugged cat; typing "meow" anywhere triggers a heart burst.
8. Keep animation budget small: use CSS steps() and `requestAnimationFrame` with pause when tab hidden. No heavy WebGL.

### Layout language
- Rounded rectangles with 2px ink borders and hard offset shadows (retro-UI sticker feel), generous whitespace, 12-col grid, max content width 1120px, long-form reading column 720px.
- Section headers: small pixel label (e.g. `NOTEBOOK`, `MY WORK`, `RESEARCH & TOOLS` style), then a big serif-or-sans title.
- Tags as pastel pill "stickers", color-coded by domain: backend=lavender, AI/agents=mint, blockchain=butter, frontend=sky, infra/devops=peach, fintech/quant=blush.

---

## 4. TECH STACK & ARCHITECTURE

- **Next.js (App Router) + TypeScript (strict) + Tailwind CSS**, static-first (`output: 'export'` where possible; ISR not required). Deploy to Vercel (also produce a `README` with steps for GitHub Pages/Cloudflare Pages).
- **Content as code**: MDX for notes/case studies, typed JSON/TS for structured data (`/content/projects/*.mdx` with frontmatter, `/content/data/*.ts`). Use `contentlayer`-style or `next-mdx-remote` with a Zod-validated schema; build fails on missing required fields.
- **Single source of truth for the resume**: `/content/data/resume.ts`. The web resume views, the role-specific resume variants, JSON-LD and the downloadable PDFs are all generated from it. Provide a script `pnpm resumes:build` that outputs a LaTeX `.tex` per role (concise, label-style bullets, tight spacing, ATS-friendly single column) and compiles to PDF when `tectonic`/`latexmk` is available; otherwise outputs `.tex` only and a printable HTML view.
- **GitHub integration at build time**: a script `pnpm gh:sync` fetches each repo's README, languages, last commit date, and stars (unauthenticated GitHub API, cached to `/content/generated/github.json`); the site renders a "Repo snapshot" card from this. If the API fails, fall back to the cached JSON; never break the build.
- **Diagrams**: hand-written inline SVG components styled in the pixel theme (no heavy chart libs), plus **Mermaid** where convenient. All diagrams must be keyboard-accessible with `<title>/<desc>`.
- **Animations**: CSS + small `requestAnimationFrame` engine; Framer Motion allowed for page/section reveals.
- **Search**: client-side Fuse.js (or Pagefind) over notes and projects, `/` or `Cmd+K` command palette (also navigates, toggles theme, downloads resume, toggles cat).
- **Quality gates**: ESLint + Prettier, Vitest for utilities, Playwright smoke tests (every route returns 200, nav works, resume downloads), Lighthouse CI targets: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100 on mobile.
- **Analytics**: optional Plausible/Umami snippet behind an env var; default off. Track custom events: `resume_download{role,from}`, `project_open`, `contact_click`.
- **Security/perf**: strict CSP-friendly output, no third-party trackers by default, images through `next/image` (or inlined SVG sprites), total JS under ~150 KB gzip on the home page.

---

## 5. INFORMATION ARCHITECTURE & ROUTES

```
/                     Home
/work                 All projects (filterable)
/work/[slug]          Project case study (template)
/work/d2c-ecommerce   FLAGSHIP deep dive (custom, section 8)
/experience           Timeline: Atrium, Nomura (+ achievements, education, certs)
/resumes              Resume hub (role-specific variants)
/resumes/[role]       Web view + download + "why this version" note
/notes                Notebook (essays, filterable, searchable)
/notes/[slug]         Note/essay
/series               Series index
/series/[slug]        Series page ("read in order")
/labs                 Interactive explainers
/labs/[slug]          Individual lab
/arcade               Cat Arcade showpiece
/beyond-code          Crochet, puzzles, music, crafts
/stack                Stack explorer (skills x projects matrix)
/about                About me
/contact              Contact
/rss.xml, /sitemap.xml, /llms.txt, /notes/[slug].md, /work/[slug].md
/404                  Unplugged cat
```
Global footer: LinkedIn, GitHub, Email, Résumé, RSS, "Cat on/off", "Sound on/off", theme toggle, "Built with Next.js · designed with cats".

---

## 6. HOME PAGE SPEC

1. **Hero**: pixel-cat scene (cat walking, then sitting on the last word). Name "Harshita Ranka". Role line: **"Software Engineer · Backend · Agents · Blockchain · Fintech"**. One-sentence value prop (editable). Two CTAs: `View work` and `Résumé ↗` (opens role picker popover, see below).
2. **Role selector ("I'm hiring for…")**: chips: Backend / Full-stack / AI & Agents / Blockchain / Quant & Fintech. Selecting one **re-orders the whole site** (featured projects, skills emphasis, which resume the CTA downloads) and persists in `localStorage`. This is the single most recruiter-friendly feature; make it excellent.
3. **30-second recruiter strip**: 5 stat tiles in pixel style: `CGPA 3.95/4`, `76% faster batch pipeline (Nomura)`, `25 failure scenarios tested (chat outbox)`, `100% grader mutation kill rate (PayBench)`, `Winner, JPMorgan Code for Good`. Tiles link to the evidence page.
4. **Notebook**: featured note + 3 recent (like divagr.com), with series badge and read time.
5. **My work**: 3-4 featured project cards with category tag, status badge, one-line outcome, stack chips, and "Explore ↗". Always include the flagship e-commerce card as a wide hero card.
6. **Experience snapshot**: two role cards (Atrium, Nomura) with 2 bullets each.
7. **Beyond code teaser**: small illustrated strip: cat with yarn (crochet), tiny ukulele cat, puzzle piece. Links to `/beyond-code`.
8. **Contact CTA**: "Let's build something reliable." Buttons: Email (copy-to-clipboard with toast), LinkedIn, GitHub.

---

## 7. PROJECT CASE-STUDY TEMPLATE (used for every project)

Every project page uses the same rich structure. Fields come from MDX frontmatter + body so adding a project is cheap.

**Header**: title, one-line pitch, status badge, year, role (solo / team), domain tags, stack chips, links (Repo, Live/Demo, Docs, Write-up) shown only when they exist. Stat tiles (3-5 numbers, sourced).

**Sections** (collapse/expand with a sticky TOC on desktop):
1. **TL;DR (30 s)**: three bullets: problem, what I built, result.
2. **The problem & why it matters**.
3. **What I built** (features, with screenshots/GIF slots).
4. **Architecture**: SVG diagram + 5-8 sentence walkthrough; data-flow notes.
5. **Tech stack & "why this, not that"**: table: Layer | Choice | Why | Alternative considered.
6. **Key decisions & trade-offs** (3-6 ADR-style cards: Context → Decision → Consequence).
7. **Hard problems & how I solved them** (failure modes, edge cases, debugging stories).
8. **Results & validation** (tests, benchmarks, metrics: only sourced numbers).
9. **Recruiter Q&A ("The questionnaire")**: 8-12 expandable questions every reviewer asks, answered in first person, e.g.: *Why did you build this? What was hardest? What would you change? How did you test it? How does it scale? What failed first? What did you use AI tools for? What did you learn? How would you productionize it? What are the security considerations?* Answers must be grounded in the repo/docs; where unknown, leave `TODO_FROM_HARSHITA` placeholders and list them in the final report.
10. **If I had another month**: roadmap.
11. **Repo snapshot** (for GitHub projects): languages bar, last commit, README highlights, `Cite this` block from `CITATION.cff` when present.
12. **Related notes** and **next project** navigation.

**Projects without a GitHub repo** (Atrium work, Nomura work, D2C e-commerce, ETF Backtesting, AI chatroom CLI, Atrium chat pipeline, admin dashboard) still get the full template, just without the Repo/Live buttons and with the status badge and a line "Source is private / proprietary" where appropriate. Include the stack chips and questionnaire regardless.

### Project inventory (create all of these)
**GitHub-backed (read repos, then write pages):**
1. **PayBench** (Agent-Pro-Paybench): see fact sheet. Include an **embedded interactive replica** of the ambiguous-timeout scenario (see Labs, section 10) and link to the repo's own playground/compare pages.
2. **Privacy-Preserving KYC (ZKP-KYC-System-Blockchain)**: explain issuance → proof → verification flow, selective disclosure (e.g. over-18 without revealing DOB), revocation, on-chain auditability, proof time under 2 s, tooling (Solidity, Ethereum, ZoKrates/Circom, IPFS, MetaMask). Read the repo to confirm which circuits/contracts exist and reconcile with the resume text.
3. **Mandarin-Teacher**: read the repo; likely a Mandarin speaking-practice tutor. Describe exactly what it does per the README.
4. **Incident-Logger**: read the repo; likely an incident-response/logging agent. Describe per README (system design, bring-your-own-logs, demo logs if present).
5. **Job-Finder**: read the repo; likely a job-scouring/aggregation tool. Describe per README.

**Resume/work projects without repos:**
6. **D2C E-Commerce Platform**: flagship, custom page (section 8).
7. **ETF Backtesting Framework (2025)**: **there is NO GitHub repo for this project.** Build the complete case-study page (full template, questionnaire, stack table, decisions, architecture, results) **using only the resume data**, and infer the rest sensibly from the stack. Facts available: Python, Node.js, Express.js, React.js, Redux, REST APIs, MongoDB, SQLite, Jest, Plotly; backtesting platform combining a React/Redux frontend, Express backend and Python engine over MongoDB and SQLite; strategies evaluated across 180,000+ historical NSE records; market-data pipeline normalizing OHLCV datasets; full strategy simulations in under 3 seconds; REST APIs at ~120 ms average latency; results surfaced through Plotly dashboards rendering in under 700 ms; Jest test coverage. Rules for this page:
   - No Repo/Live/GitHub buttons and no "Repo snapshot" card. Show the badge `Built` and a line "Source not public".
   - Create the missing material yourself, clearly and honestly: an architecture SVG (React/Redux → Express REST → Python engine → MongoDB/SQLite, with the OHLCV normalization pipeline), a data-flow diagram, an "explained simply" walkthrough of what a backtest does, and decision cards (e.g. why Python for the engine and Node for the API, why MongoDB plus SQLite, why Plotly).
   - Any visual of a dashboard or chart must be built by you in SVG/Plotly-style from **synthetic data** and labeled "Illustrative, synthetic data". Never present it as real NSE output, and do not invent strategy names, returns, Sharpe ratios or other results beyond the resume numbers.
   - Link it to the "Backtest toy" lab (section 10) as a hands-on companion.
   - Put any detail you had to assume in `CONTENT_TODO.md` as `TODO_FROM_HARSHITA`.
8. **Atrium: Auth module (Better Auth, merchant vs consumer planes)**.
9. **Atrium: Real-time chat with transactional outbox (Postgres outbox → relay → Centrifugo + Redis; 25 failure scenarios)**: this one deserves a strong architecture diagram and a sequence diagram of the crash-recovery scenarios.
10. **Atrium: Internal admin dashboard (Next.js App Router, hand-rolled SVG charts, non-root container, jose JWT)**.
11. **Atrium: Multi-agent AI chatroom CLI (shared Markdown transcript, @claude/@codex/@both routing, no agent-to-agent loops)**.
12. **Nomura: Python batch pipeline 240 → 58 min** and **Nomura: Liquibase + Jenkins + Ansible + Playwright release pipeline** (can be one "Nomura engineering" page with two case studies).
Where the resume mentions a project but a detail is missing, add the section anyway with TODO placeholders rather than inventing.

### Resume coverage checklist (every item must exist; fail the build if one is missing)
Every project and role on the resume must have its own page and appear on `/work`, `/experience`, `/stack` and in the resume variants:
- [ ] D2C E-Commerce Platform (flagship page, section 8)
- [ ] Privacy-Preserving KYC Verification Platform (GitHub: ZKP-KYC-System-Blockchain)
- [ ] ETF Backtesting Framework (no repo; built from resume data, see item 7)
- [ ] Atrium work: auth module, chat outbox pipeline, admin dashboard, multi-agent chatroom CLI
- [ ] Nomura work: Spring Boot + React platform integration, Python batch pipeline (240 → 58 min), Liquibase/Jenkins/Ansible/Playwright release pipeline
- [ ] Plus the extra repos: PayBench, Mandarin-Teacher, Incident-Logger, Job-Finder
Add a dev-only script `pnpm coverage:check` that compares the resume data file against the project list and prints anything missing.

### Repo media: use the demo images, GIFs and videos already in the repos
Most of the GitHub projects ship demo screenshots, GIFs and videos in their folders (for example PayBench has `docs/assets/demo.gif`, `playground.png`, `compare.png`, `compare_timeout.png`, `leaderboard.png`, `failures.png`, `methodology.png`, `tasks.png` and `architecture.svg`). **Use them on the portfolio.** Procedure for every GitHub-backed project:
1. **Discover**: walk the whole repo tree (not only the README) and list every media file: `.png .jpg .jpeg .webp .gif .svg .mp4 .webm .mov`, in folders such as `docs/`, `docs/assets/`, `assets/`, `media/`, `images/`, `screenshots/`, `demo/`, `site/`, `public/`, `results/`, and any media linked from the README or docs.
2. **Import at build time**: extend `pnpm gh:sync` to download these files into `/public/media/<project-slug>/` (preserve names) and write `/content/generated/media.json` (path, type, width/height, size, caption guess from file name and README alt text, source URL). Use the raw GitHub URLs; if a download fails, fall back to the cached copy and never break the build. Keep the original licensing in mind: show a small "Media from the project repo" credit line with the repo link.
3. **Optimize**: convert large GIFs to looping muted `.webm`/`.mp4` (keep the GIF as fallback), generate WebP/AVIF for large PNGs, generate poster frames for videos, set width/height to avoid layout shift, lazy-load below the fold, and cap each page's media payload (target under ~3 MB above the fold). Never hotlink GitHub at runtime.
4. **Present**: 
   - Hero or "See it in action" strip on each project page using the best demo GIF/video (autoplay muted loop, with a play/pause control and `prefers-reduced-motion` showing the poster instead).
   - A captioned **gallery with lightbox** (keyboard navigable, swipeable on mobile) for screenshots; videos open in an accessible player with captions slot and poster.
   - Place each image next to the section it illustrates (e.g. architecture SVG in "Architecture", leaderboard/failures in "Results", playground/compare in "What I built").
   - SVG diagrams from repos (like `architecture.svg`) are rendered inline or via `<img>` with the pixel-theme frame, and are also downloadable.
   - Project cards on `/work` and the home page use a media thumbnail (first demo frame) inside a pixel-framed window with the cat-ear hover peek.
5. **Accessibility & honesty**: every image gets meaningful alt text derived from its caption; every video gets a transcript or text description line; do not crop out or edit away watermarks or UI that shows it is a screenshot; label anything not from the repo as "illustrative".
6. If a repo has little or no media, generate a clean architecture SVG and screenshots-in-the-making placeholders (clearly marked `TODO_FROM_HARSHITA: add demo`), rather than leaving an empty section.
7. Record in `CONTENT_TODO.md` which media each project has and which are missing.

---

## 8. FLAGSHIP: D2C E-COMMERCE PLATFORM (EXTREMELY DETAILED PAGE)

Route: `/work/d2c-ecommerce`. This is the most detailed page on the site. It should read like a staff-level design review turned into an interactive microsite. Use the attached documents as the sole source for facts; reconcile differences between documents and note the document version used.

**Page identity**: "Indian D2C Beverage Platform: Medusa v2 · Supabase · Next.js". Status badges: `Built` (storefront/backend per resume claims) and `Designed` (Minimum Working Model at 10,000 DAU). Hero pixel-cat scene: a cat carrying a tiny boba cup with a delivery box.

### 8.1 Section list (sticky left TOC, scrollspy, "reading progress" paw-prints)
1. **Overview & principles**: phone-first (Indian users are mobile-centric), WhatsApp for all post-purchase comms, Medusa v2 for commerce primitives, custom modules for the rest, "never reinvent what Medusa already does well". Modular monolith.
2. **Interactive system architecture diagram**: pixel-styled SVG: Browser/Mobile → Cloudflare (CDN, WAF, SSL, DNS) → Vercel (Next.js storefront) and Railway (Medusa v2, 2 instances in the MWM design) → Supabase PostgreSQL (+ PgBouncer pooler) → external SaaS (Razorpay, Shiprocket, Resend, Interakt, MSG91). Hover/tap a node to see its role, why chosen, cost, and failure behavior. Toggle **"Launch (0-100 orders/mo)" ↔ "MWM (10,000 DAU)" ↔ "Growth/Scale"** to animate the topology changes.
3. **Tech stack table** with "Why": Medusa v2, Supabase PostgreSQL, Next.js 14 (App Router, SSR/ISR), Railway, Vercel, Cloudflare, Razorpay, Shiprocket, Resend, Interakt, MSG91/2Factor, Supabase Storage/Cloudflare R2, Meilisearch (future).
4. **Key decisions table** (Decision | Choice | Alternative | Reason): phone+password auth first, OTP in Phase 2 to avoid SMS cost before product-market fit; Razorpay over PayU/CCAvenue; COD supported (large share of Indian D2C orders); Shiprocket over Shiping/ClickPost; Interakt over WATI/AiSensy; Resend over SendGrid/Postmark; no search at launch (Meilisearch when catalog > 50 products); no Redis at launch; no Kubernetes; no WebSockets/Firebase/FCM at MWM (WhatsApp is the push channel; PWA handles web push if needed); no mobile app (PWA).
5. **Phase-by-phase walkthrough (accordion, 14 phases)**, each with: goal, Medusa-native vs custom, tables touched, diagram/flow, API routes:
   - Phase 1 Authentication: custom `phonepass` auth provider on Medusa's auth module; flows for registration (validate +91 format → unique check → bcrypt → create customer → JWT), login, forgot-password OTP (MSG91, 10-min validity, invalidated after use; max 3 attempts then 15-min lockout); JWT config (access 15 min, refresh 30 days, HttpOnly cookie, HS256); `custom_otp` table.
   - Phase 2 Profile & addresses (India address form incl. landmark, state dropdown, 6-digit pincode).
   - Phase 3 Catalog (product, variant, option, category, collection, tag; metadata JSON for ingredients/nutrition/shelf life/allergens; images in Supabase Storage/R2 via Cloudflare CDN).
   - Phase 4 Product detail page data requirements.
   - Phase 5 Cart (guest vs logged-in merge, 30-day idle expiry, stock reserved at checkout not add-to-cart).
   - Phase 6 Wishlist as a custom Medusa module (`custom_wishlist`, `custom_wishlist_item`, routes GET /store/wishlist, POST /store/wishlist/items, DELETE /store/wishlist/items/:id).
   - Phase 7 Checkout flow (address → Shiprocket rates → coupon → summary → payment).
   - Phase 8 Razorpay: custom payment provider implementing `AbstractPaymentProvider`; webhook with HMAC SHA256 verification; **COD provider** with pending → captured on delivery.
   - Phase 9 Orders (status flow pending → processing → shipped → delivered; cancelled; return_requested → returned → refunded).
   - Phase 10 Shiprocket fulfillment provider (`AbstractFulfillmentProvider`), AWB, webhooks, `custom_shipment` table.
   - Phase 11 Notifications (Resend email, Interakt WhatsApp templates, MSG91 OTP-only SMS; subscribers on Medusa events; `custom_notification_log`).
   - Phase 12 Promotions (Medusa promotion module capabilities).
   - Phase 13 Returns & refunds (reverse pickup, Razorpay refund, inventory restore, notifications).
   - Phase 14 Admin panel (Medusa admin + custom widgets: shipment overview, notification logs, COD reconciliation, analytics dashboard).
6. **Animated payment sequence diagram**: frontend → Medusa (create PaymentSession) → Razorpay (create order) → Razorpay Checkout → user pays → webhook `payment.captured` → HMAC verify → complete cart → create Order → decrement inventory → notifications → Shiprocket shipment. Play/pause/step controls, plus a toggle for the **COD path** and the **refund path**. A "what if the webhook never arrives?" callout only if the docs cover it; otherwise omit.
7. **Data model explorer**: searchable table of Medusa-owned tables vs the **custom tables** (`custom_otp`, `custom_wishlist`, `custom_wishlist_item`, `custom_shipment`, `custom_notification_log`) with ownership badges ("Medusa manages / I build"). Render a simplified ER diagram (SVG) for customer → cart → order → payment → fulfillment → return.
8. **Endpoint coverage chart**: from the docs: **61 native Medusa v2 endpoints, 7 partial extensions, 22 custom builds** (donut + legend). Confirm numbers against the attached docs before publishing; if a document disagrees, show the newest and footnote the discrepancy.
9. **Customer flows & admin flows gallery**: the docs reference 35 customer flows and 10 admin sections. Render as a filterable card grid (Auth, Browse, Cart, Checkout, Orders, Returns, Account) and an admin tab (Products, Orders, Customers, Inventory, Promotions, Shipping, Returns, Notification logs, Admin users/RBAC, Dashboard). Include the screen map (Home, PLP, PDP, Login, Register, Forgot Password, MyAccount, Edit Profile, Addresses, Wishlist, Cart, Checkout steps 1-3, Order Confirmation, My Orders, Order Detail, Return Request) as a clickable wireframe flow (pixel wireframes, not full UI).
10. **Notifications matrix**: event × channel (Email/WhatsApp/SMS) table + the 6 WhatsApp templates and their variables; note Meta template approval takes 24-48 h.
11. **Minimum Working Model at 10,000 DAU**: capacity math shown step by step (10,000 DAU; peak hour ≈ 20% = 2,000 concurrent; ~20 requests/session; ≈ 11 RPS sustained, spikes to 30-50 RPS; one 2 vCPU/2 GB Medusa instance handles ~50-100 RPS; two instances for zero-downtime deploys and fault tolerance); infra specification (Railway replicas: 2, Supabase Pro, PgBouncer transaction mode, 60 max connections from Medusa = 30 per instance, Cloudflare cache for static assets and cacheable API responses).
12. **Interactive cost calculator**: slider for orders/month and DAU tiers using the docs' cost tables (Launch ₹2,000-6,500/mo; Growth ₹8,000-15,000/mo; MWM ≈ ₹11,000-16,000/mo excluding Razorpay GMV fees; Scale ₹20,000-40,000/mo) with the Razorpay 2% example (500 orders × ₹300 = ₹1,50,000 GMV → ₹3,000 fees). Show line items per service. Clearly label as **estimates from the design doc**.
13. **Security checklist** (HTTPS via Cloudflare, HttpOnly JWT cookies, bcrypt, webhook HMAC verification, Cloudflare rate limits e.g. 100 req/min/IP on auth endpoints, admin on `/app` with optional IP allowlist, secrets in env management, ORM-parameterized queries, CORS limited to the storefront domain, OTP brute-force lockout) as a checklist with cat "approved" stamps.
14. **"What is deliberately NOT running at MWM, and why"**: Redis, queues, Firebase/FCM, Meilisearch, Kubernetes, separate worker, WebSocket server, mobile app. Show the trigger points for adding each.
15. **Development sequence & milestones**: M1-M6 (Core Commerce → Transactional → Payments → Fulfillment → Post-Purchase → Production) and the 15-step build order with test method per step, rendered as a "quest log" with pixel checkboxes. Mark each step's real status from a data file (`done / in-progress / planned`) that Harshita edits; default everything to the resume-supported state and `planned` otherwise.
16. **Folder structure** (`src/api`, `modules`, `workflows`, `subscribers`, `jobs`, `lib`) as an expandable tree.
17. **Diagram download**: export of the architecture SVG/PNG.
18. **Recruiter Q&A** (12+ questions): why Medusa v2 instead of Shopify or a from-scratch build; why phone+password; COD reconciliation; how idempotency/webhook replay is handled; why no Redis/queue yet and when to add them; how you'd shard/scale; testing strategy; what's built vs designed; biggest risk; how the design would change for another country.
19. **Downloads**: link the design docs (PDF/MD) as "Read the full design docs" only if Harshita confirms publishing them; make this a boolean in the data file, default `false`.

All numbers on this page must trace to the attached docs. Add a hidden dev-only `?audit=1` mode that shows a source tag (doc name + section) next to each figure so the author can verify.

---

## 9. RESUME HUB: DIFFERENT RESUMES FOR DIFFERENT ROLES

Route `/resumes`. A card grid, one card per role variant, each with: role title, a one-line positioning headline (like divagr.com's "Applied AI Engineer | Production AI Systems | …"), top 3 highlights, `Preview` and `Download PDF` buttons, last-updated date, and the "why this version" explanation. Ask once, remember the choice.

**Variants (generate all from `resume.ts`, only re-ordering/re-weighting real content; never adding fake experience):**
1. **Backend / Software Engineer**: headline "Backend SWE | Distributed Systems | Reliable Data Pipelines". Lead with Nomura (Spring Boot, batch pipelines 240→58 min, Liquibase/Jenkins/Ansible), Atrium chat outbox (25 failure scenarios), auth module, D2C e-commerce, ETF backtesting.
2. **Full-stack Engineer**: "Full-Stack SWE | React · Next.js · Node · PostgreSQL". Lead with Atrium admin dashboard, chat UI, D2C platform, ETF dashboards (Plotly <700 ms), Spring Boot + React integration.
3. **AI / Agent Engineer**: "Agent Engineer | Evals · Tool-Use Reliability · Multi-Agent Systems". Lead with PayBench, multi-agent chatroom CLI, Incident-Logger, Job-Finder, Mandarin-Teacher; AI-assisted development fluency (Claude Code, Codex).
4. **Blockchain / Web3 Engineer**: "Blockchain Engineer | Solidity · zk-SNARKs · Privacy-Preserving Identity". Lead with ZKP KYC platform, Solidity contracts, proof generation <2 s; supporting backend experience.
5. **Quant / Fintech Software Engineer**: "Fintech & Quant SWE | Backtesting · Payments · Data Pipelines". Lead with ETF backtesting (180,000+ records, <3 s), PayBench (ledger, idempotency), Razorpay payments design, Nomura pipelines; include finance/credit coursework only if present in the data file.

Each web view mirrors the PDF: header, role headline, summary (2 lines, tailored), skills ordered per role, experience, projects (3-4, tailored order), education, achievements. A **diff toggle** ("what changed vs the general resume") highlights tailored parts, a feature recruiters rarely see and that shows thoughtfulness. Add "Copy plain-text version" (ATS-friendly) and a QR code to the page. `?from=` param is captured for every download (section 2).

Print stylesheet: any resume view prints cleanly to one page.

---

## 10. NOTES, SERIES & LABS

### Notes (Notebook)
A real publication-style section (see section 2 for features). Seed with **draft** notes written from the actual repos/docs (mark `draft: true` until Harshita approves; drafts hidden in production):
1. *"Did the payment go through? Designing a benchmark where agents can double-pay"* (PayBench: ambiguous timeouts, idempotency keys, grading world state over prose).
2. *"Grading the graders: mutation testing a benchmark's scorers (64/64)"*.
3. *"A transactional outbox for real-time chat, tested against 25 failure scenarios"* (Atrium; no proprietary details beyond the resume).
4. *"Zero-knowledge KYC: proving you're over 18 without showing your birthday"*.
5. *"Designing an Indian D2C platform on Medusa v2: phone-first auth, COD, WhatsApp"*.
6. *"From 240 to 58 minutes: containerizing a batch pipeline"* (only claims in the resume).
Each note: TOC, footnotes, reading time, series badge, related posts, "Markdown version" link, newer/older nav.

### Series
- **Reliable Agents** (PayBench, Incident-Logger, multi-agent chatroom)
- **Zero-Knowledge for Humans** (KYC, plus the zk learning-lab)
- **Designing a D2C Platform** (e-commerce phases)

### Labs (interactive explainers, each client-side and standalone)
1. **"You are the agent" (PayBench timeout lab)**: a simplified in-browser ledger simulation. The user tries to send ₹8,000; the call returns TIMEOUT_AFTER_COMMIT; choose retry without key (duplicate payout, red) vs verify + idempotent retry (safe, green). Side-by-side Oracle vs Naive scrubber. Model the logic on the repo's playground but implement natively in the site.
2. **Zero-knowledge, explained with cats**: step-through: issuer signs a credential → prover creates a proof of "age ≥ 18" → verifier checks on-chain; animated; includes a toy "Where's the cat?" cave analogy for ZK.
3. **Outbox playground (Atrium-style)**: the user kills the relay/broker mid-flight and watches messages recover; shows why atomic persistence before delivery matters.
4. **D2C order-lifecycle simulator**: click through order states and watch which notifications/webhooks fire.
5. **Backtest toy**: tiny moving-average crossover on bundled synthetic data with a Plotly-like SVG chart (clearly labeled synthetic; not the NSE dataset).
Labs page has "filter by topic" chips like divagr.com's "filter by bottleneck".

---

## 11. CAT ARCADE (THE SHOWPIECE)

`/arcade`: one memorable, polished mini-game in the spirit of divagr.com's playable Chipformer, rendered on canvas in the theme: **"Yarn Runner"**, an endless runner where a pixel cat jumps over bugs (🐛 sprites labeled `NullPointer`, `Race Condition`, `Timeout`) and collects yarn balls and "green checkmarks". Controls: space/tap to jump, down to duck. Score + local high score (localStorage), pause, reduced-motion friendly slow mode, mobile tap controls, 60 fps. Unlock a new cat color at score milestones. Include stat tiles beside it (e.g. "Sprites: 12 · Frames: 4/cat · Engine: ~300 lines, no libs"). Keep it under 60 KB.

---

## 12. EXPERIENCE, STACK EXPLORER, ABOUT

- **/experience**: vertical timeline (Atrium, Nomura) with expandable bullets, tech chips, and links from each bullet to the relevant case-study page. Below: Education (MPSTME NMIMS, B.Tech Computer Engineering, 3.95/4, 2026), Certification (AWS Certified Cloud Practitioner with a verification slot), Achievements (Winner JPMorgan Code for Good; Finalist Flipkart Grid; Finalist IVP) as pixel "trophy" cards, and Coursework chips.
- **/stack**: a **skills × projects matrix**: rows = technologies, columns = projects; filled cells where used, with hover details. Group by Languages, Backend, Frontend, Data, Blockchain, Infra/DevOps, AI/Agents, Testing. A skill's "evidence count" (number of projects) replaces self-rated percentages (more credible). Filter by role selector.
- **/about**: first-person story (3-4 short paragraphs, warm and specific: how I think about reliability, failure modes, shipping), "Topics I keep returning to" chips (Reliable systems, Agent evals, Idempotency & failure handling, Zero-knowledge, Payments & fintech, D2C commerce, Developer tooling), "Recent work" list, "Elsewhere" links (LinkedIn, GitHub, Email). Include a photo slot (`/public/me.jpg` optional; if absent show the mascot).

---

## 13. BEYOND CODE ("what else I enjoy")

Route `/beyond-code`. Cozy, playful, but still tidy. Sections (each with an illustration slot, a short first-person blurb with `TODO_FROM_HARSHITA` for specifics, and one small interactive piece):
1. **Crocheting**: pixel crochet-pattern generator: a grid where clicking cells paints a "stitch chart" (like a pixel-art crochet pattern), palette from the site; export as PNG. Blurb about pattern-reading and counting stitches. Gallery slot for photos of finished pieces.
2. **Puzzle solving**: a daily mini logic puzzle (e.g. a small Sudoku-like or grid deduction puzzle generated deterministically from the date). Blurb on enjoying constraint problems.
3. **Mathematics puzzles**: a rotating "puzzle of the week" card with hint/reveal-answer interaction (ship 6-8 classic puzzles in a data file, e.g. river-crossing, handshake problem, Monty Hall with a simulator).
4. **Crafts**: photo masonry grid slots + tags.
5. **Singing & ukulele**: a tiny **playable ukulele** (4 strings, Web Audio, tap to strum, a few chord buttons: C, G, Am, F); sound only after a user gesture; cat-with-ukulele sprite reacts to strums. Optional audio embed slots for Harshita's own recordings (do not autoplay).
Keep the section list editable as data so interests can change; the page also appears as a compact strip on the home page.

---

## 14. CONTACT

- Email (copy button + `mailto:`), LinkedIn, GitHub, resume by role.
- Optional contact form that posts to a serverless endpoint behind an env flag (honeypot + rate limit); default to `mailto`.
- Copy: "Open to backend, full-stack, agent-engineering, blockchain and quant-fintech SWE roles. Say hi."
- Availability line editable in the data file.

---

## 15. RECRUITER-FOCUSED FEATURES (INCLUDE ALL)

1. Role selector that re-sorts the entire site (section 6).
2. 30-second summary strip and "TL;DR" on every project.
3. Resume hub with role variants, diff toggle, `?from=` tracking, print-ready CSS.
4. Evidence-backed stats only; each stat links to its proof.
5. Honest status badges (Shipped / Built / Designed / In progress).
6. Command palette (`/`, `Cmd+K`).
7. Reading-time estimates, TOC, scrollspy on long pages.
8. Dark mode and reduced-motion support.
9. SEO: per-page meta, OG images (pixel-cat template, 1200×630), JSON-LD `Person` and `CreativeWork`, canonical URLs, sitemap, RSS.
10. `/llms.txt` and `.md` page variants for AI/agent readers.
11. Accessible: semantic landmarks, skip link, focus rings, alt text, keyboard-operable diagrams, 4.5:1 contrast.
12. Fast: static export, lazy-loaded labs/arcade, no layout shift.
13. Copy-to-clipboard email, "Download vCard" button.
14. A tidy `/colophon` section in the footer: tools used (including AI-assisted development, stated plainly).

---

## 16. DATA MODEL (create these TypeScript types and seed files)

```ts
type Status = 'shipped' | 'built' | 'designed' | 'in-progress';
type Role = 'backend' | 'fullstack' | 'ai-agents' | 'blockchain' | 'quant-fintech';

interface Project {
  slug: string; title: string; pitch: string; year: number;
  status: Status; kind: 'github' | 'work' | 'personal';
  roles: Role[];                 // used by the role selector + resume variants
  weight: Record<Role, number>;  // ordering per role
  stack: { name: string; layer: string; why?: string; alternative?: string }[];
  stats: { label: string; value: string; source: string }[];
  links: { repo?: string; live?: string; docs?: string; writeup?: string };
  qa: { q: string; a: string }[];              // recruiter questionnaire
  decisions: { context: string; decision: string; consequence: string }[];
  roadmap: string[];
}
interface ResumeVariant { role: Role; headline: string; summary: string;
  skillsOrder: string[]; projectOrder: string[]; experienceHighlights: string[] }
interface Note { slug: string; title: string; series?: string; part?: number;
  topics: string[]; format: 'essay' | 'lab'; date: string; readingMinutes: number; draft: boolean }
```
Validate with Zod. A `pnpm content:check` script lists every `TODO_FROM_HARSHITA` placeholder and every claim lacking a `source`.

---

## 17. BUILD PLAN (follow in order; commit after each phase)

1. **Scaffold**: Next.js + TS + Tailwind + MDX, theme tokens (light/dark), fonts, layout shell, nav/footer, command palette, `site.config.ts` (name, links, mascot name, feature flags).
2. **PixelCat engine**: sprite data, renderer, all poses, cursor companion, reduced-motion handling, storybook-like `/dev/cats` page (hidden in production).
3. **Data & content pipeline**: types, Zod schemas, seed `resume.ts`, `projects/*.mdx`, `gh:sync` script, role selector state.
4. **Core pages**: Home, About, Experience, Contact, 404.
5. **Projects**: work index with filters, case-study template, then all 12 projects (read repos first, import and wire up their demo media as described in section 7, write with sources). Build the ETF Backtesting Framework page from resume data only.
6. **Flagship e-commerce page** (section 8) with all interactive components.
7. **Resumes**: hub, role variants, LaTeX/PDF build script, diff toggle, print CSS, `?from=` tracking.
8. **Notes/Series/RSS/search**; seed drafts.
9. **Labs** (5 interactives) and **Arcade**.
10. **Beyond Code** page and widgets.
11. **SEO/OG/JSON-LD/sitemap/llms.txt**, analytics flag, security headers.
12. **QA**: Playwright smoke tests, Lighthouse CI, axe accessibility pass, keyboard pass, mobile pass at 360 px, reduced-motion pass, dark-mode pass, broken-link check, bundle-size check.
13. **Docs**: `README.md` for the portfolio repo must include, in addition to run/build/deploy and how to add a project/note/resume variant or edit status badges:
    - **Project coverage**: a table of every resume project and role, its page route, source (GitHub repo or "resume data only"), and status badge. State plainly that the **ETF Backtesting Framework has no repo** and its page is built from resume data with synthetic illustrative visuals.
    - **Media pipeline**: how repo demo images/GIFs/videos are discovered, downloaded, optimized and displayed (`pnpm gh:sync`, `/public/media/<slug>/`, `media.json`), how to add or override media by hand, size budgets, and the credit/attribution line.
    - **Truthfulness policy**: every stat has a `source`; placeholders use `TODO_FROM_HARSHITA`; `pnpm content:check` and `pnpm coverage:check` must pass before deploy.
    - **Resume variants**: how the five role resumes are generated and how to add another.
    - **Accessibility and motion**: reduced-motion behavior, cat/sound toggles, keyboard support.
    - **Credits**: reference inspiration (divagr.com as a structural reference only), fonts, and a note that AI-assisted tools were used to build the site.
    - A "Known gaps" section copied from `CONTENT_TODO.md`.
    and `CONTENT_TODO.md` listing every placeholder that needs Harshita's input (photos, repo details you couldn't verify, certificate link, confirmation to publish design docs).

### Definition of done
- All routes in section 5 exist and render with real content.
- No invented numbers; every stat has a `source`.
- Five GitHub projects are written from their actual READMEs/docs, and **every demo image, GIF, video and diagram found in those repos is imported and displayed** (hero demo, gallery with lightbox, section illustrations, card thumbnails).
- Every resume project exists, including the ETF Backtesting Framework built from resume data only (no repo links, synthetic visuals labeled illustrative); `pnpm coverage:check` passes.
- The README contains the coverage table, media pipeline and truthfulness policy described in step 13.
- Seven non-repo projects have complete case-study pages with questionnaires.
- The e-commerce page contains all 19 subsections from section 8.
- Five resume variants are generated from one source and print to one page.
- Lighthouse ≥ 95 (Perf/BP), 100 (A11y/SEO) on mobile; no console errors; works with JavaScript-heavy features disabled for core reading (progressive enhancement).
- Everything respects `prefers-reduced-motion` and can be fully used by keyboard.

### Output expectations
Work in small commits, explain what you built after each phase, and at the end print: (a) the route list, (b) a list of every `TODO_FROM_HARSHITA`, (c) any discrepancy you found between the resume, repos and design docs, (d) how to deploy. Ask me only when something blocks you; otherwise make a sensible, honest default and record it in `CONTENT_TODO.md`.
