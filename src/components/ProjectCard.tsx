"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";
import VideoModal from "./VideoModal";

interface ProjectCardProps {
  project: Project;
}

const BrowserMockup = ({ project }: { project: Project }) => {
  const [iframeError, setIframeError] = useState(false);
  const colorAccent = project.accentColor;
  const displayUrl = project.liveUrl.replace('https://', '').replace(/\/$/, '');

  return (
    <div className="relative group/mockup overflow-hidden border-b border-border bg-card transition-all duration-500 group-hover/card:shadow-lg"
         style={{ "--tw-shadow-color": `${colorAccent}22` } as any}>
      {/* Browser Bar */}
      <div className="flex items-center gap-1.2 px-3 py-1.5 bg-muted/50 backdrop-blur-sm border-b border-border/30">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/40" />
          <div className="w-2 h-2 rounded-full bg-amber-500/40" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
        </div>
        <div className="flex-1 mx-3 h-5 rounded-md bg-background/50 border border-border/30 flex items-center px-3 text-[9px] text-muted-foreground font-mono truncate">
          {displayUrl}
        </div>
      </div>
      
      {/* Content Area - More compact aspect ratio */}
      <div className="relative aspect-[2/1] w-full overflow-hidden bg-background">
        {iframeError ? (
          <div 
            className={`w-full h-full flex flex-col items-center justify-center gap-3 relative overflow-hidden ${project.accentGradientClass}`}
          >
            {/* Shimmer overlay */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2.5s infinite',
              }}
            />
            <span className="text-5xl font-thin text-white/90 relative z-10">{project.emoji}</span>
            <div className="text-center relative z-10">
              <p className="text-white font-bold text-lg tracking-widest">{project.title}</p>
              <p className="text-white/60 text-xs mt-1 tracking-wider">{project.liveUrl.replace('https://www.', '').replace('https://', '').replace(/\/$/, '')}</p>
            </div>
          </div>
        ) : (
          <>
            <iframe
              src={project.liveUrl}
              className="w-[100%] h-[100%] border-0 pointer-events-none scale-[0.4] origin-top-left opacity-90 transition-opacity group-hover/mockup:opacity-100"
              style={{ width: '250%', height: '250%' }}
              loading="lazy"
              title="Project preview"
              sandbox="allow-scripts allow-same-origin"
              onError={() => setIframeError(true)}
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          </>
        )}
      </div>
    </div>
  );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <>
      {project.type === 'mobile' ? (
        <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden 
                        hover:-translate-y-1 hover:shadow-xl hover:border-orange-500/30 
                        transition-all duration-300 group">

          {/* ── PREVIEW AREA ── */}
          <div 
            className="relative overflow-hidden flex items-center justify-between px-8"
            style={{ 
              height: '260px',
              background: project.previewBg || 'linear-gradient(135deg, #0f172a 0%, #111827 50%, #0f172a 100%)'
            }}
          >
            {/* Dot grid background pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{ 
                backgroundImage: `radial-gradient(circle, ${project.accentColor}66 1px, transparent 1px)`,
                backgroundSize: '28px 28px'
              }}
            />
            
            {/* Glow behind phone */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-20 blur-3xl"
              style={{ background: project.accentColor }}
            />

            {/* Left: Tech stack vertical list */}
            <div className="relative z-10 hidden sm:flex flex-col gap-2">
              {project.techStack.slice(0, 4).map((tech) => (
                <div 
                  key={tech}
                  className="bg-white/10 backdrop-blur-md border border-white/15 
                             rounded-lg px-3 py-1.5 text-xs font-medium text-white/80
                             hover:bg-white/15 transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>

            {/* Center: Phone mockup */}
            <div className="relative z-10 flex flex-col items-center gap-3 w-full sm:w-auto">
              {/* Phone shell */}
              <div 
                className="relative bg-gray-900 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500 mx-auto"
                style={{ 
                  width: '110px', 
                  height: '200px',
                  borderRadius: '24px',
                  border: '2.5px solid rgba(255,255,255,0.2)',
                  boxShadow: `0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), 0 0 40px ${project.accentColor}33`
                }}
              >
                {/* Notch */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-gray-900"
                  style={{ width: '44px', height: '14px', borderRadius: '0 0 12px 12px' }}
                />
                
                {/* Screen inner border */}
                <div 
                  className="absolute inset-[2px] rounded-[22px] overflow-hidden bg-black"
                >
                  {project.videoPath ? (
                    <video
                      src={project.videoPath}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex flex-col items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${project.accentColor}44, ${project.accentColor}22)` }}
                    >
                      <span className="text-3xl mb-1">{project.emoji}</span>
                      <span className="text-white/60 text-xs font-medium text-center px-2">
                        {project.title}
                      </span>
                    </div>
                  )}
                  
                  {/* Screen shine */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)' }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Platform chips vertical */}
            <div className="relative z-10 hidden sm:flex flex-col gap-2">
              {project.platform?.split(' & ').map((platform) => (
                <div 
                  key={platform}
                  className="bg-white/10 backdrop-blur-md border border-white/15 
                             rounded-lg px-3 py-1.5 text-xs font-medium text-white/80
                             hover:bg-white/15 transition-colors flex items-center gap-1.5"
                >
                  {platform === 'Android' ? '🤖' : '🍎'} {platform}
                </div>
              ))}
            </div>

          </div>
          {/* ── END PREVIEW AREA ── */}


          {/* ── CONTENT AREA ── */}
          <div className="p-6 flex flex-col gap-4">
            
            {/* Top badges row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span 
                className="text-xs font-semibold px-3 py-1 rounded-full border"
                style={{ 
                  color: project.accentColor, 
                  borderColor: `${project.accentColor}40`,
                  backgroundColor: `${project.accentColor}15`
                }}
              >
                Flutter Mobile App
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted 
                               px-2.5 py-1 rounded-full border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                Android & iOS
              </span>
            </div>

            {/* Title + tagline */}
            <div>
              <h3 className="text-xl font-bold text-foreground leading-tight">
                {project.title}
              </h3>
              <p className="text-sm font-medium text-muted-foreground mt-0.5">
                {project.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {project.description}
            </p>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Features list — SINGLE COLUMN, clean */}
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                  <span 
                    className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: project.accentColor }}
                  >
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <span 
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground 
                             border border-border font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border">
                  +{project.techStack.length - 4} more
                </span>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setVideoModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold 
                           px-4 py-2.5 rounded-xl text-white transition-all duration-200 
                           hover:opacity-90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                style={{ 
                  backgroundColor: project.accentColor,
                  boxShadow: `0 4px 20px ${project.accentColor}40`
                }}
              >
                <span className="text-base">▶</span>
                Watch Full Demo
              </button>
              
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-1 text-sm font-semibold 
                           px-4 py-2.5 rounded-xl border border-border text-foreground 
                           hover:bg-muted hover:border-foreground/20 transition-all duration-200
                           hover:scale-[1.02] active:scale-[0.98]"
              >
                Request This App
                <span className="text-base">→</span>
              </Link>
            </div>

          </div>
          {/* ── END CONTENT AREA ── */}

          {/* Video modal */}
          {project.videoPath && (
            <VideoModal
              videoSrc={project.videoPath}
              title={project.title}
              isOpen={videoModalOpen}
              onClose={() => setVideoModalOpen(false)}
            />
          )}

        </div>
      ) : (
        <motion.div
          layout
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group/card flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-xl"
        >
          <BrowserMockup project={project} />

          <div className="p-4 sm:p-6 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <span 
                  className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border"
                  style={{ 
                    backgroundColor: `${project.accentColor}10`, 
                    color: project.accentColor, 
                    borderColor: `${project.accentColor}20` 
                  }}
                >
                  {project.categoryLabel}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-black text-foreground mb-2 group-hover:text-primary transition-colors truncate">
              {project.title}
            </h3>
            
            <p className="text-muted-foreground text-[11px] leading-relaxed mb-4 line-clamp-2 font-medium">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.slice(0, 3).map((tech) => (
                <span 
                  key={tech} 
                  className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[8px] font-bold border border-border/50"
                >
                {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-[8px] text-muted-foreground font-bold">+{project.techStack.length - 3}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-5 flex-1">
              {project.features.slice(0, 4).map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-[10px] text-foreground/80 font-medium truncate">
                  <div className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Check className="w-2 h-2 text-primary" strokeWidth={4} />
                  </div>
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4 border-t border-border/50">
              <Link
                href={project.liveUrl}
                target="_blank"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-black text-[10px] transition-all duration-300 hover:shadow-md shadow-primary/10"
                style={{ backgroundColor: project.accentColor, color: '#fff' }}
              >
                Live Site
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="/book-demo"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground font-black text-[10px] transition-all duration-300"
              >
                Details
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

// Helper function to convert hex to rgb for rgba usage
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
    '124, 58, 237';
}
