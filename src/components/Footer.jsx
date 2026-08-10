import React from 'react';

export default function Footer({ onStartWizard }) {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <span className="text-2xl font-black text-white tracking-tight">
              open<span className="text-neutral-500 font-light">and</span>start
            </span>
            <p className="text-xs text-neutral-500 mt-2 max-w-sm">
              The premier 1-on-1 entrepreneur acceleration platform. Launch your business with guidance from 7-figure founders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <a href="#mentors" className="hover:text-white transition-colors">Mentors</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
            <a href="#benefits" className="hover:text-white transition-colors">Methodology</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <button onClick={onStartWizard} className="text-white font-bold hover:underline">Apply Now</button>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 gap-4">
          <p>© {new Date().getFullYear()} Open and Start Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400">Terms of Service</a>
            <a href="#" className="hover:text-neutral-400">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
