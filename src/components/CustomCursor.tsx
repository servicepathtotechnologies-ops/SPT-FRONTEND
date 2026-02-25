"use client";

import { useEffect, useRef, useState } from "react";

const CURSOR_SIZE = 8;

/**
 * Lightweight custom cursor: RAF-based updates, no transition, minimal paint.
 * Only on desktop (fine pointer). Professional, smooth, no lag.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [useCustomCursor, setUseCustomCursor] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const noReduce = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && noReduce) setUseCustomCursor(true);
  }, []);

  useEffect(() => {
    if (!useCustomCursor) return;

    const handleMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updatePosition);
      }
    };

    const updatePosition = () => {
      rafId.current = null;
      const el = dotRef.current;
      if (!el) return;
      const { x, y } = pos.current;
      el.style.transform = `translate(${x - CURSOR_SIZE / 2}px, ${y - CURSOR_SIZE / 2}px)`;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.body.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [useCustomCursor]);

  if (!useCustomCursor) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        borderRadius: "50%",
        background: "var(--accent)",
        border: "1px solid var(--bg-primary)",
        willChange: "transform",
        transform: "translate(-100vw, -100vw)",
      }}
      aria-hidden
    />
  );
}
