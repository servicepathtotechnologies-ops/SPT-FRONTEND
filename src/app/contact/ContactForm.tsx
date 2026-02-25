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
  phone: z.string().max(20, "Phone must be at most 20 characters").optional().or(z.literal("")),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const inputBase =
  "w-full rounded-lg border border-[var(--border)] px-4 py-3 text-sm bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow";
const labelClass = "block text-sm font-medium mb-2";
const fieldErrorClass = "mt-1.5 text-xs text-red-500";

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
    // Optimistic: immediately show success state in the UI
    setSuccess(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send");
    } catch (e) {
      // If something actually fails, revert the success state and show the error
      setSuccess(false);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass} style={{ color: "var(--text-primary)" }}>
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            {...register("name")}
            placeholder="Your name"
            className={inputBase}
          />
          {errors.name && <p className={fieldErrorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass} style={{ color: "var(--text-primary)" }}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="you@company.com"
            className={inputBase}
          />
          {errors.email && <p className={fieldErrorClass}>{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClass} style={{ color: "var(--text-primary)" }}>
            Mobile number
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder=""
            className={inputBase}
          />
          {errors.phone && <p className={fieldErrorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className={labelClass} style={{ color: "var(--text-primary)" }}>
            Company
          </label>
          <input
            id="company"
            {...register("company")}
            placeholder="Your company"
            className={inputBase}
          />
        </div>
      </div>
      <div>
        <label htmlFor="service" className={labelClass} style={{ color: "var(--text-primary)" }}>
          Service
        </label>
        <select id="service" {...register("service")} className={inputBase}>
          <option value="">Select a service...</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className={labelClass} style={{ color: "var(--text-primary)" }}>
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          placeholder="Tell us about your project..."
          className={`${inputBase} resize-none min-h-[100px]`}
        />
        {errors.message && <p className={fieldErrorClass}>{errors.message.message}</p>}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-lg text-sm font-semibold text-white hover:opacity-90 disabled:opacity-70 transition-opacity flex items-center justify-center gap-2 mt-1"
        style={{ background: "var(--gradient-brand)" }}
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Send Message →
      </button>
    </form>
  );
}
