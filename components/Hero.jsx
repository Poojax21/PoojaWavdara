'use client';

import { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const TYPING_STRINGS = [
  'Full Stack Developer',
  'React Enthusiast',
  'Problem Solver',
  'UI/UX Craftsperson',
];

export default function Hero({ config }) {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const target = TYPING_STRINGS[currentTitle];
    let timeout;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length - 1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setCurrentTitle((prev) => (prev + 1) % TYPING_STRINGS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, currentTitle]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #000000 0%, #09090B 40%, #000000 100%)',
      }}
    >
      {/* Background massive text */}
      <div
        className="hero-bg-text absolute select-none pointer-events-none"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        aria-hidden="true"
      >
        BUILD
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(52, 211, 153, 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 8.33%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-12 gap-8 items-center min-h-screen py-32">

          {/* Left: Typography block */}
          <div className="md:col-span-7 flex flex-col gap-6">

            {/* Status badge */}
            <div
              className={`inline-flex items-center gap-2 glass px-4 py-2 rounded-full w-fit transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span className="status-pulse" />
              <span className="label-caps text-emerald-400">{config.availability}</span>
            </div>

            {/* Name */}
            <div
              className={`transition-all duration-1000 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <p className="label-caps text-zinc-500 mb-3">Hello, I'm</p>
              <h1 className="heading-display text-white" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
                {config.name.split(' ')[0]}
                <br />
                <span className="stroke-text-emerald">{config.name.split(' ').slice(1).join(' ')}</span>
              </h1>
            </div>

            {/* Typing title */}
            <div
              className={`transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="flex items-center gap-3">
                <span className="label-caps text-zinc-600">// </span>
                <span
                  className="text-xl font-medium"
                  style={{ color: 'var(--emerald)', fontFamily: 'var(--font-space-mono)', fontSize: '1rem' }}
                >
                  {displayed}
                  <span
                    className="inline-block w-0.5 h-5 bg-emerald-400 ml-0.5 align-middle"
                    style={{ animation: 'pulse 1s step-end infinite' }}
                  />
                </span>
              </div>
            </div>

            {/* Tagline */}
            <p
              className={`text-zinc-400 text-lg max-w-lg leading-relaxed transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ fontWeight: 300 }}
            >
              {config.tagline}
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap gap-4 mt-2 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                View Projects
                <span className="btn-icon">
                  <ArrowDown size={16} />
                </span>
              </button>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline"
              >
                Contact Me
              </button>
            </div>

            {/* Social links */}
            <div
              className={`flex items-center gap-4 pt-2 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <span className="label-caps text-zinc-600">Find me on</span>
              <div className="flex gap-3">
                {[
                  { href: config.social.github, icon: Github, label: 'GitHub' },
                  { href: config.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
                  { href: `mailto:${config.email}`, icon: Mail, label: 'Email' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Glass stats cards */}
          <div
            className={`md:col-span-5 flex flex-col gap-4 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            {/* Profile glass card */}
            <div className="glass rounded-3xl p-6 text-center">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2"
                style={{ borderColor: 'rgba(52, 211, 153, 0.3)' }}
              >
                <img
                  src={`https://avatars.githubusercontent.com/${config.github.username}`}
                  alt={config.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(config.name)}&background=18181B&color=34D399&size=96`;
                  }}
                />
              </div>
              <h2 className="font-display font-semibold text-white text-xl">{config.name}</h2>
              <p className="label-caps text-emerald-400 mt-1">{config.location}</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {config.about.stats.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div
                    className="text-2xl font-bold text-white font-display"
                    style={{ color: 'var(--emerald)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="label-caps text-zinc-500 mt-1 text-[9px]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tech readout */}
            <div className="glass rounded-2xl p-4">
              <p className="label-caps text-zinc-600 mb-3">// primary stack</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'rgba(52, 211, 153, 0.1)',
                      color: 'var(--emerald)',
                      border: '1px solid rgba(52, 211, 153, 0.2)',
                      fontFamily: 'var(--font-space-mono)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="label-caps text-zinc-600">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-600 to-transparent" />
      </div>
    </section>
  );
}
