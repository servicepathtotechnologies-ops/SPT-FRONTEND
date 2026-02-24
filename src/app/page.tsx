import { HeroDynamic } from "@/components/home/HeroDynamic";
import { TrustedBy } from "@/components/home/TrustedBy";
import { StatsBar } from "@/components/home/StatsBar";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ValueProposition } from "@/components/home/ValueProposition";
import { CaseStudies } from "@/components/home/CaseStudies";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeCTA } from "@/components/home/HomeCTA";

export default function HomePage() {
  return (
    <>
      <HeroDynamic />
      <TrustedBy />
      <StatsBar />
      <ServicesShowcase />
      <HowItWorks />
      <ValueProposition />
      <CaseStudies />
      <Testimonials />
      <HomeCTA />
    </>
  );
}
