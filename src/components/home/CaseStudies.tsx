"use client";

/**
 * "What We've Built" — cinematic project cards with overlay and hover.
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowUpRight, Code2, BarChart3, MessageCircle } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "AI-Powered Support Platform",
    description: "Scaled customer support 3x with intelligent triage and resolution automation.",
    industry: "SaaS",
    tech: ["Next.js", "OpenAI", "PostgreSQL"],
    icon: MessageCircle,
    image: "linear-gradient(135deg, var(--accent-subtle) 0%, transparent 70%)",
  },
  {
    id: 2,
    title: "Predictive Analytics Dashboard",
    description: "Real-time forecasting and anomaly detection for enterprise operations.",
    industry: "Logistics",
    tech: ["React", "TensorFlow", "BigQuery"],
    icon: BarChart3,
    image: "linear-gradient(135deg, var(--accent-subtle) 0%, transparent 70%)",
  },
  {
    id: 3,
    title: "Custom RAG Knowledge Base",
    description: "Internal document search and Q&A with 95% accuracy on domain-specific queries.",
    industry: "Legal",
    tech: ["Python", "LangChain", "Pinecone"],
    icon: Code2,
    image: "linear-gradient(135deg, var(--accent-subtle) 0%, transparent 70%)",
  },
];

export function CaseStudies() {
  const ref = useScrollReveal();
  return (
    <section
      ref={ref}
      className="py-24 md:py-32 px-6 lg:px-16 bg-[var(--bg-section)]"
      style={{ background: "var(--bg-section)" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          Portfolio
        </p>
        <h2
          className="text-4xl md:text-6xl font-semibold mb-4"
          style={{
            letterSpacing: "-0.03em",
            lineHeight: "1.1",
            color: "var(--text-primary)",
          }}
        >
          What We&apos;ve Built
        </h2>
        <p
          className="text-lg max-w-2xl mt-4"
          style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
        >
          Featured projects across industries
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href="/#services"
                className="group relative overflow-hidden rounded-2xl block cursor-pointer"
                style={{ aspectRatio: "16/10" }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: project.image,
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon
                      className="w-16 h-16 opacity-30"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                </div>
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-end justify-between">
                    <div>
                      <p
                        className="text-xs font-medium tracking-widest uppercase mb-2 opacity-70"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {project.industry}
                      </p>
                      <h3
                        className="text-xl font-semibold"
                        style={{
                          letterSpacing: "-0.02em",
                          color: "var(--text-primary)",
                        }}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border"
                      style={{
                        background: "var(--accent-subtle)",
                        borderColor: "var(--border-strong)",
                        color: "var(--accent)",
                      }}
                    >
                      <span className="text-sm">↗</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
