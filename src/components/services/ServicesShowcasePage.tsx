"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { servicesShowcaseData, type ServiceShowcaseItem } from "@/lib/servicesShowcaseData";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

function SectionWrapper({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px", amount: 0.2 });
  return (
    <section
      id={id}
      ref={ref}
      className={`scroll-mt-24 md:scroll-mt-28 ${className}`}
      data-active={isInView ? "true" : undefined}
    >
      {children}
    </section>
  );
}

function StickyNav({ serviceIds, activeId }: { serviceIds: string[]; activeId: string | null }) {
  return (
    <nav
      className="sticky top-20 md:top-24 z-30 py-3 px-4 -mx-4 overflow-x-auto backdrop-blur-md border-b"
      style={{ background: "color-mix(in srgb, var(--bg-primary) 90%, transparent)", borderColor: "var(--border)" }}
      aria-label="Services"
    >
      <div className="flex gap-2 min-w-max max-w-7xl mx-auto">
        {serviceIds.map((id) => {
          const label = servicesShowcaseData.find((s) => s.id === id)?.name ?? id;
          const isActive = activeId === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive ? "text-white" : "hover:bg-[var(--bg-secondary)]"
              }`}
              style={{
                color: isActive ? undefined : "var(--text-muted)",
                background: isActive ? "var(--accent)" : undefined,
              }}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function ServiceSection({
  service,
  index,
}: {
  service: ServiceShowcaseItem;
  index: number;
}) {
  const imageFirst = index % 2 === 0;

  return (
    <SectionWrapper id={service.id} className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!imageFirst ? "lg:flex-row-reverse" : ""}`}
        >
          {/* Image — no container for transparent PNG (e.g. AI Chatbots) */}
          <motion.div
            className={`relative rounded-2xl overflow-hidden border shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
            style={{ borderColor: "var(--border)" }}
            initial={{ opacity: 0, x: imageFirst ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="aspect-[16/10] relative" style={{ background: "var(--bg-section)" }}>
              <img
                src={service.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                width={1200}
                height={750}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Content */}
          <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.05 }}
              className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4"
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

            {/* How it works */}
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="mb-8">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">
                How It Works
              </h3>
              <ol className="space-y-3">
                {service.howItWorks.map((step, i) => (
                  <li key={step} className="flex gap-3 items-start">
                    <span className="flex shrink-0 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: "var(--accent)" }}>
                      {i + 1}
                    </span>
                    <span className="text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Benefits */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="mb-8">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">
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

            {/* Technologies */}
            <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="mb-8">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-xl text-sm"
                    style={{ background: "var(--accent-subtle)", border: "1px solid var(--border)", color: "var(--accent)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.35 }}>
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
    </SectionWrapper>
  );
}

export function ServicesShowcasePage() {
  const [activeId, setActiveId] = useState<string | null>(servicesShowcaseData[0]?.id ?? null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const sections = servicesShowcaseData.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          if (sections.includes(id)) setActiveId(id);
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current.set(id, el);
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  const serviceIds = servicesShowcaseData.map((s) => s.id);

  return (
    <div className="services-page min-h-screen text-[var(--text-primary)]">
      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)",
            animation: "pulse 10s ease-in-out infinite 1s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, var(--accent-secondary) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-medium uppercase tracking-widest mb-4"
            style={{ color: "var(--accent)" }}
          >
            Our Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="gradient-text-animated">AI That Powers</span>
            <br />
            <span className="text-[var(--text-primary)]">Your Business</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            From chatbots to custom AI systems—we build, deploy, and optimize production-ready
            solutions with a dark, futuristic edge.
          </motion.p>
        </div>
      </section>

      {/* Sticky nav */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StickyNav serviceIds={serviceIds} activeId={activeId} />
      </div>

      {/* Service sections */}
      <div className="relative z-10">
        {servicesShowcaseData.map((service, index) => (
          <ServiceSection key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="relative z-10 py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center rounded-2xl p-10 md:p-14 border backdrop-blur-xl"
          style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Ready to build with AI?
          </h2>
          <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
            Book a free demo. We’ll show you how our services can be tailored to your business.
          </p>
          <Link
            href="/book-demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white hover:scale-105 transition-all"
            style={{ background: "var(--accent)" }}
          >
            Book a Free Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
