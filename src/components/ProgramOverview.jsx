import React from 'react';
import { Award, CheckCircle2, BadgeCheck } from 'lucide-react';

export default function ProgramOverview() {
  const milestones = [
    { title: "Idea Validation & Market Sizing", credits: "Module 1" },
    { title: "No-Code Prototyping & Landing Page", credits: "Module 2" },
    { title: "Customer Acquisition & Growth Hacking", credits: "Module 3" },
    { title: "Financial Modeling & Unit Economics", credits: "Module 4" },
    { title: "Investor Pitching & Seed Fundraising", credits: "Module 5" }
  ];

  return (
    <section className="py-24 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2 block">
              Certification
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-tight mb-6">
              Gain verifiable Founder Credentials as you launch
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8">
              Every launch milestone, customer discovery experiment, and growth sprint you complete earns you verifiable credits toward your Open & Start Founder Certification. Build a real business with a proven track record.
            </p>

            <div className="space-y-4">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm font-semibold text-neutral-900 flex-grow">{m.title}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-200 text-neutral-700">{m.credits}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 text-white shadow-2xl relative overflow-hidden border border-neutral-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-8 border border-emerald-500/30">
                <BadgeCheck className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-3">
                Open & Start Launch Certificate
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                Verified portfolio of completed customer experiments, financial models, and pitch decks backed by 1-on-1 mentor endorsement.
              </p>

              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>Program Duration: 18 Months Part-Time</span>
                <span className="text-emerald-400 font-semibold">100% Practical Execution</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
