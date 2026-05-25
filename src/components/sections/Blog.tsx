"use client";

import React from "react";
import { BookOpen, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { portfolioConfig } from "src/config/portfolio.config";
import { GlassCard } from "../ui/GlassCard";

export const Blog: React.FC = () => {
  const { blogPosts } = portfolioConfig;

  return (
    <section id="blog" className="py-20 px-6 max-w-7xl mx-auto relative">
      {/* Background Glow */}
      <div className="glow-orb w-[30vw] h-[30vw] bg-accent-cyan/5 bottom-[10%] left-[10%]" />

      {/* Section Header */}
      <div className="flex flex-col mb-12 items-center text-center">
        <h3 className="text-xs font-bold text-accent-primary tracking-widest uppercase mb-2">
          06. Engineering Logs
        </h3>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Recent Articles & Technical Writings
        </h2>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <GlassCard
            key={post.slug}
            className="flex flex-col justify-between p-6 group h-full"
            glowColor={index % 2 === 0 ? "cyan" : "emerald"}
          >
            <div>
              {/* Blog Header metadata */}
              <div className="flex items-center gap-3 text-xs text-foreground/50 font-semibold mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h4 className="text-lg font-bold tracking-tight mb-2.5 group-hover:text-accent-primary duration-300">
                {post.title}
              </h4>
              <p className="text-xs text-foreground/60 leading-relaxed mb-6">
                {post.summary}
              </p>
            </div>

            <div>
              {/* Post Tags list */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[9px] font-bold rounded bg-black/5 dark:bg-white/5 border border-glass-border-light dark:border-glass-border-dark text-foreground/45 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={`#blog-${post.slug}`}
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-accent-primary group-hover:translate-x-1 duration-300 pt-4 border-t border-glass-border-light dark:border-glass-border-dark w-fit mt-4"
              >
                Read Full Article <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Standalone View All CTA */}
      <div className="mt-12 text-center z-10">
        <a
          href="https://medium.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-glass-border-light dark:border-glass-border-dark glass-effect hover:bg-black/5 dark:hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-foreground cursor-pointer duration-300"
        >
          <BookOpen className="w-4 h-4 text-accent-cyan" /> Visit Medium Profile
        </a>
      </div>
    </section>
  );
};
export default Blog;
