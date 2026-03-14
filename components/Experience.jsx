'use client';

import { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

function TimelineCard({ item, type, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, index * 150);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative pl-12"
      style={{
        opacity: 0,
        transform: 'translateX(-30px)',
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-5 w-8 h-8 rounded-full flex items-center justify-center z-10"
        style={{
          background: 'rgba(52,211,153,0.15)',
          border: '1px solid rgba(52,211,153,0.3)',
        }}
      >
        <span className="text-sm">{item.logo}</span>
      </div>

      {/* Card */}
      <div
        className="glass rounded-2xl p-6 hover:border-emerald-400/20 transition-all duration-300"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display font-semibold text-white text-lg">
              {item.role || item.degree}
            </h3>
            <p style={{ color: 'var(--emerald)' }} className="font-medium text-sm mt-0.5">
              {item.company || item.institution}
            </p>
          </div>
          <div className="text-right">
            <span
              className="label-caps px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(52,211,153,0.1)',
                color: 'var(--emerald)',
                border: '1px solid rgba(52,211,153,0.15)',
                fontSize: '9px',
              }}
            >
              {item.period}
            </span>
            <p className="label-caps text-zinc-600 mt-1.5">{item.location}</p>
          </div>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{item.description}</p>

        {item.highlights && (
          <ul className="space-y-2 mb-4">
            {item.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-500">
                <span style={{ color: 'var(--emerald)', flexShrink: 0, marginTop: '2px' }}>▸</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        {item.tech && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
            {item.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded-md text-zinc-500"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: '10px',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {item.grade && (
          <p className="label-caps text-emerald-400 mt-3">{item.grade}</p>
        )}
      </div>
    </div>
  );
}

export default function Experience({ config }) {
  return (
    <section
      id="experience"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: '#09090B' }}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 8.33%)',
        }}
        aria-hidden="true"
      />

      {/* Large bg number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hero-bg-text"
        aria-hidden="true"
      >
        04
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="label-caps text-zinc-600">// 04</span>
          <div className="h-px w-16 bg-zinc-800" />
          <span className="label-caps text-zinc-400">Experience & Education</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12 mt-12">

          {/* Left: header */}
          <div className="md:col-span-4">
            <h2
              className="heading-display text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              My
              <br />
              <span style={{ color: 'var(--emerald)' }}>Journey</span>
            </h2>

            <p className="text-zinc-500 leading-relaxed text-sm mb-8">
              A timeline of my professional experience, education, and key milestones in my development career.
            </p>

            {/* Download resume */}
            <a
              href={config.social.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-all duration-300"
            >
              <span>📄</span>
              Download Full Resume
            </a>

            {/* Certifications */}
            {config.certifications && config.certifications.length > 0 && (
              <div className="mt-10">
                <p className="label-caps text-zinc-600 mb-4">// certifications</p>
                <div className="space-y-3">
                  {config.certifications.map((cert, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="text-xl">{cert.icon}</span>
                      <div>
                        <p className="text-white text-xs font-medium">{cert.name}</p>
                        <p className="label-caps text-zinc-600 mt-0.5">{cert.issuer} · {cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Timeline */}
          <div className="md:col-span-8 relative">
            {/* Timeline vertical line */}
            <div
              className="absolute left-4 top-5 bottom-5 w-px"
              style={{ background: 'linear-gradient(to bottom, var(--emerald), transparent)' }}
            />

            {/* Work Experience */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6 pl-12">
                <Briefcase size={16} style={{ color: 'var(--emerald)' }} />
                <span className="label-caps text-emerald-400">Work Experience</span>
              </div>
              <div className="space-y-6">
                {config.experience.map((item, i) => (
                  <TimelineCard key={i} item={item} type="work" index={i} />
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-6 pl-12">
                <GraduationCap size={16} style={{ color: '#60A5FA' }} />
                <span className="label-caps" style={{ color: '#60A5FA' }}>Education</span>
              </div>
              <div className="space-y-6">
                {config.education.map((item, i) => (
                  <TimelineCard key={i} item={item} type="education" index={i + config.experience.length} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
