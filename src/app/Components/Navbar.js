'use client';

import { useState } from 'react';

export default function Navbar({ viewMode = 'ui', setViewMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => {
    if (viewMode === 'terminal' && setViewMode) {
      setViewMode('ui');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-4 z-50 w-full mb-8 sm:mb-12">
      <nav className="mx-auto max-w-5xl px-2 sm:px-6">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#0b0d14]/85 px-3 sm:px-4 py-2.5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Brand Logo with Cyber Status Pill */}
          <a
            href="#"
            onClick={() => setViewMode && setViewMode('ui')}
            className="flex items-center gap-2 group shrink-0"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500" />
            </span>
            <span className="font-orbitron text-sm sm:text-base font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors">
              PRANAV<span className="text-red-500 font-normal">.M</span>
            </span>
          </a>

          {/* Desktop Nav Links (visible in UI mode) */}
          {viewMode === 'ui' && (
            <ul className="hidden lg:flex items-center gap-1 font-mono text-xs tracking-wider">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="px-3 py-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition duration-200"
                  >
                    <span className="text-cyan-400 opacity-60 mr-1">{"//"}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Right Controls: Mode Switcher + Resume + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* UI / Terminal Mode Toggle Switch */}
            {setViewMode && (
              <div className="inline-flex items-center rounded-full p-0.5 bg-white/[0.04] border border-white/15">
                <button
                  type="button"
                  onClick={() => setViewMode('ui')}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200 flex items-center gap-1 ${
                    viewMode === 'ui'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,229,255,0.25)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>UI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('terminal')}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200 flex items-center gap-1 ${
                    viewMode === 'terminal'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="font-bold">&gt;_</span>
                  <span>Terminal</span>
                </button>
              </div>
            )}

            <a
              className="relative inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-orbitron uppercase tracking-wider text-white font-medium rounded-full overflow-hidden group border border-red-500/50 hover:border-cyan-400/80 transition-all duration-300 shadow-[0_0_12px_rgba(255,51,85,0.3)] hover:shadow-[0_0_18px_rgba(0,229,255,0.4)]"
              href="https://drive.google.com/file/d/1b-vtf1Ayiibdu9i6KoWtBUcwiRb8qmL9/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-cyan-500/30 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-1">
                <span className="hidden sm:inline">Resume</span>
                <span className="sm:hidden">CV</span>
                <svg className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>

            {/* Mobile menu trigger */}
            {viewMode === 'ui' && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-gray-300 hover:text-white rounded-lg focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && viewMode === 'ui' && (
          <div className="lg:hidden mt-2 rounded-2xl border border-white/10 bg-[#0b0d14]/95 p-4 backdrop-blur-xl animate-fadeInTop shadow-2xl">
            <ul className="flex flex-col gap-2 font-mono text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition"
                  >
                    <span className="text-cyan-400 mr-2 font-mono">{"//"}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
