# System Design Document
## Indian D2C Beverage E-Commerce Platform
### Built on Medusa v2 + Supabase + Next.js

---

## Project Overview

A production-grade, Indian-market D2C e-commerce platform for selling bottled beverages (matcha, brown sugar, classic milk tea, etc.) directly to consumers. Built as a modular monolith using Medusa v2 as the commerce engine, Supabase (PostgreSQL) as the primary database, and Next.js as the storefront.

**Core principles:**
- Phone-first experience (Indian users are mobile-centric)
- WhatsApp for all post-purchase communication
- Medusa v2 handles commerce primitives; custom modules for everything else
- Never reinvent what Medusa already does well

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Commerce Backend | Medusa v2 | Open-source, modular, self-hosted |
| Database | Supabase (PostgreSQL) | Managed Postgres, free tier generous |
| Storefront | Next.js 14 (App Router) | SSR, ISR, SEO-friendly |
| Hosting – Backend | Railway | Simple deploy, affordable, no infra overhead |
| Hosting – Frontend | Vercel | Best Next.js platform |
| CDN + Security | Cloudflare | Free tier sufficient at launch |
| Payments | Razorpay | India-first, supports UPI, cards, netbanking |
| Shipping | Shiprocket | Aggregates 17+ couriers, COD support |
| Email | Resend | Developer-friendly, reliable deliverability |
| WhatsApp | Interakt | Order notifications, shipping updates |
| OTP / SMS | MSG91 or 2Factor | Indian SMS provider, reliable delivery |
| Object Storage | Supabase Storage or Cloudflare R2 | Product images, receipts |
| Search (future) | Meilisearch | Fast, self-hostable, typo-tolerant |

---

## Architecture Overview

```
User (Browser / Mobile)
        |
        ▼
   Cloudflare (CDN, WAF, SSL)
        |
   ┌────┴────────────────────┐
   ▼                         ▼
Vercel (Next.js)         Railway (Medusa v2)
   |                         |
   └──────── API calls ──────┘
                             |
                    Supabase PostgreSQL
                             |
                   ┌─────────┼──────────┐
                   ▼         ▼          ▼
               Razorpay  Shiprocket  Resend / Interakt
```

**Request flow:**
- Storefront (Next.js on Vercel) calls Medusa v2 REST APIs
- Medusa v2 runs on Railway, connects to Supabase PostgreSQL
- Webhooks from Razorpay and Shiprocket hit Medusa directly
- Notifications dispatched via Resend (email) and Interakt (WhatsApp)

---

## Database Strategy

Medusa v2 uses its own schema (managed by Medusa migrations). You connect it to your Supabase PostgreSQL instance. Custom tables live in the same database, separate schema or with a clear naming prefix.

**Medusa v2 manages its own tables via migrations. You do not create or alter Medusa's tables manually.**

Custom tables you create are prefixed `custom_` to avoid collision.

---

# Phase 1 — Authentication

## Decision: Phone Number + Password (Primary)

| Method | UX | Cost | Complexity | Decision |
|---|---|---|---|---|
| Phone + Password | Good | Very Low | Low | ✅ Launch |
| Phone + OTP (passwordless) | Excellent | Medium (SMS cost) | Medium | 🔜 Phase 2 |
| Google Login | Excellent | Free | Medium | 🔜 Phase 2 |
| Email + Password | Good | Very Low | Low | Optional add-on |
| WhatsApp OTP | Very Good for India | Medium | High | ❌ Not initially |

**Reasoning:** Phone number is the primary identifier in India. Password keeps SMS costs at zero at launch. OTP login is added in Phase 2 once you've confirmed repeat purchase rates justify SMS spend.

## Medusa v2 Auth — What It Provides

Medusa v2 ships with an `auth` module. By default it supports `emailpass` provider. Phone+password requires a **custom auth provider** built on top of Medusa's auth module interface.

**What Medusa handles:** JWT issuance, session management, customer entity creation, protected route middleware.

**What you build:** Custom `phonepass` auth provider that validates phone + password, plugged into Medusa's auth module.

## Auth Flow

