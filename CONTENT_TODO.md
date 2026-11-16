# CONTENT_TODO — placeholders for Harshita

Every `TODO_FROM_HARSHITA` and known gap. Clear these before calling the site "final."

## Identity / media
- [ ] Add `/public/me.jpg` (About photo)
- [ ] AWS Cloud Practitioner verification URL (`resume.ts` → `certification.verificationUrl`)
- [ ] Beyond Code: crochet/crafts photos under `/public/beyond/`
- [ ] Beyond Code: first-person blurbs (crochet, puzzles, ukulele)
- [ ] Optional ukulele/singing audio embeds
- [ ] Confirm site URL (`NEXT_PUBLIC_SITE_URL` / `site.config.ts`)

## GitHub-backed projects (fill after `pnpm gh:sync`)
- [ ] Mandarin-Teacher: pitch, stack, architecture, Q&A, media
- [ ] Incident-Logger: pitch, stack, architecture, Q&A, media
- [ ] Job-Finder: pitch, stack, architecture, Q&A, media
- [ ] ZKP-KYC: reconcile Circom vs ZoKrates wording vs repo; import demo media
- [ ] PayBench: import all `docs/assets/*` media; embed playground link

## Non-repo projects
- [ ] ETF Backtesting: confirm Python-vs-Node rationale; any shareable architecture notes
- [ ] Atrium pages: any non-proprietary diagrams/screenshots
- [ ] Nomura: shareable technical detail on 76% speedup (optional)
- [ ] D2C: mark real M1–M6 / 15-step quest-log statuses
- [ ] D2C: confirm endpoint counts 61 / 7 / 22 against newest doc
- [ ] D2C: set `featureFlags.publishDesignDocs` true only if docs may be public

## Notes
- [ ] Approve draft notes (`draft: false`) before production publish
- [ ] Expand draft essay bodies beyond excerpts

## Resumes
- [ ] Generate PDFs via `pnpm resumes:build` when tectonic/latexmk available
- [ ] Confirm phone should stay resume-PDF-only (current default)

## Discrepancies observed
- KYC: resume lists ZoKrates **and** Circom; README emphasizes Circom + snarkJS Groth16. Pages lead with Circom; resume “proof < 2s” kept (source=resume).
- Product names: TraceIQ, duihua, Personal Job Radar (surfaced on pages).
- D2C: **61/7/22 endpoints** and **“35 customer flows”** are prompt-only — not in design docs. Flagship omits 61/7/22; cites MWM **18 screens** + ~10 admin sections (`_inputs/d2c-facts.md`).
- D2C auth: primary markdowns = Phone+Password + COD at launch; SASDD = email-first / COD Phase 2 — portfolio follows primary markdowns.
- Status from repo research: PayBench/ZKP/TraceIQ/Job Radar → Built; duihua → **In progress**.
- Repo demo media is in `/public/media/<slug>/` (Job Radar has 0). Research dumps: `_inputs/github-research.*`, `_inputs/d2c-facts.*`.
- Atrium/Nomura dates used verbatim from resume.
