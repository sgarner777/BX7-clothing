import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/8 bg-brand-white">
      {/* ── Marquee ticker ───────────────────────────────────────── */}
      <div className="overflow-hidden border-b border-black/8 py-3 bg-brand-black select-none">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-brand-yellow text-lg tracking-widest">
                B7X
              </span>
              <span className="font-display text-brand-white text-lg tracking-widest">
                PREMIUM STREETWEAR
              </span>
              <span className="font-display text-brand-pink text-lg tracking-widest">
                ✦
              </span>
              <span className="font-display text-brand-white text-lg tracking-widest">
                NEW COLLECTION
              </span>
              <span className="font-display text-brand-yellow text-lg tracking-widest">
                ✦
              </span>
              <span className="font-display text-brand-white text-lg tracking-widest mr-8">
                FREE SHIPPING OVER $200
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main footer content ─────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="B7X Home">
              <Image
                src="/logo.png"
                alt="B7X"
                width={80}
                height={36}
                className="h-8 w-auto object-contain mb-6 opacity-90"
              />
            </Link>
            <p className="font-body text-xs font-light text-black/50 leading-relaxed max-w-[200px]">
              Minimal, premium streetwear crafted for those who move differently.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {["All Products", "Hoodies", "T-Shirts", "Pants", "Jackets", "Accessories"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/shop"
                      className="font-body text-xs font-light text-black/50 hover:text-brand-black transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase mb-5">
              Info
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Size Guide", href: "/contact" },
                { label: "Shipping & Returns", href: "/contact" },
                { label: "Privacy Policy", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-body text-xs font-light text-black/50 hover:text-brand-black transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase mb-5">
              Follow
            </h4>
            <ul className="space-y-3">
              {["Instagram", "TikTok", "Twitter / X", "YouTube"].map(
                (platform) => (
                  <li key={platform}>
                    <a
                      href="#"
                      className="font-body text-xs font-light text-black/50 hover:text-brand-black transition-colors duration-200 group flex items-center gap-2"
                    >
                      {platform}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-brand-pink">
                        ↗
                      </span>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-black/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] text-black/30 tracking-widest uppercase">
            © {currentYear} B7X. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Visa", "Mastercard", "Amex", "PayPal", "Shop Pay"].map((p) => (
              <span
                key={p}
                className="font-body text-[10px] tracking-widest text-black/25 uppercase"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
