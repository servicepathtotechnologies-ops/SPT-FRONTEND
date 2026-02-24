import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Service Path Technologies",
  description: "Privacy policy for Service Path Technologies. How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-28 md:pt-36 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[var(--text-primary)]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              1. Introduction
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Service Path Technologies (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website at sptsolutions.com and our AI services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              2. Information We Collect
            </h2>
            <p className="text-[#94A3B8] leading-relaxed mb-2">
              We may collect information that you provide directly, including:
            </p>
            <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 ml-2">
              <li>Name, email address, company name, and message content when you use our contact or booking forms</li>
              <li>Industry, goals, and optional scale when you use our recommendation or &quot;Find your solution&quot; flow</li>
              <li>Conversation content when you use our website chat or AI assistant</li>
            </ul>
            <p className="text-[#94A3B8] leading-relaxed mt-2">
              We may also collect usage data (e.g., pages visited, referrer) via analytics to improve our site and services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              3. How We Use Your Information
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We use the information we collect to respond to inquiries, send booking confirmations, provide AI-powered recommendations and chat responses, improve our services, and communicate with you about Service Path Technologies offerings. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              4. AI and Third-Party Services
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Our chat and recommendation features use third-party AI services (e.g., Google Gemini) to generate responses. Conversation content may be processed by these providers in accordance with their privacy policies. We use these services only to deliver and improve your experience on our site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              5. Data Retention and Security
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We retain your data only as long as necessary for the purposes described in this policy or as required by law. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or loss.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              6. Your Rights
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Depending on your location, you may have the right to access, correct, delete, or restrict processing of your personal data. To exercise these rights or ask questions about this policy, contact us at{" "}
              <a href="mailto:servicepathtotechnologies@gmail.com" className="text-[var(--primary)] hover:underline">
                servicepathtotechnologies@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              7. Changes
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top will reflect the latest version. Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
