"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./Hero").then((m) => ({ default: m.Hero })), {
  ssr: false,
  loading: () => (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] text-center">
          We Build AI Systems That Actually{" "}
          <span className="gradient-text">Grow Your Business</span>
        </h1>
        <p className="mt-6 text-lg text-[var(--text-secondary)]">Loading...</p>
      </div>
    </section>
  ),
});

export function HeroDynamic() {
  return <Hero />;
}