```
Registration:
  User enters phone + password
       ↓
  Validate phone format (Indian: +91XXXXXXXXXX)
       ↓
  Check phone not already registered
       ↓
  Hash password (bcrypt, handled by Medusa)
       ↓
  Create customer record in Medusa
       ↓
  Issue JWT
       ↓
  Return token + customer data

Login:
  User enters phone + password
       ↓
  Look up customer by phone
       ↓
  Verify password hash
       ↓
  Issue JWT (access token + refresh token)
       ↓
  Return to client

Forgot Password:
  User enters phone
       ↓
  Send OTP via SMS (MSG91 / 2Factor)
       ↓
  User enters OTP (valid 10 minutes)
       ↓
  User sets new password
       ↓
  Invalidate OTP
```

## JWT Configuration

| Setting | Value |
|---|---|
| Access token TTL | 15 minutes |
| Refresh token TTL | 30 days |
| Storage (frontend) | HttpOnly cookie (not localStorage) |
| Algorithm | HS256 |

## Relevant Medusa v2 Tables

| Table | Purpose | You Touch? |
|---|---|---|
| `customer` | Core customer record | No — Medusa manages |
| `customer_group` | Group customers for pricing | No |
| `auth_identity` | Auth provider + identity linkage | No — Medusa manages |

## Custom Tables You Create

| Table | Purpose |
|---|---|
| `custom_otp` | Stores OTP, phone, expiry, used flag for password reset |

---

# Phase 2 — Customer Profile & Addresses

## What Medusa Provides

Medusa v2 has full customer profile and address management built in.

| Medusa Table | Purpose |
|---|---|
| `customer` | name, email, phone, metadata |
| `customer_address` | address_1, address_2, city, state, postal_code, country_code, phone, is_default_shipping, is_default_billing |

## What You Build

- Frontend pages: My Account, Edit Profile, Manage Addresses
- No custom backend tables needed here

## Address Fields for India

Standard address form fields for Indian users:
- Full Name
- Phone (alternate)
- Address Line 1
- Address Line 2 (optional)
- Landmark (optional but very useful for Indian delivery)
- City
- State (dropdown — all Indian states)
- Pincode (6 digits)
- Country (fixed: India)

---

# Phase 3 — Product Catalog

## Medusa v2 Product Model

Medusa v2 has a rich product module. Key concepts:

| Concept | Description |
|---|---|
| Product | Base product entity (name, description, images, status) |
| Product Variant | Specific purchasable SKU (e.g., 250ml, 500ml) |
| Product Option | Dimension of variation (e.g., Size) |
| Product Category | Hierarchical grouping (e.g., Matcha, Milk Tea) |
| Product Collection | Curated lists (e.g., Best Sellers, New Arrivals) |
| Product Tag | Flat labels (e.g., sugar-free, vegan) |

## Relevant Medusa v2 Tables

| Table | Purpose |
|---|---|
| `product` | Core product |
| `product_variant` | SKUs with price + stock |
| `product_option` | Variant options (Size, Flavor) |
| `product_option_value` | Option values (250ml, 500ml) |
| `product_category` | Category tree |
| `product_collection` | Collections |
| `product_tag` | Tags |
| `product_image` | Image URLs |
| `price_set` | Prices per variant |
| `money_amount` | Actual price amounts |

## Custom Fields You May Add (via metadata)

Medusa allows `metadata` JSON on most entities. Use this for:
- Ingredients list
- Nutrition facts
- Shelf life
- Allergen info

No separate table needed for these — use `product.metadata`.

## Catalog Architecture

```
Category: Matcha
  └── Product: Ceremonial Grade Matcha Latte
        ├── Variant: 250ml — ₹149
        ├── Variant: 500ml — ₹279
        └── Variant: 1L — ₹499

Category: Milk Tea
  └── Product: Classic Milk Tea
        ├── Variant: 250ml — ₹99
        └── Variant: 500ml — ₹189
```

## Storage for Images

Product images stored in Supabase Storage or Cloudflare R2. URLs stored in `product_image`. Images served via Cloudflare CDN.

**Image sizes per product:** 4–8 images recommended. Each image ≈ 200–500 KB after compression.

---

# Phase 4 — Product Detail Page

No new backend tables. Pulls from existing product + variant + price data.

