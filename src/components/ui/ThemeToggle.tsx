"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    
    const initialDark = storedTheme === "dark" || 
      (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDark(initialDark);
    if (initialDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextDark = !isDark;
    
    setIsDark(nextDark);
    if (nextDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2.5 rounded-full border border-glass-border-light dark:border-glass-border-dark glass-effect hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 cursor-pointer relative overflow-hidden"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="absolute inset-0 flex items-center justify-center text-accent-emerald"
      >
        <Moon className="w-5 h-5" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex items-center justify-center text-accent-cyan"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
    </motion.button>
  );
};
export default ThemeToggle;
