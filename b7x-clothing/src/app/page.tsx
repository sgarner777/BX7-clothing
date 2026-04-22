"use client";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-black">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--brand-white) 1px, transparent 1px), linear-gradient(90deg, var(--brand-white) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Accent blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-yellow/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-brand-pink/5 blur-3xl pointer-events-none" />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Logo — large hero display */}
          <div className="animate-fade-up mb-12">
            <Image
              src="/logo.png"
              alt="B7X"
              width={340}
              height={152}
              className="w-[220px] md:w-[320px] lg:w-[400px] h-auto object-contain"
              priority
            />
          </div>

          {/* Thin rule */}
          <div className="animate-fade-up-delay-1 flex items-center gap-6 mb-10">
            <span className="h-px w-16 bg-white/10" />
            <span className="font-body text-[11px] tracking-[0.4em] uppercase text-white/40">
              Premium Streetwear
            </span>
            <span className="h-px w-16 bg-white/10" />
          </div>

          {/* CTA */}
          <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-brand-yellow text-brand-black font-body font-semibold tracking-widest text-xs uppercase px-10 py-4 transition-all duration-300 hover:bg-brand-white group"
            >
              Shop Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center border border-white/20 text-white font-body font-medium tracking-widest text-xs uppercase px-10 py-4 transition-all duration-300 hover:border-white/60 hover:bg-white/5"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up-delay-3">
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-white/25">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          BANNER STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="py-10 px-6 md:px-12 border-b border-black/8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-black/8">
            {[
              { label: "Free shipping", sub: "Orders over $200" },
              { label: "Easy returns", sub: "30-day policy" },
              { label: "Premium quality", sub: "Every single piece" },
              { label: "Limited drops", sub: "Sign up for alerts" },
            ].map((item) => (
              <div key={item.label} className="text-center md:px-8">
                <p className="font-body text-sm font-medium mb-1">
                  {item.label}
                </p>
                <p className="font-body text-xs text-black/40 font-light">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <p className="font-body text-[11px] tracking-widest uppercase text-black/35 mb-3">
                Featured
              </p>
              <h2 className="font-display text-5xl md:text-6xl tracking-widest">
                THIS SEASON
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-black/50 hover:text-brand-black transition-colors duration-200 group"
            >
              All Products
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </Link>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-16">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 2} />
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-12 text-center md:hidden">
            <Link href="/shop" className="btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          EDITORIAL SPLIT SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="grid md:grid-cols-2 min-h-[600px]">
        {/* Left — image */}
        <div className="img-zoom relative min-h-[400px] md:min-h-[600px] bg-[#f0f0f0]">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
            alt="B7X collection"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right — text */}
        <div className="bg-brand-black flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20 md:py-16">
          <p className="font-body text-[11px] tracking-[0.35em] uppercase text-brand-yellow mb-8">
            New Collection
          </p>
          <h2 className="font-display text-6xl md:text-7xl lg:text-8xl leading-none tracking-wide text-brand-white mb-6">
            MOVE<br />
            DIFFER<br />
            ENTLY.
          </h2>
          <p className="font-body text-sm font-light text-white/45 leading-relaxed max-w-[320px] mb-10">
            Every piece is designed with intention. Minimal in form,
            maximal in quality. Built for the ones who define culture —
            not follow it.
          </p>
          <Link
            href="/shop"
            className="inline-flex self-start items-center gap-3 font-body font-medium tracking-widest text-xs uppercase text-brand-yellow border-b border-brand-yellow pb-1 hover:text-brand-white hover:border-brand-white transition-colors duration-300"
          >
            Explore Collection
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          NEW ARRIVALS STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-12 border-t border-black/8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-body text-[11px] tracking-widest uppercase text-black/35 mb-3">
                Just Dropped
              </p>
              <h2 className="font-display text-5xl md:text-6xl tracking-widest">
                NEW ARRIVALS
              </h2>
            </div>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none">
            {featured.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[260px] md:w-auto snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          EMAIL SIGNUP
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-brand-black py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto text-center">
          <p className="font-body text-[11px] tracking-[0.35em] uppercase text-brand-pink mb-5">
            Stay in the loop
          </p>
          <h2 className="font-display text-5xl md:text-6xl tracking-widest text-brand-white mb-4">
            FIRST ACCESS
          </h2>
          <p className="font-body text-sm font-light text-white/40 mb-10 leading-relaxed">
            New drops, exclusive releases, and community access.
            No spam — ever.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-[400px] mx-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/10 text-white font-body text-sm px-5 py-3.5 outline-none focus:border-brand-yellow transition-colors duration-200 placeholder:text-white/25"
            />
            <button
              type="submit"
              className="bg-brand-yellow text-brand-black font-body font-semibold tracking-widest text-xs uppercase px-7 py-3.5 hover:bg-brand-white transition-colors duration-300 flex-shrink-0"
            >
              Join
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
