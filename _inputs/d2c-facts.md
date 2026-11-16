# D2C E-Commerce — Reconciled Fact Sheet

**Flagship:** Indian D2C beverage (boba/matcha/milk tea) storefront for Harshita’s portfolio.  
**Primary sources (preferred):** `system-design.md` (v1.0), `mwm-system-design.md` (v2.0).  
**Secondary:** `D2C_Platform_SASDD.docx`, thin `Boba_Store_System_Design_Document.docx`, PDF mirrors of the two markdowns, ChatGPT dump `D2C Boba E-Commerce Architecture.pdf` (auth tutorial; not a system design).  
**Rule:** Numbers below cite source + section. Conflicts → newest/most detailed primary markdown, with footnotes.

---

## 1. Principles & topology (Launch vs MWM vs Growth)

### Core principles
| Principle | Source |
|---|---|
| Phone-first (Indian mobile-centric users) | `system-design.md` → Project Overview |
| WhatsApp for post-purchase communication | `system-design.md` → Project Overview; `mwm-system-design.md` → Do We Need a Mobile App? |
| Medusa v2 for commerce primitives; custom modules elsewhere | `system-design.md` → Project Overview |
| Never reinvent what Medusa already does well | `system-design.md` → Project Overview |
| MWM = smallest complete shippable loop (browse → buy → track; admin manage) | `mwm-system-design.md` → What MWM Means |
| No Firebase / native mobile app / WebSockets at MWM | `mwm-system-design.md` → System Topology; Part 7 |

### Topology by tier
| Tier | Topology | Capacity / scope | Source |
|---|---|---|---|
| **Launch** | Cloudflare → Vercel (Next.js) + Railway (single Medusa) → Supabase Postgres → Razorpay / Shiprocket / Resend / Interakt | 0–100 orders/month; ~₹2,000–₹6,500/mo infra | `system-design.md` → Architecture Overview; Infrastructure & Cost → Launch |
| **MWM (10k DAU)** | Cloudflare → Vercel + **2× Railway Medusa** (2 vCPU / 2GB each, Railway LB) → Supabase Pro + PgBouncer | 10,000 DAU without architecture change; ~11 RPS sustained / spikes 30–50 RPS | `mwm-system-design.md` → System Topology; Part 8 |
| **Growth** | Upgrade Railway (2 vCPU/2GB), Supabase Pro, Vercel Pro, add Meilisearch | 500–2,000 orders/month; ~₹8,000–₹15,000/mo | `system-design.md` → Growth Configuration |
| **Scale** | Read replica, horizontal Medusa, paid Cloudflare, dedicated logging | 5,000+ orders/month; ~₹20,000–₹40,000/mo | `system-design.md` → Scale Configuration |

**SASDD scale assumptions (secondary):** Launch 50–200 DAU / 5–30 orders/day; Growth (M6) 500–2,000 DAU; Scale (Y1) 2,000–10,000 DAU — `D2C_Platform_SASDD.docx` → §1.5.

---

## 2. Full tech stack with reasons

| Layer | Choice | Reason | Source |
|---|---|---|---|
| Commerce backend | Medusa v2 | Open-source, modular, self-hosted | `system-design.md` → Tech Stack |
| Database | Supabase (PostgreSQL) | Managed Postgres, generous free tier | same |
| Storefront | Next.js 14 (App Router) | SSR, ISR, SEO | same |
| Hosting – backend | Railway | Simple deploy, affordable, no infra overhead | same |
| Hosting – frontend | Vercel | Best Next.js platform | same |
| CDN + security | Cloudflare | Free tier sufficient at launch | same |
| Payments | Razorpay | India-first; UPI, cards, netbanking | same |
| Shipping | Shiprocket | Aggregates 17+ couriers; COD | same |
| Email | Resend | Developer-friendly, reliable deliverability | same |
| WhatsApp | Interakt | Order + shipping notifications | same |
| OTP / SMS | MSG91 or 2Factor | Indian SMS, reliable | same |
| Object storage | Supabase Storage or Cloudflare R2 | Product images, receipts | same |
| Search (future) | Meilisearch | Fast, self-hostable, typo-tolerant | same |

