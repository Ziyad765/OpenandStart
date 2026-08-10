import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

/* ── Premium SVG Logo Mark ───────────────────────────────────────────── */
function LogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="9" fill="#0f0f0f"/>
      {/* O shape for "Open" */}
      <circle cx="11" cy="16" r="5" stroke="white" strokeWidth="2.5" fill="none"/>
      {/* Arrow / start symbol */}
      <path d="M20 12L26 16L20 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26 16H22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function Header({ onStartWizard }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#mentors', label: 'Mentors' },
    { href: '#process', label: 'Process' },
    { href: '#benefits', label: 'Methodology' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#testimonials', label: 'Reviews' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-neutral-100'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">

        {/* ── Brand ─────────────────────────────────────────────────── */}
        <a href="#" className="flex items-center gap-2.5 group select-none">
          <LogoMark />
          <span
            className="text-[22px] font-extrabold tracking-[-0.03em] leading-none"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-neutral-950">open</span>
            <span className="text-neutral-300 font-light">and</span>
            <span className="text-neutral-950">start</span>
          </span>
        </a>

        {/* ── Desktop Nav ───────────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-[13.5px] font-semibold text-neutral-500 hover:text-neutral-900 transition-colors tracking-wide"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ── CTA + Mobile ─────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <button
            onClick={onStartWizard}
            className="hidden sm:inline-flex items-center gap-1.5 px-6 py-2.5 text-[13px] font-bold text-white bg-neutral-950 rounded-full hover:bg-neutral-800 transition-all hover:-translate-y-0.5 shadow-sm tracking-wide"
          >
            Get started
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-neutral-100 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-neutral-100 px-4 pb-4 space-y-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => { setMobileOpen(false); onStartWizard(); }}
            className="w-full mt-2 py-3 text-sm font-bold text-white bg-neutral-950 rounded-xl hover:bg-neutral-800 transition-colors"
          >
            Get started
          </button>
        </div>
      )}
    </header>
  );
}