**Product page data requirements:**
- Product name, description, ingredients (from metadata)
- Images (carousel)
- Variants with prices
- Stock availability per variant
- Add to cart action
- Wishlist toggle
- Related products (same category)

---

# Phase 5 — Cart

## Medusa v2 Cart Module

Medusa v2's cart module is fully built out. You use it as-is.

| Medusa Table | Purpose |
|---|---|
| `cart` | Cart entity, linked to customer or guest |
| `cart_line_item` | Each product + variant in cart |
| `cart_address` | Shipping/billing address on cart |
| `cart_shipping_method` | Selected shipping method |
| `cart_promotion` | Applied promotions/coupons |

## Cart Behavior

| Scenario | Behavior |
|---|---|
| Guest user | Cart created with no customer_id |
| User logs in | Cart associated with customer_id |
| User already had a cart | Merge guest cart with existing customer cart |
| Cart expiry | 30 days idle |

## Stock Reservation

Medusa v2 handles inventory via its `inventory` module. Stock is reserved at checkout (not at add-to-cart) to prevent locking inventory unnecessarily.

---

# Phase 6 — Wishlist (Custom Module)

Medusa does not include a wishlist. You build this as a custom Medusa module.

## Custom Tables

| Table | Column | Type | Notes |
|---|---|---|---|
| `custom_wishlist` | id | uuid PK | |
| | customer_id | varchar | FK to customer |
| | created_at | timestamp | |
| `custom_wishlist_item` | id | uuid PK | |
| | wishlist_id | uuid | FK to custom_wishlist |
| | product_variant_id | varchar | FK to product_variant |
| | created_at | timestamp | |

## API Routes (Custom)

| Method | Route | Description |
|---|---|---|
| GET | /store/wishlist | Get current customer's wishlist |
| POST | /store/wishlist/items | Add item |
| DELETE | /store/wishlist/items/:id | Remove item |

All routes require authentication.

---

# Phase 7 — Checkout Flow

## Flow

```
Cart Review
    ↓
Enter / Select Delivery Address
    ↓
Select Shipping Method (via Shiprocket rate API)
    ↓
Apply Coupon (optional)
    ↓
Order Summary + Price Breakdown
    ↓
Choose Payment Method:
    - UPI
    - Credit / Debit Card
    - Net Banking
    - COD (Cash on Delivery)
    ↓
Initiate Payment (Razorpay)
    ↓
Payment Success / Failure
    ↓
Order Created
```

## Medusa v2 Tables Involved

| Table | Purpose |
|---|---|
| `cart` | Cart being checked out |
| `cart_address` | Delivery address |
| `cart_shipping_method` | Chosen shipping |
| `shipping_option` | Available shipping methods |
| `payment_session` | Razorpay payment session |
| `payment_collection` | Groups payment sessions |

## COD (Cash on Delivery)

COD is critical for Indian D2C. Medusa supports custom payment providers. You build a simple COD provider that marks payment as "pending" and completes on delivery confirmation.

---

# Phase 8 — Razorpay Integration

## Custom Medusa Payment Provider

You build a Razorpay payment provider plugin for Medusa v2. It implements Medusa's `AbstractPaymentProvider` interface.

## Payment Flow

```
Frontend initiates checkout
    ↓
Medusa creates PaymentSession (calls Razorpay: create order)
    ↓
Frontend receives Razorpay order_id
    ↓
Frontend opens Razorpay Checkout (UPI / Card / Netbanking)
    ↓
User pays
    ↓
Razorpay sends webhook to Medusa: payment.captured
    ↓
Medusa verifies webhook signature
    ↓
Medusa completes cart → creates Order
    ↓
Inventory decremented
    ↓
Order confirmation email + WhatsApp sent
```

## Webhook Security

Every Razorpay webhook must be verified using the webhook secret + HMAC SHA256. Never process a webhook without signature verification.

## Medusa v2 Tables

| Table | Purpose |
|---|---|
| `payment_session` | Razorpay order_id stored here |
| `payment` | Payment record after capture |
| `payment_collection` | Groups payments for an order |
| `order` | Created after payment confirmed |

---

# Phase 9 — Orders

## Medusa v2 Order Module

Medusa v2 has a full order management system.

