import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Clock, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function PricingSection({ onStartWizard }) {
  return (
    <section id="pricing" className="py-24 bg-[#09090b] text-white relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              Purpose-Driven Ventures
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Launch a meaningful business <br />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              with real purpose
            </span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed">
            Real 1-on-1 guidance from 7-figure sector founders. Pivot your business model, validate real demand, and build a high-margin enterprise.
          </p>
        </div>

        {/* Featured Founder Spotlight Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-xl shadow-2xl mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden group">
          {/* Subtle Top Border Glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-extrabold mb-6 uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" /> Featured Founder
            </div>
            
            <h3 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-tight">
              Nayar Pervez <span className="text-neutral-400 font-normal text-xl sm:text-2xl block sm:inline sm:ml-2">— Founder of NeonLimitless</span>
            </h3>

            <blockquote className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8 font-medium italic border-l-2 border-emerald-500 pl-4">
              "Working with my mentor at Open & Start allowed me to pivot our business model from B2C to high-margin B2B within 4 weeks. We reached ₹15,00,000/mo before even finishing the program."
            </blockquote>

            {/* Impact Metric Chips */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                <span className="block text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                  ₹15L+/mo
                </span>
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Recurring Revenue
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                <span className="block text-3xl sm:text-4xl font-black text-white tracking-tight">
                  4 Weeks
                </span>
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Validation Time
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Block */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-80 relative border border-neutral-800 bg-neutral-950">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
                alt="Nayar Pervez - NeonLimitless Case Study"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-neutral-900/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Verified 1-on-1 Mentorship Result</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  NeonLimitless
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Mentorship Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20 font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">1-on-1 Founder Matching</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Work directly with active founders including Hanees (FOIX), Aslam (Fynex Intl), and Mohamed (Griph Shipbuilding).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20 font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Rapid Demand Validation</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Pivot from vague ideas to validated, high-margin revenue streams in under 4 weeks with weekly experiments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/20 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">100% Founder Ownership</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Zero equity taken. You retain complete ownership and control of your business from day one.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={onStartWizard}
            className="inline-flex items-center px-10 py-4 text-base font-bold text-neutral-950 bg-white rounded-full hover:bg-neutral-200 transition-all transform hover:scale-105 shadow-xl"
          >
            Apply for Next Cohort
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

      </div>
    </section>
  );
}
