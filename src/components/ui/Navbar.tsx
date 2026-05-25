"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useScrollSpy } from "src/hooks/useScrollSpy";
import { portfolioConfig } from "src/config/portfolio.config";

interface NavbarProps {
  sectionIds: string[];
}

export const Navbar: React.FC<NavbarProps> = ({ sectionIds }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useScrollSpy(sectionIds);

  const navItems = sectionIds.map((id) => {
    // Capitalize first letter or custom label mapping
    let label = id.charAt(0).toUpperCase() + id.slice(1);
    if (id === "experience") label = "Experience";
    if (id === "certifications") label = "Credentials";
    if (id === "projects") label = "Projects";
    if (id === "resume") label = "Resume Hub";
    return { id, label };
  });

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-4 left-4 right-4 md:left-8 md:right-8 mx-auto max-w-7xl h-16 rounded-full glass-effect z-40 px-6 py-2 flex items-center justify-between no-print"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      >
        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("home");
            }}
            className="text-lg font-bold bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-emerald bg-clip-text text-transparent cursor-pointer tracking-tight"
          >
            {portfolioConfig.personalInfo.fullName.split(" ")[0]}
            <span className="text-foreground/90 font-light">.dev</span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Desktop Menu">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "text-accent-primary"
                    : "text-foreground/60 hover:text-foreground/90"
                }`}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-accent-cyan/10 dark:bg-accent-emerald/10 rounded-full"
                    layoutId="activeNavIndicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Utility Actions (Theme & Resume) */}
        <div className="flex items-center gap-3">
          {/* Orbital Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-accent-cyan/25 bg-accent-cyan/5 text-[9px] font-bold text-accent-cyan tracking-widest uppercase select-none no-print">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse shrink-0" />
            <span>Orbit Active</span>
          </div>

          <a
            href={portfolioConfig.personalInfo.resumeUrl}
            download
            className="hidden sm:flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue hover:from-accent-blue hover:to-accent-emerald text-white shadow-md shadow-accent-cyan/20 cursor-pointer duration-300 hover:scale-103"
          >
            CV <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-full border border-glass-border-light dark:border-glass-border-dark glass-effect hover:bg-black/5 dark:hover:bg-white/10 text-foreground cursor-pointer"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-xl z-30 lg:hidden flex flex-col justify-center px-8 sm:px-12 py-20 no-print"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile Menu">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`text-3xl font-bold tracking-tight text-left cursor-pointer transition-colors ${
                      isActive
                        ? "text-accent-primary"
                        : "text-foreground/50 hover:text-foreground"
                    }`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>

            <motion.div
              className="mt-12 pt-8 border-t border-glass-border-light dark:border-glass-border-dark flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm text-foreground/40 font-medium">Let's Connect</p>
              <a
                href={portfolioConfig.personalInfo.resumeUrl}
                download
                className="w-full flex items-center justify-center gap-2 p-4 text-center font-bold rounded-xl bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-emerald text-white cursor-pointer shadow-lg shadow-accent-cyan/15 hover:scale-102 duration-300"
              >
                Download ATS Resume <ArrowUpRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
