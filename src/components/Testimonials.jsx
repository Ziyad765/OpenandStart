import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Patric Robb",
      role: "Founder, EcoLogistics",
      mentorTag: "Mentored by Hanees (FOIX)",
      review: "Gratitude for the extraordinary experience. One of the best things I learned from Open & Start is that having a passion is one thing, turning it into a profitable career is a whole different beast. My mentor helped me validate demand in week 3!",
      rating: 5
    },
    {
      name: "Ryan Bain",
      role: "Co-Founder, ShiftHealth",
      mentorTag: "Mentored by Aslam (Fynex Intl)",
      review: "Open & Start has helped me to reshape my ambitions. I always thought I had what it takes to be successful in business, but having a 7-figure founder review my weekly experiments changed everything.",
      rating: 5
    },
    {
      name: "Patrick Carter",
      role: "Founder, PulseMedia",
      mentorTag: "Mentored by Mohamed (Griph Shipbuilding)",
      review: "I was drawn in by Open & Start’s genuine desire to empower others. I went from having a vague concept to launching a fully functional MVP with paying customers in under two months.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-2 block">
            Verified Founder Experiences
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
            Mentorship Reviews & Results
          </h2>
          <p className="text-neutral-500 text-base mt-3">
            Real feedback from founders who scaled their business models under the 1-on-1 guidance of our sector leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center rounded-[3px]">
                        <Star className="w-3.5 h-3.5 fill-white text-white" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Review
                  </span>
                </div>
                
                <p className="text-neutral-700 text-sm leading-relaxed mb-6 font-medium italic">
                  "{r.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-neutral-950 group-hover:text-emerald-700 transition-colors">{r.name}</h4>
                  <p className="text-xs text-neutral-500 font-medium">{r.role}</p>
                </div>
                <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-200/60 px-2.5 py-1 rounded-lg">
                  {r.mentorTag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
