import React from 'react';
import { ShieldCheck, RefreshCw, Users, Zap, Target } from 'lucide-react';

export default function ProcessSection({ onStartWizard }) {
  return (
    <section id="process" className="py-24 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2 block">
            Process
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-neutral-950 leading-tight">
            Work hand-in-hand with 7-figure founders to launch your idea
          </h2>
          <p className="mt-4 text-lg text-neutral-600 font-medium">
            No fluff. No theoretical lectures. Just direct execution and guidance from founders who have built real $1M+ ARR businesses.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-300 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-neutral-950 mb-3">
              1-on-1 Weekly Mentorship
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Matched with a dedicated mentor who has scaled a business in your target industry. They guide your strategy, hold you accountable, and unlock their personal network.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-300 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center mb-6">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-neutral-950 mb-3">
              Rapid 2-Week Lean Sprints
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We test demand using rapid prototypes and zero-code experiments. Eliminate financial risk before spending money on developers, designers, or inventory.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-300 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-neutral-950 mb-3">
              Product-Market Fit Engine
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Access 100+ proven business validation experiments through our proprietary Open & Start Launch Platform to find customer demand fast.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
