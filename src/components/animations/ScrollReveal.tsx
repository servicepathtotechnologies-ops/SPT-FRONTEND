"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** gsap-style: 'fade', 'fadeUp', 'fadeDown', 'scale', 'fadeUpStagger' (for wrapper of multiple items) */
  variant?: "fade" | "fadeUp" | "fadeDown" | "scale" | "fadeUpStagger";
  /** Stagger delay for children when variant is fadeUpStagger (seconds) */
  stagger?: number;
  /** ScrollTrigger start offset, e.g. "top 85%" */
  start?: string;
  /** Once true, animation won't re-run when scrolling back */
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  variant = "fadeUp",
  stagger = 0.1,
  start = "top 88%",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const isStagger = variant === "fadeUpStagger";
      const targets = isStagger ? el.children : el;

      const from: Record<string, Record<string, unknown>> = {
        fade: { opacity: 0 },
        fadeUp: { opacity: 0, y: 40 },
        fadeDown: { opacity: 0, y: -40 },
        scale: { opacity: 0, scale: 0.95 },
        fadeUpStagger: { opacity: 0, y: 32 },
      };

      const to: Record<string, Record<string, unknown>> = {
        fade: { opacity: 1 },
        fadeUp: { opacity: 1, y: 0 },
        fadeDown: { opacity: 1, y: 0 },
        scale: { opacity: 1, scale: 1 },
        fadeUpStagger: { opacity: 1, y: 0 },
      };

      const baseVariant = isStagger ? "fadeUpStagger" : variant;
      gsap.fromTo(
        targets,
        from[baseVariant],
        {
          ...to[baseVariant],
          duration: 0.7,
          ease: "power3.out",
          stagger: isStagger ? stagger : 0,
          scrollTrigger: {
            trigger: el,
            start,
            once,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      );
    };

    init();
    return () => {
      if (typeof window === "undefined") return;
      import("gsap/ScrollTrigger").then(({ default: ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === ref.current) t.kill();
        });
      });
    };
  }, [variant, stagger, start, once]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
