# Analytics

Privacy-friendly analytics (no cookies) via Vercel Analytics when enabled.

## Feature flag

`siteConfig.featureFlags.analytics` — default `false` until production opt-in.

## Events to wire when enabled

| Event | Payload |
|-------|---------|
| `resume_download` | `{ role }` |
| `role_lens_select` | `{ role }` |
| `lab_started` / `lab_completed` | `{ slug }` |
| `github_click` | — |
| `email_copy` | — |
| `case_study_scroll` | `{ slug, depth: 25\|50\|75\|100 }` |

Until the flag is on, the site does not load analytics scripts.
