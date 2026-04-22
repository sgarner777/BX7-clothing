import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSlideout from "@/components/CartSlideout";

export const metadata: Metadata = {
  title: {
    default: "B7X — Premium Streetwear",
    template: "%s | B7X",
  },
  description:
    "B7X — Minimal, premium streetwear crafted for those who move differently.",
  keywords: ["streetwear", "premium", "clothing", "B7X", "fashion"],
  openGraph: {
    title: "B7X — Premium Streetwear",
    description: "Minimal, premium streetwear crafted for those who move differently.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <CartSlideout />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
