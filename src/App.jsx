import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MentorsSection from './components/MentorsSection';
import ProcessSection from './components/ProcessSection';
import BenefitsSection from './components/BenefitsSection';
import ProgramOverview from './components/ProgramOverview';
import GlobalCampus from './components/GlobalCampus';
import Testimonials from './components/Testimonials';
import PricingSection from './components/PricingSection';
import CaseStudies from './components/CaseStudies';
import Footer from './components/Footer';
import ApplicationWizard from './components/ApplicationWizard';

export default function App() {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Header Bar */}
      <Header onStartWizard={() => setShowWizard(true)} />

      {/* Main Landing Sections */}
      <main>
        <Hero onStartWizard={() => setShowWizard(true)} />
        <MentorsSection onStartWizard={() => setShowWizard(true)} />
        <ProcessSection onStartWizard={() => setShowWizard(true)} />
        <BenefitsSection onStartWizard={() => setShowWizard(true)} />
        <ProgramOverview />
        <GlobalCampus />
        <Testimonials />
        <PricingSection onStartWizard={() => setShowWizard(true)} />
        <CaseStudies />
      </main>

      {/* Footer */}
      <Footer onStartWizard={() => setShowWizard(true)} />

      {/* 20-Step Interactive Application Wizard Overlay */}
      {showWizard && (
        <ApplicationWizard onClose={() => setShowWizard(false)} />
      )}
    </div>
  );
}
