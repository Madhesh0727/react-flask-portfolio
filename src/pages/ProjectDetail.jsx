import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Icons } from '../components/Icons';
import { Reveal } from '../components/animations/Reveal';
import { useEffect, useState } from 'react';

export function ProjectDetail({ projects, settings }) {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (projects) {
      setProject(projects.find(p => p.id.toString() === id));
    }
  }, [projects, id]);

  if (!projects || !settings) return null;

  if (!project) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <Reveal>
          <div className="text-brand-500 mb-4"><Icons.AlertTriangle size={48} /></div>
          <h2 className="text-2xl font-display uppercase tracking-widest text-white mb-6">Module Not Found</h2>
          <Link to="/projects" className="px-6 py-3 border border-brand-500/50 text-brand-400 hover:bg-brand-500/10 transition-colors uppercase tracking-widest text-sm font-mono">
            Return to Projects
          </Link>
        </Reveal>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${project.title} | ${settings.owner_name}`} 
        description={project.description}
        name={settings.owner_name}
      />
      <article className="pt-24 lg:pt-32 pb-16 max-w-5xl mx-auto">
        <Reveal>
          <Link to="/projects" className="inline-flex items-center gap-2 text-text-muted hover:text-brand-400 font-mono text-[10px] uppercase tracking-widest mb-8 transition-colors">
            <Icons.ChevronRight className="rotate-180" /> Back to Projects
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-mono border border-brand-400/40 bg-brand-400/5 text-brand-400 px-3 py-1 uppercase tracking-widest flex items-center gap-2">
              <Icons.Code /> {project.category}
            </span>
            {project.featured && (
              <span className="text-[10px] font-display font-black text-brand-600 border border-brand-600 px-3 py-1 uppercase tracking-wider">
                FEATURED
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="text-lg text-text-muted mb-8 max-w-3xl leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            {project.github_link && (
              <a href={project.github_link} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[11px] uppercase tracking-wider transition-all">
                <Icons.Github /> View Source Code
              </a>
            )}
            {project.demo_link && (
              <a href={project.demo_link} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/50 text-brand-400 font-mono text-[11px] uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                <Icons.ExternalLink /> Live Demo
              </a>
            )}
          </div>
        </Reveal>

        {project.image && (
          <Reveal delay={0.1}>
            <div className="relative w-full aspect-[21/9] mb-16 border border-brand-400/20 shadow-[0_0_40px_rgba(0,240,255,0.1)]">
              <img src={project.image.startsWith('http') ? project.image : `${import.meta.env.VITE_API_URL || ''}/static/uploads/projects/${project.image}`} 
                alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            </div>
          </Reveal>
        )}

        <div className="grid lg:grid-cols-[1fr_300px] gap-16">
          <Reveal delay={0.2}>
            <div className="prose prose-invert prose-brand max-w-none font-sans text-text-main leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: project.long_description || project.description }} />
          </Reveal>

          <Reveal delay={0.3} type="left">
            <div className="cyber-panel p-6 border-brand-400/20 bg-black/40">
              <h3 className="text-white font-display uppercase tracking-widest text-sm mb-6 pb-4 border-b border-white/10">Technology Stack</h3>
              {project.tech_stack.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map(t => (
                    <span key={t} className="px-3 py-1.5 text-[10px] font-mono bg-brand-500/5 text-brand-400 border border-brand-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-text-muted text-xs">Not specified</span>
              )}
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
