"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/services";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ServiceCard } from "./ServiceCard";
import { cn } from "@/lib/utils";

const CARD_WIDTH = 280;
const GAP = 20;
const SPEED = 0.5; // px per frame

export function ServicesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let offset = 0;
    const totalWidth = (CARD_WIDTH + GAP) * SERVICES.length;
    const duplicateWidth = totalWidth;

    function tick() {
      if (!isPaused && el) {
        offset += SPEED;
        if (offset >= duplicateWidth) offset = 0;
        el.style.transform = `translateX(-${offset}px)`;
      }
      animationId = requestAnimationFrame(tick);
    }
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section id="services" className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fadeUp" className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-heading)]">
            Our AI Services
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fadeUp" start="top 88%" className="text-center mb-12">
          <p className="text-[var(--text-body)] max-w-2xl mx-auto">
            End-to-end AI solutions tailored to your industry and goals.
          </p>
        </ScrollReveal>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex w-max"
          ref={scrollRef}
          style={{ willChange: "transform" }}
        >
          {[...SERVICES, ...SERVICES].map((service, index) => (
            <div
              key={`${service.slug}-${index}`}
              className={cn("shrink-0")}
              style={{
                width: CARD_WIDTH,
                marginRight: index < SERVICES.length * 2 - 1 ? GAP : 0,
              }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
