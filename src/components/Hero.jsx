import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onStartWizard }) {
  return (
    <section className="relative pt-20 pb-28 lg:pt-32 lg:pb-40 overflow-hidden bg-white text-center">
      {/* Very subtle background glow — matches OneDay's off-white */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(230,228,255,0.25) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main Hero Headline ─────────────────────────────────────────
            OneDay structure:  "Launch" BLACK  "your idea & earn"  GRADIENT
            Our structure:     "Launch" BLACK  "your idea & build" GRADIENT  "a business"
        */}
        <h1
          className="font-black tracking-tight leading-[1.06] mb-10"
          style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {/* "Launch" stays solid black, exactly like OneDay */}
          <span style={{ color: '#0f0f0f' }}>Launch </span>

          {/* ── GRADIENT SPAN — muted, settled OneDay-style sweep ── */}
          {/* Desaturated: cool grey → dusty violet → dusty mauve →        */}
          {/* warm terracotta → muted sage teal. Low saturation throughout. */}
          <span style={{
            backgroundImage: 'linear-gradient(to right, #767676 0%, #7a4e8a 30%, #c07858 60%, #8aaa9a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline',
          }}>
            your idea &amp; build
          </span>

          {/* Line 2: "a real business" back to near-black exactly like "an MBA" */}
          <br />
          <span
            style={{
              backgroundImage: 'linear-gradient(to right, #2a2a2a 0%, #4a4a4a 50%, #6b6b6b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            a real business
          </span>
        </h1>

        {/* Sub-headline — same weight & size as OneDay */}
        <p className="text-lg sm:text-xl font-medium text-neutral-500 max-w-xl mx-auto mb-12 tracking-tight leading-relaxed">
          Start Part-time. No startup investment required.
        </p>

        {/* CTA Button — black pill, exact OneDay style */}
        <button
          onClick={onStartWizard}
          className="inline-flex items-center justify-center gap-2 px-9 py-4 text-base font-semibold text-white bg-neutral-950 rounded-full hover:bg-neutral-800 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-xl"
        >
          Get started
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
