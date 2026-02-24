"use client";

import { useEffect, useRef, useState } from "react";

/** Only show custom cursor on devices with fine pointer (desktop). Hide on touch to avoid lag. */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [useCustomCursor, setUseCustomCursor] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;
    setUseCustomCursor(true);
  }, []);

  useEffect(() => {
    if (!useCustomCursor) return;
    let x = 0;
    let y = 0;
    const dotSize = 10;

    const handleMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - dotSize}px, ${y - dotSize}px)`;
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.body.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [useCustomCursor]);

  if (!useCustomCursor) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] transition-transform duration-75"
      style={{
        background: "var(--accent)",
        boxShadow: "0 0 0 2px var(--bg-primary), 0 0 12px var(--accent)",
      }}
    />
  );
}
