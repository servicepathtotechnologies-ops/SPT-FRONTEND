"use client";

/**
 * Footer: Services, Navigation, Connect columns on the left; embedded map (Hyderabad) on the right.
 */
import Link from "next/link";
import { MapPin, Phone, Linkedin, Twitter, Github } from "lucide-react";
import { SERVICES } from "@/lib/services";

const social = [
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Github, label: "GitHub" },
];

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.777922383314!2d78.4867!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dac93e350d%3A0xc94fa89ce2e0a745!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000";

export function Footer() {
  return (
    <footer
      className="border-t mt-32"
      style={{ borderColor: "var(--border)", background: "var(--bg-primary)" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-10">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1.5fr] gap-8 lg:gap-10 items-start"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Services
            </p>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm transition-opacity hover:opacity-60"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Navigation
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm transition-opacity hover:opacity-60"
                  style={{ color: "var(--text-secondary)" }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm transition-opacity hover:opacity-60"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/book-demo"
                  className="text-sm transition-opacity hover:opacity-60"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Book Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm transition-opacity hover:opacity-60"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm transition-opacity hover:opacity-60"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Connect
            </p>
            <ul className="flex gap-4">
              {social.map(({ href, icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="transition-opacity hover:opacity-60"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
                <a href="tel:+918639155832" className="hover:opacity-80 transition-opacity">+91 86391 55832</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
                <span>Hyderabad, Telangana, India 500097</span>
              </li>
            </ul>
          </div>

          <div
            className="rounded-2xl overflow-hidden border w-full"
            style={{ borderColor: "var(--border)", background: "var(--bg-secondary)", minHeight: "260px" }}
          >
            <iframe
              title="Service Path Technologies — Hyderabad, Telangana, India"
              src={MAP_EMBED_URL}
              width="100%"
              height="260"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
