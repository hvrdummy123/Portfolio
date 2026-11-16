# Accessibility checklist (Phase 15.2)

Keyboard-only walkthrough — update as flows change.

## Global
- [ ] Skip link focuses `#main`
- [ ] Primary nav and More menu are keyboard reachable; Esc closes menus
- [ ] Mobile sheet: Esc closes, focus trapped, scroll locked
- [ ] Command palette: Cmd/Ctrl+K opens; arrows + Enter navigate; Esc closes
- [ ] Theme / sound / cursor-cat / reduce-motion toggles are keyboard operable
- [ ] Visible 2px+ focus rings on interactive controls

## Home
- [ ] Role lens chips are buttons with `aria-pressed`
- [ ] Proof strip links announce destination
- [ ] One `h1` (hero headline)

## Work / case studies
- [ ] Breadcrumb link back to Work
- [ ] Skim mode toggle has `aria-pressed`
- [ ] TOC links move focus/scroll to sections
- [ ] Q&A `<details>` openable with keyboard
- [ ] Prev/next project links at bottom

## Labs
- [ ] Controls operable without a pointer
- [ ] Outcome text exposed to assistive tech (`aria-live` where state changes)

## Résumés / contact
- [ ] Copy email announces success
- [ ] PDF links are real downloadable files when present

## Reduced motion
- [ ] `prefers-reduced-motion` or footer toggle disables sprite loops / count-up / hover lift
