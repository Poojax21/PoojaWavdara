'use client';

import { useEffect, useRef, useState } from 'react';

export default function Skills({ config }) {
  const [active, setActive] = useState(Object.keys(config.skills)[0]);
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeCategory = config.skills[active];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000 0%, #09090B 100%)' }}
    >
      {/* Emerald glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      {/* Large bg number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hero-bg-text"
        aria-hidden="true"
      >
        02
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="label-caps text-zinc-600">// 02</span>
          <div className="h-px w-16 bg-zinc-800" />
          <span className="label-caps text-zinc-400">Technical Skills</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12 mt-12">

          {/* Left: Categories */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h2
              className="heading-display text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              My
              <br />
              <span style={{ color: 'var(--emerald)' }}>Arsenal</span>
            </h2>

            {Object.entries(config.skills).map(([category, data]) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 ${
                  active === category ? 'glass border-emerald-400/20' : 'hover:glass'
                }`}
                style={{
                  border: active === category ? '1px solid rgba(52, 211, 153, 0.2)' : '1px solid transparent',
                }}
              >
                <span className="text-2xl">{data.icon}</span>
                <div>
                  <div className={`font-semibold text-sm ${active === category ? 'text-white' : 'text-zinc-400'}`}>
                    {category}
                  </div>
                  <div className="label-caps text-zinc-600 mt-0.5">
                    {data.items.length} skills
                  </div>
                </div>
                {active === category && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--emerald)' }}
                  />
                )}
              </button>
            ))}

            {/* All tech tags */}
            <div className="mt-4 glass rounded-2xl p-4">
              <p className="label-caps text-zinc-600 mb-3">// all technologies</p>
              <div className="flex flex-wrap gap-2">
                {Object.values(config.skills).flatMap(c => c.items).map(s => s.name).slice(0, 14).map((name) => (
                  <span
                    key={name}
                    className="px-2 py-1 rounded-lg text-xs text-zinc-400"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      fontFamily: 'var(--font-space-mono)',
                      fontSize: '10px',
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Skill bars */}
          <div className="md:col-span-8">
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{activeCategory.icon}</span>
                <div>
                  <h3 className="font-display text-white font-bold text-xl">{active}</h3>
                  <p className="label-caps text-zinc-600">{activeCategory.items.length} technologies</p>
                </div>
              </div>

              <div className="space-y-6">
                {activeCategory.items.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">{skill.name}</span>
                      <span
                        className="label-caps"
                        style={{ color: activeCategory.color, fontSize: '10px' }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: animated ? `${skill.level}%` : '0%',
                          background: `linear-gradient(90deg, ${activeCategory.color}, rgba(96, 165, 250, 0.6))`,
                          transitionDelay: `${i * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Proficiency legend */}
              <div className="flex gap-6 mt-8 pt-6 border-t border-white/5">
                {[
                  { label: 'Learning', range: '0-60%' },
                  { label: 'Proficient', range: '60-80%' },
                  { label: 'Expert', range: '80-100%' },
                ].map(({ label, range }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: label === 'Expert' ? 'var(--emerald)' : label === 'Proficient' ? '#60A5FA' : '#71717A' }}
                    />
                    <span className="label-caps text-zinc-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick highlights */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                { label: 'Years Experience', value: '2+' },
                { label: 'Projects Delivered', value: '20+' },
                { label: 'Technologies', value: `${Object.values(config.skills).reduce((a, c) => a + c.items.length, 0)}` },
              ].map((item) => (
                <div key={item.label} className="glass rounded-2xl p-4 text-center">
                  <div
                    className="font-display text-2xl font-bold"
                    style={{ color: 'var(--emerald)' }}
                  >
                    {item.value}
                  </div>
                  <div className="label-caps text-zinc-600 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
