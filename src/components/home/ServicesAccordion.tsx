"use client";

/**
 * ServicesAccordion — Two-column layout:
 * LEFT: Service names only (no numbers, no tags, no use cases)
 * RIGHT: Sticky image + 20–30 word description
 * CSS transitions, direct DOM opacity crossfade, zero layout shift on hover.
 */
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { services } from "@/lib/services";

export default function ServicesAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedMobileIndex, setExpandedMobileIndex] = useState<number | null>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Direct DOM opacity crossfade — no AnimatePresence re-mount
  const handleHover = useCallback((index: number) => {
    if (!fadeRef.current || index === activeIndex) return;

    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    fadeRef.current.style.opacity = "0";

    hoverTimerRef.current = setTimeout(() => {
      hoverTimerRef.current = null;
      setActiveIndex(index);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (fadeRef.current) fadeRef.current.style.opacity = "1";
        });
      });
    }, 180);
  }, [activeIndex]);

  useEffect(() => () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  }, []);

  return (
    <section id="services" className="h-screen max-h-screen min-h-0 flex flex-col bg-[var(--bg-primary)] scroll-smooth">
      <div className="flex-1 min-h-0 max-w-7xl mx-auto w-full px-6 lg:px-10 flex flex-col pt-12 lg:pt-16 pb-12">
        {/* Section header — "our services" with red underline */}
        <div className="shrink-0 mb-6 lg:mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold font-[var(--font-poppins)] text-[var(--text-primary)] uppercase tracking-tight leading-tight inline-block">
            our services
          </h2>
          <div className="mt-2 h-0.5 w-full max-w-[200px] bg-[#ef4444]" aria-hidden />
        </div>

        {/* Main layout: LEFT 55% | RIGHT 45% — left scrolls within viewport */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-8 lg:gap-24 overflow-hidden">
          {/* LEFT: Service name list — scrollable within viewport */}
          <div className="flex-1 min-w-0 w-full lg:w-[55%] flex flex-col min-h-0 overflow-y-auto">
            {services.map((service, index) => (
              <div key={service.slug}>
                {/* Desktop: hover → bold white, larger text + crossfade right panel */}
                <div
                  className="hidden lg:block border-t border-[var(--glass-border)] cursor-pointer group"
                  onMouseEnter={() => handleHover(index)}
                >
                  <div className="py-5 flex items-center min-h-[3.5rem]">
                    <span
                      className={`
                        font-[var(--font-poppins)] text-left
                        transition-all duration-200 ease-out
                        ${activeIndex === index
                          ? "text-[var(--text-primary)] font-bold text-xl lg:text-2xl"
                          : "text-[var(--text-muted)] text-lg lg:text-xl font-normal group-hover:text-[var(--text-primary)] group-hover:font-bold group-hover:text-xl lg:group-hover:text-2xl"
                        }
                      `}
                    >
                      {service.name}
                    </span>
                  </div>
                </div>

                {/* Mobile: tap to expand image + description inline */}
                <div className="lg:hidden border-t border-[var(--glass-border)]">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedMobileIndex((prev) => (prev === index ? null : index))
                    }
                    className="w-full py-5 flex items-center justify-between text-left"
                  >
                    <span
                      className={`font-[var(--font-poppins)] text-xl transition-all duration-200 ${
                        expandedMobileIndex === index
                          ? "text-[var(--text-primary)] font-bold"
                          : "text-[var(--text-muted)] font-normal"
                      }`}
                    >
                      {service.name}
                    </span>
                    <span
                      className={`text-[var(--text-muted)] transition-transform duration-300 ${
                        expandedMobileIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`mobile-expand ${expandedMobileIndex === index ? "open" : ""}`}
                  >
                    <div className="pb-4 space-y-4">
                      <div className={`relative w-full aspect-video ${service.slug === "ai-chatbots" ? "overflow-visible bg-transparent" : "rounded-xl overflow-hidden bg-[var(--glass-bg)] border border-[var(--glass-border)]"}`}>
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className={service.slug === "ai-chatbots" ? "object-contain" : "object-cover"}
                          sizes="100vw"
                        />
                      </div>
                      <p className="text-[var(--text-primary)] text-base leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-[var(--glass-border)]" />
          </div>

          {/* RIGHT: Sticky image + description — smooth crossfade on hover */}
          <div className="hidden lg:block w-full lg:w-[45%] max-w-[420px] shrink-0 sticky top-28">
            <div
              ref={fadeRef}
              className="will-gpu"
              style={{
                transition: "opacity 0.35s ease",
                willChange: "opacity",
              }}
            >
              {/* Image — 4:5 portrait; no container for transparent PNG (AI Chatbots) */}
              <div className={`relative w-full aspect-[4/5] ${services[activeIndex].slug === "ai-chatbots" ? "overflow-visible bg-transparent" : "rounded-2xl overflow-hidden bg-[var(--glass-bg)] border border-[var(--glass-border)]"}`}>
                <Image
                  src={services[activeIndex].image}
                  alt={services[activeIndex].name}
                  fill
                  className={services[activeIndex].slug === "ai-chatbots" ? "object-contain" : "object-cover"}
                  sizes="(max-width: 1024px) 0px, 420px"
                  priority={activeIndex < 3}
                />
                {services[activeIndex].slug !== "ai-chatbots" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                )}
              </div>

              {/* Service name below image */}
              <p className="mt-4 text-sm font-semibold font-mono uppercase tracking-wider text-[var(--text-muted)]">
                {services[activeIndex].name}
              </p>

              {/* 20–30 word description */}
              <p className="mt-2 text-[var(--text-primary)] text-base leading-relaxed">
                {services[activeIndex].shortDescription}
              </p>
            </div>

            <ImagePreloader />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Preload all 10 service images in hidden sr-only div */
function ImagePreloader() {
  return (
    <div className="sr-only" aria-hidden>
      {services.map((s) => (
        <Image key={s.slug} src={s.image} alt="" width={1} height={1} />
      ))}
    </div>
  );
}
