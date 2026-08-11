import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MENTORS, MENTOR_CATEGORIES } from '../data/mentorsData';

export default function MentorsSection({ onStartWizard }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollRef = useRef(null);

  const filteredMentors = activeCategory === "All"
    ? MENTORS
    : MENTORS.filter(m => m.category === activeCategory);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="mentors" className="py-24 bg-[#141414] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
              Mentors
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Get one-on-one guidance<br />from your mentor
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onStartWizard && onStartWizard()}
              className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-neutral-900 bg-white rounded-full hover:bg-neutral-200 transition-all shadow-md"
            >
              Get started
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="p-3 rounded-full border border-neutral-700 hover:border-white text-neutral-300 hover:text-white transition-all bg-neutral-900/50"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="p-3 rounded-full border border-neutral-700 hover:border-white text-neutral-300 hover:text-white transition-all bg-neutral-900/50"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-6 mb-8 text-sm font-medium">
          {MENTOR_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-xs sm:text-sm ${
                activeCategory === cat
                  ? 'bg-white text-neutral-950 font-bold shadow-md'
                  : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mentor Cards Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8"
        >
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              onClick={() => onStartWizard && onStartWizard()}
              className="flex-none w-[280px] sm:w-[320px] bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800/80 hover:border-neutral-700 transition-all group hover:-translate-y-1.5 duration-300 shadow-xl cursor-pointer"
            >
              <div className="h-[360px] relative overflow-hidden bg-neutral-950">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-semibold text-neutral-200">
                  {mentor.category}
                </div>
              </div>

              <div className="p-6 bg-neutral-900">
                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                  {mentor.name}
                </h3>
                <p className="text-sm font-medium text-neutral-300 mb-1">
                  {mentor.title}
                </p>
                <p className="text-xs font-medium text-emerald-400 mb-3">
                  {mentor.exCompany}
                </p>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {mentor.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
