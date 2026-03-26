"use client";

/**
 * Our Services: full-page-style sections without scroll-snap.
 * Each service block reuses the services page layout but scrolls smoothly with the rest of the page.
 */
import { 
  Check, 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  Code2, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  BarChart3, 
  Megaphone, 
  Headphones, 
  Sparkles 
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { servicesShowcaseData, type ServiceShowcaseItem } from "@/lib/servicesShowcaseData";

const iconMap: Record<string, any> = {
  MessageSquare,
  Zap,
  Code2,
  Image: ImageIcon,
  Video,
  Mic,
  BarChart3,
  Megaphone,
  Headphones,
  Sparkles,
};

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

function ServiceCard({ service, index }: { service: ServiceShowcaseItem; index: number }) {
  const IconComponent = iconMap[service.icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      className="group relative flex flex-col h-full rounded-2xl border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
      style={{ 
        borderColor: "var(--border)", 
        background: "rgba(255, 255, 255, 0.015)",
        backdropFilter: "blur(8px)"
      }}
    >
      {/* Image Header - Compact 16:8 aspect ratio */}
      <div className="aspect-[21/9] md:aspect-[16/8] relative overflow-hidden">
        <img
          src={service.homeImage ?? service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />
        
        {/* Compact Icon Badge */}
        <div 
          className="absolute bottom-3 left-4 p-2.5 rounded-xl backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 group-hover:scale-110"
          style={{ background: "rgba(255, 255, 255, 0.08)" }}
        >
          <IconComponent className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-lg md:text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
          {service.name}
        </h3>
        <p className="text-xs md:text-sm text-[var(--text-secondary)] mb-6 line-clamp-2 leading-relaxed opacity-90">
          {service.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* How It Works (Ultra Compact) */}
          <div>
            <h4 className="text-[9px] font-bold text-[var(--accent)] uppercase tracking-[0.15em] mb-3">
              Process
            </h4>
            <ul className="space-y-2">
              {service.howItWorks.slice(0, 3).map((step, i) => (
                <li key={i} className="flex gap-2 text-[10px] md:text-[11px] text-[var(--text-secondary)] leading-tight">
                  <span className="shrink-0 w-3.5 h-3.5 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] text-[8px] font-bold flex items-center justify-center border border-[var(--accent)]/10">
                    {i + 1}
                  </span>
                  <span className="line-clamp-2">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits (Ultra Compact) */}
          <div>
            <h4 className="text-[9px] font-bold text-[var(--accent)] uppercase tracking-[0.15em] mb-3">
              Value
            </h4>
            <ul className="space-y-2">
              {service.benefits.slice(0, 3).map((benefit, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[10px] md:text-[11px] text-[var(--text-secondary)] leading-tight">
                  <Check className="w-3 h-3 shrink-0 text-[var(--accent)] mt-0.5" />
                  <span className="line-clamp-2">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compact Tech Tags */}
        <div className="mb-6 mt-auto">
          <div className="flex flex-wrap gap-1">
            {service.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech} 
                className="text-[9px] font-medium px-2 py-0.5 rounded-md border border-[var(--border)] bg-white/5"
                style={{ color: "var(--text-muted)" }}
              >
                {tech}
              </span>
            ))}
            {service.technologies.length > 3 && (
              <span className="text-[9px] font-medium px-1 py-0.5" style={{ color: "var(--text-muted)" }}>
                +{service.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border)]/50 flex items-center justify-between">
          <Link
            href="/book-demo"
            className="group/btn inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-all"
          >
            Details
            <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
          </Link>
          
          <Link
             href="/book-demo"
             className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-95"
             style={{ background: "var(--accent)" }}
          >
            Demo
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 48,
    scale: 0.96,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  })
};

export default function ServicesShowcase() {
  return (
    <section 
      id="services" 
      className="py-16 md:py-20 bg-muted/20 dark:bg-muted/10 relative overflow-hidden transition-colors duration-500"
    >
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Our Services
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            AI That Powers Your <span className="text-primary">Business</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Build, deploy, and optimize production-ready solutions across every business function.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-10">
          {servicesShowcaseData.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
            >
              <div 
                className="service-card group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-500 ease-out max-h-[calc(100vh-250px)]"
                style={{ minHeight: '540px' }}
              >
                {/* ── IMAGE AREA — compact ── */}
                <div className="service-image-container relative overflow-hidden h-36 flex-shrink-0">
                  <img
                    src={service.homeImage ?? service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  {/* Number badge — top right */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Title overlaid on image */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6">
                    <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                      {service.name}
                    </h3>
                  </div>
                  
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>

                {/* ── CONTENT AREA ── */}
                <div className="flex flex-col gap-3 p-4 pb-6 flex-1 overflow-hidden">
                  {/* Description + AI-Powered badge row */}
                  <div className="flex items-start gap-2">
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                      {service.description}
                    </p>
                    <span className="flex-shrink-0 flex items-center gap-1 text-[9px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      AI-Powered
                    </span>
                  </div>

                  {/* Thin separator */}
                  <div className="h-px bg-border flex-shrink-0" />

                  {/* HOW WE DO IT */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-[9px] font-bold text-primary uppercase tracking-[0.12em] bg-primary/8 border border-primary/15 px-2 py-0.5 rounded-full whitespace-nowrap">
                        How We Do It
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    
                    <ol className="space-y-1.5">
                      {service.howItWorks.slice(0, 3).map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-sm mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-xs text-foreground leading-snug">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* WHAT YOU GET */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.12em] bg-emerald-500/8 border border-emerald-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                        What You Get
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {service.benefits.slice(0, 4).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="flex-shrink-0 text-emerald-500 text-[10px] font-bold mt-0.5">
                            ✓
                          </span>
                          <span className="text-xs text-foreground leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-1" />

                  {/* TECH STACK */}
                  {service.technologies && service.technologies.length > 0 && (
                    <div className="flex-shrink-0">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold mb-1.5">
                        Built With
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {service.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border font-medium">
                            {tech}
                          </span>
                        ))}
                        {service.technologies.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                            +{service.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* CTA BUTTONS */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border flex-shrink-0 mt-1">
                    <Link
                      href={`/services#${service.id}`}
                      className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 group/link"
                    >
                      <span>Details</span>
                      <span className="group-hover/link:translate-x-1 transition-transform duration-200 text-sm">
                        →
                      </span>
                    </Link>
                    <div className="flex-1" />
                    <Link
                      href="/book-demo"
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-white text-[11px] font-semibold shadow-md shadow-primary/20 hover:opacity-90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                    >
                      Book Demo
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
