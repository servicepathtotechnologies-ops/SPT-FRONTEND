"use client";

import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/lib/services";
import { cn } from "@/lib/utils";

const CARD_HEIGHT = 260;

export function ServiceCard({ service }: { service: ServiceItem }) {
  const imageSrc = service.image;

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group block relative w-full overflow-hidden rounded-2xl border transition-all duration-500 hover:shadow-[var(--shadow-hover)] hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
      )}
      style={{ height: CARD_HEIGHT, borderColor: "var(--border)", background: "var(--bg-card)", boxShadow: "var(--shadow-card)" }}
    >
      {/* Image layer: mobile = visible at top; desktop = slides up from bottom on hover */}
      <div
        className={cn(
          "absolute left-0 right-0 z-0 overflow-hidden",
          "transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          "top-0 h-[45%] translate-y-0 opacity-100",
          "md:inset-0 md:h-full md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100",
          "md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100"
        )}
        style={{ willChange: "transform" }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Text layer: fades out on hover (desktop), always visible on mobile */}
      <div
        className={cn(
          "relative z-10 flex h-full flex-col justify-between p-4 text-left",
          "transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          "opacity-100 md:group-hover:opacity-0 md:group-focus-within:opacity-0"
        )}
      >
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-base mb-2 leading-tight" style={{ color: "var(--text-primary)" }}>
            {service.name}
          </h3>
          <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>
            {service.description}
          </p>
        </div>
        <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
          <span className="text-xs font-semibold group-hover:underline inline-flex items-center gap-1" style={{ color: "var(--accent)" }}>
            Learn more
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
