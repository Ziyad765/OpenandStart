import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PricingSection({ onStartWizard }) {
  return (
    <section id="pricing" className="py-24 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
            Pricing & Value
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            10x more practical, 10x lower cost
          </h2>
          <p className="mt-4 text-neutral-400 text-lg">
            No overpriced academic lectures. Real 1-on-1 execution with 7-figure mentors at a fraction of the cost.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-neutral-800 text-xs uppercase tracking-wider text-neutral-400">
                <th className="py-4 px-6">Feature</th>
                <th className="py-4 px-6">Traditional Business Degrees</th>
                <th className="py-4 px-6">Standard Incubators</th>
                <th className="py-4 px-6 text-white font-bold bg-neutral-900 rounded-t-2xl">Open & Start</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-neutral-800/60 font-medium">
              <tr>
                <td className="py-4 px-6 text-white font-bold">1-on-1 Mentor Matching</td>
                <td className="py-4 px-6 text-neutral-500">Academic Professors</td>
                <td className="py-4 px-6 text-neutral-500">Group Office Hours</td>
                <td className="py-4 px-6 text-emerald-400 font-bold bg-neutral-900">7-Figure Active Founders</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-white font-bold">Methodology</td>
                <td className="py-4 px-6 text-neutral-500">Theory & Case Studies</td>
                <td className="py-4 px-6 text-neutral-500">Fast Demo Day Pitch</td>
                <td className="py-4 px-6 text-emerald-400 font-bold bg-neutral-900">2-Week Rapid Lean Sprints</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-white font-bold">Equity Requirement</td>
                <td className="py-4 px-6 text-neutral-500">0%</td>
                <td className="py-4 px-6 text-red-400">7% – 10% Equity Taken</td>
                <td className="py-4 px-6 text-emerald-400 font-bold bg-neutral-900">0% — Keep 100% Ownership</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-white font-bold">Time Commitment</td>
                <td className="py-4 px-6 text-neutral-500">Full-Time (2 Years)</td>
                <td className="py-4 px-6 text-neutral-500">Full-Time Batch</td>
                <td className="py-4 px-6 text-emerald-400 font-bold bg-neutral-900 rounded-b-2xl">Part-Time (10–15 hrs/week)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onStartWizard}
            className="inline-flex items-center px-9 py-4 text-base font-bold text-neutral-950 bg-white rounded-full hover:bg-neutral-200 transition-all shadow-xl"
          >
            Apply for next cohort
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

      </div>
    </section>
  );
}
