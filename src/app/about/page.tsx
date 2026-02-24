import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | Service Path Technologies",
  description: "Learn about Service Path Technologies and our mission to deliver enterprise technology solutions.",
};

export default function AboutPage() {
  return <AboutContent />;
}
