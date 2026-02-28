import type { Metadata } from "next";
import { BookingForm } from "./BookingForm";

export const metadata: Metadata = {
  title: "Book a demo | Service Path Technologies",
  description:
    "Schedule a demo with our team to see how AI can transform your business.",
};

export default function BookDemoPage() {
  return (
    <div
      className="min-h-screen flex flex-col overflow-y-auto pt-20 md:pt-24 pb-24 md:pb-12"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto px-5 sm:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] text-center mb-1.5 shrink-0">
          Book a Demo
        </h1>
        <p className="text-sm text-[var(--text-secondary)] text-center mb-4 shrink-0">
          Pick a time that works for you. We&apos;ll send a confirmation and calendar invite.
        </p>
        <BookingForm />
      </div>
    </div>
  );
}
