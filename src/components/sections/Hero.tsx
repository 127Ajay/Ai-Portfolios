"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight, MousePointer } from "lucide-react";
import { portfolioConfig } from "src/config/portfolio.config";

export const Hero: React.FC = () => {
  const { fullName, tagline, shortBio } = portfolioConfig.personalInfo;
  
  // Keystroke role typist simulator
  const [typedRole, setTypedRole] = useState("");
  const targetRoles = [
    "Senior Software Engineer",
    "Event-Driven Architecture Specialist",
    "Apache Kafka Pipeline Specialist",
    "Distributed Systems Architect"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const activeText = targetRoles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedRole(activeText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 35);
    } else {
      timer = setTimeout(() => {
        setTypedRole(activeText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 75);
    }

    // Finished typing active word
    if (!isDeleting && charIndex === activeText.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait 2s
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % targetRoles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] w-full flex flex-col justify-center items-center px-6 overflow-hidden"
    >
      {/* Background Backlights */}
      <div className="glow-orb w-[40vw] h-[40vw] bg-accent-cyan/15 top-[-10%] left-[-10%] animate-pulse-glow" />
      <div className="glow-orb w-[45vw] h-[45vw] bg-accent-emerald/15 bottom-[-10%] right-[-10%] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="max-w-4xl text-center z-10 flex flex-col items-center">
        {/* Luminous Welcome Badge */}
        <motion.div
          className="px-4.5 py-1.5 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 text-xs font-bold text-accent-cyan tracking-widest uppercase mb-6 flex items-center gap-1.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MousePointer className="w-3.5 h-3.5 animate-bounce" />
          <span>Interactive Experience</span>
        </motion.div>

        {/* Master Heading */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi, I'm <span className="bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-emerald bg-clip-text text-transparent">{fullName}</span>
        </motion.h1>

        {/* Dynamic Role Typist */}
        <motion.h2
          className="text-lg sm:text-2xl md:text-3xl font-semibold tracking-tight text-foreground/80 mb-6 h-8 sm:h-10 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="typing-cursor font-mono">{typedRole}</span>
        </motion.h2>

        {/* Short Bio description */}
        <motion.p
          className="text-sm sm:text-lg text-foreground/60 max-w-2xl leading-relaxed mb-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {shortBio}
        </motion.p>

        {/* Hero CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 z-20"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <button
            onClick={() => handleScrollTo("projects")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-emerald text-white shadow-lg shadow-accent-cyan/15 hover:scale-103 duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            Explore Projects <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={portfolioConfig.personalInfo.resumeUrl}
            download
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider border border-glass-border-light dark:border-glass-border-dark glass-effect hover:bg-black/5 dark:hover:bg-white/10 text-foreground duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" /> Download Resume
          </a>
        </motion.div>
      </div>

      {/* Visual Mouse Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer no-print opacity-60 hover:opacity-100 duration-300"
        onClick={() => handleScrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-foreground/45 dark:border-white/40 flex justify-center p-1 shadow-[0_0_8px_rgba(255,255,255,0.05)]">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
            style={{ boxShadow: "0 0 8px #06b6d4" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};
export default Hero;