| Medusa Table | Purpose |
|---|---|
| `order` | Core order record |
| `order_line_item` | Products in order |
| `order_address` | Delivery address snapshot |
| `order_shipping_method` | Shipping used |
| `order_payment` | Payment reference |
| `order_fulfillment` | Fulfillment / shipment records |
| `return` | Return requests |
| `refund` | Refund records |

## Order Status Flow

```
pending → processing → shipped → delivered
                              ↘ cancelled
                              ↘ return_requested → returned → refunded
```

## Customer Order History

Customers see all their orders under "My Orders" with status, tracking link, and items. No custom tables needed — all from Medusa's `order` module.

---

# Phase 10 — Shiprocket Integration

## What Shiprocket Does

Aggregates 17+ Indian couriers (Delhivery, BlueDart, Ecom Express, etc.). You create a shipment, get a tracking number, and print a label.

## Custom Medusa Fulfillment Provider

You build a Shiprocket fulfillment provider implementing Medusa's `AbstractFulfillmentProvider`.

## Shipment Flow

```
Order confirmed + payment captured
    ↓
Medusa triggers fulfillment workflow
    ↓
Call Shiprocket API: create shipment
    ↓
Shiprocket assigns courier + AWB (tracking number)
    ↓
Store AWB in order fulfillment record
    ↓
Send WhatsApp message with tracking link
    ↓
Shiprocket webhook → Medusa: status updates
    ↓
Order status updated (shipped, out for delivery, delivered)
```

## Custom Tables

| Table | Column | Notes |
|---|---|---|
| `custom_shipment` | id | PK |
| | order_id | FK to order |
| | shiprocket_shipment_id | External ID |
| | awb_number | Tracking number |
| | courier_name | e.g., Delhivery |
| | status | current status |
| | estimated_delivery | date |
| | tracking_url | direct link |
| | updated_at | |

---

# Phase 11 — Notifications

## Channels

| Channel | Provider | Use Case |
|---|---|---|
| Email | Resend | Order confirmation, invoices, password reset |
| WhatsApp | Interakt | Order updates, shipping, delivery |
| SMS | MSG91 / 2Factor | OTP only (password reset) |
| Push (future) | — | Not at launch |

## Notification Triggers

| Event | Email | WhatsApp |
|---|---|---|
| Registration | Welcome email | — |
| Order placed | Order confirmation | Order confirmation |
| Payment received | Receipt / invoice | — |
| Shipment created | Shipping notification | Tracking link + courier |
| Out for delivery | — | "Your order is nearby" |
| Delivered | — | Delivery confirmation |
| Return approved | — | Pickup scheduled |
| Refund processed | Refund email | — |
| Password reset | — | OTP via SMS only |

## Medusa v2 Notification Module

Medusa v2 has a notification module. You register Resend as a notification provider. For WhatsApp (Interakt), you use a custom subscriber that listens to Medusa events and calls Interakt's API.

## Custom Tables

| Table | Purpose |
|---|---|
| `custom_notification_log` | Audit log of all notifications sent (event, channel, status, timestamp) |

---

# Phase 12 — Coupons & Promotions

## Medusa v2 Promotion Module

Medusa v2 includes a full promotion engine.

| Feature | Supported |
|---|---|
| Percentage discount | ✅ |
| Fixed amount discount | ✅ |
| Free shipping | ✅ |
| Min order value | ✅ |
| Usage limits | ✅ |
| Per-customer limits | ✅ |
| Expiry dates | ✅ |
| Product-specific | ✅ |

No custom tables needed for basic promotions. Use Medusa's admin to create coupons.

---

# Phase 13 — Returns & Refunds

## Return Flow

```
Customer requests return from order history
    ↓
Admin reviews request in Medusa admin
    ↓
Admin approves / rejects
    ↓
If approved: Shiprocket reverse pickup scheduled
    ↓
Item picked up from customer
    ↓
Item received at warehouse
    ↓
Admin marks return complete
    ↓
Refund issued via Razorpay (original payment method)
    ↓
Inventory restored
    ↓
Customer notified via WhatsApp + Email
```

## Medusa v2 Tables

| Table | Purpose |
|---|---|
| `return` | Return request |
| `return_item` | Items being returned |
| `refund` | Refund record |

