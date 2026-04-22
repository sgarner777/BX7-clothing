"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const CHECKOUT_URL = "https://your-store.myshopify.com/checkout";

export default function CartPage() {
  const { items, removeItem, updateQuantity, formattedTotal, totalPrice, clearCart } = useCart();

  const shipping = totalPrice >= 200 ? 0 : 15;
  const orderTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <p className="font-display text-7xl md:text-9xl tracking-widest text-black/10">
          EMPTY
        </p>
        <p className="font-body text-sm font-light text-black/40">
          Your cart is empty. Go find something you love.
        </p>
        <Link href="/shop" className="btn-primary mt-4">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <div className="px-6 md:px-12 py-12 md:py-16 border-b border-black/8">
        <div className="max-w-[1400px] mx-auto flex items-end justify-between">
          <h1 className="font-display text-5xl md:text-7xl tracking-widest">
            YOUR CART
          </h1>
          <button
            onClick={clearCart}
            className="font-body text-xs tracking-widest uppercase text-black/30 hover:text-brand-pink transition-colors duration-200 underline underline-offset-2 hidden md:block"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-[1fr_360px] gap-12 md:gap-16 items-start">
          {/* ── Item list ──────────────────────────────────────── */}
          <div>
            <div className="hidden md:grid grid-cols-[1fr_100px_100px_80px] gap-4 mb-4 pb-3 border-b border-black/8">
              {["Product", "Size", "Qty", "Price"].map((h) => (
                <span key={h} className="font-body text-[11px] tracking-widest uppercase text-black/35">
                  {h}
                </span>
              ))}
            </div>

            <ul className="divide-y divide-black/6">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.size}`} className="py-6 flex gap-5">
                  {/* Image */}
                  <div className="relative w-24 h-30 flex-shrink-0 bg-[#f3f3f3] overflow-hidden aspect-[3/4]">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <p className="font-body text-[11px] tracking-widest uppercase text-black/35 mb-1">
                        {item.product.category}
                      </p>
                      <h3 className="font-body text-sm font-medium mb-1">
                        {item.product.name}
                      </h3>
                      <p className="font-body text-xs text-black/40 mb-4">
                        Size: {item.size}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      {/* Qty */}
                      <div className="flex items-center border border-black/12">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-sm hover:bg-black/5 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center font-body text-xs font-medium border-x border-black/12">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-sm hover:bg-black/5 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Price + remove */}
                      <div className="flex items-center gap-5">
                        <span className="font-body text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="font-body text-xs text-black/30 hover:text-brand-pink transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-4">
              <Link
                href="/shop"
                className="font-body text-xs tracking-widest uppercase text-black/40 hover:text-brand-black transition-colors flex items-center gap-1"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* ── Order summary ───────────────────────────────────── */}
          <div className="border border-black/8 p-6 md:p-8 sticky top-24">
            <h2 className="font-display text-3xl tracking-widest mb-6">
              SUMMARY
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="font-body text-sm text-black/50">Subtotal</span>
                <span className="font-body text-sm">{formattedTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-sm text-black/50">Shipping</span>
                <span className="font-body text-sm">
                  {shipping === 0 ? (
                    <span className="text-brand-pink font-medium">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              {totalPrice < 200 && (
                <p className="font-body text-[11px] text-black/35">
                  Add {formatPrice(200 - totalPrice)} more for free shipping
                </p>
              )}
            </div>

            <div className="h-px bg-black/8 mb-6" />

            <div className="flex justify-between mb-8">
              <span className="font-body text-sm font-semibold">Total</span>
              <span className="font-body text-lg font-medium">
                {formatPrice(orderTotal)}
              </span>
            </div>

            {/* Promo code */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 border border-black/12 px-4 py-3 font-body text-xs outline-none focus:border-brand-black transition-colors"
              />
              <button className="border border-black/12 px-4 py-3 font-body text-xs tracking-widest uppercase hover:bg-brand-black hover:text-brand-white hover:border-brand-black transition-all duration-200">
                Apply
              </button>
            </div>

            <a
              href={CHECKOUT_URL}
              className="btn-primary w-full text-center block mb-3"
              rel="noopener noreferrer"
            >
              Checkout
            </a>

            {/* Payment icons */}
            <div className="flex justify-center gap-3 mt-4">
              {["Visa", "MC", "Amex", "PayPal", "Shop Pay"].map((p) => (
                <span key={p} className="font-body text-[10px] text-black/25 uppercase tracking-wide">
                  {p}
                </span>
              ))}
            </div>

            <p className="font-body text-[11px] text-black/30 text-center mt-4 leading-relaxed">
              Secure checkout. All transactions are encrypted and protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
