"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Building2 } from "lucide-react";
import { portfolioConfig } from "src/config/portfolio.config";
import { GlassCard } from "../ui/GlassCard";

export const Experience: React.FC = () => {
  const { experience } = portfolioConfig;

  return (
    <section id="experience" className="py-20 px-6 max-w-5xl mx-auto relative">
      {/* Background Glow Orb */}
      <div className="glow-orb w-[30vw] h-[30vw] bg-accent-cyan/8 top-[10%] left-[20%]" />

      {/* Section Header */}
      <div className="flex flex-col mb-16 items-center text-center">
        <h3 className="text-xs font-bold text-accent-primary tracking-widest uppercase mb-2">
          03. Professional History
        </h3>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Journey of Impact & Technical Growth
        </h2>
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="relative w-full mt-12">
        {/* Center line (absolute positioning) with neon glow */}
        <div 
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent-cyan via-accent-blue to-accent-emerald -translate-x-1/2 opacity-70"
          style={{ boxShadow: "0 0 10px rgba(6, 182, 212, 0.6), 0 0 4px rgba(6, 182, 212, 0.4)" }}
        />

        {experience.map((job, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={index} className="relative flex flex-col md:flex-row items-start justify-between w-full mb-12 last:mb-0">
              {/* Timeline Center Bullet Node with Neon Glow */}
              <div 
                className="absolute top-1.5 left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-slate-950 border-2 border-accent-cyan flex items-center justify-center z-20"
                style={{ boxShadow: "0 0 10px rgba(6, 182, 212, 0.8)" }}
              >
                <span className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_6px_#06b6d4]" />
              </div>

              {/* Responsive Layout wrapper */}
              <div className={`w-full md:w-[45%] ml-10 md:ml-0 ${isEven ? "md:mr-auto" : "md:ml-auto"}`}>
                <GlassCard
                  className="p-6 relative group"
                  glowColor={isEven ? "cyan" : "emerald"}
                >
                  {/* Glowing background card back-glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/3 to-accent-emerald/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                  {/* Header metadata */}
                  <div className="flex flex-col gap-1.5 mb-4">
                    <span className="text-xs font-bold text-accent-primary uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {job.duration}
                    </span>
                    <h4 className="text-lg font-bold tracking-tight text-foreground/90 leading-tight">
                      {job.role}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/50 font-semibold">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet Achievements list */}
                  <ul className="flex flex-col gap-2.5 mb-5" aria-label="Key Achievements">
                    {job.description.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs text-foreground/60 leading-relaxed items-start">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary mt-1.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack capsules tags */}
                  <div className="flex flex-wrap gap-1.5" aria-label="Technologies Used">
                    {job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-black/5 dark:bg-white/5 border border-glass-border-light dark:border-glass-border-dark text-foreground/60 tracking-wide"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Experience;
