"use client";

/**
 * Service detail page: hero with image, overview, how it works (with details + image),
 * benefits with details, CTA banner.
 */
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type { ServiceItem } from "@/lib/services";
import type { ServiceDetails } from "@/lib/serviceDetails";

interface Props {
  service: ServiceItem;
  details: ServiceDetails | null;
}

export function ServicePageClient({ service, details }: Props) {
  const hasDetails = details !== null;
  const howItWorks = service.howItWorks;
  const howItWorksDetails = hasDetails ? details.howItWorksDetails : [];
  const benefits = service.benefits;
  const benefitDetails = hasDetails ? details.benefitDetails : [];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero with image */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)]"
              >
                {service.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-lg text-[var(--text-secondary)]"
              >
                {service.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-8"
              >
                <Link
                  href="/book-demo"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-full text-white hover:scale-105 transition-all"
                  style={{ background: "var(--accent)" }}
                >
                  Book a Free Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden border shadow-[var(--shadow-card)]"
              style={{ borderColor: "var(--border)" }}
            >
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview (detailed intro) */}
      {hasDetails && details.overview && (
        <section className="py-16 md:py-20 bg-[var(--bg-section)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6"
            >
              Overview
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg"
            >
              {details.overview}
            </motion.p>
          </div>
        </section>
      )}

      {/* How it works — with optional section image */}
      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-10"
          >
            How It Works
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 items-start"
                >
                  <span className="flex shrink-0 w-10 h-10 rounded-full text-white text-sm font-bold flex items-center justify-center" style={{ background: "var(--accent)" }}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{step}</p>
                    {howItWorksDetails[i] && (
                      <p className="mt-1 text-[var(--text-secondary)] text-sm leading-relaxed">
                        {howItWorksDetails[i]}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            {hasDetails && details.sectionImage && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border shadow-[var(--shadow-card)]"
                style={{ borderColor: "var(--border)" }}
              >
                <Image
                  src={details.sectionImage}
                  alt={`${service.name} in action`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits — with details */}
      <section className="py-20 bg-[var(--bg-section)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-10"
          >
            Benefits
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl border backdrop-blur-sm"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <span className="flex items-start gap-3">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--success)" }} />
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{b}</p>
                    {benefitDetails[i] && (
                      <p className="mt-1 text-[var(--text-secondary)] text-sm leading-relaxed">
                        {benefitDetails[i]}
                      </p>
                    )}
                  </div>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--bg-section)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-2xl p-10 md:p-14 text-center border shadow-[var(--shadow-card)]"
          style={{
            background:
              "radial-gradient(circle at top left, var(--accent-subtle), transparent 55%), var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Ready to implement {service.name}?
          </h2>
          <p
            className="text-base md:text-lg mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Book a free demo. Our team will show you how we can customize this solution for your
            business.
          </p>
          <Link
            href="/book-demo"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base md:text-lg font-semibold rounded-full hover:scale-105 transition-all"
            style={{
              background: "var(--accent)",
              color: "#ffffff",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.35)",
            }}
          >
            <ArrowRight className="w-5 h-5" />
            Book a Free Demo
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
