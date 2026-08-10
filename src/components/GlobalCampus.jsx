import React from 'react';
import { Globe, Users, Sparkles } from 'lucide-react';

export default function GlobalCampus() {
  const stats = [
    { label: "Active Founders", value: "1,200+" },
    { label: "Cities Across India", value: "35+" },
    { label: "Avg. Founder Revenue", value: "₹84L+" },
    { label: "Revenue Generating Rate", value: "70%" }
  ];

  return (
    <section className="py-24 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
            A Truly Global Campus
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Immerse yourself in a community of inspirational founders
          </h2>
          <p className="mt-4 text-neutral-400 text-lg">
            Don’t go it alone. Join ambitious founders worldwide selected for their curiosity and drive to build real businesses.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 text-center">
              <div className="text-4xl sm:text-5xl font-black text-white mb-2 font-sans">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-neutral-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