**SASDD rejected-alternatives (extra detail):** Medusa vs Express/Shopify/Woo; Postgres vs MySQL/Mongo; Railway vs ECS/Render/Fly; Razorpay vs PayU/Cashfree/Stripe; Shiprocket vs Delhivery/EasyEcom; Interakt vs Wati/AiSensy/Twilio — `D2C_Platform_SASDD.docx` → §2.3.

---

## 3. Key decisions table

| Decision | Choice (reconciled) | Alternative | Reason | Source |
|---|---|---|---|---|
| Primary auth | **Phone + Password** at launch | Email + Password | Indian users identify by phone; SMS cost = 0 | `system-design.md` → Phase 1; Key Decisions; `mwm` → User Types |
| OTP / passwordless login | Phase 2 | Launch | Avoid SMS cost before PMF | `system-design.md` → Phase 1 |
| Google login | Phase 2 (sd) / Phase 1B within 2 weeks (SASDD) | Launch | Friction reduction | sd Phase 1; SASDD §1.1 |
| Payment | Razorpay | PayU, CCAvenue | Best DX, UPI, settlement | `system-design.md` → Key Decisions |
| COD | Yes at MWM / launch (sd+mwm) | No | Large share of Indian D2C | sd Key Decisions; mwm Part 4 |
| Shipping | Shiprocket | Shiping, ClickPost | Largest network, good API | sd Key Decisions |
| WhatsApp | Interakt | WATI, AiSensy | Pricing + reliability | sd Key Decisions |
| Email | Resend | SendGrid, Postmark | DX + free tier | sd Key Decisions |
| Search | None at launch | Meilisearch | Add when catalog > 50 products | sd Key Decisions; mwm Part 11 |
| Redis | Not at launch / MWM | Add at scale | Postgres sufficient; add ~50k DAU or webhook delays | sd Key Decisions; mwm Part 11; SASDD §7.2 |
| Kubernetes | Never until massive scale | — | Over-engineered | sd Key Decisions; mwm Part 11 |
| Protocol | REST only at MWM | WebSocket / SSE | Order updates via WhatsApp + polling | `mwm-system-design.md` → Part 7 |
| Mobile | PWA; no native app / FCM at MWM | Native + Firebase | WhatsApp covers transactional push | `mwm-system-design.md` → Do We Need a Mobile App? |
| JWT access TTL | 15 minutes | — | Security | `system-design.md` → JWT Configuration |
| JWT refresh TTL | **30 days** (primary) | 7 days (SASDD) | Prefer sd; footnote SASDD | sd JWT; SASDD §2.6 / §1.2 |
| JWT storage | HttpOnly cookie | localStorage | XSS resistance | sd JWT; mwm Part 10 |
| Stock reservation | At checkout, not add-to-cart | — | Avoid locking inventory | `system-design.md` → Phase 5 Cart |

**Auth discrepancy (critical):** Primary markdowns (`system-design.md`, `mwm`) = Phone+Password launch. SASDD §1.1 and Architecture PDF = Email+Password launch, Phone+OTP Phase 2. **Portfolio flagship follows primary markdowns (phone).** SASDD also delays COD to “Phase 2” (§7.2) while sd+mwm include COD at launch/MWM.

---

## 4. All 14 phases summary (prefer `system-design.md`)

SASDD uses Phase 0–12 with different numbering (e.g. Cart = SASDD Phase 4 = sd Phase 5). Tables below follow **system-design.md Phases 1–14**.

