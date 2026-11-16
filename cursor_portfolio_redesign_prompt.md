# CURSOR PROMPT: REDESIGN + UPGRADE THE EXISTING PORTFOLIO

**Site under work:** https://portfolio-psi-lovat-90.vercel.app/ (Next.js, TypeScript, Tailwind, pixel-cat sprite engine, content in data files).
**Owner:** Harshita Ranka, software engineer, class of 2026. LinkedIn https://linkedin.com/in/harshita-vivek-ranka · GitHub https://github.com/hvrdummy123 · harshitaranka2004@gmail.com

## 0. THE BRIEF IN ONE PARAGRAPH

The first build has the right *content skeleton* but it does not look good, it is not very interactive, and it leaks half-finished internal text to visitors. This is a **redesign and upgrade pass, not a rewrite**: keep the routes, the content/data model and the facts, but replace the look and feel, make the experience genuinely playable ("let them try stuff"), fix everything listed in section 2, and deliver a site where a recruiter thinks "this is polished, memorable, and this person ships real systems." **Visual quality is priority #1.** The theme stays: **pastel pixel cats, fun but professional, with elements of who Harshita is** (crochet, puzzles, math puzzles, crafts, singing, ukulele, boba, payments/reliability nerd).

Do the work in the phases at the end of this document. Work visually: after each phase run the app and **screenshot every page at 360, 768, 1280 and 1920 px, light and dark**, look at them, and fix what looks off before moving on. Do not declare a phase done on the basis of code alone.

### Honesty rules (carry over, non-negotiable)
- No invented metrics, employers, users, stars or "production" claims. Numbers come from the resume, the repo READMEs, or the D2C design docs.
- Keep the status badges honest (Shipped / Built / Designed / In progress).
- Anything the owner still has to supply (photo, personal blurbs, recordings) must be **handled gracefully on-page** (section 2.1) and tracked in `content/PENDING.md`, never shown as a TODO to visitors.

---

## 1. WHAT I FOUND (audit of the live site, page by page)

I read the markup/text of every page. (I cannot judge pixels from text, so treat the visual notes below as strong inferences and verify them with your own screenshots.)

| Page | Problems |
|---|---|
| **Global** | Nav has 9 plain text links (Work, Flagship, Design notes, Labs, Experience, Résumé, Beyond code, About, Contact) with no hierarchy and no primary CTA. Footer is a thin text row. Theme toggle is a bare "Dark" word. Same `og:title`, `og:description` and a wrong `og:url` (`harshitaranka.dev`) on every page, `twitter:card=summary`, no per-page social image. No sense of place or personality beyond one sprite here and there. |
| **Home** | Text-only hero: a headline, a paragraph, three buttons and role chips. No hero visual, no scene, no cat in motion in the first screen. Project cards are text blocks with long "problem" sentences, no thumbnails or demos. "A few numbers" shows source tags like "(resume · Nomura)" inline, which reads like footnotes. Experience and notes sections are plain lists. Nothing to play with above the fold. |
| **Work index** | Eight text cards, each a long sentence plus a stack line; no media, no filters, no role-sorting despite the role selector existing on home. Mixed badges ("Built", "Shipped", "In progress") with no visual system. |
| **Project pages** | Thin template: Problem / Solution / Why it helps / Samples / Stack / one Trade-off. The promised sections (architecture walkthrough, decisions, hard problems, recruiter Q&A, roadmap, repo snapshot) are missing on most projects. "Samples" images are captioned with raw file names (`architecture.svg`, `compare_timeout.png`, `01-conversation.gif`) and appear as a plain stack. No hero demo, no lightbox, no device/browser framing. |
| **Flagship D2C page** | Content is strong but **leaks internal text**: "…appears in the portfolio brief but **was not found** in the attached design docs", "(not '35 flows' — that count is only in the portfolio brief)", "Step statuses live in data … TODO_FROM_HARSHITA", "Design doc downloads are gated (`publishDesignDocs: false`)", "Audit mode off", "TODO_FROM_HARSHITA: ops detail". Two badges "BuiltDesigned" run together. The 🐱 emoji is used as bullets in the security list. Milestones render as 6 empty checkboxes with no meaning. The endpoint section is a dead end. |
| **Labs index** | Five cards of one sentence each, "Filter by poking the topic chips on each card" (meta-instruction text), no previews, no difficulty/time labels. |
| **Lab: You are the agent** | Just Alice ₹10000, Bob ₹0, Payouts 0, and one "Send ₹8,000" button. No story, no choices, no consequences visualised, no Oracle vs Naive comparison. It does not teach or delight. |
| **Lab: Zero-knowledge with cats** | A 4-step text stepper with one sprite. No animation of credential → proof → verification, no "Where's the cat?" interaction. |
| **Other labs** | Outbox, D2C lifecycle, backtest toy all linked from the index; make sure each is a real interactive (section 6). |
| **Notes** | Six notes advertised at 5-10 minutes but the sample I read is ~5 short paragraphs (~150 words). It also contains builder-speak: "told only with resume-safe claims". Reading time is misleading. No diagrams, no table of contents, no code or tables. |
| **Experience** | Accurate but a plain list; bullets are pasted resume lines; "AI-assisted development listed on resume: Claude Code, Codex." reads like a compliance note. No timeline graphic, no tech-chip colour system, no links from each bullet to its detailed page (only Nomura has them). |
| **Resumes hub** | Cards show raw project slugs as bullets (`nomura-engineering`, `d2c-ecommerce`, `etf-backtesting`) and explanatory text like "Atrium admin/chat stay in résumé experience bullets only." The "Download" button just links to the same preview page `#download`. No thumbnail of the actual résumé. |
| **Résumé variant** | A web version exists with a "What changed vs general" toggle (good idea) but it is a long text document with no PDF, no page preview, no visual identity. |
| **Beyond code** | Every personal blurb is literally "TODO_FROM_HARSHITA: …". Gallery slots say "Slot 1 / Slot 2 / Slot 3". The puzzle and handshake widgets are bare. This is the page that should show the fun side and it currently shows placeholders. |
| **About** | "Photo placeholder — Mochi", "Photo slot: drop /public/me.jpg when ready (TODO_FROM_HARSHITA)". Copy is competent but flat. Colophon mentions "layout ideas only" from another site, which does not belong in a recruiter-facing page. |
| **Contact** | Fine functionally (copy email, vCard) but visually a small block; no availability signal, no calendar link, no "what I'm looking for" panel. |
| **Not reachable** | `/arcade`, `/stack`, and `/series/*` hubs are not linked from the nav or home; if they exist they are invisible. |

