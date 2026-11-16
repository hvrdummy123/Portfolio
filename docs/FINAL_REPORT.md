# Portfolio upgrade — final report

Owner: Harshita Ranka  
Date: 2026-11-16  
Site URL default: `https://portfolio-psi-lovat-90.vercel.app`

## Phases completed

| Phase | Status | Notes |
|-------|--------|-------|
| 0 Audit | Done | `docs/audit-before.md`; Lighthouse baseline deferred |
| 1 Leaks + profile | Done | `content/profile.json`, `claims.json`, `check:content` |
| 2 IA / layout | Done | 6-item nav, mobile sheet, breadcrumbs, 404/error |
| 3 Visual tokens | Done | Light/dark tokens, DM Sans headings, hero dots |
| 4 Home 10s test | Done | Hero, role lens, proofs, experience snapshot |
| 5–6 Case studies | Done | TOC/skim, extras, chat-outbox, ZKP research/threat |
| 7 Evidence | Done | Evidence badges + `docs/repo-readiness.md` |
| 8 Labs | Done | LabShell, filters, idempotency + look-ahead labs |
| 9 Experience | Done | Achievements from profile, coursework chips, skills matrix |
| 10 Résumés | Partial | PDFs renamed to `Harshita_Ranka_Resume_<Role>.pdf`; regenerate via `pnpm resumes:build` when needed |
| 11 Notes/RSS | Done | Deeper Nomura note; `public/rss.xml` via generate script |
| 12 SEO | Done | JSON-LD, per-page OG/canonical, manifest |
| 13 Analytics/contact | Partial | `docs/analytics.md`; obfuscated email + vCard; analytics flag off |
| 14 About/puzzles/arcade | Done | How I work, puzzles link, arcade kept (pauses when hidden) |
| 15 Perf/a11y | Partial | Checklist in `docs/a11y-checklist.md`; Lighthouse scores not re-run |
| 16 CI/tests | Done | GitHub Actions + vitest loaders |
| 17 Extras | Done | `/recruiter`, `/changelog` |

## Assumptions

1. ZKP paper gas/latency figures from *comparable systems* were **not** claimed as measured results; résumé “under 2 seconds” kept with private evidence.
2. PayBench verify commands point at the README rather than inventing CLI flags.
3. Lighthouse/axe before/after scores remain deferred until a stable production URL crawl.
4. Dynamic OG image generation (`next/og`) skipped under `output: "export"` — use static social defaults.
5. Vercel Analytics stays behind `featureFlags.analytics = false` until explicitly enabled.

## Deferred (`CONTENT_TODO.md`)

Real photo, D2C milestone statuses, Job Radar media, Atrium screenshots, AWS credential link, custom domain, PayBench real-LLM results, expanded TraceIQ evals, Nomura breakdowns.

## Verification run locally

- `pnpm check:content` OK  
- `pnpm check:resume` OK  
- `pnpm test` (vitest)  
- `pnpm run build` (static export)

## Commits on this upgrade track

See `git log` from `740c69d` (phase 0) forward.