| # | Phase | Medusa / custom | Tables / notes | Notable APIs | Source |
|---|---|---|---|---|---|
| 1 | Authentication | Custom `phonepass` auth provider on Medusa auth module | Medusa: `customer`, `customer_group`, `auth_identity`. Custom: `custom_otp` | Register/login/forgot via custom provider; JWT issue | sd → Phase 1 |
| 2 | Customer Profile & Addresses | Medusa native | `customer`, `customer_address` | Frontend only; no custom tables | sd → Phase 2 |
| 3 | Product Catalog | Medusa native + metadata | `product`, `product_variant`, options/values, category, collection, tag, image, `price_set`, `money_amount` | Catalog via Medusa product APIs | sd → Phase 3 |
| 4 | Product Detail Page | Medusa read | No new tables | PDP data from product+variant+price | sd → Phase 4 |
| 5 | Cart | Medusa cart module | `cart`, `cart_line_item`, `cart_address`, `cart_shipping_method`, `cart_promotion` | Medusa cart APIs; guest merge; 30-day idle expiry | sd → Phase 5 |
| 6 | Wishlist | **Custom module** | `custom_wishlist`, `custom_wishlist_item` | `GET/POST/DELETE /store/wishlist…` | sd → Phase 6 |
| 7 | Checkout | Medusa + Shiprocket rates + COD provider | cart + `shipping_option` + `payment_session` / `payment_collection` | Address → shipping → coupon → pay | sd → Phase 7 |
| 8 | Razorpay | Custom payment provider (`AbstractPaymentProvider`) | `payment_session`, `payment`, `payment_collection`, `order` | Create Razorpay order; webhook `payment.captured` | sd → Phase 8 |
| 9 | Orders | Medusa order module | `order`, line items, address, shipping, payment, fulfillment, `return`, `refund` | My Orders UI; status flow | sd → Phase 9 |
| 10 | Shiprocket | Custom fulfillment provider | `custom_shipment` + Medusa fulfillment | Create shipment, AWB, webhooks | sd → Phase 10 |
| 11 | Notifications | Medusa notification + custom Interakt subscriber | `custom_notification_log` | Resend / Interakt / MSG91 | sd → Phase 11 |
| 12 | Coupons & Promotions | Medusa promotion module | Medusa promotion tables | Admin-created coupons | sd → Phase 12 |
| 13 | Returns & Refunds | Medusa return/refund + Shiprocket reverse pickup | `return`, `return_item`, `refund` | Request → approve → pickup → refund | sd → Phase 13 |
| 14 | Admin Panel | Medusa `/app` + custom widgets | — | Shipments, notification logs, COD reconciliation, analytics | sd → Phase 14 |

**SASDD Phase 0:** Foundation verification (Medusa up, migrations, `/store/products`, env vars) — `D2C_Platform_SASDD.docx` → Phase 0. Not in sd’s 14-phase list.

---

## 5. Custom tables list

| Table | Purpose | Source |
|---|---|---|
| `custom_otp` | OTP for password reset via SMS | `system-design.md` → Complete Table Reference / Phase 1 |
| `custom_wishlist` | Customer wishlists | same → Phase 6 |
| `custom_wishlist_item` | Wishlist line items | same |
| `custom_shipment` | Shiprocket shipment metadata (AWB, courier, status, tracking_url, …) | same → Phase 10 |
| `custom_notification_log` | Audit log of sent notifications | same → Phase 11; fields detailed in `mwm` Part 5 |

**Naming note:** SASDD §5.1 uses unprefixed `wishlist` / `wishlist_item`. Reconciled prefix: **`custom_`** per `system-design.md`.

Medusa-owned tables (do not modify): listed in `system-design.md` → Complete Table Reference (customer through shipping_profile). Count of named Medusa tables in that section: **35 rows** in the “Do Not Modify” table.

---

## 6. Endpoint counts (61 native / 7 partial / 22 custom)

| Claim | Status | Source |
|---|---|---|
| 61 native Medusa v2 endpoints | **Not found** in any design doc under `_inputs/d2c-docs/` | Only mentioned as a portfolio brief requirement in `cursor_portfolio_prompt.md` §8 |
| 7 partial extensions | **Not found** in design docs | same |
| 22 custom builds | **Not found** in design docs | same |

**Custom routes explicitly listed in primary docs (not a full inventory):**
- Wishlist: `GET /store/wishlist`, `POST /store/wishlist/items`, `DELETE /store/wishlist/items/:id` — `system-design.md` → Phase 6
- Webhooks: `POST /webhooks/razorpay`, `POST /webhooks/shiprocket` — `mwm` Part 4–5
- SASDD lists additional Medusa-native store routes (auth emailpass, customers/me, products, carts, orders, discounts) — SASDD Phases 1–8

**Discrepancy:** Treat **61 / 7 / 22 as unverified** for the portfolio page unless sourced elsewhere. Do not invent a breakdown.

---

## 7. Customer flows (35) and admin sections (10)

### Customer “35 flows”
| Claim | Status | Source |
|---|---|---|
| “35 customer flows” | **Number not stated** in design docs | Portfolio brief `cursor_portfolio_prompt.md` §9 only |

