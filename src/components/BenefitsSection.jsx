import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function BenefitsSection({ onStartWizard }) {
  const pillars = [
    {
      step: "01",
      title: "Start small",
      desc: "Test demand for your idea by starting with a range of lightweight prototypes. No need to invest large amounts of money upfront on custom developers, designers, or complex manufacturing.",
      tag: "Zero Capital Risk"
    },
    {
      step: "02",
      title: "Iterate rapidly",
      desc: "Using real feedback & data from prospective customers, iterate on your product proposition in tight 2-week sprints to rapidly land on a version customers love.",
      tag: "2-Week Sprints"
    },
    {
      step: "03",
      title: "Find Product / Market Fit",
      desc: "During your 1-on-1 sessions, your mentor assigns the exact validation experiments needed to optimize your customer acquisition and revenue metrics.",
      tag: "Data-Driven Traction"
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
            Our Methodology
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Use lean methodology to launch faster & smarter
          </h2>
          <p className="mt-4 text-neutral-400 text-lg">
            Avoid wasting months of time and capital on ideas that haven't been validated by real buyers.
          </p>
        </div>

        {/* Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl font-black text-neutral-600 group-hover:text-white transition-colors">
                    {item.step}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/60 flex items-center text-xs font-semibold text-neutral-300 group-hover:text-white">
                Learn how it works
                <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-850 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Ready to turn your idea into a business?
            </h4>
            <p className="text-neutral-400 text-sm sm:text-base">
              Match with your 7-figure mentor in under 4 minutes.
            </p>
          </div>
          <button
            onClick={onStartWizard}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-neutral-950 bg-white rounded-full hover:bg-neutral-200 transition-all shadow-xl whitespace-nowrap"
          >
            Start your application
          </button>
        </div>

      </div>
    </section>
  );
}
