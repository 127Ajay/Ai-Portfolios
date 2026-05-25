"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, ArrowUpRight } from "lucide-react";
import { portfolioConfig } from "src/config/portfolio.config";
import { GlassCard } from "../ui/GlassCard";

export const Certifications: React.FC = () => {
  const { certifications } = portfolioConfig;

  return (
    <section id="certifications" className="py-20 px-6 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="glow-orb w-[25vw] h-[25vw] bg-accent-blue/5 top-[10%] right-[10%]" />

      {/* Section Header */}
      <div className="flex flex-col mb-12 items-center text-center">
        <h3 className="text-xs font-bold text-accent-primary tracking-widest uppercase mb-2">
          05. Verified Credentials
        </h3>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Certifications & Professional Badges
        </h2>
      </div>

      {/* Tidy slide grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <GlassCard
            key={index}
            className="flex flex-col justify-between p-6 group"
            glowColor={index % 2 === 0 ? "cyan" : "emerald"}
          >
            <div>
              {/* Badge Icon */}
              <div className="p-3 rounded-2xl bg-accent-cyan/15 border border-accent-cyan/20 text-accent-cyan w-fit mb-5">
                {cert.issuer.includes("Amazon") ? (
                  <ShieldCheck className="w-6 h-6 animate-pulse" />
                ) : (
                  <Award className="w-6 h-6" />
                )}
              </div>

              <h4 className="text-lg font-bold tracking-tight mb-1 group-hover:text-accent-primary duration-300">
                {cert.title}
              </h4>
              <p className="text-xs font-semibold text-foreground/50 mb-3">
                Issued by {cert.issuer} • {cert.date}
              </p>
              
              {cert.credentialId && (
                <div className="text-[10px] font-mono text-foreground/40 font-semibold mb-6">
                  License: {cert.credentialId}
                </div>
              )}
            </div>

            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-accent-primary group-hover:underline cursor-pointer pt-4 border-t border-glass-border-light dark:border-glass-border-dark mt-4"
              >
                Verify Credential <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
export default Certifications;
