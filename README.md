# Harshita Ranka — Portfolio ("pixel cat" edition)

Personal portfolio for **Harshita Vivek Ranka** (B.Tech CE, MPSTME NMIMS, class of 2026). Professional-first, playful-second: pastel pixel-cat theme with deep technical case studies underneath.

## Quick start

```bash
pnpm install
pnpm dev
```

```bash
pnpm build   # static export → out/
pnpm start   # not used for static hosting; serve out/ instead
```

Deploy `out/` to Vercel, Cloudflare Pages, or GitHub Pages. Set `NEXT_PUBLIC_SITE_URL` for canonical/OG URLs.

## Scripts

| Script | Purpose |
|---|---|
| `pnpm gh:sync` | Fetch GitHub README/meta/media inventory → `content/generated/` |
| `pnpm coverage:check` | Ensure every resume project has a data entry + route |
| `pnpm content:check` | List every `TODO_FROM_HARSHITA` |
| `pnpm resumes:build` | Emit role-targeted LaTeX/PDF when tooling exists |

## Project coverage

| Project / role | Route | Source | Status badge |
|---|---|---|---|
| D2C E-Commerce Platform | `/work/d2c-ecommerce` | Resume + D2C design docs | Built + Designed (MWM) |
| Privacy-Preserving KYC | `/work/zkp-kyc` | GitHub `ZKP-KYC-System-Blockchain` | Built |
| ETF Backtesting Framework | `/work/etf-backtesting` | **Resume data only — no public repo** | Built |
| PayBench | `/work/paybench` | GitHub `Agent-Pro-Paybench` | Built |
| Mandarin-Teacher (duihua) | `/work/mandarin-teacher` | GitHub | In progress |
| Incident-Logger (TraceIQ) | `/work/incident-logger` | GitHub | Built |
| Job-Finder (Job Radar) | `/work/job-finder` | GitHub | Built (no repo media) |
| Atrium (auth, chat outbox, admin, multi-agent CLI) | `/experience` + résumé only | Resume (private) — **no separate work tiles** | — |
| Nomura Engineering | `/work/nomura-engineering` | Resume (private) | Shipped |

**ETF Backtesting Framework has no GitHub repo.** Its page is built from resume metrics only; charts use synthetic illustrative data and are labeled as such.

## Media pipeline

1. `pnpm gh:sync` inventories media in each repo and caches metadata in `content/generated/media.json` + `github.json`.
2. Download/optimize into `/public/media/<slug>/` (extend the sync script as needed).
3. Show a "Media from the project repo" credit line with the repo link.
4. Never hotlink GitHub at runtime; never invent screenshots.

## Truthfulness policy

- Every stat has a `source` string in content data.
- Missing facts use `TODO_FROM_HARSHITA` (see `CONTENT_TODO.md`).
- Status badges: `shipped` | `built` | `designed` | `in-progress` — edit in `src/content/data/projects.ts`.
- `pnpm coverage:check` and `pnpm content:check` should be clean of surprises before deploy.

## Resume variants

Five role resumes are generated from `src/content/data/resume.ts` + `resumeVariants`:

1. Backend 2. Full-stack 3. AI/Agents 4. Blockchain 5. Quant/Fintech

Web views live under `/resumes/[role]` with diff toggle, plain-text copy, and print CSS. `?from=` is preserved on résumé links for lightweight attribution.

## Accessibility & motion

- `prefers-reduced-motion` disables walking hero/cursor cats and slows the arcade.
- Footer toggles: Day/Night theme, Cat on/off, Sound on/off.
- Skip link, focus rings, keyboard-operable labs/diagrams.

## Credits

- Structural inspiration: [divagr.com](https://divagr.com) (IA ideas only — not visual identity or copy).
- Fonts: Pixelify Sans, DM Sans, JetBrains Mono.
- AI-assisted tools were used to help build this site (disclosed plainly).

## Known gaps

See [`CONTENT_TODO.md`](./CONTENT_TODO.md).