**Root causes:** (1) copy that was written *for the builder* ended up on-page; (2) every page uses the same flat "heading + paragraph + list" pattern, so nothing has visual rhythm or a focal point; (3) the pixel-cat theme is a small sprite in a corner instead of the design language itself; (4) labs and widgets are minimal stubs.

---

## 2. MUST-FIX BEFORE ANY DESIGN WORK (a half-day of cleanup)

### 2.1 Purge builder-speak and placeholders from production
Add a build-time check `pnpm lint:copy` that **fails the build** if any rendered page contains: `TODO`, `TODO_FROM_HARSHITA`, `placeholder`, `Photo slot`, `Slot 1`, `portfolio brief`, `resume-safe`, `attached design docs`, `Audit mode`, `publishDesignDocs`, `Step statuses live in data`, `Modeled on`, `not a wholesale copy`, `listed on resume`, `Filter by poking`, `layout ideas only`, `from the resume` (as visible prose). Then rewrite each offender:

- D2C page, endpoints section: delete the "was not found / brief" paragraphs. Show only what is documented (custom routes, webhooks, native routes) as a clean table.
- D2C page, flows: show "18 screens, ~10 admin sections" as plain facts. No mention of the brief.
- D2C page, milestones: replace the six empty checkboxes with a **quest-log timeline** (M1 Core Commerce … M6 Production), each with a one-line outcome and a state pill (`Built` / `Designed`). Only mark states the resume supports; otherwise show `Designed`.
- Remove "Audit mode" UI from production (keep behind `?audit=1`, undocumented).
- Remove the design-docs "gated" message entirely when `publishDesignDocs` is false.
- About: if there is no photo yet, show the **Mochi portrait card** as an intentional design element ("Hi, I'm Harshita" next to a framed pixel scene), not a "photo placeholder".
- Beyond code: ship **real draft copy** (see 5.11) written in first person from the facts the owner gave: crocheting, puzzle solving, mathematics puzzles, crafts, singing, playing the ukulele. Keep it light and non-specific; do not invent anecdotes, brands, awards or dates. Any slot still needing a photo or recording renders as a **designed empty state** ("Photos coming soon" with a cat peeking), never "Slot 1".
- Source tags like "(resume · Nomura)" move into a tooltip/popover on the stat; visible text is just the number and label.

### 2.2 Fix metadata
- `metadataBase` and `og:url` must be the real deployed domain (env var `NEXT_PUBLIC_SITE_URL`), canonical per page.
- Per-page `title`, `description`, `og:title`, `og:description`; `twitter:card=summary_large_image`.
- Generate a **per-page OG image** with `next/og` using the pixel-cat template (pastel background, Mochi sprite, page title, role line) at 1200×630.
- Add JSON-LD `Person`, `ProfilePage`, and `CreativeWork` for projects; `sitemap.xml`, `robots.txt`, `rss.xml`, `llms.txt`.

### 2.3 Fix content hygiene
- Replace raw slugs and file names with human text everywhere (resume hub bullets, media captions). Media captions are **written** captions, e.g. "PayBench playground: the ambiguous timeout", stored in `media.json`.
- Use one badge system: a single status pill per project (`Shipped`, `Built`, `Designed`, `In progress`), with a separate small pill for domain. For the flagship use `Built` plus a clearly labelled sub-badge "10k DAU design: Designed" in a separate row.
- Replace emoji bullets with the pixel icon set (section 4.4).