## Return Policy (Business Decision)

Define clearly before launch:
- Return window (e.g., 7 days from delivery)
- Acceptable reasons (damaged, wrong item, quality issue)
- Non-returnable items (opened beverages)

---

# Phase 14 — Admin Panel

Medusa v2 ships with a full admin dashboard at `/app`. Covers:

| Feature | Built-in |
|---|---|
| Product management | ✅ |
| Order management | ✅ |
| Customer list | ✅ |
| Promotions | ✅ |
| Inventory | ✅ |
| Returns | ✅ |
| Shipping options | ✅ |

## Custom Admin Extensions

You add custom views for:
- Shipment status overview (Shiprocket data)
- Notification logs
- WhatsApp broadcast (future)
- COD reconciliation report
- Custom analytics dashboard (sales by product, category, region)

---

# Complete Table Reference

## Medusa v2 Tables (Do Not Modify Directly)

| Table | Owned By | Key Fields |
|---|---|---|
| `customer` | Medusa | id, email, phone, first_name, last_name, has_account |
| `customer_address` | Medusa | customer_id, address_1, city, province, postal_code, country_code |
| `auth_identity` | Medusa | provider_id, entity_id, provider_metadata |
| `product` | Medusa | id, title, description, status, metadata |
| `product_variant` | Medusa | id, product_id, sku, barcode, weight |
| `product_option` | Medusa | id, product_id, title |
| `product_option_value` | Medusa | id, option_id, value |
| `product_category` | Medusa | id, name, handle, parent_category_id |
| `product_collection` | Medusa | id, title, handle |
| `product_image` | Medusa | id, product_id, url |
| `price_set` | Medusa | id |
| `money_amount` | Medusa | id, price_set_id, amount, currency_code |
| `inventory_item` | Medusa | id, sku, requires_shipping |
| `inventory_level` | Medusa | id, inventory_item_id, location_id, stocked_quantity |
| `stock_location` | Medusa | id, name, address |
| `cart` | Medusa | id, customer_id, status, currency_code, region_id |
| `cart_line_item` | Medusa | id, cart_id, product_variant_id, quantity, unit_price |
| `cart_address` | Medusa | id, cart_id, first_name, last_name, address_1, city, postal_code |
| `cart_shipping_method` | Medusa | id, cart_id, shipping_option_id, amount |
| `payment_collection` | Medusa | id, cart_id, currency_code, amount |
| `payment_session` | Medusa | id, payment_collection_id, provider_id, data (Razorpay order ID here) |
| `payment` | Medusa | id, provider_id, amount, status |
| `order` | Medusa | id, customer_id, status, currency_code, total |
| `order_line_item` | Medusa | id, order_id, title, quantity, unit_price |
| `order_address` | Medusa | snapshot of address at time of order |
| `order_fulfillment` | Medusa | id, order_id, provider_id, status |
| `return` | Medusa | id, order_id, status |
| `return_item` | Medusa | id, return_id, item_id, quantity |
| `refund` | Medusa | id, payment_id, amount, reason |
| `promotion` | Medusa | id, code, type, status |
| `promotion_rule` | Medusa | conditions for promotion |
| `region` | Medusa | id, name, currency_code, countries |
| `shipping_option` | Medusa | id, name, provider_id, price_type |
| `shipping_profile` | Medusa | id, name, type |

## Custom Tables You Build

| Table | Purpose |
|---|---|
| `custom_otp` | OTP for password reset via SMS |
| `custom_wishlist` | Customer wishlists |
| `custom_wishlist_item` | Items in wishlist |
| `custom_shipment` | Shiprocket shipment metadata |
| `custom_notification_log` | Audit log of all sent notifications |

---

# Infrastructure & Cost Estimates

## Launch Configuration (0–100 orders/month)

