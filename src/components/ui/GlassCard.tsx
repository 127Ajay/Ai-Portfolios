"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "src/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: "emerald" | "cyan" | "blue" | "default";
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverEffect = true,
  glowColor = "default",
  ...props
}) => {
  const glowStyles = {
    default: "hover:border-accent-cyan/30 dark:hover:border-accent-emerald/40",
    emerald: "hover:border-accent-emerald/40 hover:shadow-accent-emerald/10",
    cyan: "hover:border-accent-cyan/40 hover:shadow-accent-cyan/10",
    blue: "hover:border-accent-blue/40 hover:shadow-accent-blue/10",
  };

  return (
    <motion.div
      className={cn(
        "glass-card p-6 relative overflow-hidden",
        hoverEffect && "hover:-translate-y-1 duration-300",
        glowStyles[glowColor],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...props}
    >
      {/* Dynamic Glow Backlight Inside the Card */}
      <div className="absolute -inset-px bg-gradient-to-br from-accent-cyan/5 to-accent-emerald/5 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-[inherit] pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
