import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, Award, Sparkles, Building2, ExternalLink, Calendar, MessageSquare, ShieldCheck, X } from 'lucide-react';
import { MENTORS, MENTOR_CATEGORIES } from '../data/mentorsData';

export default function MentorsSection({ onStartWizard }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMentor, setSelectedMentor] = useState(null);
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

  const handleBookMentor = (mentor) => {
    setSelectedMentor(null);
    if (onStartWizard) {
      onStartWizard(mentor);
    }
  };

  return (
    <section id="mentors" className="py-24 bg-[#0a0a0c] text-white relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">
                Direct Founder Mentorship
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Get 1-on-1 Guidance <br />
              <span className="bg-gradient-to-r from-amber-200 via-emerald-200 to-cyan-300 bg-clip-text text-transparent">
                From Industry Founders
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl">
              Connect directly with established founders across manufacturing, agricultural technology, and shipbuilding. Learn battle-tested strategies to build and scale your enterprise.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onStartWizard && onStartWizard()}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-neutral-950 bg-gradient-to-r from-white via-neutral-100 to-neutral-300 rounded-full hover:bg-neutral-200 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="p-3 rounded-full border border-neutral-800 hover:border-neutral-500 text-neutral-400 hover:text-white transition-all bg-neutral-900/60 backdrop-blur-md"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="p-3 rounded-full border border-neutral-800 hover:border-neutral-500 text-neutral-400 hover:text-white transition-all bg-neutral-900/60 backdrop-blur-md"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-4 mb-10 text-sm font-medium">
          {MENTOR_CATEGORIES.map((cat) => {
            const count = cat === "All" ? MENTORS.length : MENTORS.filter(m => m.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm font-semibold border ${
                  isActive
                    ? 'bg-white text-neutral-950 border-white shadow-lg shadow-white/10 scale-105'
                    : 'bg-neutral-900/80 text-neutral-400 hover:bg-neutral-850 hover:text-white border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-neutral-900 text-white' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mentor Grid / Cards Container */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className={`group relative bg-neutral-900/90 rounded-3xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all duration-500 shadow-2xl flex flex-col justify-between ${mentor.accentGlow}`}
            >
              {/* Top Accent Line */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${mentor.badgeGradient}`} />

              <div className="p-6 pb-0">
                {/* Photo & Header Badge */}
                <div className="h-[320px] relative rounded-2xl overflow-hidden bg-neutral-950 mb-6 border border-white/5">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/25 to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold border backdrop-blur-md ${mentor.badgeColor}`}>
                      {mentor.sector}
                    </span>
                  </div>

                  {/* Company Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-neutral-900/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-neutral-400" />
                      <span className="text-xs font-bold text-white tracking-wide uppercase">
                        {mentor.company}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      Active Founder
                    </span>
                  </div>
                </div>

                {/* Founder Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-amber-200 transition-colors">
                      {mentor.name}
                    </h3>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {mentor.title}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-neutral-400 mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {mentor.company} • {mentor.category}
                  </p>
                  
                  <p className="text-sm text-neutral-300 line-clamp-3 leading-relaxed mb-4">
                    {mentor.bio}
                  </p>

                  {/* Highlights Bullet */}
                  <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80 mb-4">
                    <p className="text-[11px] font-medium text-neutral-400 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{mentor.highlights}</span>
                    </p>
                  </div>

                  {/* Expertise Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {mentor.expertise.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-neutral-800/60 text-neutral-300 border border-neutral-700/50"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 mt-auto flex items-center gap-3">
                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="flex-1 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-white font-semibold text-xs transition-all border border-neutral-700 text-center flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
                  View Profile
                </button>
                <button
                  onClick={() => handleBookMentor(mentor)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs transition-all shadow-md text-center flex items-center justify-center gap-1.5 group/btn"
                >
                  Book Call
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Trust Bar */}
        <div className="mt-16 pt-10 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 border border-amber-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Direct 1-on-1 Strategy Calls</h4>
            <p className="text-xs text-neutral-400">Personalized guidance tailored specifically to your sector & goals.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 border border-emerald-500/20">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Proven Sector Leaders</h4>
            <p className="text-xs text-neutral-400">Mentors actively running FOIX, Fynex International, & Griph Shipbuilding.</p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 border border-cyan-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Actionable Scaling Roadmaps</h4>
            <p className="text-xs text-neutral-400">Get battle-tested blueprints for manufacturing, agritech & maritime projects.</p>
          </div>
        </div>

      </div>

      {/* Interactive Mentor Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedMentor(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
              <img
                src={selectedMentor.image}
                alt={selectedMentor.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-neutral-700 shadow-md"
              />
              <div className="text-center sm:text-left">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 border ${selectedMentor.badgeColor}`}>
                  {selectedMentor.sector}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {selectedMentor.name}
                </h3>
                <p className="text-sm font-semibold text-neutral-300">
                  {selectedMentor.title} at <span className="text-white font-bold">{selectedMentor.company}</span>
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  {selectedMentor.experienceYears}
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">About {selectedMentor.name}</h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {selectedMentor.bio}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">1-on-1 Guidance Topics</h4>
                <div className="space-y-2">
                  {selectedMentor.availableTopics.map((topic, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedMentor(null)}
                className="flex-1 py-3 text-xs font-bold text-neutral-400 hover:text-white bg-neutral-800 rounded-xl transition-all"
              >
                Close
              </button>
              <button
                onClick={() => handleBookMentor(selectedMentor)}
                className="flex-1 py-3 text-xs font-bold text-neutral-950 bg-white hover:bg-neutral-200 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Book 1-on-1 Session with {selectedMentor.name} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