| Service | Plan | Est. Monthly Cost (INR) |
|---|---|---|
| Railway (Medusa backend) | Starter — 1 vCPU, 512MB RAM | ₹400–₹800 |
| Supabase (PostgreSQL) | Free tier — 500MB DB, 1GB storage | ₹0 |
| Vercel (Next.js) | Hobby / Pro | ₹0–₹1,700 |
| Cloudflare | Free | ₹0 |
| Resend | Free — 3,000 emails/month | ₹0 |
| Interakt (WhatsApp) | Starter | ₹1,500–₹2,500 |
| MSG91 / 2Factor (SMS OTP) | Pay per SMS — ₹0.20–₹0.40/SMS | ₹100–₹500 |
| Domain | .in or .com | ₹800–₹1,200/year |
| **Total** | | **~₹2,000–₹6,500/month** |

## Growth Configuration (500–2,000 orders/month)

| Change | Reason |
|---|---|
| Railway: upgrade to 2 vCPU, 2GB RAM | Higher traffic |
| Supabase: Pro plan (₹1,700/month) | More storage, backups |
| Vercel: Pro plan | More bandwidth |
| Add Meilisearch (Railway) | Search performance |
| **Total** | **~₹8,000–₹15,000/month** |

## Scale Configuration (5,000+ orders/month)

| Change | Reason |
|---|---|
| Supabase: read replica | Read-heavy workload |
| Railway: horizontal scaling | Multiple backend instances |
| Cloudflare: paid plan | Advanced WAF, analytics |
| Dedicated logging (Logtail or Axiom) | Observability |
| **Total** | **~₹20,000–₹40,000/month** |

---

# Medusa v2 Folder Structure

Your custom code lives inside Medusa's `src/` directory:

```
src/
├── api/
│   ├── store/          ← Custom store routes (wishlist, etc.)
│   ├── admin/          ← Custom admin routes
│   └── webhooks/       ← Razorpay + Shiprocket webhooks
│
├── modules/
│   ├── wishlist/       ← Wishlist custom module
│   ├── phonepass/      ← Custom phone+password auth provider
│   └── notifications/  ← Notification subscribers
│
├── workflows/          ← Custom Medusa workflows
│   ├── create-shipment.ts
│   └── process-return.ts
│
├── subscribers/        ← Event listeners
│   ├── order-placed.ts
│   ├── payment-captured.ts
│   └── shipment-created.ts
│
├── jobs/               ← Scheduled tasks (e.g., sync Shiprocket status)
│
└── lib/
    ├── razorpay.ts     ← Razorpay SDK wrapper
    ├── shiprocket.ts   ← Shiprocket API wrapper
    ├── interakt.ts     ← WhatsApp API wrapper
    └── msg91.ts        ← SMS OTP wrapper
```

---

# Development Milestone Plan

| Milestone | Phases | Goal |
|---|---|---|
| M1 — Core Commerce | Auth, Profile, Products | Users can browse and log in |
| M2 — Transactional | Cart, Wishlist, Checkout | Users can buy |
| M3 — Payments | Razorpay, COD | Real money flows |
| M4 — Fulfillment | Orders, Shiprocket, Notifications | End-to-end order lifecycle |
| M5 — Post-Purchase | Returns, Refunds, Admin | Complete operations |
| M6 — Production | Security, Monitoring, CI/CD | Launch-ready |

**Recommended development approach:** Build backend feature → test with Postman → build corresponding frontend page. Never build frontend for an untested backend feature.

---

# Key Decisions Summary

| Decision | Choice | Alternative | Reason |
|---|---|---|---|
| Primary auth | Phone + Password | Email + Password | Indian users identify by phone |
| OTP login | Phase 2 | Launch | Avoid SMS cost before product-market fit |
| Payment | Razorpay | PayU, CCAvenue | Best DX, UPI support, instant settlement |
| COD | Yes | No | Large portion of Indian D2C orders are COD |
| Shipping | Shiprocket | Shiping, ClickPost | Largest courier network, good API |
| WhatsApp | Interakt | WATI, AiSensy | Competitive pricing, reliable |
| Email | Resend | SendGrid, Postmark | Developer-friendly, generous free tier |
| Search | None at launch | Meilisearch | Add when catalog exceeds 50 products |
| Redis | Not at launch | Add at scale | Railway Postgres is sufficient for start |
| Kubernetes | Never (until massive scale) | — | Over-engineered for D2C at this stage |

---

*Document version: 1.0 — covers Medusa v2, Supabase PostgreSQL, Indian market requirements*
