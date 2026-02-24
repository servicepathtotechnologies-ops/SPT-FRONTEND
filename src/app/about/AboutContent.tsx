"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Users, Lightbulb, Check } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission",
    content:
      "Our mission is to make enterprise-grade AI practical and accessible — not theoretical.\n\nWe partner with businesses to identify high-impact opportunities, reduce operational friction, and implement AI systems that deliver measurable ROI. Every solution we build is designed with clarity, accountability, and long-term value in mind.",
  },
  {
    icon: Users,
    title: "Team",
    content:
      "Our team combines expertise in AI engineering, product architecture, and real-world business strategy.\n\nWe approach every engagement with both technical depth and commercial awareness — ensuring that what we build is not only advanced, but also aligned with your operational goals.\n\nWe work as long-term partners, not short-term vendors.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    content:
      "Innovation at Service Path Technologies means responsible advancement.\n\nWe continuously evaluate emerging AI technologies and frameworks — adopting only what adds tangible value to our clients.\n\nOur approach minimizes experimentation risk while maximizing performance, reliability, and scalability.",
  },
];

const trustPoints = [
  "Structured discovery and solution planning",
  "Security-first architecture",
  "Scalable, production-ready systems",
  "Transparent communication and accountability",
  "Long-term optimization and support",
  "Clear project milestones and measurable outcomes",
];

export function AboutContent() {
  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-28" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        {/* Main heading — left-aligned */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] text-left tracking-tight"
        >
          About Service Path Technologies
        </motion.h1>

        {/* Intro paragraph — left-aligned, readable width */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 max-w-3xl text-left"
        >
          <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            At Service Path Technologies, we help organizations move from AI
            experimentation to real-world execution.
          </p>
          <p className="mt-4 text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            We don&apos;t build surface-level demos or isolated prototypes. We
            design, engineer, and deploy AI systems that integrate directly into
            business operations. From intelligent automation and data-driven
            decision systems to fully custom AI platforms, our solutions are
            built for performance, security, and long-term scalability.
          </p>
          <p className="mt-4 text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
            Our focus is simple: measurable impact, operational efficiency, and
            sustainable growth.
          </p>
        </motion.div>

        {/* Three cards — aligned grid, equal height, consistent padding */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="group flex flex-col rounded-2xl p-7 md:p-8 min-h-0 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
              style={{
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
              }}
            >
              <v.icon className="w-9 h-9 mb-5 shrink-0 transition-colors group-hover:opacity-80" style={{ color: "var(--accent)" }} />
              <h2 className="font-semibold text-[var(--text-primary)] text-lg mb-3">{v.title}</h2>
              <div className="flex-1 min-h-0 space-y-3 text-left">
                {v.content.split("\n\n").map((para, j) => (
                  <p
                    key={j}
                    className="text-sm text-[var(--text-secondary)] leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider above trust section */}
        <div className="mt-20 md:mt-24 pt-12 md:pt-16 border-t" style={{ borderColor: "var(--border)" }} />

        {/* Why Businesses Choose Us */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] text-left mb-8 md:mb-10"
        >
          Why Businesses Choose Us
        </motion.h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-3 rounded-2xl px-4 py-3.5 text-left"
              style={{
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
              }}
            >
              <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
              <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {point}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA — Schedule a Strategy Call */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 flex justify-center"
        >
          <Link
            href="/book-demo"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-full text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ background: "var(--accent)" }}
          >
            Schedule a Strategy Call
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
