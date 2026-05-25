"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Mail, Copy, Check, Briefcase } from "lucide-react";
import { portfolioConfig } from "src/config/portfolio.config";

export const RecruiterPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show widget only after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioConfig.personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-40 max-w-sm w-80 glass-effect p-4.5 rounded-2xl shadow-2xl border border-glass-border-light dark:border-glass-border-dark no-print"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
        >
          {/* Header Banner */}
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-emerald"></span>
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-accent-emerald tracking-wide uppercase">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Available for Hire</span>
            </div>
          </div>

          <h4 className="text-sm font-bold tracking-tight mb-1 text-foreground/90">
            Recruiter Quick Hub
          </h4>
          <p className="text-[11px] text-foreground/50 leading-relaxed mb-4">
            Instant credentials verification terminal designed for fast-track recruitment.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-col gap-2">
            <a
              href={portfolioConfig.personalInfo.resumeUrl}
              download
              className="flex items-center justify-center gap-2 w-full p-2.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-accent-cyan to-accent-blue text-white rounded-xl shadow-md hover:scale-102 transition duration-200 cursor-pointer"
            >
              <FileText className="w-4 h-4" /> Download ATS Resume
            </a>

            <div className="flex items-center gap-2">
              <a
                href={`mailto:${portfolioConfig.personalInfo.email}`}
                className="flex items-center justify-center gap-1.5 flex-1 p-2.5 text-xs font-semibold border border-glass-border-light dark:border-glass-border-dark bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground rounded-xl transition duration-200 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" /> Email
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-1.5 flex-1 p-2.5 text-xs font-semibold border border-glass-border-light dark:border-glass-border-dark bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground rounded-xl transition duration-200 cursor-pointer"
                title="Copy Email to Clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-accent-emerald animate-scale-up" />
                    <span className="text-accent-emerald font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Email
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default RecruiterPanel;
