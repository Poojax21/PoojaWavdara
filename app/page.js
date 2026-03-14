'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import ChatWidget from '@/components/ChatWidget';
import portfolio from '@/config/portfolio';

export default function Home() {
  return (
    <main>
      <Navigation config={portfolio} />
      <Hero config={portfolio} />
      <About config={portfolio} />
      <Skills config={portfolio} />
      <Projects config={portfolio} />
      <Experience config={portfolio} />
      <Contact config={portfolio} />
      {portfolio.chat.enabled && <ChatWidget config={portfolio} />}
    </main>
  );
}
