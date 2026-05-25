"use client";

import React from "react";
import dynamic from "next/dynamic";
import { portfolioConfig } from "src/config/portfolio.config";

// Core UI Components
import ProgressIndicator from "src/components/ui/ProgressIndicator";
import Navbar from "src/components/ui/Navbar";
import RecruiterPanel from "src/components/ui/RecruiterPanel";

// Section Components
import Hero from "src/components/sections/Hero";
import About from "src/components/sections/About";
import Skills from "src/components/sections/Skills";
import Experience from "src/components/sections/Experience";
import Projects from "src/components/sections/Projects";
import Certifications from "src/components/sections/Certifications";
import Blog from "src/components/sections/Blog";
import Contact from "src/components/sections/Contact";
import ResumeSection from "src/components/sections/ResumeSection";

// Dynamically import Three.js WebGL Canvas to prevent server-side hydration crashes
const Scene3D = dynamic(() => import("src/components/3d/Scene3D"), {
  ssr: false,
});

export default function Home() {
  // Navigation mapping identifiers
  const sectionIds = [
    "home",
    "about",
    "skills",
    "experience",
    "projects",
    "certifications",
    "blog",
    "contact",
    "resume",
  ];

  return (
    <div className="flex-1 w-full min-h-full flex flex-col relative">
      {/* 3D Immersive WebGL Background Canvas */}
      <Scene3D />

      {/* Top Fixed Progress bar */}
      <ProgressIndicator />

      {/* Global Navigation Header */}
      <Navbar sectionIds={sectionIds} />

      {/* Main Sections Body */}
      <main className="flex-1 flex flex-col w-full relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Blog />
        <Contact />
        <ResumeSection />
      </main>

      {/* Sticky recruitment-focused Quick CTA Panel */}
      <RecruiterPanel />

      {/* Footer */}
      <footer className="py-8 text-center text-[10px] font-bold uppercase tracking-wider text-foreground/35 border-t border-glass-border-light dark:border-glass-border-dark mt-16 no-print relative z-10">
        <div>© 2026 {portfolioConfig.personalInfo.fullName}. All Rights Reserved.</div>
        <div className="mt-1 text-foreground/20">
          Designed with 3D Parallax & Frosted Glassmorphism.
        </div>
      </footer>
    </div>
  );
}
