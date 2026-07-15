import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Icons } from '../components/Icons';
import { SectionHeading } from '../components/Shared';
import { SEO } from '../components/SEO';
import { Reveal } from '../components/animations/Reveal';
import { Magnetic } from '../components/animations/Magnetic';

export function About({ settings }) {
  if (!settings) return null;
  const whatIDo = settings.what_i_do ? settings.what_i_do.split('\n').filter(Boolean) : [];
  
  return (
    <>
      <SEO 
        title={`About | ${settings.owner_name}`} 
        description={`Learn more about ${settings.owner_name}, their background, and what they do.`}
        name={settings.owner_name}
      />
      <section className="pt-20 lg:pt-32 pb-10">
        <Reveal>
          <SectionHeading number="01 / ABOUT_ME" title="Who I Am" />
        </Reveal>
        
        <div className="grid lg:grid-cols-5 gap-12 mt-10">
          <div className="lg:col-span-3 space-y-6">
            <Reveal delay={0.1}>
              <p className="text-text-muted leading-relaxed text-base">{settings.bio}</p>
            </Reveal>

            {settings.specialty && (
              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-2 pt-2">
                  {settings.specialty.split(',').map(s => (
                    <span key={s} className="px-3 py-1 text-xs font-mono border border-brand-400/30 text-brand-400 bg-brand-400/5 hover:bg-brand-400/20 transition-colors">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
            
            <Reveal delay={0.3}>
              <div className="pt-6">
                <Magnetic strength={0.3}>
                  <Link to="/resume" className="cyber-button-primary px-8 py-4 text-xs flex w-max items-center gap-2 group">
                    VIEW RESUME <span className="group-hover:-translate-y-0.5 transition-transform"><Icons.Download /></span>
                  </Link>
                </Magnetic>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-3 pt-6">
              {settings.email && (
                <Reveal delay={0.4} type="up">
                  <div className="cyber-panel p-4 flex items-center gap-3 border-brand-400/20 group hover:border-brand-400/50 transition-all">
                    <span className="text-brand-400 group-hover:scale-110 transition-transform"><Icons.Mail /></span>
                    <div>
                      <p className="text-[9px] text-text-muted font-mono uppercase tracking-widest group-hover:text-white transition-colors">Email</p>
                      <p className="text-xs text-white truncate">{settings.email}</p>
                    </div>
                  </div>
                </Reveal>
              )}
              {settings.location && (
                <Reveal delay={0.5} type="up">
                  <div className="cyber-panel p-4 flex items-center gap-3 border-brand-400/20 group hover:border-brand-400/50 transition-all">
                    <span className="text-brand-400 group-hover:scale-110 transition-transform"><Icons.MapPin /></span>
                    <div>
                      <p className="text-[9px] text-text-muted font-mono uppercase tracking-widest group-hover:text-white transition-colors">Location</p>
                      <p className="text-xs text-white">{settings.location}</p>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>

          {whatIDo.length > 0 && (
            <div className="lg:col-span-2 mt-8 lg:mt-0">
              <Reveal delay={0.3} type="right">
                <p className="text-brand-400 font-mono text-xs uppercase tracking-[0.3em] mb-5">// WHAT I DO</p>
              </Reveal>
              <div className="space-y-3">
                {whatIDo.map((item, i) => (
                  <Reveal key={i} delay={0.4 + i * 0.1} type="right">
                    <div className="cyber-panel p-4 flex items-start gap-3 border-brand-400/15 group hover:border-brand-400/40 transition-colors hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                      <span className="text-brand-500 font-display font-black text-xs shrink-0 mt-0.5 group-hover:text-brand-400 transition-colors">
                        {String(i + 1).padStart(2, '0')}.
                      </span>
                      <span className="text-text-muted text-sm group-hover:text-white transition-colors">{item}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
