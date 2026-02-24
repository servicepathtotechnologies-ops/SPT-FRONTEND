import type { Metadata } from "next";
import { BookingForm } from "./BookingForm";

export const metadata: Metadata = {
  title: "Book a demo | Service Path Technologies",
  description:
    "Schedule a demo with our team to see how AI can transform your business.",
};

export default function BookDemoPage() {
  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-24" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-2xl mx-auto px-6 lg:px-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] text-center mb-4">
          Book a Demo
        </h1>
        <p className="text-lg text-[var(--text-secondary)] text-center mb-12">
          Pick a time that works for you. We&apos;ll send a confirmation and calendar invite.
        </p>
        <BookingForm />
      </div>
    </div>
  );
}