**Screen map actually listed** (`mwm-system-design.md` → Part 2) — **18 screens:**

**Unauthenticated (6):** Home, PLP, PDP, Login, Register, Forgot Password.  
**Authenticated (12):** My Account, Edit Profile, Manage Addresses, Wishlist, Cart, Checkout Address, Checkout Shipping, Checkout Payment, Order Confirmation, My Orders, Order Detail, Return Request.

**Guest behaviour matrix (4 rows):** browse; add to cart; wishlist → login; checkout → must auth; cart merge — `mwm` Part 2.C.

### Admin sections (10)
Portfolio brief lists 10: Products, Orders, Customers, Inventory, Promotions, Shipping, Returns, Notification logs, Admin users/RBAC, Dashboard.

**MWM Admin Module Access** (`mwm-system-design.md` → Part 3) aligns to those 10 (plus Admin Login as entry): Products, Orders, Customers, Inventory, Promotions, Shipping Options, Returns, Notifications Log, Admin Users, Admin Dashboard widget.

**Module ownership map:** 14 modules (Auth → Analytics) — `mwm` → Module Ownership Map.

---

## 8. Notifications matrix + WhatsApp templates

### Channels
| Channel | Provider | Use / cost | Source |
|---|---|---|---|
| Email | Resend | Order, invoices, password reset; free 3k/mo | sd Phase 11; mwm Part 6 |
| WhatsApp | Interakt | Order/shipping/delivery | same |
| SMS | MSG91 / 2Factor | OTP only | same |
| Push | — | Not at launch / skip FCM at MWM | sd Phase 11; mwm |

### Event matrix (reconciled from MWM Part 6 — most complete grid)

| Event | WhatsApp | Email | SMS | Source |
|---|---|---|---|---|
| Account registered | — | Welcome | — | mwm Part 6 |
| Password reset OTP | — | — | OTP (MSG91) | mwm Part 6 |
| Order placed (online) | Order summary | Confirmation + invoice | — | mwm Part 6 |
| Order placed (COD) | COD summary | Confirmation | — | mwm Part 6 |
| Payment failed | Retry link | Payment failed | — | mwm Part 6 |
| Shipment created | Tracking + AWB | Shipping notification | — | mwm Part 6 |
| Out for delivery | “On its way” | — | — | mwm Part 6 |
| Delivered | Delivered confirmation | — | — | mwm Part 6 |
| Return approved | Pickup scheduled | Return approved | — | mwm Part 6 |
| Refund processed | — | Refund details | — | mwm Part 6 |

**sd Phase 11 matrix** is similar but omits payment-failed / COD split; lists Registration WhatsApp as “—”. Prefer MWM grid.

### WhatsApp templates (MWM — preferred)
| Template | Variables | Source |
|---|---|---|
| `order_confirmation` | customer_name, order_id, total, items_summary | mwm Part 6 |
| `shipment_created` | customer_name, order_id, courier_name, awb, tracking_url | mwm Part 6 |
| `out_for_delivery` | customer_name, order_id | mwm Part 6 |
| `delivered` | customer_name, order_id | mwm Part 6 |
| `return_approved` | customer_name, order_id, pickup_date | mwm Part 6 |
| `payment_failed` | customer_name, order_id, retry_url | mwm Part 6 |

**SASDD template name variants:** `order_shipped`, `order_delivered`, `return_pickup`, `refund_done` (+ `today_date` / `review_link` / `bank_timeline`) — SASDD §10.2. Approval: 24–48h (mwm) vs 24–72h (SASDD).

**Interakt cost disagreement:** mwm ₹0.35–₹0.80 / 24h window; SASDD ₹0.50–0.90. Prefer range citation with footnote.

---

## 9. MWM capacity math (10k DAU)

