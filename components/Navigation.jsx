'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation({ config }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{ paddingTop: scrolled ? '0.75rem' : '1.25rem', transition: 'padding 0.4s ease' }}
    >
      {/* Desktop Nav */}
      <nav
        className="hidden md:flex items-center gap-1 px-2 py-2 rounded-full nav-glass"
        style={{
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="px-4 mr-2 font-display italic text-white font-semibold text-lg"
        >
          {config.firstName}
          <span style={{ color: 'var(--emerald)' }}>.</span>
        </a>

        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeSection === link.href.slice(1)
                ? 'bg-white/15 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            {link.label}
          </button>
        ))}

        {/* CTA */}
        <a
          href={config.social.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 px-5 py-2 rounded-full text-sm font-semibold bg-white text-zinc-900 hover:bg-zinc-100 transition-all duration-300"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Resume ↗
        </a>
      </nav>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden flex items-center justify-between w-full px-4">
        <span className="font-display italic text-white font-semibold text-xl">
          {config.firstName}<span style={{ color: 'var(--emerald)' }}>.</span>
        </span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="glass p-2 rounded-full text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 glass rounded-2xl p-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
            >
              {link.label}
            </button>
          ))}
          <a
            href={config.social.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-4 py-3 rounded-xl bg-white text-zinc-900 font-semibold text-center"
          >
            Download Resume ↗
          </a>
        </div>
      )}
    </header>
  );
}
