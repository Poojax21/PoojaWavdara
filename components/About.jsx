'use client';

import { useEffect, useRef } from 'react';

export default function About({ config }) {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    elementsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !elementsRef.current.includes(el)) elementsRef.current.push(el);
  };

  return (
    <section id="about" className="warm-section py-24 md:py-32 relative overflow-hidden">
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(24,24,27,0.06) 0px, rgba(24,24,27,0.06) 1px, transparent 1px, transparent 8.33%)',
        }}
        aria-hidden="true"
      />

      {/* Large background number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: '30vw',
          fontWeight: 700,
          color: 'rgba(24,24,27,0.04)',
          lineHeight: 1,
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        01
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Section label */}
        <div ref={addRef} className="section-reveal flex items-center gap-4 mb-16">
          <span className="label-caps text-zinc-500">// 01</span>
          <div className="h-px flex-1 bg-zinc-300" style={{ maxWidth: 80 }} />
          <span className="label-caps text-zinc-900 font-bold">About Me</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start">

          {/* Left: Main content */}
          <div className="md:col-span-7">
            <div ref={addRef} className="section-reveal">
              <h2
                className="heading-display text-zinc-900 mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                Crafting the future,
                <br />
                <span
                  className="font-display italic font-normal"
                  style={{ color: 'transparent', WebkitTextStroke: '2px #18181B' }}
                >
                  one line at a time.
                </span>
              </h2>
            </div>

            <div ref={addRef} className="section-reveal space-y-4 text-zinc-600 leading-relaxed" style={{ fontWeight: 300, fontSize: '1.05rem' }}>
              <p>{config.about.summary}</p>
              <p>{config.about.description.split('\n\n')[1] || config.about.description}</p>
            </div>

            {/* Fun facts */}
            <div ref={addRef} className="section-reveal grid grid-cols-2 gap-3 mt-8">
              {config.about.funFacts.map((fact, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(24,24,27,0.08)',
                  }}
                >
                  <span className="text-lg">{fact.split(' ')[0]}</span>
                  <span className="text-sm text-zinc-600">{fact.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div ref={addRef} className="section-reveal flex gap-4 mt-8">
              <a
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-all duration-300 hover:scale-105"
              >
                View GitHub ↗
              </a>
              <a
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-300 text-zinc-700 text-sm font-semibold hover:border-zinc-900 hover:text-zinc-900 transition-all duration-300"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Right: Stats + visual */}
          <div className="md:col-span-5 flex flex-col gap-4">

            {/* Quick stats */}
            {config.about.stats.map((stat, i) => (
              <div
                key={stat.label}
                ref={addRef}
                className="section-reveal flex items-center justify-between px-6 py-4 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(24,24,27,0.08)',
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="text-zinc-600 text-sm font-medium">{stat.label}</span>
                </div>
                <span
                  className="font-display font-bold text-2xl"
                  style={{ color: 'var(--emerald)' }}
                >
                  {stat.value}
                </span>
              </div>
            ))}

            {/* Availability card */}
            <div
              ref={addRef}
              className="section-reveal p-6 rounded-2xl"
              style={{ background: '#18181B', color: 'white' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="status-pulse" />
                <span className="label-caps text-emerald-400">Available for hire</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Currently seeking full-time opportunities and interesting freelance projects. Let's build something great together.
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-4 w-full py-3 rounded-xl bg-emerald-400 text-zinc-900 font-semibold text-sm hover:bg-emerald-300 transition-all duration-300"
              >
                Get in Touch →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