---

## 3. DESIGN NORTH STAR

> **"A cozy pixel-game UI wrapped around a serious engineering portfolio."**
> Think indie-game menus (soft pastels, chunky borders, sticker shadows, tiny animated characters) combined with the clarity of a great docs site. Fun is carried by *scenes, characters, motion and interactivity*. Professionalism is carried by *typography, spacing, hierarchy, real content and fast, accessible pages*.

Three rules:
1. **Every page has one focal visual and one clear action.** No page is "heading, paragraph, list".
2. **Pixel art is the system, not decoration**: window chrome, buttons, tags, dividers, cursors, loaders, icons and illustrations all share one pixel language.
3. **Everything that can be tried, can be tried.** If a project says "idempotency", there is a toy that lets you break it.

### 3.1 Visual language (tokens)
Keep the pastel palette but raise contrast and structure:

```
--cream:#FFF8F0  --paper:#FFFFFF  --blush:#FFD6E0  --lavender:#D9C8F5
--mint:#CDEFE0   --butter:#FFF1B8 --sky:#CFE6FF    --peach:#FFD9C0
--ink:#2F2748 (text)  --ink-soft:#5E5578  --line:#2F2748 (2px borders)
--berry:#B8456F (primary action)  --grape:#6C5BD6 (secondary)  --leaf:#3F9B7A (success)  --tomato:#D6534B (error)
Night: bg #1B1730, surface #272142, ink #F6F0FF, pastels desaturated 15%, berry→#FF8FB5, grape→#A99BFF
```
- **Borders:** 2px solid ink on all interactive/surface elements. **Shadows:** hard offset `4px 4px 0 ink` (no blur). Pressed state moves the element 2px and halves the shadow.
- **Radius:** 10-14px on cards, 8px on buttons, full on tags. Use a **pixel-corner** option (stepped corners via CSS `clip-path` or a 9-slice SVG) for window frames.
- **Layout:** 12-col grid, 1200px max, 8px spacing scale (4/8/12/16/24/32/48/72/112), generous vertical rhythm; long reading column 720px.
- **Backgrounds:** subtle pixel-dot grid (`radial-gradient` 1px dots on 16px spacing) and slow parallax pixel clouds/stars; sections alternate cream / blush / mint / lavender bands separated by pixel-cloud or paw-print dividers.
- **Typography:** Pixelify Sans for display, tags, numbers, nav and button labels only; **DM Sans** for body (17-18px, 1.65); JetBrains Mono for code. Type scale: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 72. Hero headline 56-80px with tight leading; one word highlighted with a marker-style pastel underline.
- **Component: "Window".** Cards are retro windows: title bar with three tiny dots, a title label (e.g. `paybench.exe`, `d2c-platform.app`), body, optional status bar at the bottom with stack chips. Use it for projects, labs, resume variants, notes. This single component makes the whole site feel designed.
- **Buttons:** primary (berry), secondary (cream), ghost; pixel arrow hover micro-animation; focus ring 3px grape.
- **Tags/chips:** colour-coded sticker pills (backend=lavender, AI/agents=mint, blockchain=butter, frontend=sky, infra=peach, fintech=blush).

### 3.2 Characters and art
Mochi (the cat) is the mascot with a small family for variety (cream tabby, lavender, grey tuxedo, ginger). Poses needed: idle, sit, sleep, walk, run, jump, loaf, stretch, peek, typing, yarn, ukulele, think, celebrate, error/unplugged, carrying-boba, holding-puzzle-piece, holding-crochet-hook, reading-resume.

**How to make the art (pick A, fall back to B):**
- **A. Code-drawn pixel art** (preferred, zero licensing): define sprites and scenes as palette-index grids, render as inline SVG `<rect>`s with `shape-rendering="crispEdges"` or to `<canvas>` with `image-rendering: pixelated`. Build scenes at 160×90 or 240×135 and scale by integers.
- **B. CC0 packs** (Kenney.nl, itch.io CC0 sections): only if licence allows; add credits in the colophon.

---

## 4. GLOBAL SYSTEMS TO BUILD

### 4.1 Navigation
- **Desktop:** slim sticky top bar in a pixel-window style: logo (Mochi head + "Harshita"), 5 primary links (Work, Labs, Notes, Experience, About), and on the right three controls: **Résumé** (secondary button with role dropdown), **Hire me** (primary, opens contact sheet), theme toggle (sun/moon cat). "Beyond code" and "Flagship" move into a "More" menu and into the home page.
- **Mobile:** bottom **tab bar** (Home, Work, Labs, Résumé, Menu) with icons from the pixel icon set; 44px targets; safe-area padding.
- **Scroll progress** as a pixel bar with a tiny cat running along it.
- **Command palette** (`/` or `Cmd+K`): navigate, search projects/notes, switch role, toggle theme, download résumé, play arcade, "show me the payment lab".

