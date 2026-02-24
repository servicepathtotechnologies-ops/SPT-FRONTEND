"use client";

/**
 * Two-column value proposition: left content, right feature list.
 */
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FEATURES = [
  "Production-ready AI systems",
  "Google Gemini & OpenAI integration",
  "Full-stack delivery (no handoffs)",
  "Dedicated project manager",
  "Post-launch support included",
  "Fixed-scope or agile engagement",
];

export function ValueProposition() {
  const ref = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 lg:px-16 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, var(--accent-subtle) 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              Why Us
            </p>
            <h2
              className="text-4xl md:text-6xl font-semibold mb-6"
              style={{
                letterSpacing: "-0.03em",
                lineHeight: "1.1",
                color: "var(--text-primary)",
              }}
            >
              Why Teams Choose Service Path Technologies
            </h2>
            <p
              className="text-lg max-w-xl"
              style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
            >
              We combine technical depth with real-world experience. From discovery to deployment,
              our team works alongside yours to build systems that are secure, scalable, and aligned
              with how you actually work.
            </p>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-4"
          >
            {FEATURES.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4"
              >
                <span
                  className="flex shrink-0 items-center justify-center w-6 h-6 rounded-full"
                  style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span style={{ color: "var(--text-primary)" }}>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
