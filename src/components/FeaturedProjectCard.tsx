"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Check, ExternalLink, ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";

interface FeaturedProjectCardProps {
  project: Project;
}

const FeaturedBrowserMockup = ({ url, colorAccent }: { url: string; colorAccent: string }) => {
  return (
    <div className="relative group/mockup rounded-xl overflow-hidden border border-border bg-card shadow-lg transition-all duration-700 group-hover/card:scale-[1.01]"
         style={{ "--tw-shadow-color": `${colorAccent}22` } as any}>
      {/* Browser Bar */}
      <div className="flex items-center gap-1.2 px-3 py-1.5 bg-muted/50 backdrop-blur-sm border-b border-border/30">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/40" />
          <div className="w-2 h-2 rounded-full bg-amber-500/40" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
        </div>
        <div className="flex-1 mx-3 h-5 rounded-md bg-background/50 border border-border/30 flex items-center px-4 text-[9px] text-muted-foreground font-mono truncate">
          {url}
        </div>
      </div>
      
      {/* Content Area - Extra compact */}
      <div className="relative aspect-[21/9] md:aspect-auto md:h-[260px] lg:h-[300px] w-full overflow-hidden bg-background">
        <iframe
          src={url}
          className="w-[100%] h-[100%] border-0 pointer-events-none scale-[0.5] origin-top-left opacity-90 transition-opacity group-hover/mockup:opacity-100"
          style={{ width: '200%', height: '200%' }}
          loading="lazy"
          title="Featured Project preview"
          sandbox="allow-scripts allow-same-origin"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group/card relative w-full flex flex-col md:flex-row gap-6 lg:gap-12 items-center bg-card p-4 md:p-6 lg:p-8 rounded-2xl border border-border shadow-md transition-all duration-500 hover:border-primary/30 overflow-hidden"
    >
      <div className="w-full md:w-[45%] flex-shrink-0">
        <FeaturedBrowserMockup url={project.liveUrl} colorAccent={project.accentColor} />
      </div>

      <div className="flex-1 md:pr-4 flex flex-col justify-center overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <span 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20"
          >
            <Star className="w-2.5 h-2.5 fill-current" />
            Featured
          </span>
          <span 
            className="px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border"
            style={{ 
              backgroundColor: `${project.accentColor}10`, 
              color: project.accentColor, 
              borderColor: `${project.accentColor}20` 
            }}
          >
            {project.categoryLabel}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-foreground mb-3 tracking-tight leading-tight break-words">
          {project.tagline}
        </h3>
        
        <p className="text-muted-foreground text-[11px] md:text-xs leading-relaxed mb-4 max-w-xl font-medium line-clamp-2 md:line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[8px] font-bold border border-border/50"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-5">
          {project.features.slice(0, 4).map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-[10px] text-foreground font-medium truncate">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Check className="w-2.5 h-2.5 text-primary" strokeWidth={4} />
              </div>
              {feature}
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-4 border-t border-border/50">
          <Link
            href={project.liveUrl}
            target="_blank"
            className="flex-1 lg:flex-none px-5 py-2.5 rounded-lg font-black text-[10px] transition-all duration-300 hover:scale-[1.02] shadow-sm shadow-primary/20 flex items-center justify-center gap-2"
            style={{ backgroundColor: project.accentColor, color: '#fff' }}
          >
            Launch Site
            <ExternalLink className="w-3 h-3" />
          </Link>
          <Link
            href="/book-demo"
            className="flex-1 lg:flex-none px-5 py-2.5 rounded-lg border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground font-black text-[10px] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            Contact Us
            <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