| Assumption / result | Value | Source |
|---|---|---|
| Target DAU | 10,000 | `mwm-system-design.md` → title / Part 8 |
| Peak hour share | ~20% of DAU in 1 hour → 2,000 concurrent | Part 8 |
| API calls per session | 15–20 | Part 8 |
| Peak RPS | 2,000 × 20 / 3600 ≈ **11 RPS** sustained; spikes **30–50 RPS** | Part 8 |
| One Medusa (2 vCPU / 2GB) capacity | ~50–100 RPS | Part 8 |
| Recommended instances | **2** (HA + zero-downtime deploys), even though 1 is enough for RPS | Part 8 |
| LB | Railway built-in (`replicas: 2`); Cloudflare edge for static/cache | Part 8 |
| DB | Supabase Pro; PgBouncer transaction mode; max 60 connections from Medusa (30/instance); 1GB RAM; 8GB storage; daily backups | Part 8 |
| API volume | ~50K requests/day to Medusa | Part 8 Network |
| Product page cache hit | ~80% | Part 8 Network |
| Image storage example | 50 products × 6 images × 800KB ≈ **~240MB** | Part 8 Storage |
| Event bus | In-process Medusa bus; **no** RabbitMQ/SQS at MWM | Part 6 |

---

## 10. Cost tables by tier

### Launch (0–100 orders/month) — `system-design.md` → Launch Configuration
| Service | Plan | Est. INR/mo | Source |
|---|---|---|---|
| Railway (Medusa) | Starter 1 vCPU, 512MB | ₹400–₹800 | sd Launch |
| Supabase | Free 500MB DB, 1GB storage | ₹0 | sd Launch |
| Vercel | Hobby / Pro | ₹0–₹1,700 | sd Launch |
| Cloudflare | Free | ₹0 | sd Launch |
| Resend | Free 3,000 emails | ₹0 | sd Launch |
| Interakt | Starter | ₹1,500–₹2,500 | sd Launch |
| MSG91 / 2Factor | ₹0.20–₹0.40/SMS | ₹100–₹500 | sd Launch |
| Domain | .in / .com | ₹800–₹1,200/year | sd Launch |
| **Total** | | **~₹2,000–₹6,500/month** | sd Launch |

### Growth (500–2,000 orders/month) — sd Growth
| Change | Total |
|---|---|
| Railway upgrade, Supabase Pro (~₹1,700), Vercel Pro, Meilisearch | **~₹8,000–₹15,000/month** |

### Scale (5,000+ orders/month) — sd Scale
| Change | Total |
|---|---|
| Read replica, horizontal Railway, paid Cloudflare, Logtail/Axiom | **~₹20,000–₹40,000/month** |

### MWM @ 10k DAU — `mwm-system-design.md` → Part 9
| Service | Config | INR/mo | Source |
|---|---|---|---|
| Railway Medusa ×2 | 2× 2vCPU/2GB | ₹3,500–₹6,000 | mwm Part 9 |
| Supabase Pro | 8GB, backups, pooler | ₹1,700 (~$20) | mwm Part 9 |
| Vercel Pro | 1TB bandwidth | ₹1,700 (~$20) | mwm Part 9 |
| Cloudflare Free | CDN/WAF/SSL | ₹0 | mwm Part 9 |
| Resend | 50k emails | ₹700 (~$8.33) | mwm Part 9 |
| Interakt Growth | — | ₹3,500–₹6,000 | mwm Part 9 |
| MSG91 | ~500 OTPs × ₹0.30 | ₹150–₹500 | mwm Part 9 |
| Shiprocket | Per shipment | Pass-through | mwm Part 9 |
| Domain | amortized | ~₹100/mo | mwm Part 9 |
| **Total (excl. Razorpay MDR)** | | **~₹11,000–₹16,000/month** | mwm Part 9 |

**GMV example (mwm):** 500 orders × ₹300 AOV = ₹1,50,000 GMV → Razorpay 2% ≈ ₹3,000/mo.

### SASDD monthly summary (secondary — different line items)
| Tier | TOTAL | Source |
|---|---|---|
| Launch (M0) | ~₹3,050 | SASDD §5.8 |
| Growth (M6) | ~₹15,250 | SASDD §5.8 |
| Scale (Y1) | ~₹26,550 | SASDD §5.8 |

---

## 11. Security checklist

### MWM checklist (`mwm-system-design.md` → Part 10)
| Area | Control |
|---|---|
| All traffic | HTTPS via Cloudflare (HTTP→HTTPS) |
| JWT storage | HttpOnly cookies |
| Password storage | bcrypt (Medusa default) |
| Webhooks | HMAC SHA256 on Razorpay + Shiprocket |
| API rate limiting | Cloudflare 100 req/min/IP on auth |
| Admin panel | `/app`, separate auth; IP allowlist optional |
| Secrets | Railway env; never commit |
| SQL injection | Medusa ORM parameterized queries |
| CORS | Only Vercel domain |
| OTP brute force | Max 3 OTP attempts → 15-min lockout per phone |