### 4.2 Role selector (make it the site's superpower)
Chips: Backend · Full-stack · AI & Agents · Blockchain · Quant & Fintech.
- Persist choice; **actually transform the site**: reorder project cards, swap hero subtitle, swap featured lab, highlight matching skills in `/stack`, change the résumé CTA to that role's PDF, tint the accent chip.
- Shareable URLs: `/for/backend`, `/for/ai`, `/for/blockchain`, `/for/quant`, `/for/fullstack`. Each is a tailored landing page (own hero line, top 3 projects, matching résumé, matching lab) that Harshita can paste into applications. Add `?ref=company` support to show a small greeting ("Hi Nomura team") without storing anything.

### 4.3 Motion and delight (all respect `prefers-reduced-motion`)
- Page transitions: quick pixel-dissolve (≤400 ms).
- Scroll reveals: cards "pop in" with a 2-frame step animation.
- Cursor companion cat (desktop, toggle in footer; naps after 10 s idle).
- Hover: cards lift with hard shadow, ears peek over the title bar; buttons squash.
- Section dividers: running cat, paw prints, pixel clouds.
- Loading: cat chasing yarn.
- Easter eggs: Konami code cat parade, typing "meow", clicking Mochi purrs (sound off by default), `console.log` cat with a "hire me" line.
- Day/night: theme toggle plays a 1 s sunrise/moonrise in the hero scene.
- Sound: global **off by default**, single toggle in footer; tiny 8-bit blips for clicks in labs/arcade only.

### 4.4 Pixel icon set
Create 24 icons (16×16 grid, rendered crisp): home, folder, flask (labs), pen (notes), briefcase, document, yarn, puzzle, guitar/ukulele, mail, link, github, linkedin, download, check, x, warning, play, pause, reset, search, sun, moon, paw. Use everywhere, including checklists (replace the 🐱 emoji bullets).

---

## 5. PAGE-BY-PAGE REDESIGN SPEC

### 5.1 HOME (`/`): "Harshita's desk"
**Hero (first screen, no scrolling needed):**
- Left: eyebrow "Harshita Ranka · Software Engineer · Class of 2026", headline (pick one, keep editable): **"I build software that keeps working when things go wrong."** with "keeps working" highlighted. One-line subhead naming backends, agents, commerce, payments. Two buttons: `See my work` (primary) and `Résumé ↓` (role dropdown). Under them the **role chips** and a small availability pill ("Open to roles · Mumbai · Class of 2026").
- Right: **an interactive pixel scene, a cozy desk/room** (about 480×360 on desktop), every object is a hotspot with a hover label and a link:
  - Laptop with a payment dashboard blinking → `/work`
  - Boba cup + delivery box → D2C flagship
  - Ukulele leaning on the wall → Beyond code (click plays a chord)
  - Yarn basket + crochet hook (Mochi bats the yarn ball) → Beyond code, crochet
  - Rubik-style puzzle cube / puzzle pieces → puzzles section
  - Window with day/night sky (follows theme) 
  - Tiny blockchain/zk "lock" sticker on the monitor → zk lab
  - Clipboard "résumé" on the desk → résumé hub
  - Mailbox/envelope → contact
  - Mochi: sleeps on a cushion; wakes and walks to whatever you hover; click for a stretch/meow.
  - On mobile, the scene becomes a horizontally swipeable 3-panel strip or a simplified single-frame scene with the same hotspots as tappable chips beneath it.
  The scene must not hide the text content: all links are also present as normal HTML links (accessibility and SEO).
- **Stat strip** (pixel "HUD"): `CGPA 3.95/4` · `240 → 58 min batch pipeline (−76%)` · `25 failure scenarios tested` · `64/64 scorer mutations killed` · `Winner, JPMorgan Code for Good`. Numbers count up once on view; each has a tooltip with the source and a link.

**Below the fold:**
1. **"Try something" strip** (3 big window cards with live mini-previews): *Break the payment* (PayBench lab), *Zero-knowledge with cats*, *Kill the relay* (outbox lab). Each card contains a miniature working toy (a single button + visible result) so people interact without leaving the page.
2. **Featured work** as a bento grid: one large flagship tile (D2C platform with an animated architecture teaser), two medium tiles (PayBench with its demo GIF as video; ZKP KYC), several small tiles. Tiles show a **media thumbnail or looping demo**, one-line outcome, stack chips, status pill. Sorted by the selected role.
3. **Experience timeline**: two milestones (Atrium, Nomura) on a pixel path with a cat walking between them; expandable.
4. **Notebook**: featured note with cover art + 2 recent.
5. **"A few things I love outside code"**: horizontally scrolling stickers (yarn, ukulele, puzzle, crafts) linking to Beyond code.
6. **Contact band**: full-width lavender band, "Let's build something reliable." Buttons: copy email, LinkedIn, GitHub, résumé by role.

