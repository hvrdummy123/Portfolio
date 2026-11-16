# Minimum Working Model — System Design
## Indian D2C Beverage Platform · 10,000 DAU Target
### Medusa v2 · Supabase · Next.js · Razorpay · Shiprocket

---

## What "Minimum Working Model" Means Here

This document describes the smallest complete system that:
- A real customer can register, browse, buy, and track an order
- An admin can manage products, orders, inventory, and shipments
- Handles 10,000 daily active users without architectural changes
- Has no placeholder pieces — every part described here is real and shippable

Nothing in here is "we'll figure it out later." If it's not needed for that end-to-end loop, it's not in this document.

---

## System Topology (10,000 DAU)

```
                        ┌─────────────────────────────────┐
                        │         Cloudflare               │
                        │   CDN · WAF · DDoS · SSL · DNS   │
                        └──────────────┬──────────────────┘
                                       │
              ┌────────────────────────┼────────────────────────┐
              ▼                        ▼                        ▼
    ┌─────────────────┐    ┌───────────────────────┐   ┌──────────────┐
    │  Vercel         │    │  Railway               │   │  Railway     │
    │  Next.js 14     │    │  Medusa v2 (Instance A)│   │  Medusa v2   │
    │  Storefront     │    │  2 vCPU · 2GB RAM      │   │  (Instance B)│
    │  + Admin UI     │    └──────────┬────────────┘   └──────┬───────┘
    └─────────────────┘               │                        │
                                      └──────────┬─────────────┘
                                                 │
                                    ┌────────────▼────────────┐
                                    │     Supabase            │
                                    │  PostgreSQL (Primary)   │
                                    │  + Connection Pooler    │
                                    │  (PgBouncer built-in)   │
                                    └─────────────────────────┘
```

**Load balancer:** Railway's built-in load balancer sits in front of both Medusa instances. You do not manage this manually — Railway handles it when you set replicas to 2. Cloudflare provides additional edge-level load distribution and caching for static assets and API responses where applicable.

**No Firebase. No mobile app. No WebSockets at MWM.**

All real-time-feeling updates (order status, tracking) are delivered via WhatsApp push (Interakt) and periodic polling from the frontend. This is sufficient for a D2C beverage store. WebSockets add complexity for zero user-visible benefit at this stage.

---

## Do We Need a Mobile App?

**No. Not at MWM.**

The Next.js storefront is a Progressive Web App (PWA). On mobile it:
- Installs to home screen (Add to Home Screen prompt)
- Works offline for browsing (cached product pages)
- Receives push notifications via Web Push API (browser-based, no FCM needed)

**Firebase / FCM decision:**

| If you want | Then you need |
|---|---|
| Push notifications on Android/iOS web browsers | Web Push API — no Firebase needed |
| Native Android/iOS app with background notifications | Firebase FCM |
| Nothing extra — WhatsApp delivers all order updates | Skip both |

**Decision for MWM:** Use WhatsApp (Interakt) for all transactional notifications. Skip Firebase and FCM entirely. The PWA handles any browser-based nudges if needed later. A native app is a future milestone once the product has proven demand.

---

# Part 1 — User Types & Module Ownership

## Two User Types

| User Type | Access Point | Auth Method |
|---|---|---|
| Customer | storefront (Next.js) | Phone + Password |
| Admin | Medusa Admin Panel (/app) | Email + Password (Medusa default) |

There is no third user type at MWM. Warehouse staff, support agents — these are all admin accounts with different permission levels. Medusa v2's admin RBAC handles this.

---

## Module Ownership Map

| Module | Customer Sees | Admin Sees | Overlap |
|---|---|---|---|
| Auth | Register, Login, Forgot Password, Profile | Admin login (separate) | None — separate auth systems |
| Products | Browse, Search, Filter, Detail Page | Create, Edit, Delete, Publish/Draft, Images | Product data is shared |
| Categories | Filter by category | Create, manage tree | Same data, different access |
| Cart | Add, Update, Remove, View totals | View abandoned carts | Cart data readable by admin |
| Wishlist | Add/remove products, view list | No admin view at MWM | None |
| Coupons | Enter code at checkout, see discount | Create, set limits, expiry, type | Coupon applies to customer cart |
| Checkout | Address, shipping, payment | — | — |
| Orders | My Orders list, order detail, tracking | All orders, status updates, fulfillment | Order data shared |
| Payments | Pay via Razorpay (UPI/Card/COD) | View payment status, trigger refunds | Payment record shared |
| Shipping | See estimated delivery, tracking link | Create shipment on Shiprocket, view AWB | Tracking number visible to both |
| Inventory | See in stock / out of stock | Manage stock levels, locations | Stock status shared |
| Returns | Request return from order detail | Approve/reject, schedule pickup | Return record shared |
| Notifications | Receive WhatsApp + Email | See notification log | Notification data stored centrally |
| Analytics | — | Sales dashboard, top products, revenue | Admin only |

