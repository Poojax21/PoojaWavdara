'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Star, GitFork, Code } from 'lucide-react';

const LANG_COLORS = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Java: '#B07219',
  'C++': '#F34B7D',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#DEA584',
  default: '#71717A',
};

function ProjectCard({ project, featured = false, index = 0 }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const langColor = LANG_COLORS[project.language] || LANG_COLORS.default;

  return (
    <div
      ref={cardRef}
      className="project-card group"
      style={{
        opacity: 0,
        transform: 'translateY(30px)',
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        background: '#111113',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '1.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '180px' }}>
        <img
          src={project.image}
          alt={project.title}
          className="project-card-image w-full h-full object-cover"
          style={{ filter: 'grayscale(20%)' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #18181B 0%, #27272A 100%)';
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(17,17,19,1) 20%, transparent 80%)' }}
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
              aria-label="GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={18} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-400/30 transition-all duration-200 hover:scale-110"
              aria-label="Live Demo"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>

        {/* Category badge */}
        {project.category && (
          <div className="absolute top-3 left-3">
            <span
              className="label-caps px-3 py-1 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.8)',
                color: 'var(--emerald)',
                border: '1px solid rgba(52,211,153,0.2)',
                fontSize: '9px',
              }}
            >
              {project.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-white text-lg mb-2 group-hover:text-emerald-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded-md text-xs text-zinc-400"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: '10px',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          {project.language ? (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: langColor }} />
              <span className="text-xs text-zinc-500" style={{ fontFamily: 'var(--font-space-mono)' }}>
                {project.language}
              </span>
            </div>
          ) : <div />}

          <div className="flex items-center gap-3 text-zinc-600">
            {project.stars > 0 && (
              <span className="flex items-center gap-1 text-xs">
                <Star size={12} /> {project.stars}
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center gap-1 text-xs">
                <GitFork size={12} /> {project.forks}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ config }) {
  const [githubRepos, setGithubRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (config.github.fetchProjects) {
      fetch(`/api/github?username=${config.github.username}`)
        .then((r) => r.json())
        .then((data) => {
          const filtered = (data.repos || []).filter(
            (r) => !config.github.exclude.includes(r.name)
          );
          setGithubRepos(filtered);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Combine featured + GitHub repos (deduplicated)
  const githubTitles = githubRepos.map((r) => r.title.toLowerCase());
  const uniqueFeatured = config.featuredProjects.filter(
    (p) => !githubTitles.includes(p.title.toLowerCase())
  );

  const allProjects = [
    ...config.featuredProjects,
    ...githubRepos.slice(0, config.github.maxProjects),
  ];

  const categories = ['All', ...new Set(config.featuredProjects.map((p) => p.category).filter(Boolean))];
  
  const filtered = filter === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === filter);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative overflow-hidden warm-section"
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(24,24,27,0.05) 0px, rgba(24,24,27,0.05) 1px, transparent 1px, transparent 8.33%)',
        }}
        aria-hidden="true"
      />

      {/* Large bg number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: '30vw',
          fontWeight: 700,
          color: 'rgba(24,24,27,0.04)',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        03
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="label-caps text-zinc-500">// 03</span>
            <div className="h-px w-16 bg-zinc-300" />
            <span className="label-caps text-zinc-900 font-bold">Projects</span>
          </div>
          <a
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors duration-200"
          >
            <Github size={16} />
            <span className="label-caps">View all on GitHub</span>
          </a>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 mt-8">
          <h2
            className="heading-display text-zinc-900"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Things I've
            <br />
            <span className="font-display italic font-normal">built & shipped</span>
          </h2>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  filter === cat
                    ? 'bg-zinc-900 text-white'
                    : 'border border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900'
                }`}
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GitHub integration status */}
        {loading ? (
          <div className="flex items-center gap-2 mb-6">
            <div className="w-4 h-4 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
            <span className="label-caps text-zinc-500">Fetching GitHub projects...</span>
          </div>
        ) : githubRepos.length > 0 ? (
          <div className="flex items-center gap-2 mb-6">
            <span className="status-pulse" />
            <span className="label-caps text-zinc-500">
              {githubRepos.length} repos synced from GitHub
            </span>
          </div>
        ) : null}

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((project, i) => (
            <ProjectCard key={project.id || project.name} project={project} index={i} />
          ))}
        </div>

        {/* Show more */}
        {filtered.length > 6 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-primary"
              style={{ background: '#18181B', color: 'white' }}
            >
              {showAll ? 'Show Less' : `Show ${filtered.length - 6} More`}
              <span className="btn-icon" style={{ background: '#3F3F46' }}>
                <Code size={14} />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