### Additional from SASDD §2.6 / §9.1
| Control | Detail | Source |
|---|---|---|
| Cloudflare SSL | Full Strict | SASDD §2.6 |
| Auth rate limit (Medusa) | 10 req/min on auth endpoints | SASDD §2.6 |
| JWT | 15-min access + **7-day** refresh (differs from sd 30-day) | SASDD §2.6 |
| Threat model | Credential stuffing, XSS, CSRF, JWT theft, webhook spoofing, inventory races, DDoS, secrets leak, insider | SASDD §9.1 |
| Login lockout | 15 min after 5 failed logins | SASDD §1.6 |
| OTP send limit | 3 OTPs/hour per phone | SASDD §1.6 |

---

## 12. What is NOT running at MWM + triggers

| Component | At MWM? | Add when / trigger | Source |
|---|---|---|---|
| Redis | No | Cart/session pain at **50k+ DAU** (mwm); or webhook/email delays / P99 > 800ms (SASDD) | mwm Part 11; SASDD §2.5 §7.2 |
| RabbitMQ / message queue | No | Later reliability phase; BullMQ with Redis | mwm Part 6/11; SASDD §6.1 |
| Firebase / FCM | No | Native app milestone | mwm Part 11 |
| Meilisearch / Elasticsearch | No | Product count **> 50** (sd/mwm); or search latency > 300ms / 100+ products (SASDD) | mwm Part 11; SASDD §2.5 |
| Kubernetes | No | Massive scale / Railway limits / ~50k DAU | mwm Part 11; SASDD §2.5 |
| Separate worker process | No | Email/webhook delays (SASDD Phase 3) | mwm Part 11; SASDD §2.5 |
| WebSocket server | No | Not needed for D2C beverage timelines | mwm Part 7/11 |
| Mobile native app | No | Proven demand | mwm |
| Read replica | No at MWM primary | 10k–50k DAU (+₹5k–10k) per mwm; or 5k DAU / DB CPU (SASDD) | mwm Part 9; SASDD §7.1 |

**MWM cost scaling triggers (mwm Part 9):**
| DAU | Change | Extra cost |
|---|---|---|
| Up to 10,000 | Current spec | As above |
| 10,000–50,000 | Supabase read replica + Railway 4 instances | +₹5,000–₹10,000 |
| 50,000+ | Dedicated DB, Redis, CDN tuning | Major rearchitecture |

---

## 13. M1–M6 milestones + 15-step build order

### Milestones — prefer `system-design.md` (exactly M1–M6)
| Milestone | Phases | Goal | Source |
|---|---|---|---|
| M1 — Core Commerce | Auth, Profile, Products | Browse + log in | sd → Development Milestone Plan |
| M2 — Transactional | Cart, Wishlist, Checkout | Users can buy | sd |
| M3 — Payments | Razorpay, COD | Real money | sd |
| M4 — Fulfillment | Orders, Shiprocket, Notifications | E2E order lifecycle | sd |
| M5 — Post-Purchase | Returns, Refunds, Admin | Complete ops | sd |
| M6 — Production | Security, Monitoring, CI/CD | Launch-ready | sd |

**Approach:** Backend → Postman → frontend; never frontend-first — sd Milestone Plan.

### SASDD milestones (M0–M9 — different mapping)
M0 Foundation → … → M9 Launch; M1 = Phases 1–3, etc. — SASDD §11.1. Footnote only; portfolio M1–M6 follows **sd**.

### 15-step MWM build order (`mwm-system-design.md` → Part 12)
| Step | Build | Test |
|---|---|---|
| 1 | Medusa + Supabase + migrations | `GET /health` → 200 |
| 2 | Phone+password auth provider | Register + login (Postman) |
| 3 | Product catalog admin + API | `GET /store/products` |
| 4 | Next.js Home + PLP + PDP | Browser |
| 5 | Cart API + UI | Add to cart / totals |
| 6 | Wishlist custom module | Add/remove |
| 7 | Checkout: address + shipping | To payment step |
| 8 | Razorpay + COD | Test mode |
| 9 | Razorpay webhook + order creation | Test webhook → order |
| 10 | Shiprocket shipment | Test AWB |
| 11 | Resend order email | Email arrives |
| 12 | Interakt WhatsApp | Message arrives |
| 13 | Returns + refund | Submit → approve → refund |
| 14 | Admin dashboard widget | Medusa `/app` |
| 15 | Cloudflare + 2 Railway instances | Deploy + load test |

