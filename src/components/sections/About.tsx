"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Award, ShieldAlert, AwardIcon } from "lucide-react";
import Image from "next/image";
import { portfolioConfig } from "src/config/portfolio.config";
import { GlassCard } from "../ui/GlassCard";

export const About: React.FC = () => {
  const { fullName, longBio, location, avatarUrl } = portfolioConfig.personalInfo;
  const { metrics } = portfolioConfig;
  const [activeTab, setActiveTab] = useState<"bio" | "values">("bio");

  const coreValues = [
    {
      title: "Resilient Scaling",
      desc: "Architecting transactionally guaranteed Kafka event streaming, robust Outbox patterns, and highly optimized SQL Server schemas.",
      icon: ShieldAlert,
    },
    {
      title: "Enterprise Security",
      desc: "Enforcing rigorous scan compliance (Checkmarx/Contrast), protecting credentials via AWS Secrets Manager, and eliminating bot abuse.",
      icon: AwardIcon,
    },
    {
      title: "Real-Time Visibility",
      desc: "Constructing zero-latency control-room telemetry and interactive operational dashboards using SignalR server sockets.",
      icon: User,
    }
  ];

  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto relative">
      {/* Backlight Glow */}
      <div className="glow-orb w-[30vw] h-[30vw] bg-accent-emerald/10 top-[20%] right-[-5%]" />

      {/* Section Header */}
      <div className="flex flex-col mb-12">
        <h3 className="text-xs font-bold text-accent-primary tracking-widest uppercase mb-2">
          01. About Me
        </h3>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Architecting High-Scale Integrations & Resilient Distributed Systems
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Aspect: Profile Avatar Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <GlassCard hoverEffect={false} className="p-2 w-full max-w-md aspect-square overflow-hidden group">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-800/20">
              {/* Overlay Glass Highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/20 to-accent-emerald/10 opacity-30 z-10 duration-500 group-hover:opacity-0" />
              
              {/* Dynamic glowing border orb */}
              <div className="absolute -inset-2 bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-emerald opacity-30 group-hover:opacity-60 blur-md transition duration-500 rounded-xl" />
              
              <div className="absolute inset-0.5 bg-background/90 dark:bg-[#030712]/95 rounded-xl z-0 overflow-hidden flex items-center justify-center">
                <Image
                  src={avatarUrl}
                  alt={fullName}
                  width={400}
                  height={400}
                  priority
                  className="object-cover w-full h-full rounded-xl opacity-75 group-hover:opacity-95 group-hover:scale-105 duration-500 z-10"
                />
                
                {/* Animated Particle Rings Inside Avatar Space */}
                <div className="absolute inset-0 border border-dashed border-accent-cyan/15 animate-spin rounded-full m-8 z-20 pointer-events-none" style={{ animationDuration: "12s" }} />
                <div className="absolute inset-0 border border-dotted border-accent-emerald/15 animate-spin rounded-full m-16 z-20 pointer-events-none" style={{ animationDuration: "8s", animationDirection: "reverse" }} />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Aspect: Interactive Content Tab */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Tab Selector Buttons */}
          <div className="flex gap-2 p-1.5 rounded-full border border-glass-border-light dark:border-glass-border-dark bg-black/5 dark:bg-white/5 w-fit">
            <button
              onClick={() => setActiveTab("bio")}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer transition-all duration-300 ${
                activeTab === "bio"
                  ? "bg-gradient-to-r from-accent-cyan to-accent-blue text-white shadow-md"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Who I Am
            </button>
            <button
              onClick={() => setActiveTab("values")}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer transition-all duration-300 ${
                activeTab === "values"
                  ? "bg-gradient-to-r from-accent-cyan to-accent-blue text-white shadow-md"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Core Values
            </button>
          </div>

          {/* Interactive Card display */}
          <GlassCard hoverEffect={false} className="min-h-[280px] p-8 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeTab === "bio" ? (
                <motion.div
                  key="bio"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-xl font-bold tracking-tight mb-3">
                    Hi, I'm a developer based in <span className="text-accent-primary">{location}</span>.
                  </h4>
                  <p className="text-sm leading-relaxed text-foreground/70 mb-4">
                    {longBio}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    I believe software engineering is not just about writing code. It is the art of building rock-solid, transactional, and event-driven data highways that empower global organizations to stream operations in real-time.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="values"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5"
                >
                  {coreValues.map((val, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="p-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan mt-0.5">
                        <val.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold mb-0.5">{val.title}</h5>
                        <p className="text-xs text-foreground/60 leading-relaxed">{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          {/* Quantitative Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            {metrics.map((metric, index) => (
              <GlassCard
                key={index}
                className="p-5 text-center flex flex-col justify-center items-center"
                glowColor={index % 2 === 0 ? "cyan" : "emerald"}
              >
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-accent-cyan to-accent-emerald bg-clip-text text-transparent">
                  {metric.value}
                  {metric.suffix ? <span className="text-foreground/90 font-light">{metric.suffix}</span> : null}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mt-1">
                  {metric.label}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
