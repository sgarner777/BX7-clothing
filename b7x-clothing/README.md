# B7X Clothing — Next.js Storefront

A minimal, premium streetwear website built with Next.js 15 (App Router) and Tailwind CSS.

---

## Getting Started

### Prerequisites
- Node.js 18.17+
- npm / yarn / pnpm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── shop/page.tsx       # Shop (all products + filtering)
│   ├── product/[slug]/     # Product detail
│   ├── about/page.tsx      # Brand story
│   ├── cart/page.tsx       # Full cart page
│   ├── contact/page.tsx    # Contact + FAQ
│   └── not-found.tsx       # 404 page
├── components/
│   ├── Navbar.tsx          # Fixed navbar with mobile menu
│   ├── Footer.tsx          # Footer with marquee ticker
│   ├── ProductCard.tsx     # Reusable product grid card
│   └── CartSlideout.tsx    # Slide-in cart drawer
├── context/
│   └── CartContext.tsx     # Cart state (useReducer)
└── data/
    └── products.ts         # 🔑 Product data — replace with Shopify API
```

---

## Shopify Integration

When you're ready to connect to Shopify, replace the mock data in `src/data/products.ts`:

### 1. Install Shopify SDK

```bash
npm install @shopify/storefront-api-client
```

### 2. Add environment variables

Create `.env.local`:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-public-access-token
```

### 3. Replace mock fetch with Shopify API

```typescript
// src/lib/shopify.ts
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2024-01',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
});

// Map Shopify product node to your Product type:
// node.id          → id
// node.handle      → slug
// node.title       → name
// node.priceRange.minVariantPrice.amount → price
// node.description → description
// node.images.edges[].node.url → images[]
// node.variants filtered by "Size" option → sizes[]
// node.productType → category
// node.tags        → featured, new flags
```

### 4. Update checkout URL

In `src/components/CartSlideout.tsx` and `src/app/cart/page.tsx`, replace:

```typescript
const CHECKOUT_URL = "https://your-store.myshopify.com/checkout";
```

With your actual Shopify checkout URL, or use the Storefront API to create checkout sessions.

---

## Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).

No additional configuration needed — the project is Vercel-ready out of the box.

---

## Customization

### Colors (tailwind.config.ts)
```typescript
colors: {
  brand: {
    yellow: "#FFE600",   // Change accent colors here
    pink: "#FF1493",
    black: "#0A0A0A",
    white: "#FAFAFA",
  }
}
```

### Fonts (src/app/globals.css)
Replace the Google Fonts import URL to change typography.

### Products (src/data/products.ts)
Add, remove, or edit products in the `products` array. Each product has:
- `id`, `slug`, `name`, `price`, `description`
- `images[]` — array of image URLs
- `sizes[]` — available sizes
- `category`, `featured`, `new`, `soldOut`

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **State**: React Context + useReducer (cart)
- **Images**: Next.js Image (optimized)
- **Fonts**: Google Fonts (Bebas Neue + DM Sans)
- **Deployment**: Vercel-ready
