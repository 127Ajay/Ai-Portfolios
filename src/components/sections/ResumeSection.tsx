"use client";

import React from "react";
import { FileText, Download, Printer, ArrowUpRight } from "lucide-react";
import { portfolioConfig } from "src/config/portfolio.config";
import { GlassCard } from "../ui/GlassCard";

export const ResumeSection: React.FC = () => {
  const { fullName, role, shortBio, location, email, resumeUrl } = portfolioConfig.personalInfo;
  const { experience, skills } = portfolioConfig;

  return (
    <section id="resume" className="py-20 px-6 max-w-5xl mx-auto relative">
      {/* Background Glow */}
      <div className="glow-orb w-[30vw] h-[30vw] bg-accent-cyan/5 top-[10%] left-[10%]" />

      {/* Section Header */}
      <div className="flex flex-col mb-12 items-center text-center">
        <h3 className="text-xs font-bold text-accent-primary tracking-widest uppercase mb-2">
          08. Resume Hub
        </h3>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Printable Credentials & Fast Tracking
        </h2>
      </div>

      {/* Main Terminal Card */}
      <GlassCard className="p-8 sm:p-10" hoverEffect={false}>
        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-glass-border-light dark:border-glass-border-dark mb-8">
          <div>
            <h4 className="text-xl font-bold tracking-tight text-foreground/90">Curriculum Vitae Preview</h4>
            <p className="text-xs text-foreground/50 leading-relaxed mt-0.5">
              Review a highly optimized digital rendering of my formal professional credentials.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-2.5">
            <a
              href={resumeUrl}
              download
              className="flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-white shadow-md cursor-pointer hover:scale-102 transition duration-200"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
            
            <a
              href="/resume"
              target="_blank"
              className="flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-black/5 dark:bg-white/5 hover:bg-black/8 dark:hover:bg-white/8 text-foreground cursor-pointer transition duration-200"
            >
              <Printer className="w-4 h-4" /> Clean Print View <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Interactive PDF Document Viewer */}
        <div className="w-full h-[650px] rounded-xl overflow-hidden border border-glass-border-light dark:border-glass-border-dark bg-black/10 shadow-inner">
          <iframe
            src="/resume.pdf#toolbar=0"
            className="w-full h-full border-none"
            title={`${fullName} Professional Resume PDF`}
          />
        </div>
      </GlassCard>
    </section>
  );
};
export default ResumeSection;
