'use client';

import { useState, useEffect } from 'react';

export default function Navbar({ viewMode = 'ui', setViewMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => {
    if (viewMode === 'terminal' && setViewMode) {
      setViewMode('archive');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-4 z-50 w-full mb-8 sm:mb-12">
      <nav className="mx-auto max-w-5xl px-2 sm:px-6">
        <div className={`flex items-center justify-between rounded-full border px-3 sm:px-4 py-2.5 backdrop-blur-md transition duration-300 ${
          scrolled
            ? 'border-white/15 bg-cyber-surface/95 shadow-xl'
            : 'border-cyber-border bg-cyber-surface/85 shadow-lg'
        }`}>
          {/* Brand Logo with Cyber Status Pill */}
          <a
            href="#"
            onClick={() => setViewMode && setViewMode('ui')}
            className="flex items-center gap-2 group shrink-0"
          >
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-bat-500" />
            <span className="font-orbitron text-sm sm:text-base font-bold tracking-wider text-white group-hover:text-bat-400 transition-colors">
              PRANAV<span className="text-bat-400 font-normal">.M</span>
            </span>
          </a>

          {/* Desktop Nav Links (visible in archive mode) */}
          {viewMode === 'archive' && (
            <ul className="hidden lg:flex items-center gap-1 font-mono text-xs tracking-wider">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="px-3 py-1.5 rounded-full text-gray-300 hover:text-bat-300 hover:bg-white/5 transition duration-200"
                  >
                    <span className="text-bat-400 opacity-60 mr-1">{"//"}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Right Controls: Mode Switcher + Resume + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Orbit / Archive / Terminal Mode Toggle Switch */}
            {setViewMode && (
              <div className="inline-flex items-center rounded-full p-0.5 bg-white/[0.04] border border-white/15">
                {[
                  { id: 'ui', glyph: '◉', label: 'Orbit' },
                  // { id: 'archive', glyph: '▤', label: 'Archive' },
                  { id: 'terminal', glyph: '>_', label: 'Terminal', bold: true },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setViewMode(m.id)}
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-mono transition-colors duration-200 flex items-center gap-1 ${
                      viewMode === m.id
                        ? 'bg-bat-500/20 text-bat-300 border border-bat-400/50'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className={m.bold ? 'font-bold' : ''}>{m.glyph}</span>
                    <span className="hidden min-[420px]:inline">{m.label}</span>
                  </button>
                ))}
              </div>
            )}

            <a
              className="inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-orbitron uppercase tracking-wider text-bat-300 font-medium rounded-full group border border-bat-400/40 bg-bat-400/[0.06] hover:bg-bat-400/15 hover:border-bat-400 transition-colors duration-200"
              href="https://drive.google.com/file/d/1b-vtf1Ayiibdu9i6KoWtBUcwiRb8qmL9/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center gap-1">
                <span className="hidden sm:inline">Resume</span>
                <span className="sm:hidden">CV</span>
                <svg className="size-3 text-bat-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>

            {/* Mobile menu trigger */}
            {viewMode === 'archive' && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-gray-300 hover:text-white rounded-lg focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        {mobileMenuOpen && viewMode === 'archive' && (
          <div className="lg:hidden mt-2 rounded-2xl border border-cyber-border bg-cyber-surface/95 p-4 backdrop-blur-xl animate-fadeInTop shadow-xl">
            <ul className="flex flex-col gap-2 font-mono text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition"
                  >
                    <span className="text-bat-400 mr-2 font-mono">{"//"}</span>
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
