'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MotionConfig } from 'motion/react';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import ContactForm from './Components/ContactForm';
import Projects from './Components/Projects';
import Timeline from './Components/TimeLineComponent';
import { Illustration } from './Components/glowing-stars';
import Tape from './Components/Tape';
import { PortfolioTerminal } from './Components/terminal';

const Watchtower = dynamic(() => import('./Components/Watchtower'), {
  ssr: false,
});

export default function Home() {
  // 'ui' = orbital watchtower (default), 'archive' = classic scroll page, 'terminal'
  const [viewMode, setViewMode] = useState('ui');

  if (viewMode === 'ui') {
    return (
      <div className="relative min-h-dvh bg-cyber-bg text-gray-100">
        <Watchtower
          onOpenTerminal={() => setViewMode('terminal')}
          onOpenArchive={() => setViewMode('archive')}
        />
      </div>
    );
  }

  if (viewMode === 'terminal') {
    return (
      <div className="relative min-h-dvh bg-cyber-bg text-gray-100">
        <PortfolioTerminal onSwitchToUI={() => setViewMode('ui')} />
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh bg-cyber-bg text-gray-100 selection:bg-bat-500/30 selection:text-bat-200">
      {/* Full viewport animated star matrix background */}
      <div className="fixed inset-0 -z-10 bg-cyber-bg overflow-hidden pointer-events-none">
        <div className="w-full h-full opacity-65">
          <Illustration mouseEnter={false} />
        </div>
      </div>

      {/* Main Content Layout with consistent max-width and symmetry */}
      <MotionConfig reducedMotion="user">
      <div className="relative flex flex-col min-h-dvh">
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar viewMode={viewMode} setViewMode={setViewMode} />

          {/* 'archive' section commented out
          <>
            <Hero onOpenTerminal={() => setViewMode('terminal')} />
            <Tape />
            <Timeline />
            <Projects />
            <ContactForm />
          </>
          */}
          {null}
        </main>

        {/* Refined Cyber Footer */}
        <footer className="w-full border-t border-cyber-border bg-cyber-surface/90 backdrop-blur-md py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-bat-500" />
              <span className="font-orbitron font-bold text-white tracking-wider">
                PRANAV<span className="text-bat-400">.M</span>
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
                className="hover:text-bat-400 transition-colors flex items-center gap-1"
                aria-label="Back to top"
              >
                <span>TOP</span>
                <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
      </MotionConfig>
    </div>
  );
}
