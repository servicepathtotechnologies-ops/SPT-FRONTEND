"use client";

/**
 * Our Services: full-page-style sections without scroll-snap.
 * Each service block reuses the services page layout but scrolls smoothly with the rest of the page.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Workflow,
  Code2,
  Image as ImageIcon,
  Video,
  Mic,
  BarChart3,
  Megaphone,
  Headphones,
  Sparkles,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { servicesShowcaseData, type ServiceShowcaseItem } from "@/lib/servicesShowcaseData";

const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  Zap: Workflow,
  Code2,
  Image: ImageIcon,
  Video,
  Mic,
  BarChart3,
  Megaphone,
  Headphones,
  Sparkles,
};

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

function ServiceBlock({ service, index }: { service: ServiceShowcaseItem; index: number }) {
  const imageFirst = index % 2 === 0;
  const Icon = iconMap[service.icon] ?? Sparkles;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div
        className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!imageFirst ? "lg:flex-row-reverse" : ""}`}
      >
        <motion.div
          className={`relative ${service.id === "ai-chatbots" ? "overflow-visible" : "rounded-2xl overflow-hidden border shadow-[var(--shadow-card)]"} ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
          style={service.id !== "ai-chatbots" ? { borderColor: "var(--border)" } : undefined}
          initial={{ opacity: 0, x: imageFirst ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`aspect-[16/10] relative ${service.id === "ai-chatbots" ? "bg-transparent" : ""}`}
            style={service.id !== "ai-chatbots" ? { background: "var(--bg-section)" } : undefined}
          >
            <img
              src={service.image}
              alt=""
              className={`absolute inset-0 w-full h-full ${service.id === "ai-chatbots" ? "object-contain" : "object-cover"}`}
              width={1200}
              height={750}
            />
            {service.id !== "ai-chatbots" && (
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 to-transparent" />
            )}
          </div>
        </motion.div>

        <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
          <motion.div {...fadeUp} className="flex items-center gap-3 mb-4">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-xl border"
              style={{ background: "var(--accent-subtle)", borderColor: "var(--border)", color: "var(--accent)" }}
            >
              <Icon className="w-6 h-6" />
            </span>
            <span className="text-sm font-medium uppercase tracking-wider" style={{ color: "var(--accent)" }}>
              Service
            </span>
          </motion.div>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {service.name}
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            {service.description}
          </motion.p>

          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="mb-6 md:mb-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-secondary)" }}>
              How It Works
            </h3>
            <ol className="space-y-3">
              {service.howItWorks.map((step, i) => (
                <li key={step} className="flex gap-3 items-start">
                  <span
                    className="flex shrink-0 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center"
                    style={{ background: "var(--accent)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="mb-6 md:mb-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-secondary)" }}>
              Key Benefits
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <Check className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.25 }}>
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white hover:scale-105 transition-all"
              style={{ background: "var(--accent)" }}
            >
              Book a Free Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesShowcase() {
  return (
    <>
      {/* Section intro */}
      <section
        id="services"
        className="py-24 md:py-32 px-6 lg:px-16 bg-[var(--bg-primary)]"
      >
        <div className="max-w-[1280px] mx-auto text-center">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            Our Services
          </p>
          <h2
            className="text-4xl md:text-6xl font-semibold mb-4"
            style={{
              letterSpacing: "-0.03em",
              lineHeight: "1.1",
              color: "var(--text-primary)",
            }}
          >
            AI That Powers Your Business
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto mt-4"
            style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            From chatbots to custom AI systems—we build, deploy, and optimize production-ready
            solutions. Scroll to explore each service.
          </p>
          <p className="text-sm mt-6" style={{ color: "var(--text-muted)" }}>
            ↓ Scroll down
          </p>
        </div>
      </section>

      {/* Each service as a full-page-style block */}
      {servicesShowcaseData.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className="min-h-screen flex items-center bg-[var(--bg-primary)]"
        >
          <ServiceBlock service={service} index={index} />
        </section>
      ))}
    </>
  );
}