---

## 14. Folder structure

### Medusa `src/` — `system-design.md` → Medusa v2 Folder Structure
```
src/
├── api/store|admin|webhooks/
├── modules/wishlist|phonepass|notifications/
├── workflows/create-shipment.ts|process-return.ts
├── subscribers/order-placed|payment-captured|shipment-created
├── jobs/
└── lib/razorpay|shiprocket|interakt|msg91
```

### SASDD fuller tree (secondary) — §10.1–10.2
- Backend: adds `modules/razorpay|shiprocket`, `emails/` React Email templates, `utils/gst|invoice|phone-validator`, Dockerfile
- Frontend `nextjs-storefront/`: `(store)` pages, `(auth)`, `components/`, `lib/medusa-client.ts`, ISR revalidate route

---

## 15. Document version notes / discrepancies

| Doc | Version / nature | Role |
|---|---|---|
| `system-design.md` | **v1.0** — Medusa v2, Supabase, Indian market; **14 phases**, M1–M6, launch/growth/scale costs | Primary for phases, custom tables, key decisions |
| `mwm-system-design.md` | **v2.0** — 10k DAU MWM; no Firebase/WebSockets; REST only; 15-step build | Primary for capacity, MWM costs, screens, notifications, security, “not running” |
| `D2C_Boba_system-design.md.pdf` / `D2C_mwm-system-design.md.pdf` | PDF exports of the markdowns | Mirrors (minor OCR/cost-string extraction gaps) |
| `D2C_Platform_SASDD.docx` | Production SASDD (Volumes 1–11); Phase 0–12; M0–M9 | Secondary detail (GST, NFRs, threat model, folder, costs) |
| `Boba_Store_System_Design_Document.docx` | Thin outline (stack, tables, flows, scaling stages 1–6) | Low detail; Redis/RabbitMQ/K8s as future stages |
| `D2C Boba E-Commerce Architecture.pdf` | ChatGPT auth deep-dive (126 pages); email+password Phase 1 | **Not** authoritative architecture; auth tutorial only |

### Major discrepancies (pick + footnote)
1. **Auth launch identity:** Phone+Password (**sd/mwm**) vs Email+Password (**SASDD / Architecture PDF**) → **prefer Phone**.
2. **COD at launch:** Yes (**sd/mwm**) vs Phase 2 (**SASDD §7.2**) → **prefer Yes for MWM**.
3. **Refresh token TTL:** 30 days (**sd**) vs 7 days (**SASDD**) → **prefer 30 days**; note SASDD.
4. **Phase numbering:** sd 1–14 vs SASDD 0–12 (Cart/Wishlist/Checkout indices shifted) → **prefer sd 14-phase map**.
5. **Milestones:** sd M1–M6 vs SASDD M0–M9 → **prefer sd M1–M6** + mwm 15 steps.
6. **MWM infra cost vs Launch:** MWM ~₹11–16k (2 instances, Pro plans) vs Launch ~₹2–6.5k — different tiers, not a conflict.
7. **SASDD vs sd Launch totals:** ~₹3,050 fixed line vs ~₹2–6.5k range — different accounting (SASDD uses mid-ish fixed cells).
8. **Interakt per-conversation price:** mwm ₹0.35–0.80 vs SASDD ₹0.50–0.90.
9. **WhatsApp template names:** mwm vs SASDD naming variants (see §8).
10. **Endpoint 61/7/22 & “35 flows”:** in portfolio prompt only — **not confirmed** in design docs.
11. **Wishlist table naming:** `custom_*` (sd) vs unprefixed (SASDD) → **`custom_`**.
12. **Thin Boba docx** lists Redis/RabbitMQ/K8s as scaling stages 2–6; mwm defers Redis to 50k+ and rejects K8s for this stage.

---

*Generated by reconciling `_inputs/d2c-docs/`. No inventing of unverified endpoint/flow counts.*
