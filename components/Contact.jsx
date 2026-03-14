'use client';

import { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact({ config }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.contact-reveal').forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, i * 100);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      if (config.contact.formspreeId) {
        const res = await fetch(`https://formspree.io/f/${config.contact.formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setStatus('success');
          setForm({ name: '', email: '', subject: '', message: '' });
        } else {
          setStatus('error');
        }
      } else {
        // Mailto fallback
        const mailto = `mailto:${config.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
        window.open(mailto, '_blank');
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const socialLinks = [
    { href: config.social.github, icon: Github, label: 'GitHub', color: '#ffffff' },
    { href: config.social.linkedin, icon: Linkedin, label: 'LinkedIn', color: '#0A66C2' },
    { href: `mailto:${config.email}`, icon: Mail, label: 'Email', color: 'var(--emerald)' },
    ...(config.social.twitter ? [{ href: config.social.twitter, icon: Twitter, label: 'Twitter', color: '#1DA1F2' }] : []),
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000 0%, #09090B 100%)' }}
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

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Massive background text */}
      <div
        className="hero-bg-text absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        CONTACT
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-4 contact-reveal" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <span className="label-caps text-zinc-600">// 05</span>
          <div className="h-px w-16 bg-zinc-800" />
          <span className="label-caps text-zinc-400">Get in Touch</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12 mt-10">

          {/* Left: Info */}
          <div className="md:col-span-5">
            <div className="contact-reveal" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}>
              <h2
                className="heading-display text-white mb-4"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                {config.contact.heading}
                <br />
                <span style={{ color: 'var(--emerald)' }}>{config.contact.subheading}</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                {config.contact.description}
              </p>
            </div>

            {/* Social links */}
            <div
              className="space-y-3 contact-reveal"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease 0.2s' }}
            >
              {socialLinks.map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl glass hover:border-white/20 transition-all duration-300 group"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{label}</p>
                    <p className="text-zinc-600 text-xs">
                      {label === 'Email' ? config.email : `/${label === 'GitHub' ? config.github.username : config.name.toLowerCase().replace(' ', '-')}`}
                    </p>
                  </div>
                  <div className="ml-auto text-zinc-700 group-hover:text-zinc-400 transition-colors">↗</div>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div
              className="mt-6 p-4 rounded-2xl contact-reveal"
              style={{
                background: 'rgba(52,211,153,0.08)',
                border: '1px solid rgba(52,211,153,0.15)',
                opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease 0.3s',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="status-pulse" />
                <span className="label-caps text-emerald-400">Currently Available</span>
              </div>
              <p className="text-zinc-400 text-xs mt-1">
                Open to full-time roles, freelance projects, and interesting collaborations.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="md:col-span-7 contact-reveal"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease 0.2s' }}
          >
            <div className="glass rounded-3xl p-8" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="font-display text-white font-semibold text-xl mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-caps text-zinc-600 block mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-emerald-400/50 transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontFamily: 'var(--font-dm-sans)',
                      }}
                    />
                  </div>
                  <div>
                    <label className="label-caps text-zinc-600 block mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-emerald-400/50 transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontFamily: 'var(--font-dm-sans)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="label-caps text-zinc-600 block mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Project Inquiry / Job Opportunity"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-emerald-400/50 transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: 'var(--font-dm-sans)',
                    }}
                  />
                </div>

                <div>
                  <label className="label-caps text-zinc-600 block mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none focus:border-emerald-400/50 transition-all duration-200 resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: 'var(--font-dm-sans)',
                    }}
                  />
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm p-3 rounded-xl" style={{ background: 'rgba(52,211,153,0.1)' }}>
                    <CheckCircle size={16} />
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)' }}>
                    <AlertCircle size={16} />
                    Something went wrong. Please email me directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl font-semibold text-zinc-900 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'var(--emerald)' }}
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 contact-reveal"
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease 0.4s' }}
        >
          <div className="flex items-center gap-2">
            <span className="status-pulse" />
            <span className="label-caps text-zinc-600">System Operational</span>
          </div>
          <p className="label-caps text-zinc-700">
            © {new Date().getFullYear()} {config.name} · Built with Next.js
          </p>
          <div className="flex gap-4">
            {socialLinks.slice(0, 3).map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-zinc-600 hover:text-white transition-colors duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
