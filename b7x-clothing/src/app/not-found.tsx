import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-display text-[120px] md:text-[180px] leading-none tracking-widest text-black/5 select-none">
        404
      </span>
      <div className="-mt-10">
        <h1 className="font-display text-5xl md:text-6xl tracking-widest mb-4">
          LOST IN THE SAUCE
        </h1>
        <p className="font-body text-sm font-light text-black/40 mb-8">
          This page doesn&apos;t exist. Head back and keep moving.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/shop" className="btn-outline">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
