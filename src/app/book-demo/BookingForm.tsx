"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { SERVICES } from "@/lib/services";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  service: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00",
];

const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent";

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setError(null);
    // Optimistic: immediately show success state in the UI
    setSuccess(true);

    const date = new Date(`${data.date}T${data.time}`);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          date: date.toISOString(),
          service: selectedServices.length > 0 ? selectedServices.join(", ") : undefined,
          notes: data.notes,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to book");
    } catch (e) {
      // If something fails, revert the success state and show error
      setSuccess(false);
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-2xl border text-center"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
      >
        <p className="text-[var(--text-primary)] font-medium">Demo requested successfully.</p>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          We&apos;ll send a confirmation email shortly.
        </p>
      </motion.div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-3 mb-4 shrink-0">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors"
              style={{
                background: s === step ? "var(--accent)" : s < step ? "var(--success)" : "var(--bg-secondary)",
                color: s === step || s < step ? "white" : "var(--text-muted)",
              }}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className="w-8 h-0.5 mx-0.5"
                style={{ background: s < step ? "var(--success)" : "var(--border)" }}
              />
            )}
          </div>
        ))}
      </div>

      <div
        className="p-4 md:p-6 rounded-2xl border"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-3"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1 shrink-0">Contact Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Name *</label>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    className={inputClass}
                  />
                  {errors.name && <p className="mt-0.5 text-xs text-[#ef4444]">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Email *</label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                  {errors.email && <p className="mt-0.5 text-xs text-[#ef4444]">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Company</label>
                <input
                  {...register("company")}
                  placeholder="Your company"
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-2.5 rounded-full text-sm font-semibold text-white flex items-center justify-center gap-2 shrink-0"
                style={{ background: "var(--accent)" }}
              >
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-3"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-0 shrink-0">Service Selection</h3>
              <p className="text-xs text-[var(--text-secondary)] shrink-0">Select one or more (optional).</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES.map((s) => {
                  const isSelected = selectedServices.includes(s.slug);
                  return (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() =>
                        setSelectedServices((prev) =>
                          prev.includes(s.slug) ? prev.filter((x) => x !== s.slug) : [...prev, s.slug]
                        )
                      }
                      className="flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all cursor-pointer"
                      style={{
                        borderColor: isSelected ? "var(--accent)" : "var(--border)",
                        background: isSelected ? "var(--accent-subtle)" : "var(--bg-card)",
                        borderWidth: isSelected ? 2 : 1,
                      }}
                    >
                      <span
                        className="flex shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors"
                        style={{
                          borderColor: isSelected ? "var(--accent)" : "var(--border)",
                          background: isSelected ? "var(--accent)" : "transparent",
                        }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />}
                      </span>
                      <span className="text-[var(--text-primary)] text-xs font-medium truncate">{s.name}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-2.5 rounded-full text-sm font-medium border flex items-center justify-center gap-1.5"
                  style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white flex items-center justify-center gap-1.5"
                  style={{ background: "var(--accent)" }}
                >
                  Next
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-3"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1 shrink-0">Schedule</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Date *</label>
                  <input
                    type="date"
                    min={today}
                    {...register("date")}
                    className={inputClass}
                  />
                  {errors.date && <p className="mt-0.5 text-xs text-[#ef4444]">{errors.date.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Time *</label>
                  <select {...register("time")} className={inputClass}>
                    <option value="">Select...</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.time && <p className="mt-0.5 text-xs text-[#ef4444]">{errors.time.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Notes</label>
                <textarea
                  {...register("notes")}
                  rows={2}
                  placeholder="Any specific topics or questions?"
                  className={`${inputClass} resize-none`}
                />
              </div>
              {error && <p className="text-xs text-[#ef4444]">{error}</p>}
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-2.5 rounded-full text-sm font-medium border flex items-center justify-center gap-1.5"
                  style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white flex items-center justify-center gap-1.5 disabled:opacity-70"
                  style={{ background: "var(--accent)" }}
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Request demo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
