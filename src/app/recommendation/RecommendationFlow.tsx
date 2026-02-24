"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Loader2 } from "lucide-react";

const STEPS = [
  { id: "industry", label: "Industry", placeholder: "e.g. E-commerce, Healthcare, Finance" },
  { id: "goals", label: "What do you want to achieve?", placeholder: "e.g. Automate support, improve sales, analyze data" },
  { id: "scale", label: "Scale (optional)", placeholder: "e.g. Startup, Mid-market, Enterprise" },
];

export function RecommendationFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const currentStep = STEPS[step];
  const value = data[currentStep?.id] ?? "";

  async function handleNext() {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: data.industry,
          goals: data.goals,
          scale: data.scale || undefined,
          email: email || undefined,
        }),
      });
      const json = await res.json();
      if (json.recommended) setResult(json.recommended);
    } catch {
      setResult(["Custom AI Solutions"]);
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-8"
      >
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">We recommend</h2>
        <ul className="space-y-2 mb-6">
          {result.map((s) => (
            <li key={s} className="flex items-center gap-2 text-[var(--muted)]">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              {s}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--muted)] mb-4">
          Get a tailored quote or book a demo to discuss your needs.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact">
            <Button size="md">Get quote</Button>
          </Link>
          <Link href="/book-demo">
            <Button variant="outline" size="md">Book a demo</Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mt-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              {currentStep.label}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setData((d) => ({ ...d, [currentStep.id]: e.target.value }))}
              placeholder={currentStep.placeholder}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
            />
          </div>
          {step === STEPS.length - 1 && (
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Email (optional – to receive results and follow-up)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex items-center justify-between">
        <span className="text-sm text-[var(--muted)]">
          Step {step + 1} of {STEPS.length}
        </span>
        <Button onClick={handleNext} disabled={loading || (step === 0 && !data.industry)} className="gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {step < STEPS.length - 1 ? "Next" : "Get recommendation"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
