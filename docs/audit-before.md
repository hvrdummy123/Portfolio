# Pre-upgrade audit (Phase 0.1 & 0.4)

Baseline snapshot before the portfolio upgrade. **No Lighthouse scores** — see [lighthouse-before.md](./lighthouse-before.md).

## Phase 0.1 — Routes & copy leaks

### App routes (`src/app/**/page.tsx`)

| Route file | URL pattern |
|------------|-------------|
| `src/app/page.tsx` | `/` |
| `src/app/about/page.tsx` | `/about` |
| `src/app/arcade/page.tsx` | `/arcade` |
| `src/app/beyond-code/page.tsx` | `/beyond-code` |
| `src/app/contact/page.tsx` | `/contact` |
| `src/app/dev/cats/page.tsx` | `/dev/cats` |
| `src/app/experience/page.tsx` | `/experience` |
| `src/app/for/[role]/page.tsx` | `/for/{backend,fullstack,ai-agents,blockchain,quant-fintech}` |
| `src/app/labs/page.tsx` | `/labs` |
| `src/app/labs/[slug]/page.tsx` | `/labs/paybench-timeout`, `zk-cats`, `outbox-playground`, `d2c-order-lifecycle`, `backtest-toy` |
| `src/app/notes/page.tsx` | `/notes` |
| `src/app/notes/[slug]/page.tsx` | 9 note slugs (see `src/content/data/notes.ts`) |
| `src/app/resumes/page.tsx` | `/resumes` |
| `src/app/resumes/[role]/page.tsx` | `/resumes/{role}` (same role enum as above) |
| `src/app/series/page.tsx` | `/series` |
| `src/app/series/[slug]/page.tsx` | `/series/reliable-agents`, `zero-knowledge-for-humans`, `designing-a-d2c-platform` |
| `src/app/stack/page.tsx` | `/stack` |
| `src/app/work/page.tsx` | `/work` |
| `src/app/work/[slug]/page.tsx` | `/work/{slug}` for all projects except `d2c-ecommerce` (static redirect via `notFound`) |
| `src/app/work/d2c-ecommerce/page.tsx` | `/work/d2c-ecommerce` (flagship; separate template) |

**Total:** 20 `page.tsx` files; one root `src/app/layout.tsx` (no route-group or nested layouts).

### Visitor-facing string scan (`src/`)

Patterns: `TODO`, `FIXME`, `lorem`, `placeholder` (excluding HTML `placeholder=` attributes), `coming soon`, `No sample media`, `resume-safe`, `portfolio brief`, `publishDesignDocs`, `Photos coming soon`, `Photo slot`.

| Finding | Location | Notes |
|---------|----------|--------|
| `No sample media in the repo yet.` | `src/components/work/ProjectMedia.tsx` (×2) | Shown when `public/media/{slug}/` is missing or empty |
| `Photos coming soon` | `src/app/beyond-code/page.tsx` | Window status + 3 craft gallery slots |
| `placeholder="…"` | `src/components/work/WorkIndex.tsx`, `src/components/layout/CommandPalette.tsx` | Form inputs only — not body copy |
| *(none)* | — | No `TODO`/`FIXME`/`lorem` in `src/` |
| *(none)* | — | No `resume-safe`, `portfolio brief`, `publishDesignDocs`, `Photo slot` in `src/` (those strings appear in `scripts/lint-copy.mjs` and internal prompts, not rendered UI) |

**Related chrome (intentional CTAs, not leaks):**

- `Hire me` — `SiteHeader.tsx`, `SiteFooter.tsx`, `src/app/for/[role]/page.tsx`
- `Current role filter: …` — `sr-only` in `SiteHeader.tsx` (screen-reader only)
- `Current role` — visible badge on Atrium job in `src/app/experience/page.tsx`
- `Arcade` — footer link in `SiteFooter.tsx`
- Console Easter egg — `PrefsProvider.tsx` logs ASCII cat + hire email (not in DOM)

### Phase 0.3 (deferred)

Lighthouse and axe will run after Phase 1 when the local dev server is stable. URL list and status: [lighthouse-before.md](./lighthouse-before.md).

---

## Phase 0.4 — Layout, placeholders, assets

### Layout model

**Layout A (current):** Single root layout wraps every route:

- `SiteHeader` (sticky nav, Résumé dropdown, Hire me, theme toggle, sr-only role filter)
- `<main>{children}</main>`
- `SiteFooter` (Arcade link, Hire me, prefs toggles)
- Global: `MobileTabBar`, `CommandPalette`, `CursorCat`, `EasterEggs`, `PrefsProvider`

**Case study / detail pages** (`CaseStudy`, `/work/d2c-ecommerce`, `/for/[role]`, etc.) use the same root layout. There is no separate “layout B” file; differences are **in-page chrome only** (e.g. role landing Hire me button, footer Arcade, experience “Current role” label).

**Recommendation:** Keep one root layout through the upgrade; consolidate or trim redundant in-page CTAs in **Phase 2** rather than introducing a second layout shell.

### Component skim (layout-bearing pages)

| Area | Observation |
|------|-------------|
| `layout.tsx` | Fonts, metadata, skip link, header/main/footer shell |
| `SiteHeader` / `SiteFooter` | Shared chrome on all pages |
| `CaseStudy` | Standard work detail; `ProjectMedia` for `kind === "github"` else decorative gradient block |
| `beyond-code/page.tsx` | Interactive sections + empty crafts gallery |
| `ProjectMedia` | Filesystem-backed; empty-state message when no assets |
| `about/page.tsx` | `PixelCat` portrait in window (no `/public/me.jpg` yet) |
| `work/d2c-ecommerce/page.tsx` | Custom flagship header + `D2CFlagship` (not `CaseStudy`); still uses root header/footer |

### Empty UI / placeholder sections

| Surface | What users see |
|---------|----------------|
| **Beyond Code → crafts** | Three bordered slots, cat peek, “Photos coming soon” (`beyond-code/page.tsx`) |
| **Project media** | `No sample media in the repo yet.` for slugs without `public/media/{slug}/` assets |
| **Media on disk** | Only `incident-logger`, `mandarin-teacher`, `paybench`, `zkp-kyc` under `public/media/` |
| **Likely empty media on case studies** | `etf-backtesting`, `job-finder`, `atrium-engineering`, `nomura-engineering` (no media dirs) |
| **About photo** | Mascot placeholder instead of `/public/me.jpg` |
| **CaseStudy non-GitHub projects** | 40px-tall gradient block instead of screenshot strip |
| **`CONTENT_TODO.md`** | Tracked gaps: identity/media, gh-sync project copy, D2C milestones/docs flags, draft notes, resume PDFs, known resume/doc discrepancies (KYC wording, D2C 61/7/22, etc.) |

### Research PDFs

Copied under `content/research/`:

- `BCK25_paper_43.pdf`
- `Springer_Lecture_Notes_in_Computer_Science.pdf`

---

*Audit date: 2026-11-16. Repo: `/Users/harshitaranka/Workspace/Portfolio`.*