---

# Part 2 — Customer: All Screens & Flows

## Screen Map

Every screen a customer can reach, and what happens when they tap it.

---

### A. Unauthenticated Screens

**Home Page**
- Hero banner (static, Cloudflare-cached)
- Featured products grid (ISR-cached, refreshes every 60s)
- Category strip (Matcha, Milk Tea, etc.)
- Best Sellers collection
- Tap product → Product Detail Page

**Product Listing Page (PLP)**
- URL: /products or /category/[handle]
- Filter sidebar: category, price range, tags (sugar-free, vegan)
- Sort: Price low-high, high-low, Newest, Popularity
- Tap product → Product Detail Page

**Product Detail Page (PDP)**
- URL: /products/[handle]
- Images carousel
- Name, description
- Ingredients, Nutrition (from product.metadata)
- Variant selector (250ml, 500ml, 1L)
- Price + GST note
- Stock badge (In Stock / Only 3 left / Out of Stock)
- Quantity selector
- Add to Cart → if logged in, adds to cart; if guest, adds to guest cart then prompts login at checkout
- Add to Wishlist → if not logged in, redirects to login

**Login Page**
- Phone number field
- Password field
- Submit → JWT issued → redirect to previous page or home
- Forgot Password link → OTP flow

**Register Page**
- Full Name, Phone Number, Password, Confirm Password
- Submit → account created → auto-login → redirect home

**Forgot Password**
- Enter phone → OTP sent via SMS
- Enter OTP → set new password → login

---

### B. Authenticated Customer Screens

**My Account (Dashboard)**
- Name, phone display
- Quick links: Orders, Addresses, Wishlist, Logout

**Edit Profile**
- Update name, email (optional)
- Cannot change phone number (it is the identity)

**Manage Addresses**
- List of saved addresses
- Add new address (India form fields)
- Edit / Delete address
- Set as default shipping

**My Wishlist**
- Grid of wishlisted products
- Remove button per item
- Add to Cart from wishlist
- If product goes out of stock, greyed out with label

**Cart Page**
- URL: /cart
- Line items: image, name, variant, qty stepper, price, remove
- Subtotal, Shipping estimate (pincode-based), GST breakdown, Total
- Coupon code input → apply → show discount line
- Proceed to Checkout button

**Checkout — Step 1: Address**
- Select saved address or add new
- Pincode validates serviceability via Shiprocket rate API

**Checkout — Step 2: Shipping Method**
- Show 1–3 options from Shiprocket (Standard, Express)
- Each shows courier name, estimated days, price
- Select one

**Checkout — Step 3: Payment**
- Order summary on right
- Payment options:
  - UPI (Razorpay)
  - Credit / Debit Card (Razorpay)
  - Net Banking (Razorpay)
  - Cash on Delivery (custom provider)
- Place Order → triggers payment flow

**Order Confirmation Page**
- URL: /orders/[id]/confirmation
- Order ID, items, address, payment method, estimated delivery
- WhatsApp message sent in background

**My Orders**
- URL: /account/orders
- List: order ID, date, total, status badge, item count
- Tap → Order Detail

**Order Detail**
- All items with images
- Delivery address
- Payment method + amount
- Status timeline: Placed → Confirmed → Shipped → Delivered
- Tracking number + courier + tracking URL (once shipped)
- Request Return button (visible if within return window and delivered)

**Return Request**
- Select items to return
- Select reason (dropdown)
- Submit → admin notified

---

### C. Guest Customer Behaviour

| Action | Guest Behaviour |
|---|---|
| Browse products | Full access |
| Add to cart | Allowed (guest cart, stored in cookie/session) |
| Add to wishlist | Redirect to login |
| Proceed to checkout | Must log in or register |
| Guest cart after login | Merged with existing cart if any |

