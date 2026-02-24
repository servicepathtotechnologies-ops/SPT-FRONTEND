"use client";

/**
 * Stats bar with count-up animation when in view.
 */
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring } from "framer-motion";

const STATS = [
  { value: 50, suffix: "+", label: "Clients Served" },
  { value: 10, suffix: "+", label: "AI Services" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 3, suffix: "x", label: "Avg. ROI Delivered" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);
  const spring = useSpring(0, { stiffness: 75, damping: 15 });

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, value, spring]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <span ref={ref} className="font-bold" style={{ color: "var(--accent)" }}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section
      className="py-16 sm:py-20 border-y"
      style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x gap-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center py-8 md:py-0 md:px-8 first:pt-0 last:pb-0 md:first:pt-0 md:last:pr-0 md:first:pl-0 md:last:pr-0"
              style={{
                borderColor: "var(--border)",
              }}
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span
                className="mt-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
