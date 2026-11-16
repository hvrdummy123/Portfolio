# Lighthouse / axe baseline (pre-upgrade)

**Status:** `deferred-pending-local-server`

Lighthouse and axe audits are **not run yet**. They will be executed after **Phase 1** when `pnpm dev` (or production build + serve) is stable locally. Do not cite scores until this file is updated with measured results.

## URLs to measure

Use the same list for Lighthouse (performance, accessibility, best practices, SEO) and axe (accessibility).

### Static pages

- `/`
- `/about`
- `/beyond-code`
- `/contact`
- `/experience`
- `/labs`
- `/notes`
- `/resumes`
- `/series`
- `/stack`
- `/work`
- `/work/d2c-ecommerce`
- `/arcade`

### Role / resume variants (sample one or all five)

- `/for/backend` (repeat for `fullstack`, `ai-agents`, `blockchain`, `quant-fintech` if comparing)
- `/resumes/backend` (repeat per role as needed)

### Representative dynamic routes

**Work (via `CaseStudy`):**

- `/work/paybench`
- `/work/zkp-kyc`
- `/work/mandarin-teacher`
- `/work/incident-logger`
- `/work/job-finder`
- `/work/etf-backtesting`
- `/work/atrium-engineering`
- `/work/nomura-engineering`

**Labs:**

- `/labs/paybench-timeout`
- `/labs/zk-cats`
- `/labs/outbox-playground`
- `/labs/d2c-order-lifecycle`
- `/labs/backtest-toy`

**Notes (pick published + one draft if applicable):**

- `/notes/paybench-ambiguous-timeout`
- `/notes/d2c-medusa-india`

**Series:**

- `/series/reliable-agents`

### Optional / low priority

- `/dev/cats` (internal dev page)

---

## Results (placeholder)

| URL | Lighthouse P/A/BP/SEO | axe violations | Notes |
|-----|------------------------|----------------|-------|
| *pending* | — | — | Run after Phase 1 |