"use client";

import React from "react";
import { ArrowLeft, Printer, Download } from "lucide-react";
import { portfolioConfig } from "src/config/portfolio.config";

export default function ResumePage() {
  const { fullName, role, shortBio, location, email, resumeUrl } = portfolioConfig.personalInfo;
  const { experience, skills } = portfolioConfig;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 sm:p-12 font-sans selection:bg-slate-200">
      {/* Top action header - invisible on print */}
      <div className="max-w-4xl mx-auto mb-10 pb-6 border-b border-slate-200 flex justify-between items-center no-print">
        <a
          href="/"
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Site
        </a>

        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider bg-slate-900 text-white rounded-lg cursor-pointer hover:bg-slate-800 transition duration-200"
          >
            <Printer className="w-4 h-4" /> Print CV
          </button>
          
          <a
            href={resumeUrl}
            download
            className="flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider border border-slate-300 text-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 transition duration-200"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>
        </div>
      </div>

      {/* CV Sheet Container */}
      <main className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header section */}
        <header className="pb-6 border-b-2 border-slate-900 flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight">{fullName}</h1>
          <div className="text-base font-bold text-slate-800 uppercase tracking-wide">{role}</div>
          <div className="text-xs text-slate-500 font-semibold">
            {location} • {email}
          </div>
        </header>

        {/* Executive Summary */}
        <section className="flex flex-col gap-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Executive Summary</h2>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700">{shortBio}</p>
        </section>

        {/* Experience Milestone */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Professional History</h2>
          <div className="flex flex-col gap-6">
            {experience.map((job, idx) => (
              <article key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-baseline gap-4 flex-wrap">
                  <h3 className="text-base font-bold text-slate-900">{job.role}</h3>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">{job.duration}</span>
                </div>
                <div className="text-xs font-semibold text-slate-500">{job.company} • {job.location}</div>
                <ul className="flex flex-col gap-2 mt-2 list-disc pl-4" aria-label={`Achievements at ${job.company}`}>
                  {job.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-xs text-slate-600 leading-relaxed pl-1">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Skills grid */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Core Capabilities</h2>
          <div className="flex flex-wrap gap-2">
            {skills.flatMap((cat) => cat.skills).map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-[11px] font-medium border border-slate-200 text-slate-700 bg-slate-50 rounded"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
