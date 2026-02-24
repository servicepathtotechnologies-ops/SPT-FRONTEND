"use client";

/**
 * Studio-style Hero: asymmetric layout, Three.js background, eyebrow, pill CTAs.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground").then((m) => m.default), {
  ssr: false,
});

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-primary)]">
      <ThreeBackground />

      <div
        className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 dark:opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-20 left-[5%] w-[300px] h-[300px] rounded-full blur-[100px] opacity-15 dark:opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-[960px] mx-auto px-6 lg:px-16 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-semibold tracking-[-0.04em] leading-[1.05]"
          style={{ color: "var(--text-primary)" }}
        >
          We Build AI Systems That Actually{" "}
          <span className="gradient-text">
            Grow Your Business
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-lg max-w-2xl mt-6"
          style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
        >
          From intelligent automation to custom AI platforms, we design and deploy solutions
          that reduce manual work, improve decision-making, and deliver measurable ROI — not
          just impressive demos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link
            href="/book-demo"
            className="px-7 py-3.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ background: "var(--accent)" }}
          >
            Book a Demo
          </Link>
          <Link
            href="/#services"
            className="px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-70 flex items-center gap-2"
            style={{
              color: "var(--text-primary)",
              border: "1px solid var(--border-strong)",
            }}
          >
            View Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--bg-primary), transparent)",
        }}
      />
    </section>
  );
}
