"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { SERVICES } from "@/lib/services";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-xl border border-[var(--border)] px-4 py-3 bg-[var(--bg-card)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent";

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send");
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-[var(--color-success)]/50 bg-[var(--color-success)]/10 p-8 text-center"
      >
        <p className="font-medium" style={{ color: "var(--color-text-heading)" }}>
          Message sent successfully.
        </p>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          We&apos;ll get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-body)" }}>
          Name *
        </label>
        <input
          id="name"
          {...register("name")}
          placeholder="Your name"
          className={inputClass}
          style={{ color: "var(--color-text-heading)" }}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-body)" }}>
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="you@company.com"
          className={inputClass}
          style={{ color: "var(--color-text-heading)" }}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-body)" }}>
          Company
        </label>
        <input
          id="company"
          {...register("company")}
          placeholder="Your company"
          className={inputClass}
          style={{ color: "var(--color-text-heading)" }}
        />
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-body)" }}>
          Service
        </label>
        <select
          id="service"
          {...register("service")}
          className={inputClass}
          style={{ color: "var(--color-text-heading)" }}
        >
          <option value="">Select a service...</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-body)" }}>
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          placeholder="Tell us about your project..."
          className={`${inputClass} resize-none`}
          style={{ color: "var(--color-text-heading)" }}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl font-semibold text-white hover:opacity-90 disabled:opacity-70 transition-opacity flex items-center justify-center gap-2"
        style={{ background: "var(--gradient-brand)" }}
      >
        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
        Send Message →
      </button>
    </form>
  );
}
