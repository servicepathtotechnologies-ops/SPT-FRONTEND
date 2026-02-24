import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us | Service Path Technologies",
  description: "Get in touch with Service Path Technologies for enterprise technology solutions.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-24" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Contact Us</h1>
            <p className="text-lg mb-10" style={{ color: "var(--text-secondary)" }}>
              Tell us about your project. We&apos;ll get back to you within 24 hours.
            </p>
            <div className="p-6 md:p-8 rounded-2xl border backdrop-blur-xl" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
              <ContactForm />
            </div>
          </div>
          <div className="space-y-8">
            <div className="p-6 rounded-2xl border" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
              <h3 className="text-lg font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Get in touch</h3>
              <ul className="space-y-4" style={{ color: "var(--text-secondary)" }}>
                <li className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Email</p>
                    <a href="mailto:servicepathtotechnologies@gmail.com" className="hover:opacity-70 transition-opacity" style={{ color: "var(--text-primary)" }}>
                      servicepathtotechnologies@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Phone</p>
                    <a href="tel:+918639155832" className="hover:opacity-70 transition-opacity" style={{ color: "var(--text-primary)" }}>
                      +91 86391 55832
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Location</p>
                    <span style={{ color: "var(--text-primary)" }}>Hyderabad, Telangana, India 500097</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
              <iframe
                title="Service Path Technologies location - Hyderabad, Telangana, India"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.777922383314!2d78.382!3d17.443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHyderabad%2C%20Telangana%20500097!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
