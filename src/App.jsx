import React, { useState, useEffect } from 'react';
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
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [showWizard, setShowWizard] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    // Check if the current URL has /admin, ?admin=true, or #admin
    const path = window.location.pathname;
    const search = window.location.search;
    const hash = window.location.hash;
    if (path.includes('/admin') || search.includes('admin') || hash.includes('admin')) {
      setIsAdminView(true);
    }
  }, []);

  const handleStartWizard = (mentor = null) => {
    setSelectedMentor(mentor);
    setShowWizard(true);
  };

  // Dedicated Admin Portal (Separate URL, unlinked from main landing page)
  if (isAdminView) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Header Bar */}
      <Header onStartWizard={() => handleStartWizard()} />

      {/* Main Landing Sections */}
      <main>
        <Hero onStartWizard={() => handleStartWizard()} />
        <MentorsSection onStartWizard={(mentor) => handleStartWizard(mentor)} />
        <ProcessSection onStartWizard={() => handleStartWizard()} />
        <BenefitsSection onStartWizard={() => handleStartWizard()} />
        <ProgramOverview />
        <GlobalCampus />
        <Testimonials />
        <PricingSection onStartWizard={() => handleStartWizard()} />
        <CaseStudies />
      </main>

      {/* Footer */}
      <Footer onStartWizard={() => handleStartWizard()} />

      {/* 20-Step Interactive Application Wizard Overlay */}
      {showWizard && (
        <ApplicationWizard 
          onClose={() => {
            setShowWizard(false);
            setSelectedMentor(null);
          }} 
          preselectedMentor={selectedMentor}
        />
      )}
    </div>
  );
}
