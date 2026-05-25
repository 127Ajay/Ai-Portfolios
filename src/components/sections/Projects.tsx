"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Filter, Sparkles, X, ChevronRight } from "lucide-react";
import { portfolioConfig, ProjectItem } from "src/config/portfolio.config";
import { GlassCard } from "../ui/GlassCard";

// Custom SVG Github icon to ensure absolute dependency-version resilience
const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export const Projects: React.FC = () => {
  const { projects } = portfolioConfig;
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Available unique categories
  const categories = ["All", "Full-Stack", "Frontend", "Creative 3D", "Open Source"];

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    return project.category === filter;
  });

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="glow-orb w-[40vw] h-[40vw] bg-accent-emerald/8 top-[30%] left-[-15%]" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h3 className="text-xs font-bold text-accent-primary tracking-widest uppercase mb-2">
            04. Portfolio Projects
          </h3>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Proof of Technical Excellence
          </h2>
        </div>

        {/* Dynamic Category Filter Bar */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-black/3 dark:bg-white/3 w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4.5 py-2 text-xs font-bold tracking-tight rounded-xl cursor-pointer transition-all duration-300 ${
                filter === cat
                  ? "bg-gradient-to-r from-accent-cyan to-accent-blue text-white shadow-md shadow-accent-cyan/15"
                  : "text-foreground/50 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Interactive Project Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex h-full"
            >
              <GlassCard
                className="flex flex-col justify-between h-full p-6 w-full cursor-pointer group"
                onClick={() => setSelectedProject(project)}
                glowColor={project.featured ? "emerald" : "default"}
              >
                {/* Upper Details */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-accent-cyan/10 border border-accent-cyan/15 text-accent-cyan tracking-wider">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-accent-emerald uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5 text-accent-emerald animate-pulse" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-bold tracking-tight mb-2 text-foreground/90 group-hover:text-accent-primary duration-300">
                    {project.title}
                  </h4>
                  <p className="text-xs text-foreground/60 leading-relaxed mb-6">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Tech tags and action CTA */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[9px] font-bold rounded bg-black/5 dark:bg-white/5 border border-glass-border-light dark:border-glass-border-dark text-foreground/50 tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-black/5 dark:bg-white/5 text-foreground/40 font-mono">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-glass-border-light dark:border-glass-border-dark">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent-primary flex items-center gap-1 group-hover:translate-x-1 duration-300">
                      Learn More <ChevronRight className="w-3.5 h-3.5" />
                    </span>

                    {/* External repository links (prevents trigger of parent card click modal) */}
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-black/3 dark:bg-white/3 hover:bg-black/8 dark:hover:bg-white/8 text-foreground/60 hover:text-foreground cursor-pointer transition-colors"
                          title="Github Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-black/3 dark:bg-white/3 hover:bg-black/8 dark:hover:bg-white/8 text-foreground/60 hover:text-foreground cursor-pointer transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Full-Screen Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 no-print"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dark background blur backdrop */}
            <div
              className="absolute inset-0 bg-[#030712]/60 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Box */}
            <motion.div
              className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto glass-effect rounded-2xl shadow-2xl p-6 sm:p-8 border border-glass-border-light dark:border-glass-border-dark flex flex-col gap-6"
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-glass-border-light dark:border-glass-border-dark bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground cursor-pointer transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-accent-cyan/10 border border-accent-cyan/15 text-accent-cyan tracking-wider">
                    {selectedProject.category}
                  </span>
                  {selectedProject.featured && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-accent-emerald uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Featured Experience</span>
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-accent-cyan to-accent-emerald bg-clip-text text-transparent">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Case Study Core Body */}
              <div className="flex flex-col gap-4">
                <div>
                  <h5 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-1.5">Overview</h5>
                  <p className="text-sm leading-relaxed text-foreground/70">{selectedProject.longDesc}</p>
                </div>

                {selectedProject.metrics && (
                  <div>
                    <h5 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">Technical Impact</h5>
                    <ul className="flex flex-col gap-2" aria-label="Project Impact Metrics">
                      {selectedProject.metrics.map((metric, idx) => (
                        <li key={idx} className="flex gap-2.5 text-xs text-foreground/60 leading-relaxed items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald shrink-0" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h5 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">Technologies Deployed</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-black/5 dark:bg-white/5 border border-glass-border-light dark:border-glass-border-dark text-foreground/60 tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer action anchors */}
              <div className="flex gap-3 pt-6 border-t border-glass-border-light dark:border-glass-border-dark mt-4">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-white shadow-md cursor-pointer hover:scale-102 transition duration-200"
                  >
                    View Live Site <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-black/3 dark:bg-white/3 hover:bg-black/6 dark:hover:bg-white/6 text-foreground cursor-pointer transition duration-200"
                  >
                    Github Source <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Projects;