---

# Part 3 — Admin: All Screens & Features

Admin lives at the Medusa Admin Panel (`/app`). Medusa ships this fully built. You extend it with custom views via Medusa's widget system.

## Admin Login

- Separate from customer auth
- Email + Password (Medusa's built-in admin auth)
- JWT-based session, stored as HttpOnly cookie
- No phone login for admin — email is standard for internal tools

---

## Admin Dashboard (Custom Extension)

Medusa's default home is an orders list. You add a custom dashboard widget showing:

| Metric | Source |
|---|---|
| Revenue today / this week / this month | Medusa orders query |
| Orders count by status | Medusa orders |
| Top 5 products by sales | Medusa order line items aggregation |
| Inventory alerts (< 10 units) | Medusa inventory levels |
| Pending returns | Medusa returns |
| Failed payments | Medusa payment sessions |

---

## Admin Module Access

### Products
- List all products with status (published/draft)
- Create product: name, description, images (upload to Supabase Storage), category, collection, tags
- Add variants: SKU, price (INR), weight, dimensions
- Set inventory quantity per variant per location
- Add metadata: ingredients, nutrition, shelf life
- Publish / unpublish

### Orders
- List all orders with filters (status, date range, customer)
- View order detail: customer, items, address, payment, fulfillment
- Manually update status (edge cases: customer called, COD issue)
- Trigger fulfillment: sends shipment creation request to Shiprocket
- View Shiprocket AWB + tracking status inline

### Customers
- List all customers
- View customer profile: orders history, total spend, addresses
- No editing of customer data (privacy boundary) except admin notes

### Inventory
- View stock levels per variant per location
- Adjust stock (manual corrections)
- Low stock alerts visible in dashboard

### Promotions (Coupons)
- Create coupon: code, type (% or fixed), amount, min order value, usage limit, per-customer limit, expiry
- List active/expired coupons
- View usage count per coupon

### Shipping Options
- Define shipping methods: Standard (5–7 days), Express (2–3 days)
- Set base prices (Shiprocket overrides these with actual quotes at checkout)

### Returns
- List all return requests with status
- View return detail: customer, order, items, reason
- Approve → triggers Shiprocket reverse pickup API call
- Reject → customer notified
- Mark received → trigger refund via Razorpay API

### Notifications Log (Custom Extension)
- Table of all sent notifications: customer, type, channel (email/WhatsApp/SMS), status, timestamp
- Useful for support: "Did the customer get the order confirmation?"

### Admin Users
- Medusa has built-in admin user management
- Add new admin users with email + role
- Roles at MWM: Super Admin (full access), Support (view orders + customers only)

---

# Part 4 — Payments: Razorpay Deep Dive

## What Razorpay Provides

| Feature | Used At MWM |
|---|---|
| Payment Gateway (UPI, Cards, Netbanking, Wallets) | Yes |
| Razorpay Checkout (hosted UI) | Yes |
| Webhook events | Yes |
| Refunds API | Yes |
| COD (via custom provider, not Razorpay) | Yes |
| Razorpay Subscriptions | No |
| Razorpay Capital | No |

## Razorpay API Charges

| Transaction Type | Fee |
|---|---|
| Domestic Cards | 2% + GST |
| UPI | 0% (currently, subject to change) |
| Net Banking | 2% + GST |
| COD (handled separately) | No Razorpay fee |
| Refunds | No additional fee; original transaction fee not reversed |
| International Cards | 3% + GST |

**Settlement:** T+2 days to your bank account. Razorpay dashboard shows all settlements.

## Razorpay Resources Required

| Resource | When Created | Where Stored |
|---|---|---|
| Razorpay Account | Once | Razorpay dashboard |
| API Key ID | Once | Environment variable |
| API Key Secret | Once | Environment variable (never exposed to frontend) |
| Webhook Secret | Once | Environment variable |
| Order (razorpay_order_id) | Per checkout | `payment_session.data` in Medusa DB |
| Payment ID (razorpay_payment_id) | After payment | `payment.data` in Medusa DB |
| Refund ID | Per refund | `refund.data` in Medusa DB |

## Payment Flow (Detailed)

```
Customer clicks "Place Order"
        ↓
Next.js calls Medusa: POST /store/payment-collections
        ↓
Medusa calls Razorpay API: Create Order
  → Razorpay returns: { id: "order_XXXX", amount, currency }
        ↓
Medusa stores order_XXXX in payment_session.data
        ↓
Next.js receives order_XXXX + Razorpay Key ID
        ↓
Next.js opens Razorpay Checkout modal (hosted by Razorpay)
  Customer pays via UPI / Card / Netbanking
        ↓
Razorpay calls your webhook: POST /webhooks/razorpay
  Event: payment.captured
  Payload: { order_id, payment_id, signature }
        ↓
Medusa verifies HMAC SHA256 signature
  If invalid → reject, log, return 400
  If valid → proceed
        ↓
Medusa completes cart → creates Order
        ↓
Inventory decremented
        ↓
Order confirmation: Email (Resend) + WhatsApp (Interakt)
        ↓
Shiprocket shipment creation triggered (async workflow)
```

## COD Flow

```
Customer selects Cash on Delivery
        ↓
No Razorpay involved
        ↓
Medusa creates Order with payment_status: pending
        ↓
Order confirmation WhatsApp sent (with COD note)
        ↓
Shiprocket shipment created with COD flag
        ↓
On delivery: Shiprocket webhook → payment_status: captured
        ↓
Admin manually reconciles COD collections weekly
```

## Refund Flow

```
Admin approves return in admin panel
        ↓
Medusa calls Razorpay Refund API
  POST /v1/payments/{payment_id}/refund
  { amount: full or partial, notes: {reason} }
        ↓
Razorpay processes refund (3–7 business days to customer)
        ↓
Medusa stores refund_id in refund.data
        ↓
Customer notified via WhatsApp + Email
```

---

# Part 5 — Data: What Is Stored, Where, and in What Format

## Data Layers

| Layer | System | Format |
|---|---|---|
| Transactional data | Supabase PostgreSQL | Relational rows |
| Product images | Supabase Storage or Cloudflare R2 | JPG/WebP files |
| Session tokens | HttpOnly cookies (browser) | JWT string |
| OTP codes | PostgreSQL (`custom_otp`) | Hashed string + expiry timestamp |
| Razorpay IDs | PostgreSQL (`payment_session.data`) | JSONB |
| Shiprocket data | PostgreSQL (`custom_shipment`) | Relational rows |
| WhatsApp / Email logs | PostgreSQL (`custom_notification_log`) | Relational rows |
| Admin session | HttpOnly cookie | JWT string |

## Key Data Flows

### Registration
- **Received:** phone, name, password (plain text over HTTPS)
- **Created:** customer row, auth_identity row, hashed password stored in auth_identity
- **Stored:** PostgreSQL
- **Format:** bcrypt hash (never store plain password)

### Product Catalog
- **Received:** admin uploads product data + images
- **Created:** product, product_variant, price_set, money_amount, product_image rows; image file in object storage
- **Stored:** PostgreSQL (metadata) + Supabase Storage (images)
- **Format:** JSONB for metadata (ingredients, nutrition), URL string for images

### Cart
- **Received:** customer adds variant_id + quantity
- **Created:** cart row (if new), cart_line_item row
- **Stored:** PostgreSQL
- **Format:** UUID references to variant + cart

### Order
- **Received:** cart_id, address, shipping_method, payment confirmation from Razorpay
- **Created:** order row, order_line_item rows, order_address row (snapshot), payment row
- **Stored:** PostgreSQL
- **Key:** address is snapshotted at order time — if customer later changes address, the order still shows the original delivery address

### Razorpay Webhook Payload
- **Received at:** POST /webhooks/razorpay
- **Format:** JSON
- **Key fields:** event (payment.captured / payment.failed), payload.payment.entity.id, payload.payment.entity.order_id, payload.payment.entity.amount
- **Stored:** relevant IDs stored in payment.data as JSONB; raw webhook body logged for audit

### Shiprocket Webhook Payload
- **Received at:** POST /webhooks/shiprocket
- **Format:** JSON
- **Key fields:** awb_code, current_status, estimated_delivery_date
- **Stored:** custom_shipment table updated; order status updated in Medusa

### Notification Log Entry
- **Created on:** every send attempt (email, WhatsApp, SMS)
- **Stored:** custom_notification_log
- **Fields:** id, customer_id, order_id (nullable), channel (email/whatsapp/sms), template_name, status (sent/failed), provider_response, created_at

---

# Part 6 — Notifications: Full Specification

## Channels & Providers

| Channel | Provider | Cost Model |
|---|---|---|
| WhatsApp | Interakt | Per conversation (₹0.35–₹0.80 per 24hr window) |
| Email | Resend | Free to 3,000/month; ₹700/month for 50,000 |
| SMS (OTP only) | MSG91 | ₹0.20–₹0.40 per SMS |

## All Notification Events

| Event | WhatsApp | Email | SMS |
|---|---|---|---|
| Account registered | — | Welcome email | — |
| Password reset OTP | — | — | OTP (MSG91) |
| Order placed (online payment) | ✅ Order summary | ✅ Order confirmation + invoice | — |
| Order placed (COD) | ✅ COD order summary | ✅ Confirmation | — |
| Payment failed | ✅ Retry link | ✅ Payment failed | — |
| Shipment created | ✅ Tracking link + AWB | ✅ Shipping notification | — |
| Out for delivery | ✅ "On its way" | — | — |
| Delivered | ✅ Delivered confirmation | — | — |
| Return approved | ✅ Pickup scheduled | ✅ Return approved | — |
| Refund processed | — | ✅ Refund details | — |

## How Notifications Are Triggered

Medusa v2 uses an event bus (in-process at MWM, no external queue needed). You write subscribers that listen to events.

```
Event: order.placed
    ↓
Subscriber fires (same process, async)
    ↓
Calls Interakt API → WhatsApp sent
Calls Resend API → Email sent
    ↓
Result logged in custom_notification_log
```

**No message queue (RabbitMQ, SQS) at MWM.** Medusa's in-process event bus is sufficient for 10,000 DAU. If a notification fails, it logs the failure. Retry logic is added in a later phase.

## WhatsApp Template Requirements

Interakt requires pre-approved WhatsApp message templates (approved by Meta). Templates needed at MWM:

| Template Name | Variables |
|---|---|
| order_confirmation | customer_name, order_id, total, items_summary |
| shipment_created | customer_name, order_id, courier_name, awb, tracking_url |
| out_for_delivery | customer_name, order_id |
| delivered | customer_name, order_id |
| return_approved | customer_name, order_id, pickup_date |
| payment_failed | customer_name, order_id, retry_url |

Template approval takes 24–48 hours. Submit templates before launch.

---

# Part 7 — REST vs WebSocket

## Decision: REST Only at MWM

| Protocol | Use Case | MWM Decision |
|---|---|---|
| REST (HTTP) | All API calls — product fetch, cart, orders, auth | ✅ Used |
| WebSocket | Real-time: live order tracking, chat, live inventory | ❌ Not at MWM |
| Server-Sent Events | One-way push: order status updates in browser | ❌ Not at MWM |
| Polling | Periodic refresh of order status on order detail page | ✅ Simple fallback if needed |

**Why no WebSocket:** A D2C beverage store does not require real-time updates in the browser. Order status changes happen over hours and days. WhatsApp delivers push notifications far more reliably than a browser WebSocket connection. Adding WebSockets adds infrastructure complexity (sticky sessions or a pub-sub layer like Redis) for zero user-visible benefit at this traffic level.

**The only real-time-feeling interaction:** When Razorpay Checkout completes, Razorpay's hosted modal directly calls a callback function in the browser. This is Razorpay's own JS handling — not a WebSocket you manage.

## API Protocol Summary

| API Type | Protocol | Auth |
|---|---|---|
| Customer-facing store APIs | REST / HTTPS | JWT (HttpOnly cookie) |
| Admin APIs | REST / HTTPS | Admin JWT (HttpOnly cookie) |
| Razorpay webhook | REST / HTTPS (inbound POST) | HMAC signature |
| Shiprocket webhook | REST / HTTPS (inbound POST) | Secret token in header |
| Razorpay outbound calls | REST / HTTPS | API Key + Secret |
| Shiprocket outbound calls | REST / HTTPS | Bearer token (refreshed) |
| Interakt outbound calls | REST / HTTPS | API Key |
| Resend outbound calls | REST / HTTPS | API Key |
| MSG91 OTP | REST / HTTPS | Auth Key |

---

# Part 8 — Load Balancer & Infrastructure

## Load Balancer: Yes, Required at 10,000 DAU

**10,000 DAU sizing:**
- Assume 10,000 active users across the day
- Peak hour = ~20% of DAU in 1 hour = 2,000 concurrent users
- Average API call per session = 15–20 requests
- Peak RPS estimate = 2,000 × 20 / 3600 ≈ 11 RPS sustained, with spikes to 30–50 RPS

One Medusa instance (2 vCPU / 2GB RAM) handles ~50–100 RPS comfortably. So technically one instance is sufficient for 10,000 DAU. However, **two instances are recommended** for zero-downtime deployments and fault tolerance — if one instance crashes or restarts during a deploy, the other continues serving traffic.

## Load Balancer Decision

**Use Railway's built-in load balancer.** Set `replicas: 2` in your Railway service config. Railway automatically routes incoming traffic across both instances using round-robin. You do not run or configure any load balancer software (no NGINX, no HAProxy, no AWS ALB).

Cloudflare also provides edge-level routing before traffic even reaches Railway:
- Static assets (images, JS, CSS) served from Cloudflare's cache — never reach Railway
- Cached API responses (e.g., product listings) served from Cloudflare edge

## Infrastructure Specification for 10,000 DAU

### Compute

| Service | Config | Notes |
|---|---|---|
| Medusa v2 (Railway) | 2 instances × 2 vCPU / 2GB RAM | Railway auto-balances |
| Next.js (Vercel) | Serverless functions | Auto-scales, no config needed |
| Railway load balancer | Built-in | No additional setup |

### Database

| Config | Value |
|---|---|
| Supabase plan | Pro (required for 10K DAU) |
| Connection pooling | PgBouncer (Supabase built-in) — transaction mode |
| Max connections | 60 from Medusa (30 per instance) |
| Database RAM | 1GB (Supabase Pro) |
| Storage | 8GB provisioned |
| Backups | Daily (Supabase Pro) |

**Why PgBouncer matters:** PostgreSQL has a hard connection limit. Without pooling, 2 Medusa instances × many concurrent requests can exhaust connections. PgBouncer proxies connections so the DB sees far fewer open connections than actual concurrent requests.

### Storage

| Asset | Storage | CDN |
|---|---|---|
| Product images | Supabase Storage or Cloudflare R2 | Cloudflare CDN |
| Order invoices (PDF, future) | Supabase Storage | Signed URL, no CDN |
| Admin uploads (CSV, etc.) | Supabase Storage | No CDN |

**Image sizing:**
- Product images: max 800KB each, WebP format preferred
- 50 products × 6 images × 800KB = ~240MB total image storage (trivial)

### Network

| Traffic Type | Path | Volume at 10K DAU |
|---|---|---|
| Product page loads | Cloudflare cache → Vercel | ~80% cache hit rate |
| API calls (cart, auth, orders) | Cloudflare → Railway Medusa | ~50K requests/day |
| Image loads | Cloudflare CDN | Cached at edge |
| Webhook inbound (Razorpay, Shiprocket) | Direct to Railway | Small volume |
| Notification outbound | Railway → Interakt / Resend / MSG91 | Per order/event |

---

# Part 9 — Cost at 10,000 DAU

## Monthly Cost Breakdown

| Service | Config | Monthly Cost (INR) |
|---|---|---|
| Railway — Medusa (2 instances) | 2 × 2vCPU / 2GB RAM | ₹3,500–₹6,000 |
| Supabase Pro | 8GB storage, daily backups, pooler | ₹1,700 (~$20) |
| Vercel Pro | Serverless Next.js, 1TB bandwidth | ₹1,700 (~$20) |
| Cloudflare Free | CDN, WAF, SSL | ₹0 |
| Razorpay | 2% per transaction (volume-based) | Depends on GMV |
| Resend | 50,000 emails/month | ₹700 (~$8.33) |
| Interakt (WhatsApp) | Growth plan | ₹3,500–₹6,000 |
| MSG91 (OTP SMS) | ~500 OTPs/month × ₹0.30 | ₹150–₹500 |
| Shiprocket | Per shipment (charged to order) | Pass-through |
| Domain | .in or .com | ₹1,200/year → ₹100/month |
| **Total (excl. Razorpay GMV fee)** | | **~₹11,000–₹16,000/month** |

**Razorpay GMV cost example:**
- 500 orders/month × avg order value ₹300 = ₹1,50,000 GMV
- Razorpay 2% = ₹3,000/month in gateway fees

## Cost Scaling Trigger Points

| DAU | Change Required | Additional Cost |
|---|---|---|
| Up to 10,000 | Current spec | As above |
| 10,000–50,000 | Supabase read replica + Railway 4 instances | +₹5,000–₹10,000 |
| 50,000+ | Dedicated DB server, Redis cache layer, CDN tuning | Major rearchitecture |

---

# Part 10 — Security Checklist (MWM)

| Area | Control |
|---|---|
| All traffic | HTTPS enforced via Cloudflare (HTTP → HTTPS redirect) |
| JWT storage | HttpOnly cookies (not localStorage) — prevents XSS token theft |
| Password storage | bcrypt hashing (Medusa default) |
| Webhook verification | HMAC SHA256 signature on every Razorpay + Shiprocket webhook |
| API rate limiting | Cloudflare rate limiting rules (100 req/min per IP on auth endpoints) |
| Admin panel | Only accessible at /app, separate auth, IP allowlist optional |
| Environment variables | Never commit secrets to git; use Railway environment management |
| SQL injection | Not possible via Medusa ORM (parameterized queries) |
| CORS | Medusa configured to allow only your Vercel domain |
| OTP brute force | Max 3 OTP attempts, then 15-minute lockout per phone |

---

# Part 11 — Minimal Moving Parts Summary

This is the final "what actually needs to run" list for MWM:

| Component | Count | Runs On |
|---|---|---|
| Next.js storefront | 1 (serverless, auto-scales) | Vercel |
| Medusa v2 backend | 2 instances | Railway |
| PostgreSQL database | 1 (primary) | Supabase |
| PgBouncer (connection pool) | 1 (built-in Supabase) | Supabase |
| Object storage | 1 bucket | Supabase Storage |
| CDN / WAF | 1 zone | Cloudflare |
| Razorpay | External SaaS | Razorpay |
| Shiprocket | External SaaS | Shiprocket |
| Interakt (WhatsApp) | External SaaS | Interakt |
| Resend (Email) | External SaaS | Resend |
| MSG91 (SMS OTP) | External SaaS | MSG91 |

**Not running at MWM:**
- Redis (add when cart/session performance becomes a concern at 50K+ DAU)
- RabbitMQ / any message queue (Medusa's in-process event bus is sufficient)
- Firebase / FCM (WhatsApp handles notifications)
- Meilisearch / Elasticsearch (add when product count > 50)
- Any Kubernetes (wildly over-engineered for this scale)
- Separate worker process (Medusa handles background jobs in-process)
- WebSocket server
- Mobile app (PWA is sufficient)

---

# Part 12 — Development Sequence for MWM

Build in this exact order. Each step is independently testable before the next begins.

| Step | What You Build | Test Method |
|---|---|---|
| 1 | Medusa running + Supabase connected + migrations | GET /health returns 200 |
| 2 | Phone+password auth provider | Register + login via Postman |
| 3 | Product catalog in admin + API | GET /store/products returns products |
| 4 | Next.js storefront: Home + PLP + PDP | Visual check in browser |
| 5 | Cart API + Cart UI | Add to cart, check cart totals |
| 6 | Wishlist custom module | Add/remove wishlist items |
| 7 | Checkout flow: address + shipping | Complete checkout to payment step |
| 8 | Razorpay integration + COD | Test payment in test mode |
| 9 | Razorpay webhook + order creation | Trigger test webhook, verify order |
| 10 | Shiprocket: create shipment from order | Create test shipment, get AWB |
| 11 | Resend: order confirmation email | Verify email arrives |
| 12 | Interakt: WhatsApp order notification | Verify WhatsApp message |
| 13 | Returns + refund flow | Submit return, approve, trigger refund |
| 14 | Admin dashboard custom widget | View in Medusa /app |
| 15 | Cloudflare + 2 Railway instances | Deploy, test with load |

---

*Document version: 2.0 — MWM spec for 10,000 DAU · Medusa v2 · Supabase · No Firebase · No WebSockets · REST only*
