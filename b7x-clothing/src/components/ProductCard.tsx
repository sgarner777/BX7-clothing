import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      {/* ── Image container ─────────────────────────────────── */}
      <div className="img-zoom relative aspect-[3/4] bg-[#f3f3f3] overflow-hidden mb-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.new && (
            <span className="font-body text-[10px] font-semibold tracking-widest uppercase bg-brand-yellow text-brand-black px-2.5 py-1">
              New
            </span>
          )}
          {product.soldOut && (
            <span className="font-body text-[10px] font-semibold tracking-widest uppercase bg-brand-black text-brand-white px-2.5 py-1">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <div className="bg-brand-black/90 py-3 text-center">
            <span className="font-body text-[11px] font-medium tracking-widest uppercase text-brand-white">
              Quick View
            </span>
          </div>
        </div>
      </div>

      {/* ── Product info ─────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-body text-[11px] font-light tracking-widest uppercase text-black/40 mb-1">
            {product.category}
          </p>
          <h3 className="font-body text-sm font-medium text-brand-black truncate group-hover:text-brand-pink transition-colors duration-200">
            {product.name}
          </h3>
        </div>
        <p className="font-body text-sm font-medium text-brand-black flex-shrink-0">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Sizes available */}
      <div className="flex gap-2 mt-2">
        {product.sizes.slice(0, 5).map((size) => (
          <span
            key={size}
            className="font-body text-[10px] tracking-wide text-black/30"
          >
            {size}
          </span>
        ))}
      </div>
    </Link>
  );
}
