"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export default function CartSlideout() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, formattedTotal, totalItems } =
    useCart();

  // ── Shopify checkout URL placeholder ──────────────────────────
  // TODO: Replace with your Shopify storefront checkout URL
  const CHECKOUT_URL = "https://your-store.myshopify.com/checkout";

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-50 overlay-enter backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-brand-white z-50 flex flex-col shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0 cart-enter" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl tracking-widest">CART</h2>
            {totalItems > 0 && (
              <span className="font-body text-xs text-black/40">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1 hover:text-brand-pink transition-colors duration-200"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <BagIcon />
              <div>
                <p className="font-display text-3xl tracking-widest mb-2">
                  EMPTY
                </p>
                <p className="font-body text-xs text-black/40 tracking-wide">
                  Your cart is empty.
                  <br />
                  Add something special.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="btn-primary mt-4"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4"
                >
                  {/* Image */}
                  <div className="relative w-20 h-24 flex-shrink-0 bg-[#f3f3f3] overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body text-sm font-medium mb-1 truncate">
                      {item.product.name}
                    </h3>
                    <p className="font-body text-xs text-black/40 mb-3">
                      Size: {item.size}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Qty control */}
                      <div className="flex items-center border border-black/10">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-sm hover:bg-black/5 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-7 h-7 flex items-center justify-center font-body text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center text-sm hover:bg-black/5 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price + remove */}
                      <div className="flex items-center gap-3">
                        <span className="font-body text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.size)
                          }
                          aria-label="Remove item"
                          className="text-black/30 hover:text-brand-pink transition-colors duration-200 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-black/8 px-6 py-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="font-body text-xs tracking-widest uppercase text-black/50">
                Subtotal
              </span>
              <span className="font-body text-base font-medium">
                {formattedTotal}
              </span>
            </div>

            {/* Shipping note */}
            <p className="font-body text-[11px] text-black/35 leading-relaxed">
              Shipping & taxes calculated at checkout. Free shipping on orders over $200.
            </p>

            {/* Checkout CTA */}
            <a
              href={CHECKOUT_URL}
              className="btn-primary w-full text-center block"
              rel="noopener noreferrer"
            >
              Checkout
            </a>

            {/* Continue shopping */}
            <button
              onClick={closeCart}
              className="w-full text-center font-body text-xs tracking-widest uppercase text-black/40 hover:text-brand-black transition-colors py-1"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-black/15"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
