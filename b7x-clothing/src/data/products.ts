// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT DATA
// Replace this array with your Shopify Storefront API calls when ready.
// Each product maps 1:1 to a Shopify product node.
// ─────────────────────────────────────────────────────────────────────────────

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  id: string;           // Shopify: node.id
  slug: string;         // Shopify: node.handle
  name: string;         // Shopify: node.title
  price: number;        // Shopify: node.priceRange.minVariantPrice.amount
  currency: string;     // Shopify: node.priceRange.minVariantPrice.currencyCode
  description: string;  // Shopify: node.description
  images: string[];     // Shopify: node.images.edges[].node.url
  sizes: ProductSize[]; // Shopify: node.variants (filter by option name "Size")
  category: string;     // Shopify: node.productType
  featured: boolean;    // Shopify: node.tags.includes("featured")
  new: boolean;         // Shopify: node.tags.includes("new")
  soldOut?: boolean;    // Shopify: node.availableForSale === false
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — swap with Shopify API fetch
// ─────────────────────────────────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "prod_001",
    slug: "b7x-signature-hoodie",
    name: "Signature Hoodie",
    price: 185,
    currency: "USD",
    description:
      "Heavyweight 550gsm French terry. Dropped shoulders, oversized silhouette, kangaroo pocket with hidden zipper. Garment washed for a lived-in feel. Embroidered B7X logo at chest, woven label at hem.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Hoodies",
    featured: true,
    new: true,
  },
  {
    id: "prod_002",
    slug: "b7x-core-tee",
    name: "Core Tee",
    price: 75,
    currency: "USD",
    description:
      "240gsm combed cotton jersey. Relaxed boxy fit. Screenprinted B7X graphic on back. Double-needle stitching throughout. Available in three colorways.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "T-Shirts",
    featured: true,
    new: false,
  },
  {
    id: "prod_003",
    slug: "b7x-cargo-pant",
    name: "Cargo Pant",
    price: 215,
    currency: "USD",
    description:
      "Ripstop nylon blend. Relaxed tapered fit. Six-pocket utility construction with zip-close cargo pockets. Adjustable drawcord at ankle. Heat-transferred B7X tag.",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Pants",
    featured: true,
    new: true,
  },
  {
    id: "prod_004",
    slug: "b7x-track-jacket",
    name: "Track Jacket",
    price: 245,
    currency: "USD",
    description:
      "Recycled polyester shell with micro-fleece lining. Full zip closure. Contrast panel detailing. Embossed B7X logo at left chest. Secure zip pockets.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Jackets",
    featured: false,
    new: true,
  },
  {
    id: "prod_005",
    slug: "b7x-relaxed-denim",
    name: "Relaxed Denim",
    price: 195,
    currency: "USD",
    description:
      "14oz selvedge denim. Relaxed straight leg. Raw hem finish. Tonal stitching. Leather patch at back waistband. Washed to a medium indigo.",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Pants",
    featured: false,
    new: false,
  },
  {
    id: "prod_006",
    slug: "b7x-logo-cap",
    name: "Logo Cap",
    price: 65,
    currency: "USD",
    description:
      "6-panel unstructured twill. Pre-curved brim. Embroidered B7X logo. Adjustable strapback with metal hardware. One size fits all.",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Accessories",
    featured: false,
    new: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category)));
}

export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(price);
}
