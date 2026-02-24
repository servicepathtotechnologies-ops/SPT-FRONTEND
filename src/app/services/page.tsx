import "./services-page.css";
import { ServicesShowcasePage } from "@/components/services/ServicesShowcasePage";

export const metadata = {
  title: "Services | Service Path Technologies",
  description:
    "Explore our AI services: chatbots, automation, development, image & video generation, voice, analytics, marketing, support, and custom AI solutions.",
};

/** Prevent static cache so UI updates are visible after code changes */
export const dynamic = "force-dynamic";

export default function ServicesPage() {
  return (
    <div data-page="services-showcase">
      <ServicesShowcasePage />
    </div>
  );
}
