"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Phone, CheckCircle2, AlertTriangle } from "lucide-react";
import { portfolioConfig } from "src/config/portfolio.config";
import { GlassCard } from "../ui/GlassCard";

// Custom SVG brand icon renderer to prevent dependency version mismatches
const SocialIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  if (name === "Github") {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    );
  }
  if (name === "LinkedIn") {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
      </svg>
    );
  }
  if (name === "Twitter") {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return null;
};

export const Contact: React.FC = () => {
  const { email, phone, location } = portfolioConfig.personalInfo;
  const { github, linkedin, twitter } = portfolioConfig.socialLinks;

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus("sending");

    // Simulate server post timeout
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
      // Reset form status back to idle after 4 seconds
      setTimeout(() => setFormStatus("idle"), 4000);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  const socialLinks = [
    { name: "Github", url: github, color: "hover:text-[#2ea44f]" },
    { name: "LinkedIn", url: linkedin, color: "hover:text-[#0077b5]" },
    { name: "Twitter", url: twitter, color: "hover:text-[#1da1f2]" },
  ].filter(link => link.url);

  return (
    <section id="contact" className="py-20 px-6 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="glow-orb w-[35vw] h-[35vw] bg-accent-emerald/8 bottom-[-10%] right-[-10%]" />

      {/* Section Header */}
      <div className="flex flex-col mb-12">
        <h3 className="text-xs font-bold text-accent-primary tracking-widest uppercase mb-2">
          07. Connect With Me
        </h3>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Let's Architect Something Special
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Personal Info & Social Grid */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <GlassCard className="p-8 flex flex-col justify-center flex-1" hoverEffect={false}>
            <h4 className="text-xl font-bold tracking-tight mb-6">Contact Information</h4>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4 items-center">
                <div className="p-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Email Address</h5>
                  <a href={`mailto:${email}`} className="text-sm font-semibold hover:text-accent-primary duration-200">
                    {email}
                  </a>
                </div>
              </div>

              {phone && (
                <div className="flex gap-4 items-center">
                  <div className="p-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Direct Phone</h5>
                    <a href={`tel:${phone}`} className="text-sm font-semibold hover:text-accent-primary duration-200">
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex gap-4 items-center">
                <div className="p-2.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Office Location</h5>
                  <span className="text-sm font-semibold text-foreground/80">{location}</span>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="mt-10 pt-6 border-t border-glass-border-light dark:border-glass-border-dark">
              <h5 className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-4">Find Me Online</h5>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-3 rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-black/5 dark:bg-white/5 hover:bg-black/8 dark:hover:bg-white/8 text-foreground/60 hover:scale-105 duration-300 cursor-pointer ${social.color}`}
                    title={social.name}
                  >
                    <SocialIcon name={social.name} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Side: Contact Form Box */}
        <div className="lg:col-span-7">
          <GlassCard className="p-8 h-full flex flex-col justify-center" hoverEffect={false}>
            <AnimatePresence mode="wait">
              {formStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8 flex flex-col items-center gap-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-accent-emerald animate-bounce" />
                  <h4 className="text-2xl font-bold tracking-tight text-accent-emerald">Message Transmitted!</h4>
                  <p className="text-sm text-foreground/60 max-w-sm leading-relaxed">
                    Thank you. Your message has bypassed firewall nodes and landed in my direct inbox successfully. I will follow up shortly.
                  </p>
                </motion.div>
              ) : formStatus === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8 flex flex-col items-center gap-4"
                >
                  <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />
                  <h4 className="text-2xl font-bold tracking-tight text-red-500">Transmission Failed</h4>
                  <p className="text-sm text-foreground/60 max-w-sm leading-relaxed">
                    An unexpected packet drops error occurred. Please refresh or try email me directly at {email}.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider px-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Jane Doe"
                      disabled={formStatus === "sending"}
                      className="p-3.5 rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-black/5 dark:bg-white/5 focus:bg-transparent text-sm text-foreground placeholder-foreground/30 focus:border-accent-cyan/60 dark:focus:border-accent-emerald/60 focus:ring-1 focus:ring-accent-primary outline-none duration-300"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider px-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. recruiter@company.com"
                      disabled={formStatus === "sending"}
                      className="p-3.5 rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-black/5 dark:bg-white/5 focus:bg-transparent text-sm text-foreground placeholder-foreground/30 focus:border-accent-cyan/60 dark:focus:border-accent-emerald/60 focus:ring-1 focus:ring-accent-primary outline-none duration-300"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider px-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Discuss project requirements, hiring pipelines, or technical consultation..."
                      disabled={formStatus === "sending"}
                      className="p-3.5 rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-black/5 dark:bg-white/5 focus:bg-transparent text-sm text-foreground placeholder-foreground/30 focus:border-accent-cyan/60 dark:focus:border-accent-emerald/60 focus:ring-1 focus:ring-accent-primary outline-none duration-300 resize-none"
                    />
                  </div>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full mt-2 p-4 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-emerald text-white cursor-pointer shadow-lg shadow-accent-cyan/15 hover:scale-101 hover:shadow-accent-cyan/25 duration-300 flex items-center justify-center gap-2"
                  >
                    {formStatus === "sending" ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                        <span>Transmitting Packet...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Transmit Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
export default Contact;
