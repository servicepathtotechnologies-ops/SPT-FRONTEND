"use client";

/**
 * Testimonial cards — editorial style with quote and avatar.
 */
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    quote:
      "They delivered a solution that now handles most of our support tickets. We saw the ROI within the first quarter.",
    name: "Sarah Chen",
    company: "TechFlow Inc",
    role: "VP of Operations",
    avatar: "SC",
  },
  {
    quote:
      "Their team got our data workflow from day one. The dashboard they built is now our go-to for decisions.",
    name: "Marcus Johnson",
    company: "DataFirst",
    role: "CTO",
    avatar: "MJ",
  },
  {
    quote:
      "Professional and responsive. We're already talking about phase two.",
    name: "Emily Rodriguez",
    company: "ScaleUp Logistics",
    role: "Director of Engineering",
    avatar: "ER",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-4" style={{ color: "var(--accent)" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
  );
}

export function Testimonials() {
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
          Testimonials
        </p>
        <h2
          className="text-4xl md:text-6xl font-semibold mb-4"
          style={{
            letterSpacing: "-0.03em",
            lineHeight: "1.1",
            color: "var(--text-primary)",
          }}
        >
          What Clients Say
        </h2>
        <p
          className="text-lg max-w-2xl mt-4 mb-16"
          style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
        >
          Trusted by forward-thinking enterprises
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl transition-all duration-500 hover:shadow-[var(--shadow-hover)]"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <Quote
                className="w-8 h-8 mb-4 opacity-50"
                style={{ color: "var(--accent)" }}
              />
              <StarRating />
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ background: "var(--accent)" }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
