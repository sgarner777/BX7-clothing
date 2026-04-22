"use client";

import { useState } from "react";
import type { Metadata } from "next";

// Note: metadata must be in a server component; move this to a separate file if needed
// export const metadata: Metadata = {
//   title: "Contact",
//   description: "Get in touch with B7X. We're here to help.",
// };

const FAQ_ITEMS = [
  {
    q: "How do I track my order?",
    a: "Once your order ships, you'll receive a tracking link via email. Delivery typically takes 3–5 business days for standard shipping.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and have all original tags attached. Sale items are final sale.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — we ship worldwide. International orders typically take 7–14 business days. Duties and taxes may apply.",
  },
  {
    q: "How do I find my size?",
    a: "Our garments are designed with an oversized, relaxed fit. If you prefer a more fitted look, size down. Check our size guide for exact measurements.",
  },
  {
    q: "Can I cancel or modify my order?",
    a: "Orders can be cancelled or modified within 1 hour of placement. After that, they enter fulfillment and cannot be changed.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to your email service / API
    setSubmitted(true);
  };

  return (
    <div className="pt-16 md:pt-20">
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="px-6 md:px-12 py-14 md:py-20 border-b border-black/8">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-body text-[11px] tracking-widest uppercase text-black/35 mb-3">
            Get in Touch
          </p>
          <h1 className="font-display text-6xl md:text-8xl tracking-widest">
            CONTACT
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* ── Left: Form ──────────────────────────────────────── */}
          <div>
            <h2 className="font-display text-3xl tracking-widest mb-8">
              SEND A MESSAGE
            </h2>

            {submitted ? (
              <div className="border border-brand-yellow/30 bg-brand-yellow/5 p-8 text-center">
                <p className="font-display text-4xl tracking-widest mb-3">
                  RECEIVED.
                </p>
                <p className="font-body text-sm font-light text-black/50">
                  We&apos;ll get back to you within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-[11px] tracking-widest uppercase block mb-2 text-black/50">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border border-black/12 bg-transparent px-4 py-3.5 font-body text-sm outline-none focus:border-brand-black transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-body text-[11px] tracking-widest uppercase block mb-2 text-black/50">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full border border-black/12 bg-transparent px-4 py-3.5 font-body text-sm outline-none focus:border-brand-black transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-[11px] tracking-widest uppercase block mb-2 text-black/50">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border border-black/12 bg-white px-4 py-3.5 font-body text-sm outline-none focus:border-brand-black transition-colors cursor-pointer"
                  >
                    {[
                      "General Inquiry",
                      "Order Issue",
                      "Returns & Exchanges",
                      "Sizing Help",
                      "Wholesale / Collaboration",
                      "Press Inquiry",
                    ].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-body text-[11px] tracking-widest uppercase block mb-2 text-black/50">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border border-black/12 bg-transparent px-4 py-3.5 font-body text-sm outline-none focus:border-brand-black transition-colors resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* ── Right: Info + FAQ ────────────────────────────────── */}
          <div>
            {/* Contact details */}
            <h2 className="font-display text-3xl tracking-widest mb-8">
              DETAILS
            </h2>

            <div className="space-y-6 mb-14">
              {[
                { label: "Email", value: "support@b7x.co" },
                { label: "Instagram", value: "@b7x.official" },
                { label: "Response time", value: "24–48 hours" },
                { label: "Business hours", value: "Mon–Fri, 9am–6pm EST" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="font-body text-[11px] tracking-widest uppercase text-black/35">
                    {item.label}
                  </span>
                  <span className="font-body text-sm font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <h2 className="font-display text-3xl tracking-widest mb-6">
              FAQ
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border border-black/8">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between text-left px-5 py-4 gap-4"
                  >
                    <span className="font-body text-sm font-medium">
                      {item.q}
                    </span>
                    <span
                      className={`font-body text-xl leading-none text-black/30 flex-shrink-0 transition-transform duration-200 mt-0.5 ${
                        openFaq === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <p className="font-body text-sm font-light text-black/50 leading-relaxed px-5 pb-5">
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
