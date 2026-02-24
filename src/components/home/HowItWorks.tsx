"use client";

/**
 * 3-step process: Discovery Call → Custom AI Build → Deploy & Scale.
 */
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We understand your workflow and pain points",
  },
  {
    number: "02",
    title: "Custom AI Build",
    description: "Our team engineers your solution in sprints",
  },
  {
    number: "03",
    title: "Deploy & Scale",
    description: "Go live in weeks, not months",
  },
];

export function HowItWorks() {
  const ref = useScrollReveal();
  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-6 lg:px-16"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          Process
        </p>
        <h2
          className="text-4xl md:text-6xl font-semibold mb-4"
          style={{
            letterSpacing: "-0.03em",
            lineHeight: "1.1",
            color: "var(--text-primary)",
          }}
        >
          How It Works
        </h2>
        <p
          className="text-lg max-w-2xl mt-4"
          style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
        >
          A proven process to deliver AI that drives results
        </p>

        <div className="relative mt-16">
          <div
            className="hidden lg:block absolute top-12 left-[16.67%] right-[16.67%] h-px border-t-2 border-dashed"
            style={{ borderColor: "var(--border)" }}
            aria-hidden
          />
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div
                  className="flex items-center justify-center w-20 h-20 rounded-2xl mb-6 text-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{ background: "var(--accent)" }}
                >
                  {step.number}
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="max-w-xs"
                  style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