### 5.2 WORK INDEX (`/work`)
- Top: title, short intro, **filter bar**: role chips (same as global), domain chips, stack search, status filter. Layout toggle: Grid / List / Timeline.
- Cards use the Window component with thumbnail/video, one-line outcome (not the full "problem" paragraph), 3 stat chips, stack chips, and a "Try it" badge when a lab or demo exists.
- Group: Flagship, Agents & reliability, Fintech & blockchain, Work experience, Personal tools.
- Empty states and result counts; animate re-ordering when filters change.

### 5.3 PROJECT PAGE TEMPLATE (apply to all 8+ projects)
Order and design:
1. **Hero:** window frame containing the best demo (video/GIF/image carousel), title, one-line pitch, status pill, role, year, links (Repo, Live, Docs, Design note) as buttons.
2. **Stat tiles** (3-5) in HUD style.
3. **TL;DR** in 3 bullet cards (Problem / What I built / Result).
4. **Architecture**: a *hand-drawn pixel SVG diagram* (not a screenshot) with hover tooltips; below it a short walkthrough.
5. **Interactive "Try it"** block when applicable (embed the matching lab).
6. **How it works / key features** as an alternating image + text list using repo media.
7. **Stack: "why this, not that"** as a table with colour-coded chips.
8. **Decisions & trade-offs** as ADR cards (Context → Decision → Consequence).
9. **Hard problems** (2-4 short stories).
10. **Results & validation**, sourced numbers only.
11. **Recruiter Q&A** accordion (8-12 questions in first person, answered from the repo/docs; no placeholders on-page).
12. **Gallery** in device/browser frames with lightbox, written captions, video poster frames, keyboard navigation.
13. **Repo snapshot** (languages bar, last commit, README highlights) for GitHub projects.
14. **If I had another month** roadmap and **next project** navigation.
Sticky mini-TOC on desktop with scrollspy and a progress paw-trail.

**Per-project must-haves (using what is already known):**
- **PayBench:** Oracle vs Naive side-by-side, failure taxonomy F1-F15, mutation table (a)-(g) as an animated "kill" chart, leaderboard table, embedded timeout lab.
- **ZKP KYC:** animated issuance → proof → verification flow, contract list, what the verifier learns vs what stays private (two-column "reveal / hide" toggle).
- **Mandarin coach (duihua):** show the three GIFs in a phone/browser frame, explain STT → LLM → TTS loop, honest "in progress" roadmap (tone scoring, image practice).
- **TraceIQ / Incident Logger:** log-to-hypothesis demo, decoy-deploy explanation, RLS/DuckDB/Parquet notes (from the repo).
- **Personal Job Radar:** pipeline diagram (ATS adapters → normalize → Postgres → search UI), refresh timing if documented.
- **ETF Backtesting:** synthetic-data chart widget clearly labelled "illustrative", pipeline diagram, simulation <3 s stat.
- **Nomura:** before/after bar (240 → 58 min) animation, pipeline diagram, release flow (Liquibase → Jenkins → Ansible → Playwright).
- **Atrium (auth, chat outbox, admin dashboard, multi-agent CLI):** separate sub-pages or sections; chat outbox gets its own diagram and the lab.

### 5.4 FLAGSHIP D2C PAGE (`/work/d2c-ecommerce`)
Keep all the existing content blocks but redesign as a **microsite with a story arc**:
- **Hero scene:** Mochi with boba and a delivery box walking along a conveyor; big title; badge row (`Built` + separate "10k DAU design: Designed").
- **Left sticky TOC** with scrollspy, grouped in 4 acts: *Why* (Overview, Principles, Decisions), *How it works* (Architecture, Phases, Payments, Data model), *At scale* (MWM capacity, Cost, Security, Not at MWM), *Proof* (Milestones, Q&A).
- **Architecture:** large pannable/zoomable SVG with the Launch / MWM / Scale toggle animating nodes in and out; hover cards per node (role, why, cost, failure behaviour); a minimap.
- **Phases:** 14 phase cards in a horizontal "level map" (like a game world map) that expands to a detail panel; each shows Medusa-native vs custom chips.
- **Payments:** animated sequence diagram with Play/Step/Reset, tabs for Online, COD, Refund; packets (coins) travel between actors; failure injection buttons ("webhook delayed", "invalid signature") that show what the system does (only where the docs support the behaviour; otherwise omit).
- **Data model:** real ER diagram (pan/zoom) with custom tables highlighted; click a table for fields.
- **Phone mock** that shows the WhatsApp notification sequence as chat bubbles when you advance the order state (see lab 6.4).
- **Cost calculator:** sliders for orders/month and AOV, stacked bar by service, tier labels, Razorpay fee shown separately; "copy scenario link".
- **Security checklist:** pixel shield icons, animated stamps on scroll.
- **"Deliberately not running":** card flip: front "Redis", back "Add when…".
- **Milestones:** quest log (section 2.1).
- **Q&A:** accordion, no placeholders (answer only what the docs support; otherwise skip the question).
- Remove all builder-speak (section 2.1).

