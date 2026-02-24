import type { Metadata } from "next";
import { RecommendationFlow } from "./RecommendationFlow";

export const metadata: Metadata = {
  title: "Find your solution | Service Path Technologies",
  description: "Answer a few questions and we'll recommend the best AI services for your business.",
};

export default function RecommendationPage() {
  return (
    <div className="pt-24 md:pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[var(--foreground)]">Find your solution</h1>
        <p className="mt-4 text-[var(--muted)]">
          Tell us about your business and we'll recommend the best AI services for you.
        </p>
        <RecommendationFlow />
      </div>
    </div>
  );
}
