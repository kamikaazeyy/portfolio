'use client';

import { useState } from 'react';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import ContactForm from './Components/ContactForm';
import Projects from './Components/Projects';
import Timeline from './Components/TimeLineComponent';
import { Illustration } from './Components/glowing-stars';
import Tape from './Components/Tape';
import { PortfolioTerminal } from './Components/terminal';

export default function Home() {
  const [viewMode, setViewMode] = useState('ui');

  return (
    <div className="relative min-h-screen bg-[#07080d] text-gray-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Full viewport animated glowing stars & cyber ambient background */}
      <div className="fixed inset-0 -z-10 bg-[#07080d] overflow-hidden pointer-events-none">
        {/* Subtle cyber radial atmosphere */}
        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -left-32 w-[550px] h-[550px] bg-red-600/[0.035] rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-cyan-600/[0.03] rounded-full blur-[140px]" />
        
        {/* Background star matrix */}
        <div className="w-screen h-screen opacity-65">
          <Illustration mouseEnter={false} />
        </div>
      </div>

      {/* Main Content Layout with consistent max-width and symmetry */}
      <div className="relative flex flex-col min-h-screen">
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar viewMode={viewMode} setViewMode={setViewMode} />

          {viewMode === 'terminal' ? (
            <section className="py-2 sm:py-6">
              <PortfolioTerminal onSwitchToUI={() => setViewMode('ui')} />
            </section>
          ) : (
            <>
              <Hero onOpenTerminal={() => setViewMode('terminal')} />
              <Tape />
              <Timeline />
              <Projects />
              <ContactForm />
            </>
          )}
        </main>

        {/* Refined Cyber Footer */}
        <footer className="w-full border-t border-white/10 bg-[#070910]/90 backdrop-blur-md py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-bold text-white tracking-wider">
                PRANAV<span className="text-red-500">.M</span>
              </span>
              <span className="text-gray-600">|</span>
              <span>Kamikaazeyy</span>
              <span className="text-gray-600">&bull;</span>
              <span>&copy; {new Date().getFullYear()}</span>
            </div>

            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-[11px] text-gray-500">
                Crafted with Next.js, Tailwind CSS &amp; Material-UI
              </span>
              <a
                href="#"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                aria-label="Back to top"
              >
                <span>TOP</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}