### 5.5 LABS (`/labs`)
Index as a **game-select screen**: 5-7 big cartridge-style cards, each with a live thumbnail animation, difficulty/time ("2 min · Beginner"), topic chips, and "Play". Add a progress tracker ("3/6 completed") stored in localStorage with a cat reward.

### 5.6 NOTES (`/notes`, `/series`)
- Notes index: featured note with cover art, filter chips (topic, series, format), search, reading-time that is **computed from the actual word count**.
- **Rewrite each note to real depth** (800-1,500 words): problem, constraints, options with a comparison table, decision, failure modes, what I'd change, diagram, and a closing "try it" link to the matching lab. No builder-speak. Keep all claims within the resume/README/docs.
- Note page: TOC, footnotes, code blocks, callouts, series banner "Part 1 of 3", related notes, prev/next, share, "Markdown version" link.
- Series hub pages with cover art and a read-in-order list.

### 5.7 EXPERIENCE (`/experience`)
- Vertical **pixel-path timeline**: Atrium (Aug 2026 – present), Nomura (Jan – Jun 2026), then Education, Certification, Achievements as milestone nodes; Mochi walks along it on scroll.
- Each role is a Window with tech-chip colours and **expandable bullets**; every bullet links to its detailed project page (auth module, chat outbox, admin dashboard, multi-agent CLI, Nomura pipeline).
- Achievements as trophy cards; AWS certification as a badge card with a verification link slot (hidden until a URL exists).
- Remove the "listed on resume" sentence; instead show small chips "Built with AI-assisted tooling (Claude Code, Codex)" once, in the Atrium window, phrased as a fact not a disclaimer.

### 5.8 RÉSUMÉS (`/resumes`, `/resumes/[role]`)
- **Hub:** five role cards, each showing a **rendered thumbnail of the actual PDF's first page**, role headline, 3 highlight chips with human project names (never slugs), and buttons `Preview` and `Download PDF` (the latter downloads a real file).
- **Variant page:** split view: left = sticky PDF viewer (or high-res image), right = "Why this version" panel (what moved up, which skills are emphasised) and the **diff toggle** (colour-highlight changes). Buttons: Download PDF, Copy plain text (ATS-friendly), Print, Share link. Keep `?from=` capture.
- Generate PDFs in CI from `resume.ts` (LaTeX or HTML-to-PDF); commit them to `/public/resumes/`.
- Add a **"Match a job description"** tool here (see 6.7).

### 5.9 CONTACT (`/contact`)
- Left: heading, short pitch, availability pill, preferred roles as chips, location (Mumbai, India), response-time line. Right: a **"letter" card** with a mailto subject generator (choose role → prefilled subject/body), copy email, LinkedIn, GitHub, vCard, résumé by role, and a QR code to the site.
- Mochi at a mailbox with a small delivery animation after copying the email.
- If a calendar link is provided later, show a "Book 20 min" button (config flag).

### 5.10 ABOUT (`/about`)
- Two-column: left, a framed pixel portrait scene (Mochi at a desk) that swaps to the owner's photo if `/public/me.jpg` exists; right, a warm, specific first-person story in 3 short paragraphs (how I think about reliability; what I've shipped; what I'm looking for).
- "How I work" cards: *Failure modes first*, *Tests that try to break it*, *Ship small, explain clearly*, *AI as an accelerator, not a substitute* (phrased positively).
- "Topics I keep returning to" as interactive chips that filter a list of related projects/notes below.
- Mini timeline of "currently": building the portfolio, studying/benchmarking agents, learning ukulele songs (only if the owner confirms specifics; otherwise keep generic).
- Colophon moves to the footer's small "Built with" modal; drop the sentence about another site's inspiration.

### 5.11 BEYOND CODE (`/beyond-code`): make this the fun page
One long, delightful, scroll-through "room tour" with five stations; each station is a Window with an illustration, a first-person blurb, and a toy.
- **Draft copy to ship now (editable in `content/beyond.ts`; no invented facts):**
  - *Crocheting:* "Crochet is my screen-free puzzle: read a pattern, count stitches, watch a flat string turn into something you can hold. I like that every mistake shows up a few rows later." 
  - *Puzzle solving:* "I like problems with rules and a satisfying click. Constraint puzzles and logic grids are my reset button."
  - *Mathematics puzzles:* "Handshake problems, river crossings, Monty Hall: small statements that hide surprising reasoning. I keep a rotating puzzle of the week below."
  - *Crafts:* "Paper, thread and glue are how I think with my hands. Photos will live here." (Shows designed empty state until photos exist.)
  - *Singing & ukulele:* "I sing, and I'm learning to play the ukulele. Strum the one below."
