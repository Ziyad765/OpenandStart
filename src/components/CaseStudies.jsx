import React from 'react';

export default function CaseStudies() {
  return (
    <section className="py-24 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2 block">
            Case Studies
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
            Launch a meaningful business with real purpose
          </h2>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-50 border border-neutral-200/80 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 px-3 py-1 rounded-full bg-emerald-100 mb-4 inline-block">
              Featured Founder
            </span>
            <h3 className="text-3xl font-extrabold text-neutral-950 mb-3">
              Aslam — Founder of Fynex International
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-medium">
              "Working with Open & Start allowed us to scale Fynex International and expand our agricultural technology solutions into international markets, building sustainable B2B partnerships."
            </p>
            <div className="flex items-center gap-8 text-xs font-bold text-neutral-900">
              <div>
                <span className="block text-2xl font-black text-neutral-950">Agri Tech</span>
                <span className="text-neutral-500 font-normal">Sector Focus</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-neutral-950">Global</span>
                <span className="text-neutral-500 font-normal">Cross-Border Scale</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96 relative bg-neutral-900">
            <img
              src="/mentors/aslam.jpeg"
              alt="Aslam - Founder of Fynex International"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white font-bold text-sm">
              Aslam • Fynex International
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
