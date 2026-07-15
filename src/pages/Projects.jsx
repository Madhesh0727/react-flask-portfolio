import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../components/Icons';
import { SectionHeading, EmptyState } from '../components/Shared';
import { SEO } from '../components/SEO';
import { Reveal } from '../components/animations/Reveal';
import { TiltCard } from '../components/animations/TiltCard';

export function Projects({ projects, settings }) {
  const [filter, setFilter] = useState('ALL');
  
  if (!projects || !settings) return null;

  const categories = ['ALL', ...new Set(projects.map(p => p.category).filter(Boolean))];
  const filtered = filter === 'ALL' ? projects : projects.filter(p => p.category === filter);

  return (
    <>
      <SEO 
        title={`Projects | ${settings.owner_name}`} 
        description={`Explore the latest projects and modules developed by ${settings.owner_name}.`}
        name={settings.owner_name}
      />
      <section className="pt-20 lg:pt-32 pb-10">
        <Reveal>
          <SectionHeading number="02 / MODULES" title="Projects" />
        </Reveal>

        {projects.length > 0 && (
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-[10px] font-display font-bold uppercase tracking-widest border transition-all ${
                    filter === cat
                      ? 'border-brand-400 text-brand-400 bg-brand-400/10 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'border-brand-400/25 text-text-muted hover:border-brand-400/60 hover:text-brand-400'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {filtered.length === 0 ? (
          <Reveal delay={0.2}>
            <EmptyState icon={Icons.Code} message="No modules loaded yet. Add projects via admin panel." />
          </Reveal>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.1} type="up">
                <TiltCard>
                  <article className="cyber-panel h-full flex flex-col group border-brand-400/20 hover:border-brand-400/60 transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] bg-black/40 backdrop-blur-sm">
                    
                    {/* Image */}
                    {project.image && (
                      <div className="h-48 overflow-hidden relative">
                        <img src={project.image.startsWith('http') ? project.image : `${import.meta.env.VITE_API_URL || ''}/static/uploads/projects/${project.image}`} alt={project.title}
                          className="w-full h-full object-cover filter grayscale-[60%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                        {project.featured && (
                          <div className="absolute top-3 right-3 flex items-center gap-1 bg-brand-600 border border-brand-600 px-2 py-0.5 shadow-[0_0_15px_rgba(255,0,60,0.5)]">
                            <span className="text-[8px] text-black"><Icons.Star /></span>
                            <span className="text-[8px] font-display font-black text-black uppercase tracking-wider">FEATURED</span>
                          </div>
                        )}
                        {/* Glass sweep effect on hover */}
                        <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-sweep" />
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-grow relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-brand-400 text-sm group-hover:rotate-12 transition-transform"><Icons.Code /></span>
                          <span className="text-[9px] font-mono border border-brand-400/30 text-brand-400 bg-brand-400/5 px-2 py-0.5 uppercase tracking-widest">
                            {project.category}
                          </span>
                        </div>
                        {!project.image && project.featured && (
                          <span className="text-[9px] font-display font-black text-brand-600 border border-brand-600 px-2 py-0.5 uppercase tracking-wider">
                            FEATURED
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-display font-black text-white group-hover:text-brand-400 transition-colors uppercase tracking-wide mb-3">
                        {project.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed flex-grow mb-6">{project.description}</p>

                      {project.tech_stack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.tech_stack.map(t => (
                            <span key={t} className="px-2 py-1 text-[9px] font-mono bg-brand-500/10 text-brand-500 border border-brand-500/20 group-hover:border-brand-500/50 transition-colors">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-5 mt-auto pt-4 border-t border-brand-400/20">
                        {project.github_link && (
                          <a href={project.github_link} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted hover:text-brand-400 uppercase tracking-wider transition-colors group/link">
                            <Icons.Github /> <span className="group-hover/link:underline underline-offset-4">Code</span>
                          </a>
                        )}
                        {project.demo_link && (
                          <a href={project.demo_link} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1.5 text-[10px] font-mono text-brand-400 hover:text-brand-500 uppercase tracking-wider transition-colors group/link">
                            <Icons.ExternalLink /> <span className="group-hover/link:underline underline-offset-4">Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