- **Toys:**
  1. **Crochet chart painter:** 24×24 grid, pastel palette, click/drag to paint stitches, row counter with a cat that "counts" aloud, undo, preset patterns (heart, cat, flower), export PNG and copy share link (encode grid in URL hash).
  2. **Daily logic puzzle:** deterministic from the date (e.g. 4×4 logic grid or number-deduction), hint button, win animation with confetti pixels, streak saved in localStorage.
  3. **Math puzzle of the week:** 8 classics in data; hint → reveal; Monty Hall **simulator** (run 1,000 trials, show win rate with/without switching) and a handshake calculator.
  4. **Craft gallery:** masonry grid with lightbox; until photos exist show 3 illustrated pixel crafts (not "Slot n").
  5. **Playable ukulele:** four strings, tap/click to strum (Web Audio, tuned G-C-E-A), chord buttons (C, G, Am, F) that animate finger dots; Mochi with the ukulele bounces on beat; optional metronome; keyboard keys 1-4 play strings. Sound starts only after the first click.
- Compact version of this strip appears on the home page.

### 5.12 404 and misc
Unplugged-cat 404 with search box and links; "offline" page via service worker (nice-to-have); `/colophon` modal in footer.

---

## 6. INTERACTIVE LABS: FULL SPECS (let people try stuff)

Each lab: a clear **goal line**, a 30-second "how to play", visible state, immediate feedback, a "what you just learned" card, a link to the project page, and a share/screenshot button. All client-side, deterministic, accessible (keyboard, aria-live announcements).

### 6.1 "You are the agent" (PayBench timeout lab)
Story: "A customer asks you to send ₹8,000 to Bob. The payments API times out. Did the money move?"
- Panels: Customer chat (left), **Ledger** (Alice ₹10,000 / Bob ₹0 / double-entry rows), **API log** (request/response with idempotency key field), **Policy checklist** (P1-P9 style rules turning green/red).
- Actions: `Transfer ₹8,000` → returns **TIMEOUT_AFTER_COMMIT** (state shows money already moved, but the UI says "unknown" until you check). Choices: `Retry without key` (duplicate payout, red alarm, ledger shows ₹16,000 out, cat panics), `Verify first` (lookup transfer), `Retry with same idempotency key` (safe replay), `Tell customer it failed` (policy violation), `Escalate`.
- Score card: PASS/FAIL per rule, "final world state" diff, and the **Oracle vs Naive replay** (animated step-by-step).
- Difficulty modes: Easy (hints), Real (no hints), Chaos (random faults: duplicate webhook, stale read, rate limit).
- Teaches: why graders check final state, not chat.

### 6.2 Zero-knowledge with cats
- Scene: three cats: **Issuer (Notary cat)**, **Prover (user cat)**, **Verifier (bouncer cat)** with a nightclub door.
- Interactive: the user types a birth year, issuer "signs" it (shows a credential card), prover generates a "proof" animation that reveals only `age ≥ 18 = true`, verifier checks it; toggle "Show what the verifier sees" (proof only) vs "Traditional KYC" (full document leaked).
- Second tab: **"Where's the cat?" cave** analogy, a mini game: pick a tunnel; the prover always exits from the one you call, proving they know the secret door; repeat rounds raise confidence (1/2^n counter).
- Link to the repo's contracts/circuits. **Stretch:** if the repo contains compiled circuits (`.wasm`, `.zkey`, `verification_key.json`) and sizes are small, run a real Groth16 proof in the browser with snarkjs and show real timing; otherwise keep the honest simulation labelled "Illustrative simulation".

### 6.3 Outbox playground (Atrium-style chat)
- Visual pipeline: `Client → API → [Postgres: messages + outbox] → Relay → Broker (Centrifugo) → Subscribers`.
- Controls: send message; **Kill relay**, **Kill broker**, **Restart**, **Duplicate delivery**, **Slow network**.
- Show messages as pixel envelopes moving through; the outbox table fills; on restart the relay replays undelivered rows; a counter proves *persisted-before-delivered* and *no loss*. Include a "Naive mode" (no outbox) that loses messages when you kill the broker, so the difference is obvious.
- A "25 scenarios" checklist showing which failure cases pass (derive the list from the resume claim; label as "scenario categories", do not invent exact test names).

### 6.4 D2C order lifecycle simulator
- Left: **phone mockup** with a WhatsApp-style conversation; centre: order state machine (pending → processing → shipped → delivered; cancel/return paths); right: **event log** of webhooks and notifications (Razorpay `payment.captured`, Shiprocket status, Resend email, Interakt WhatsApp).
- Click the next state (or "Customer pays by COD / UPI") and watch bubbles, emails and inventory change; toggle COD vs online; "Request return" runs the return/refund path.
- Uses the six template names and event matrix from the design docs.

### 6.5 Backtest toy
- Synthetic price series (seeded), **moving-average crossover** with sliders for fast/slow windows, fee, and starting capital; SVG chart with buy/sell markers; equity curve vs buy-and-hold; table of trades; "run time" readout; "Reseed" button.
- Prominent label: "Synthetic data, illustrative only. The real framework used 180,000+ NSE records."

