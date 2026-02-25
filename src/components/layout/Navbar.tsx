"use client";

/**
 * Artisanal navbar: scroll-aware blur, spaced links, pill CTA.
 */
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  MessageCircle,
  Workflow,
  Code,
  Image,
  Video,
  Mic,
  BarChart3,
  Megaphone,
  Headphones,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/services";
import { useTheme } from "@/components/providers/ThemeProvider";

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle,
  Workflow,
  Code,
  Image,
  Video,
  Mic,
  BarChart3,
  Megaphone,
  Headphones,
  Sparkles,
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "color-mix(in srgb, var(--bg-primary) 85%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-lg transition-opacity duration-200 hover:opacity-70"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
          aria-label="Service Path Technologies Home"
        >
          <span className="flex items-center gap-3">
            <span className="navbar-logo-wrap relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
              <NextImage
                src="/sptlogo.png?v=2"
                alt="Service Path Technologies (SPT logo)"
                fill
                sizes="36px"
                className="object-contain"
                priority
                unoptimized
              />
            </span>
            <span>
              <span className="gradient-text">Service Path</span>{" "}
              <span style={{ color: "var(--text-primary)" }}>Technologies</span>
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={cn(
              "text-sm transition-opacity duration-200 hover:opacity-60",
              pathname === "/" && "opacity-100"
            )}
            style={{ color: "var(--text-primary)" }}
          >
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={cn(
                "text-sm transition-opacity duration-200 hover:opacity-60 flex items-center gap-1",
                servicesOpen && "opacity-100"
              )}
              style={{ color: "var(--text-primary)" }}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <ChevronDown
                className={cn("w-4 h-4 transition-transform", servicesOpen && "rotate-180")}
              />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                >
                  <div
                    className="min-w-[580px] rounded-2xl border p-5 shadow-[var(--shadow-hover)]"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <p
                      className="mb-4 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Our AI Services
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {SERVICES.map((s) => {
                        const IconComp = SERVICE_ICONS[s.icon] ?? Sparkles;
                        const isActive = pathname === `/services/${s.slug}`;
                        return (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className={cn(
                              "group/item flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                              isActive && "bg-[var(--accent-subtle)]"
                            )}
                            style={{
                              color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                            }}
                          >
                            <span
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                                isActive
                                  ? "bg-[var(--accent)] text-white"
                                  : "rounded-xl group-hover/item:bg-[var(--accent)] group-hover/item:text-white"
                              )}
                              style={{
                                background: isActive ? "var(--accent)" : "var(--bg-secondary)",
                                color: isActive ? "#fff" : "var(--accent)",
                              }}
                            >
                              <IconComp className="h-4 w-4" />
                            </span>
                            <span className="text-sm font-medium">{s.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href="/about"
            className={cn(
              "text-sm transition-opacity duration-200 hover:opacity-60",
              pathname === "/about" && "opacity-100"
            )}
            style={{ color: "var(--text-primary)" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-sm transition-opacity duration-200 hover:opacity-60",
              pathname === "/contact" && "opacity-100"
            )}
            style={{ color: "var(--text-primary)" }}
          >
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{
              background: "var(--bg-secondary)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            href="/book-demo"
            className="hidden md:flex px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-90 border"
            style={{
              background: "var(--accent-subtle)",
              color: "var(--accent)",
              borderColor: "var(--accent)",
            }}
          >
            Book a Demo
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-full transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="p-2 rounded-full transition-colors"
            style={{ color: "var(--text-primary)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden backdrop-blur-xl"
            style={{ background: "var(--bg-primary)" }}
            aria-hidden
          />
        )}
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 top-20 z-50 md:hidden pt-6 px-5 pb-8 overflow-y-auto rounded-3xl border shadow-[var(--shadow-hover)]"
            style={{
              maxHeight: "75vh",
              background: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "var(--text-muted)" }}
              >
                Menu
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-1.5 rounded-full transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block py-3 px-4 text-lg font-medium rounded-2xl transition-colors",
                    pathname === item.href && "bg-[var(--accent-subtle)]"
                  )}
                  style={{
                    color: pathname === item.href ? "var(--text-primary)" : "var(--text-secondary)",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                className="flex items-center justify-between w-full py-3 px-4 text-lg font-medium rounded-2xl transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setServicesMobileOpen(!servicesMobileOpen)}
              >
                Services
                <ChevronDown
                  className={cn("w-5 h-5 transition-transform", servicesMobileOpen && "rotate-180")}
                />
              </button>
              {servicesMobileOpen && (
                <div className="pl-4 space-y-1">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="block py-2.5 text-sm transition-colors"
                      style={{ color: "var(--text-muted)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
              <div className="pt-6">
                <Link
                  href="/book-demo"
                  className="flex items-center justify-center w-full py-3.5 text-base font-semibold rounded-full text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--accent)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
