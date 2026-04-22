"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, formatPrice, ProductSize, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { use } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const related = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-16 md:pt-20">
      {/* ── Breadcrumb ──────────────────────────────────────────── */}
      <div className="px-6 md:px-12 py-5 border-b border-black/8">
        <div className="max-w-[1400px] mx-auto">
          <nav className="flex items-center gap-2 font-body text-xs text-black/35">
            <Link href="/" className="hover:text-brand-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-brand-black transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-brand-black">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Main product layout ─────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
          {/* ── Left: Images ─────────────────────────────────────── */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="img-zoom relative aspect-[3/4] bg-[#f3f3f3] overflow-hidden">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.new && (
                <div className="absolute top-5 left-5">
                  <span className="font-body text-[10px] font-semibold tracking-widest uppercase bg-brand-yellow text-brand-black px-3 py-1.5">
                    New
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square bg-[#f3f3f3] overflow-hidden transition-all duration-200 ${
                      activeImage === i
                        ? "ring-1 ring-brand-black"
                        : "opacity-55 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product info ─────────────────────────────── */}
          <div className="flex flex-col">
            {/* Category */}
            <p className="font-body text-[11px] tracking-widest uppercase text-black/35 mb-3">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="font-display text-5xl md:text-6xl tracking-widest mb-4">
              {product.name.toUpperCase()}
            </h1>

            {/* Price */}
            <p className="font-body text-2xl font-light mb-8">
              {formatPrice(product.price)}
            </p>

            {/* Divider */}
            <div className="h-px bg-black/8 mb-8" />

            {/* Size selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="font-body text-xs font-medium tracking-widest uppercase">
                  Select Size
                </span>
                <button className="font-body text-xs text-black/35 hover:text-brand-black transition-colors underline underline-offset-2">
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`py-3 font-body text-xs font-medium tracking-wide uppercase border transition-all duration-200 ${
                      selectedSize === size
                        ? "border-brand-black bg-brand-black text-brand-white"
                        : sizeError
                        ? "border-brand-pink text-brand-pink hover:border-brand-black hover:text-brand-black"
                        : "border-black/15 text-brand-black hover:border-brand-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {sizeError && (
                <p className="font-body text-xs text-brand-pink mt-2 animate-fade-up">
                  Please select a size
                </p>
              )}
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.soldOut}
              className={`w-full py-4 font-body font-semibold text-xs tracking-widest uppercase transition-all duration-300 mb-4 ${
                product.soldOut
                  ? "bg-black/10 text-black/30 cursor-not-allowed"
                  : added
                  ? "bg-brand-yellow text-brand-black"
                  : "bg-brand-black text-brand-white hover:bg-brand-pink"
              }`}
            >
              {product.soldOut
                ? "Sold Out"
                : added
                ? "✓ Added to Cart"
                : "Add to Cart"}
            </button>

            {/* Wishlist */}
            <button className="w-full py-3.5 border border-black/15 font-body text-xs tracking-widest uppercase text-black/50 hover:border-brand-black hover:text-brand-black transition-all duration-200 flex items-center justify-center gap-2">
              <HeartIcon />
              Save to Wishlist
            </button>

            {/* Divider */}
            <div className="h-px bg-black/8 mt-8 mb-8" />

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-body text-xs font-semibold tracking-widest uppercase mb-4">
                About This Piece
              </h2>
              <p className="font-body text-sm font-light text-black/60 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Details accordion stubs */}
            <div className="space-y-3">
              {[
                { label: "Shipping & Returns", content: "Free standard shipping on orders over $200. Express shipping available. Returns accepted within 30 days — unworn, with tags attached." },
                { label: "Materials & Care", content: "See garment care label. Wash cold, lay flat to dry. Do not bleach. Do not tumble dry." },
                { label: "Fit Guide", content: "Model is 6'1\" and wearing size M. This style runs true to size with a relaxed, oversized silhouette." },
              ].map((item) => (
                <AccordionItem key={item.label} label={item.label} content={item.content} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Related products ─────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="border-t border-black/8 px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-10">
              <p className="font-body text-[11px] tracking-widest uppercase text-black/35 mb-2">
                More from {product.category}
              </p>
              <h2 className="font-display text-4xl md:text-5xl tracking-widest">
                YOU MAY ALSO LIKE
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Accordion ──────────────────────────────────────────────────────────────
function AccordionItem({ label, content }: { label: string; content: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-black/8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left"
      >
        <span className="font-body text-xs font-medium tracking-widest uppercase">
          {label}
        </span>
        <span
          className={`font-body text-lg leading-none text-black/40 transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        <p className="font-body text-xs font-light text-black/50 leading-relaxed px-4 pb-4">
          {content}
        </p>
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
