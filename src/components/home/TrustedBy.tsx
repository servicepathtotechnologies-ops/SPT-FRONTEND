"use client";

/**
 * Trusted by strip with infinite horizontal marquee.
 */
import { motion } from "framer-motion";

const LOGOS = [
  { id: 1, label: "Notion" },
  { id: 2, label: "Figma" },
  { id: 3, label: "Stripe" },
  { id: 4, label: "Vercel" },
  { id: 5, label: "Linear" },
  { id: 6, label: "Loom" },
  { id: 7, label: "Airtable" },
  { id: 8, label: "Miro" },
  { id: 9, label: "Zapier" },
  { id: 10, label: "Cal.com" },
];

function LogoPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center w-32 h-12 shrink-0 rounded-2xl mx-4 transition-all duration-300 hover:border-[var(--text-muted)]"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      <span
        className="text-xs font-medium grayscale hover:grayscale-0 transition-all"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

export function TrustedBy() {
  const duplicated = [...LOGOS, ...LOGOS];

  return (
    <section
      className="relative py-12 overflow-hidden border-t"
      style={{ borderColor: "var(--border)", background: "var(--bg-primary)" }}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="text-center text-sm mb-6"
        style={{ color: "var(--text-muted)" }}
      >
        Trusted by innovative teams worldwide
      </motion.p>
      <div className="flex w-max animate-marquee">
        {duplicated.map((logo, index) => (
          <LogoPlaceholder
            key={`marquee-${index}-${logo.id}-${logo.label}`}
            label={logo.label}
          />
        ))}
      </div>
    </section>
  );
}
