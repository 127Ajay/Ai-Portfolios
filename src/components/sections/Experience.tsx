"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Building2 } from "lucide-react";
import { portfolioConfig } from "src/config/portfolio.config";
import { GlassCard } from "../ui/GlassCard";

interface TimelineItemProps {
  job: typeof portfolioConfig.experience[0];
  index: number;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ job, index, isLast }) => {
  const isEven = index % 2 === 0;
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific item in the viewport
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 85%", "center 50%"]
  });
  
  // Animate the active line scale from 0 to 1 as the card is scrolled past
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Animate the bullet scale and glow on active scroll
  const bulletScale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1.1]);
  const bulletGlow = useTransform(scrollYProgress, [0, 0.4], ["0 0 0px rgba(6,182,212,0)", "0 0 12px rgba(6,182,212,0.9)"]);

  return (
    <div 
      ref={itemRef} 
      className="relative flex flex-col md:flex-row items-start justify-between w-full mb-12 last:mb-0"
    >
      {/* 1. Background Inactive Line Segment (only if not last) */}
      {!isLast && (
        <div 
          className="absolute left-4 md:left-1/2 top-4 bottom-[-4rem] w-[3px] bg-slate-800/20 dark:bg-white/10 -translate-x-1/2 rounded-full pointer-events-none"
        />
      )}

      {/* 2. Active Animated Line Segment (only if not last) */}
      {!isLast && (
        <motion.div 
          className="absolute left-4 md:left-1/2 top-4 bottom-[-4rem] w-[3px] bg-gradient-to-b from-accent-cyan via-accent-blue to-accent-emerald -translate-x-1/2 origin-top rounded-full pointer-events-none z-10"
          style={{ 
            scaleY,
            boxShadow: "0 0 10px rgba(6, 182, 212, 0.6), 0 0 4px rgba(6, 182, 212, 0.4)"
          }}
        />
      )}

      {/* Timeline Center Bullet Node with Neon Glow */}
      <motion.div 
        className="absolute top-1.5 left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-slate-950 border-2 border-accent-cyan flex items-center justify-center z-20"
        style={{ 
          scale: bulletScale,
          boxShadow: bulletGlow
        }}
      >
        <span className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_6px_#06b6d4]" />
      </motion.div>

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
};

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
        {experience.map((job, index) => (
          <TimelineItem 
            key={index} 
            job={job} 
            index={index} 
            isLast={index === experience.length - 1} 
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
