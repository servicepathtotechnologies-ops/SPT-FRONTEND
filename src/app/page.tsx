import { HeroDynamic } from "@/components/home/HeroDynamic";
import { TrustedBy } from "@/components/home/TrustedBy";
import { StatsBar } from "@/components/home/StatsBar";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ValueProposition } from "@/components/home/ValueProposition";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeCTA } from "@/components/home/HomeCTA";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <HeroDynamic />
      <TrustedBy />
      <StatsBar />
      <ServicesShowcase />
      <HowItWorks />
      <ValueProposition />
      <ProjectsSection />
      <Testimonials />
      <HomeCTA />
      <Footer />
    </>
  );
}