### 6.6 Cat Arcade (`/arcade`, linked from the nav "More" menu and the footer)
"Yarn Runner": endless runner; cat jumps over `NullPointer`, `Race Condition`, `Timeout`; collects yarn and ✔ icons; score, best score (localStorage), pause, mobile tap/swipe, slow mode, cat skins unlocked by score. Under 60 KB, 60 fps, canvas.

### 6.7 "Match a job description" (recruiter tool, client-side only)
On `/resumes` and `/for/*`: paste a JD, the tool extracts keywords (simple TF-IDF/keyword lists, no network), maps them to the owner's projects/skills, and shows: top 3 matching projects, matched skills (green) and gaps (grey, honest), the best résumé variant, and a one-paragraph "why Harshita" summary the recruiter can copy. Never claim skills that are not in `resume.ts`.

### 6.8 Guided tour
First-time visitors get a dismissible "60-second tour" with Mochi as the guide (6 steps: Role selector, Try a lab, Flagship, Résumé, Beyond code, Contact). Skippable and never shown again after dismissal.

---

## 7. MEDIA AND CONTENT PIPELINE UPGRADES
- Repo demos (GIFs, PNGs, videos) become **optimized `<video>` loops (webm/mp4) with poster frames**; GIF fallback only if conversion fails. Show them inside browser/phone/terminal frames depending on content.
- Captions are written human sentences stored in `media.json`; the filename never appears on-page.
- Gallery: lightbox with arrow-keys, swipe, zoom, caption, "open original in repo" link.
- Above-the-fold media ≤ 3 MB per page; lazy-load the rest; no layout shift.
- Add `Open Graph` media for each project using the best demo frame.

## 8. RECRUITER VISIBILITY AND SEO CHECKLIST
- Role landing pages `/for/<role>` (section 4.2) and `?ref=` greeting.
- Sticky "Résumé" and "Hire me" controls always one click away.
- Résumé PDFs real and downloadable; filenames `Harshita-Ranka-<Role>-Resume.pdf`.
- Clean semantic headings, one H1 per page, descriptive link text, alt text, skip links.
- Core Web Vitals green: LCP < 2.0 s on mobile, CLS < 0.05, INP < 200 ms; total home JS < 150 KB gzip (lazy-load the scene engine, labs and arcade).
- Analytics events (privacy-friendly, env-flagged): `role_selected`, `lab_started`, `lab_completed`, `resume_download{role,from}`, `contact_click`, `project_open`.
- Structured data, sitemap, robots, RSS, `llms.txt`, per-page OG images (section 2.2).
- Accessibility: WCAG AA contrast, keyboard operable scenes/labs/diagrams, reduced-motion alternatives, no autoplaying sound, `aria-live` for lab outcomes.

---

## 9. IMPLEMENTATION PLAN (visual QA after every phase)

**Phase 1: Cleanup and foundations (do first).** Section 2 in full (`lint:copy`, metadata, OG images, captions, badges, placeholders handled), design tokens, Window/Button/Chip/Card components, pixel icon set, new nav + mobile tab bar, new footer, theme toggle.
*Done when:* no builder-speak anywhere, metadata correct, every page uses the Window/Card language, nav looks designed on mobile and desktop.

**Phase 2: Home.** Interactive room scene with hotspots + mobile fallback, stat HUD, "Try something" strip, bento work grid, timeline, notebook, outside-code strip, contact band.
*Done when:* the first screen has a strong focal visual, a clear CTA and at least one interaction, and passes the 5-second test: a stranger can say what Harshita does.

**Phase 3: Work, project template, flagship.** Filters, new cards, new template rolled out to all projects (hero demo, architecture SVGs, Q&A, decisions, gallery, repo snapshot), flagship microsite redesign.

**Phase 4: Labs and arcade.** Build 6.1-6.6 properly, game-select index, progress tracker.

**Phase 5: Résumés, role landing pages, JD matcher.** Real PDF previews, variant pages, `/for/*`, `?ref=`.

**Phase 6: Notes, experience, about, contact, beyond code.** Rewrite notes to real depth; timeline; story; room-tour page with the five toys and draft copy.

**Phase 7: Polish and QA.** Motion pass, sound toggle, easter eggs, tour, performance budget, Lighthouse (Perf ≥ 95, A11y 100, SEO 100), axe, keyboard-only pass, reduced-motion pass, 360 px pass, dark-mode pass, broken-link check, `pnpm lint:copy` clean.

### Final report to produce
1. Before/after screenshots of every page (desktop + mobile).
2. List of anything still needing the owner (photo, personal details, recordings, calendar URL) in `content/PENDING.md`.
3. Route list including `/for/*` and `/arcade`.
4. Lighthouse and bundle-size numbers.
5. Any claims you could not verify and therefore left out.

Ask questions only when truly blocked; otherwise choose sensible defaults, keep them honest, and note them in `content/PENDING.md`.
