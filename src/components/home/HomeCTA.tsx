"use client";

/**
 * Final CTA section: accent background, single "Schedule Your Demo" button.
 */
import Link from "next/link";
import { motion } from "framer-motion";

export function HomeCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "var(--accent)" }}
      />
      <div className="absolute inset-0 bg-[var(--bg-primary)]/20" />
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-semibold mb-4 text-white"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
        >
          Ready to Build Your AI Advantage?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-white/90 max-w-xl mx-auto mb-10"
          style={{ lineHeight: 1.7 }}
        >
          Book a free 30-minute discovery call. No commitment, just clarity.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <Link
            href="/book-demo"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-[1.02] border border-white/40"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
            }}
          >
            Schedule Your Demo →
          </Link>
          <p className="text-sm text-white/80">
            or email us at{" "}
            <a
              href="mailto:servicepathtotechnologies@gmail.com"
              className="underline hover:text-white transition-colors"
            >
              servicepathtotechnologies@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
