import React from 'react';
import { ArrowUpRight } from 'lucide-react';

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
              Nayar Pervez — Founder of NeonLimitless
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-medium">
              "Working with my mentor at Open & Start allowed me to pivot our business model from B2C to high-margin B2B within 4 weeks. We reached ₹15,00,000/mo before even finishing the program."
            </p>
            <div className="flex items-center gap-8 text-xs font-bold text-neutral-900">
              <div>
                <span className="block text-2xl font-black text-neutral-950">₹15L+/mo</span>
                <span className="text-neutral-500 font-normal">Recurring Revenue</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-neutral-950">4 Weeks</span>
                <span className="text-neutral-500 font-normal">Validation Time</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96 relative bg-neutral-900">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
              alt="Nayar Pervez Case Study"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
}
