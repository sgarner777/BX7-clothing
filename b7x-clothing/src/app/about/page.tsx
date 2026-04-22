import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind B7X — minimal, premium streetwear built for those who move differently.",
};

export default function AboutPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative min-h-[70vh] bg-brand-black flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
          alt="B7X Story"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-24 w-full">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-brand-yellow mb-4">
            Our Story
          </p>
          <h1 className="font-display text-7xl md:text-[120px] leading-none tracking-wide text-brand-white">
            ABOUT<br />B7X.
          </h1>
        </div>
      </div>

      {/* ── Mission ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <h2 className="font-display text-5xl md:text-6xl tracking-widest mb-8 leading-none">
              BUILT FOR<br />THE DIFFERENT.
            </h2>
            <p className="font-body text-base font-light text-black/55 leading-relaxed mb-6">
              B7X was born from a simple belief: premium clothing shouldn&apos;t be defined 
              by logos — it should be defined by quality, intention, and the energy it carries.
            </p>
            <p className="font-body text-base font-light text-black/55 leading-relaxed mb-10">
              Every piece we make is designed to outlast trends. Minimal in aesthetic, 
              maximum in construction. We source the finest fabrics, work with skilled 
              artisans, and obsess over every detail — from seam placement to hang tags.
            </p>
            <Link href="/shop" className="btn-primary">
              Shop the Collection
            </Link>
          </div>

          <div className="relative aspect-[4/5] bg-[#f3f3f3] img-zoom overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              alt="B7X craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────── */}
      <section className="bg-brand-black py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-body text-[11px] tracking-widest uppercase text-brand-pink mb-10">
            What We Stand For
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {[
              {
                number: "01",
                title: "Uncompromising Quality",
                body:
                  "We use only premium-grade fabrics — 550gsm French terry, ripstop nylon, selvedge denim. No shortcuts, no compromise.",
              },
              {
                number: "02",
                title: "Minimal by Design",
                body:
                  "Complexity is easy. Restraint is hard. Every piece is edited until only what matters remains.",
              },
              {
                number: "03",
                title: "Built to Last",
                body:
                  "We make timeless pieces, not seasonal noise. Every garment is an investment in your permanent wardrobe.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="bg-brand-black p-10 md:p-12 group hover:bg-white/5 transition-colors duration-300"
              >
                <span className="font-display text-brand-yellow text-5xl tracking-widest mb-8 block">
                  {item.number}
                </span>
                <h3 className="font-display text-3xl tracking-widest text-brand-white mb-4">
                  {item.title.toUpperCase()}
                </h3>
                <p className="font-body text-sm font-light text-white/40 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team / Process ────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <h2 className="font-display text-5xl md:text-6xl tracking-widest leading-none">
              THE PROCESS
            </h2>
            <p className="font-body text-sm font-light text-black/45 max-w-[340px]">
              From sketch to garment, every step is intentional.
              We control the supply chain to ensure the highest standards.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
              "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80",
              "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
              "https://images.unsplash.com/photo-1493309099834-c8f28c2ae8ab?w=600&q=80",
            ].map((src, i) => (
              <div
                key={i}
                className={`img-zoom relative bg-[#f3f3f3] overflow-hidden ${
                  i === 0 ? "aspect-[3/4]" : i === 1 ? "aspect-square" : i === 2 ? "aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt={`Process ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ─────────────────────────────────────────────── */}
      <div className="border-t border-black/8 px-6 md:px-12 py-16 text-center">
        <h2 className="font-display text-5xl md:text-7xl tracking-widest mb-6">
          READY TO WEAR B7X?
        </h2>
        <Link href="/shop" className="btn-primary">
          Shop the Collection →
        </Link>
      </div>
    </div>
  );
}
