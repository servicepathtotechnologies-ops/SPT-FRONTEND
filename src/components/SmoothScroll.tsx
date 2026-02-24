"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Use Lenis only on desktop (fine pointer). Native scroll on touch devices to avoid mobile lag. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchOrReducedMotion =
      window.matchMedia("(pointer: coarse)").matches || prefersReducedMotion;
    if (isTouchOrReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
