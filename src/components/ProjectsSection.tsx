"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2, Sparkles, Filter } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { FeaturedProjectCard } from "./FeaturedProjectCard";

const CATEGORIES = [
  "All Projects",
  "AI & SaaS",
  "Business Tools",
  "Real Estate",
  "Hospitality",
  "Agency / Portfolio",
  "Mobile App",
];

export const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("All Projects");

  const filteredProjects = useMemo(() => {
    if (activeTab === "All Projects") return projects;
    return projects.filter((p) => p.category === activeTab);
  }, [activeTab]);

  const featured = projects.find((p) => p.featured);
  const remaining = filteredProjects.filter((p) => !p.featured || activeTab !== "All Projects");

  return (
    <section 
      id="projects" 
      className="relative py-20 md:py-28 lg:py-32 bg-background overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none dark:opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-muted/30 to-background pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Our Work
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 tracking-tight leading-[1.1]"
          >
            Projects That Drive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 italic">Real Results</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            From AI SaaS to real estate portals — we build digital products that clients love and users keep coming back to.
          </motion.p>
          
          {/* Animated Underline */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '80px', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-violet-500 mt-8 rounded-full"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === category 
                ? "text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {activeTab === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-8 md:space-y-10 lg:space-y-12">
          {/* Featured Project - Only show if AI & SaaS or All Projects is selected */}
          {featured && (activeTab === "All Projects" || activeTab === "AI & SaaS") && (
            <FeaturedProjectCard project={featured} />
          )}

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {remaining.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <Filter className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No projects found in this category</h3>
            <p className="text-muted-foreground">We&apos;re currently working on more. Check back soon!</p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 md:mt-24 lg:mt-32 p-8 md:p-12 rounded-[2.5rem] bg-muted/50 border border-border relative overflow-hidden group"
        >
          {/* Background shapes - subtle glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-4xl font-black text-foreground mb-3">
                Have a project in mind?
              </h3>
              <p className="text-muted-foreground text-lg">
                Let&apos;s build something great together. We&apos;re ready to turn your vision into reality.
              </p>
            </div>
            
            <Link
              href="/book-demo"
              className="px-10 py-5 bg-foreground text-background font-black rounded-2xl text-lg transition-transform hover:scale-[1.05] shadow-xl hover:shadow-foreground/10 flex items-center gap-3 whitespace-nowrap"
            >
              Start Your Project
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
