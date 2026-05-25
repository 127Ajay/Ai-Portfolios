"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Cpu } from "lucide-react";
import { portfolioConfig } from "src/config/portfolio.config";
import { GlassCard } from "../ui/GlassCard";

export const Skills: React.FC = () => {
  const { skills } = portfolioConfig;
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto relative">
      {/* Background Glow Orbs */}
      <div className="glow-orb w-[30vw] h-[30vw] bg-accent-blue/10 bottom-[10%] left-[-10%]" />

      {/* Section Header */}
      <div className="flex flex-col mb-12">
        <h3 className="text-xs font-bold text-accent-primary tracking-widest uppercase mb-2">
          02. Technical Skills
        </h3>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Systems Architectures & Core Capabilities
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Aspect: Category Selection Buttons */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {skills.map((category, index) => {
            const isActive = activeCategory === index;
            return (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`w-full p-4.5 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden flex items-center justify-between group ${
                  isActive
                    ? "glass-effect border-accent-cyan/30 text-accent-cyan shadow-lg shadow-accent-cyan/5"
                    : "border-glass-border-light dark:border-glass-border-dark bg-black/3 dark:bg-white/3 hover:bg-black/5 dark:hover:bg-white/5 hover:border-glass-border-light/80 text-foreground/60 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-y from-accent-cyan to-accent-emerald" />
                )}
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border transition-colors ${
                    isActive ? "bg-accent-cyan/15 border-accent-cyan/20 text-accent-cyan" : "bg-black/5 dark:bg-white/5 border-glass-border-light dark:border-glass-border-dark group-hover:text-foreground"
                  }`}>
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold tracking-tight">{category.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                  isActive ? "translate-x-1" : "group-hover:translate-x-0.5 opacity-50"
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Aspect: Interactive Progress Dashboard */}
        <div className="lg:col-span-8">
          <GlassCard hoverEffect={false} className="p-8 h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {skills[activeCategory].skills.map((skill, idx) => {
                  const glowMap = {
                    cyan: "from-accent-cyan/60 to-accent-blue/80 bg-accent-cyan/20 text-accent-cyan shadow-accent-cyan/20",
                    emerald: "from-accent-emerald/60 to-accent-cyan/80 bg-accent-emerald/20 text-accent-emerald shadow-accent-emerald/20",
                    blue: "from-accent-blue/60 to-accent-cyan/80 bg-accent-blue/20 text-accent-blue shadow-accent-blue/20",
                  };
                  
                  return (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-sm font-bold tracking-tight text-foreground/80">{skill.name}</span>
                        <span className="text-xs font-mono font-bold text-foreground/45">{skill.level}%</span>
                      </div>
                      
                      {/* Interactive custom progress bar */}
                      <div className="w-full h-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-glass-border-light dark:border-glass-border-dark overflow-hidden relative p-0.5">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${
                            glowMap[skill.color as keyof typeof glowMap] || glowMap.cyan
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.05 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
            
            {/* Design Footnote */}
            <div className="mt-8 pt-6 border-t border-glass-border-light dark:border-glass-border-dark flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-primary animate-ping" />
              <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider">
                Continuously auditing security scan compliance, profiling query performances, and optimizing real-time event integration pipelines.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
export default Skills;
