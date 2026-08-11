import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check, Calendar, Clock, Video, Award, ChevronLeft, Sparkles, Phone, Mail, User } from 'lucide-react';

const triggerConfetti = () => {
  const canvas = document.createElement('canvas');
  canvas.className = 'fixed inset-0 pointer-events-none z-50 w-full h-full';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 80 }).map(() => ({
    x: canvas.width / 2,
    y: canvas.height * 0.4,
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 0.8) * 16,
    color: ['#6366f1', '#ec4899', '#f97316', '#10b981', '#3b82f6', '#eab308'][Math.floor(Math.random() * 6)],
    size: Math.random() * 8 + 5,
    rotation: Math.random() * 360,
    rSpeed: (Math.random() - 0.5) * 10
  }));

  let frame = 0;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.rotation += p.rSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
    frame++;
    if (frame < 130) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  };
  animate();
};


export default function ApplicationWizard({ onClose, preselectedMentor }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    mainGoal: '',
    mentorScale: '',
    businessStage: '',
    industry: preselectedMentor ? preselectedMentor.category : '',
    priorExperience: '',
    struggles: '',
    startTimeframe: '',
    weeklyHours: '',
    gender: '',
    education: '',
    ageRange: '',
    region: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    selectedDate: '',
    selectedTime: ''
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Trigger confetti on final booking confirmation
  useEffect(() => {
    if (bookingConfirmed) {
      triggerConfetti();
    }
  }, [bookingConfirmed]);


  const totalSteps = 20;

  const handleSelectOption = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 180);
  };

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (step > 0) setStep(prev => prev - 1);
  };

  const handleConfirmBooking = async (date, time) => {
    const updatedData = { ...formData, selectedDate: date, selectedTime: time, selectedMentor: preselectedMentor || null };
    setFormData(updatedData);
    setBookingConfirmed(true);

    try {
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
    } catch (err) {
      console.error('Error saving application to database:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-xl flex flex-col justify-between text-white overflow-hidden wizard-card-enter">
      
      {/* Top Bar Navigation & Progress Bar */}
      <div className="w-full bg-neutral-900/80 border-b border-neutral-800/80 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          {step > 0 && !bookingConfirmed && (
            <button
              onClick={handlePrevStep}
              className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <span className="text-lg font-black tracking-tight">
            open<span className="text-neutral-500 font-light">and</span>start
          </span>
        </div>

        {/* Step Progress Indicator */}
        {step > 0 && !bookingConfirmed && (
          <div className="flex items-center gap-3">
            <div className="w-32 sm:w-48 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 transition-all duration-300"
                style={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-neutral-400">
              {step} / {totalSteps - 1}
            </span>
          </div>
        )}

        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close wizard"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
        
        {/* STEP 0: WELCOME SCREEN */}
        {step === 0 && (
          <div className="text-center max-w-2xl wizard-card-enter">
            {preselectedMentor ? (
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30 mb-6">
                <img src={preselectedMentor.image} alt={preselectedMentor.name} className="w-5 h-5 rounded-full object-cover" />
                <span>Selected Mentor: {preselectedMentor.name} ({preselectedMentor.title} at {preselectedMentor.company})</span>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-6">
                <Sparkles className="w-3.5 h-3.5" /> 1-on-1 Mentor Match
              </span>
            )}
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
              {preselectedMentor 
                ? `Book your 1-on-1 strategy session with ${preselectedMentor.name}`
                : "Match with a verified founder & book your intro call"}
            </h2>
            <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
              {preselectedMentor
                ? `Answer a few quick questions so ${preselectedMentor.name} (${preselectedMentor.company}) can prepare your personalized mentorship roadmap.`
                : "Answer a few quick questions so we can match you with Hanees, Aslam, or Mohamed at Open & Start."}
            </p>
            <button
              onClick={handleNextStep}
              className="px-10 py-4 text-base font-bold text-neutral-950 bg-white rounded-full hover:bg-neutral-200 transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
            >
              Start <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-neutral-500 mt-4">Takes ~3 minutes</p>
          </div>
        )}

        {/* STEP 1: MAIN GOAL */}
        {step === 1 && (
          <div className="w-full wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              1. What’s your main goal for starting a business?
            </h3>
            <p className="text-neutral-400 text-sm mb-8">Select one option:</p>

            <div className="space-y-3">
              {[
                { key: 'A', text: 'Freedom' },
                { key: 'B', text: 'Extra income' },
                { key: 'C', text: 'Quit my job' },
                { key: 'D', text: 'Replace salary' },
                { key: 'E', text: 'Build something meaningful' },
                { key: 'F', text: 'Not sure yet' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption('mainGoal', opt.text)}
                  className="w-full p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-white/80 hover:bg-neutral-850 transition-all text-left flex items-center gap-4 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 font-bold flex items-center justify-center text-sm group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                    {opt.key}
                  </span>
                  <span className="text-base font-medium text-neutral-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: MENTOR BUSINESS SCALE */}
        {step === 2 && (
          <div className="w-full wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              2. What is the size of business you would like your mentor to have built?
            </h3>
            <p className="text-neutral-400 text-sm mb-8">Select one option:</p>

            <div className="space-y-3">
              {[
                { key: 'A', text: '$1M+ in annual revenue' },
                { key: 'B', text: '$0.5M - $1M in annual revenue' },
                { key: 'C', text: '$0.3M - $0.5M in annual revenue' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption('mentorScale', opt.text)}
                  className="w-full p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-white/80 hover:bg-neutral-850 transition-all text-left flex items-center gap-4 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 font-bold flex items-center justify-center text-sm group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                    {opt.key}
                  </span>
                  <span className="text-lg font-medium text-neutral-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: BUSINESS STAGE */}
        {step === 3 && (
          <div className="w-full wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              3. Which stage is your business idea at?
            </h3>
            <p className="text-neutral-400 text-sm mb-8">Select one option:</p>

            <div className="space-y-3">
              {[
                { key: 'A', text: 'I have not decided on an idea yet' },
                { key: 'B', text: 'I have a business idea, but have not started it' },
                { key: 'C', text: 'I have already started building my idea' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption('businessStage', opt.text)}
                  className="w-full p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-white/80 transition-all text-left flex items-center gap-4 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 font-bold flex items-center justify-center text-sm group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                    {opt.key}
                  </span>
                  <span className="text-base font-medium text-neutral-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: INDUSTRY MATCH */}
        {step === 4 && (
          <div className="w-full wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              4. Which industry should your mentor have experience in?
            </h3>
            <p className="text-neutral-400 text-sm mb-6">Select one option:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {[
                { key: 'A', text: 'AI & Robotics' },
                { key: 'B', text: 'Manufacturing' },
                { key: 'C', text: 'Agri Tech' },
                { key: 'D', text: 'Maritime & Shipbuilding' },
                { key: 'E', text: 'Tech & SaaS' },
                { key: 'F', text: 'E-Commerce' },
                { key: 'G', text: 'Healthcare & Wellness' },
                { key: 'H', text: 'Other' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption('industry', opt.text)}
                  className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-white/80 transition-all text-left flex items-center gap-3 group"
                >
                  <span className="w-7 h-7 rounded-md bg-neutral-800 text-neutral-300 font-bold flex items-center justify-center text-xs group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                    {opt.key}
                  </span>
                  <span className="text-sm font-medium text-neutral-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: DYNAMIC MATCH CONFIRMATION */}
        {step === 5 && (
          <div className="text-center max-w-xl wizard-card-enter">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Mentor Match Found!
            </h3>
            <p className="text-neutral-300 text-lg mb-8 leading-relaxed">
              Great! You will be matched with a mentor who has built a <strong className="text-white">{formData.industry || 'Tech'}</strong> business reaching <strong className="text-emerald-400">{formData.mentorScale || '$1M+'}</strong> in annual revenue.
            </p>
            <button
              onClick={handleNextStep}
              className="px-10 py-4 text-base font-bold text-neutral-950 bg-white rounded-full hover:bg-neutral-200 transition-all shadow-xl"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 6: PRIOR EXPERIENCE */}
        {step === 6 && (
          <div className="w-full wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              6. Have you ever tried starting a business before?
            </h3>
            <p className="text-neutral-400 text-sm mb-8">Select one option:</p>

            <div className="space-y-3">
              {[
                { key: 'A', text: 'No, this is my first time' },
                { key: 'B', text: 'Yes, I have experience in launching a business' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption('priorExperience', opt.text)}
                  className="w-full p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-white/80 transition-all text-left flex items-center gap-4 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 font-bold flex items-center justify-center text-sm group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                    {opt.key}
                  </span>
                  <span className="text-base font-medium text-neutral-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: LAUNCH STRUGGLES */}
        {step === 7 && (
          <div className="w-full wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              7. Which parts of launching your business are you struggling with most?
            </h3>
            <p className="text-neutral-400 text-sm mb-8">Select one option:</p>

            <div className="space-y-3">
              {[
                { key: 'A', text: 'Validating my idea before starting' },
                { key: 'B', text: 'Getting funding to get going' },
                { key: 'C', text: 'Having accountability to get things done' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption('struggles', opt.text)}
                  className="w-full p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-white/80 transition-all text-left flex items-center gap-4 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 font-bold flex items-center justify-center text-sm group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                    {opt.key}
                  </span>
                  <span className="text-base font-medium text-neutral-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 8: START TIMEFRAME */}
        {step === 8 && (
          <div className="w-full wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              8. When would you ideally like to start the program?
            </h3>
            <p className="text-neutral-400 text-sm mb-8">Select one option:</p>

            <div className="space-y-3">
              {[
                { key: 'A', text: 'Next cohort (next month)' },
                { key: 'B', text: 'Within 3 months' },
                { key: 'C', text: 'Within 6 months' },
                { key: 'D', text: 'Just exploring options' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption('startTimeframe', opt.text)}
                  className="w-full p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-white/80 transition-all text-left flex items-center gap-4 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 font-bold flex items-center justify-center text-sm group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                    {opt.key}
                  </span>
                  <span className="text-base font-medium text-neutral-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 9: WEEKLY HOURS */}
        {step === 9 && (
          <div className="w-full wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              9. How many hours per week can you dedicate to building your business?
            </h3>
            <p className="text-neutral-400 text-sm mb-8">Select one option:</p>

            <div className="space-y-3">
              {[
                { key: 'A', text: 'Less than 10 hours' },
                { key: 'B', text: '10-15 hours' },
                { key: 'C', text: '15-20 hours' },
                { key: 'D', text: '20+ hours' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption('weeklyHours', opt.text)}
                  className="w-full p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-white/80 transition-all text-left flex items-center gap-4 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 font-bold flex items-center justify-center text-sm group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                    {opt.key}
                  </span>
                  <span className="text-base font-medium text-neutral-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 10: GENDER */}
        {step === 10 && (
          <div className="w-full wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              10. Which best describes your gender?
            </h3>
            <p className="text-neutral-400 text-sm mb-8">Select one option:</p>

            <div className="space-y-3">
              {[
                { key: 'A', text: 'Male' },
                { key: 'B', text: 'Female' },
                { key: 'C', text: 'Other' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption('gender', opt.text)}
                  className="w-full p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-white/80 transition-all text-left flex items-center gap-4 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-300 font-bold flex items-center justify-center text-sm group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                    {opt.key}
                  </span>
                  <span className="text-base font-medium text-neutral-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 11: EDUCATION */}
        {step === 11 && (
          <div className="w-full wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              11. Highest level of formal education?
            </h3>
            <p className="text-neutral-400 text-sm mb-8">Select one option:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'A', text: 'High school' },
                { key: 'B', text: 'Dropout' },
                { key: 'C', text: 'Bachelors' },
                { key: 'D', text: 'Masters' },
                { key: 'E', text: 'PhD' },
                { key: 'F', text: 'Associate' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption('education', opt.text)}
                  className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-white/80 transition-all text-left flex items-center gap-3 group"
                >
                  <span className="w-7 h-7 rounded-md bg-neutral-800 text-neutral-300 font-bold flex items-center justify-center text-xs group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                    {opt.key}
                  </span>
                  <span className="text-sm font-medium text-neutral-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 12: AGE RANGE */}
        {step === 12 && (
          <div className="w-full wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              12. How old are you?
            </h3>
            <p className="text-neutral-400 text-sm mb-8">Select your age group:</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['<25', '25-29', '30-34', '35-39', '40-44', '45-54', '55-64', '65+'].map((age, i) => (
                <button
                  key={age}
                  onClick={() => handleSelectOption('ageRange', age)}
                  className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-white/80 transition-all text-center group"
                >
                  <span className="text-base font-bold text-neutral-200 group-hover:text-white">
                    {age}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 13: KERALA DISTRICT / REGION */}
        {step === 13 && (
          <div className="w-full wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              13. Which district / region of Kerala are you based in?
            </h3>
            <p className="text-neutral-400 text-sm mb-6">Select your location in Kerala:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {[
                { key: 'A', text: 'Ernakulam (Kochi)' },
                { key: 'B', text: 'Thiruvananthapuram' },
                { key: 'C', text: 'Kozhikode (Calicut)' },
                { key: 'D', text: 'Thrissur' },
                { key: 'E', text: 'Kannur' },
                { key: 'F', text: 'Kottayam' },
                { key: 'G', text: 'Palakkad' },
                { key: 'H', text: 'Malappuram' },
                { key: 'I', text: 'Kollam' },
                { key: 'J', text: 'Alappuzha' },
                { key: 'K', text: 'Idukki' },
                { key: 'L', text: 'Wayanad' },
                { key: 'M', text: 'Kasaragod' },
                { key: 'N', text: 'Pathanamthitta' },
                { key: 'O', text: 'Other / Outside Kerala' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption('region', opt.text)}
                  className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-white/80 transition-all text-left flex items-center gap-3 group"
                >
                  <span className="w-7 h-7 rounded-md bg-neutral-800 text-neutral-300 font-bold flex items-center justify-center text-xs group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                    {opt.key}
                  </span>
                  <span className="text-sm font-medium text-neutral-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 14: CONTACT DETAILS */}
        {step === 14 && (
          <div className="w-full max-w-md wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-2">
              14. Your mentor needs your contact details
            </h3>
            <p className="text-neutral-400 text-sm mb-8">
              In the following screen, you will be able to select the best time for your 1-on-1 call.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (formData.firstName && formData.phone && formData.email) {
                  handleNextStep();
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">First Name *</label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3.5 top-3.5 text-neutral-500" />
                  <input
                    type="text"
                    required
                    placeholder="Rahul"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:border-white text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Nair"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:border-white text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-5 h-5 absolute left-3.5 top-3.5 text-neutral-500" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98470 12345"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:border-white text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-neutral-500" />
                  <input
                    type="email"
                    required
                    placeholder="rahul.nair@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl focus:outline-none focus:border-white text-white text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-neutral-950 font-bold rounded-xl hover:bg-neutral-200 transition-all mt-4"
              >
                OK
              </button>
            </form>
          </div>
        )}

        {/* STEP 15: INFORMATIONAL VIDEO SCREEN */}
        {step === 15 && (
          <div className="text-center max-w-xl wizard-card-enter">
            <h3 className="text-2xl sm:text-4xl font-extrabold mb-4">
              Before selecting a time for your mentor call, watch this video:
            </h3>

            <div className="w-full aspect-video bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-center mb-8 relative overflow-hidden group">
              <div className="w-16 h-16 rounded-full bg-white text-neutral-950 flex items-center justify-center font-bold shadow-xl group-hover:scale-110 transition-transform">
                ▶
              </div>
              <span className="absolute bottom-4 left-4 text-xs font-medium text-neutral-400 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                1-on-1 Call Preparation (1:30)
              </span>
            </div>

            <button
              onClick={handleNextStep}
              className="px-10 py-4 text-base font-bold text-neutral-950 bg-white rounded-full hover:bg-neutral-200 transition-all shadow-xl"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 16: SUCCESS METRICS */}
        {step === 16 && (
          <div className="text-center max-w-xl wizard-card-enter">
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-8">
              Here are some of our amazing success stories
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-left">
                <span className="text-4xl font-black text-emerald-400 block mb-1">70%</span>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  of graduates have a revenue-generating business by the end of the 18-month program.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-left">
                <span className="text-4xl font-black text-emerald-400 block mb-1">₹84,00,000</span>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  average revenue generated per founder within 18 months of launching.
                </p>
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className="px-10 py-4 text-base font-bold text-neutral-950 bg-white rounded-full hover:bg-neutral-200 transition-all shadow-xl"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 17: FOUNDER PROGRAM DETAILS */}
        {step === 17 && (
          <div className="text-center max-w-xl wizard-card-enter">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-6 border border-indigo-500/30">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">
              As you launch your business, you will earn your Open & Start Founder Certification
            </h3>
            <p className="text-neutral-400 text-base mb-8 leading-relaxed">
              Every customer experiment, financial model, and marketing sprint counts toward your official Founder Portfolio backed by 1-on-1 mentor endorsement.
            </p>
            <button
              onClick={handleNextStep}
              className="px-10 py-4 text-base font-bold text-neutral-950 bg-white rounded-full hover:bg-neutral-200 transition-all shadow-xl"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 18: PROGRAM COST & FINANCIAL INFO */}
        {step === 18 && (
          <div className="text-center max-w-xl wizard-card-enter">
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Here is how much the Open & Start Program costs:
            </h3>

            <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 mb-8 text-left">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-2xl font-bold text-white">Tuition & Mentorship</span>
                <span className="text-3xl font-black text-emerald-400">₹82,000</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Flexible monthly payment options available (₹6,500/mo). Zero equity taken from your business.
              </p>
              <div className="pt-4 border-t border-neutral-800 text-xs text-neutral-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Financial assistance available for qualified applicants.
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className="px-10 py-4 text-base font-bold text-neutral-950 bg-white rounded-full hover:bg-neutral-200 transition-all shadow-xl"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 19 & 20: CALENDAR BOOKING SELECTOR */}
        {step >= 19 && (
          <div className="w-full max-w-xl wizard-card-enter">
            {!bookingConfirmed ? (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-3xl sm:text-4xl font-extrabold mb-2">
                    Please select the time for your mentor call
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    Choose a convenient 30-minute slot with your matched mentor.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 mb-8">
                  <h4 className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" /> Select Date & Time
                  </h4>

                  {/* Sample Available Slots */}
                  <div className="space-y-4">
                    {[
                      { date: 'Tomorrow (Tue, Aug 12)', slots: ['10:00 AM', '02:30 PM', '05:00 PM'] },
                      { date: 'Wednesday (Aug 13)', slots: ['11:00 AM', '01:30 PM', '04:00 PM'] },
                      { date: 'Thursday (Aug 14)', slots: ['09:30 AM', '03:00 PM', '06:00 PM'] }
                    ].map((d, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                        <span className="text-xs font-bold text-neutral-400 block mb-2.5">{d.date}</span>
                        <div className="flex flex-wrap gap-2">
                          {d.slots.map(slot => (
                            <button
                              key={slot}
                              onClick={() => handleConfirmBooking(d.date, slot)}
                              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-white hover:text-neutral-950 text-neutral-200 text-xs font-bold transition-all border border-neutral-800"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-400 space-y-1.5">
                  <p className="font-semibold text-white mb-1">What to expect on your intro call:</p>
                  <p>⭐ Clarity on your best business idea</p>
                  <p>⭐ A personalized 90-day growth plan</p>
                  <p>⭐ Answers to all your questions</p>
                  <p>⭐ Actionable first steps you can execute immediately</p>
                </div>
              </>
            ) : (
              /* BOOKING SUCCESS RECEIPT */
              <div className="text-center py-8 wizard-card-enter">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-extrabold mb-2 text-white">
                  You’re all set, {formData.firstName}!
                </h3>
                <p className="text-neutral-400 text-base mb-8">
                  Your mentor call has been booked successfully.
                </p>

                <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 text-left max-w-md mx-auto mb-8 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Date:</span>
                    <span className="font-bold text-white">{formData.selectedDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Time:</span>
                    <span className="font-bold text-emerald-400">{formData.selectedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Matched Industry:</span>
                    <span className="font-bold text-white">{formData.industry || 'Tech'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Email:</span>
                    <span className="font-bold text-white">{formData.email}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="px-10 py-4 bg-white text-neutral-950 font-bold rounded-full hover:bg-neutral-200 transition-all shadow-xl"
                >
                  Return to Home
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
