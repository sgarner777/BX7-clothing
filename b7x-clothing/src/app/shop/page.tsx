"use client";

import { useState } from "react";
import { products, getAllCategories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function ShopPage() {
  const categories = ["All", ...getAllCategories()];
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "newest") return a.new === b.new ? 0 : a.new ? -1 : 1;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      // featured: featured first
      return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
    });

  return (
    <div className="pt-20 md:pt-24">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="px-6 md:px-12 py-14 md:py-20 border-b border-black/8">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-body text-[11px] tracking-widest uppercase text-black/35 mb-3">
            B7X Collection
          </p>
          <h1 className="font-display text-6xl md:text-8xl tracking-widest">
            SHOP ALL
          </h1>
        </div>
      </div>

      {/* ── Filters + sort bar ──────────────────────────────────── */}
      <div className="sticky top-16 md:top-20 z-30 bg-brand-white/95 backdrop-blur-sm border-b border-black/8 px-6 md:px-12 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Category filters */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 font-body text-xs tracking-widest uppercase px-4 py-2 transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand-black text-brand-white"
                    : "text-black/40 hover:text-brand-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort + count */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <span className="font-body text-xs text-black/35 hidden md:block">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="font-body text-xs tracking-widest uppercase bg-transparent border border-black/15 px-3 py-2 outline-none cursor-pointer hover:border-brand-black transition-colors"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Product grid ────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14 md:py-20">
        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-display text-5xl tracking-widest text-black/15 mb-4">
              NOTHING HERE
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="font-body text-xs tracking-widest uppercase text-black/40 hover:text-brand-black transition-colors underline underline-offset-4"
            >
              Clear filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
