import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Service Path Technologies",
  description: "Get in touch with Service Path Technologies for enterprise technology solutions.",
};

export default function ContactPage() {
  return (
    <div
      className="min-h-screen flex flex-col overflow-y-auto pt-20 md:pt-24 pb-24 md:pb-12"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch lg:min-h-0">
        {/* Left: form */}
        <div className="flex flex-col min-w-0 lg:flex-1">
          <div className="mb-5">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Contact Us
            </h1>
            <p className="mt-1.5 text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
              Tell us about your project. We&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <div
            className="rounded-2xl border flex flex-col lg:flex-1 lg:min-h-0"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-card)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="p-6 md:p-8 pb-8">
              <ContactForm />
            </div>
          </div>
        </div>
        {/* Right: get in touch */}
        <div className="flex flex-col justify-center min-w-0 lg:flex-1 lg:max-w-[440px]">
          <div
            className="rounded-2xl border p-6 shrink-0"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-card)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: "var(--text-muted)" }}>
              Get in touch
            </h3>
            <ul className="space-y-5" style={{ color: "var(--text-secondary)" }}>
              <li className="flex items-start gap-4">
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                  style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
                >
                  <Mail className="w-5 h-5" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-xs font-medium uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>
                    Email
                  </p>
                  <a
                    href="mailto:servicepathtotechnologies@gmail.com"
                    className="text-sm hover:opacity-80 transition-opacity break-all"
                    style={{ color: "var(--text-primary)" }}
                  >
                    servicepathtotechnologies@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                  style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
                >
                  <Phone className="w-5 h-5" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-xs font-medium uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>
                    Phone
                  </p>
                  <a href="tel:+918639155832" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "var(--text-primary)" }}>
                    +91 86391 55832
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                  style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
                >
                  <MapPin className="w-5 h-5" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-xs font-medium uppercase tracking-wider mb-0.5" style={{ color: "var(--text-muted)" }}>
                    Location
                  </p>
                  <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                    Hyderabad, Telangana, India 500097
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
