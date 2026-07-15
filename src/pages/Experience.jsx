import { motion } from 'framer-motion';
import { Icons } from '../components/Icons';
import { SectionHeading, EmptyState } from '../components/Shared';
import { SEO } from '../components/SEO';
import { Reveal } from '../components/animations/Reveal';

function TimelineItem({ title, subtitle, start, end, description, accent = '#00f0ff', index }) {
  return (
    <Reveal delay={index * 0.15} type="up">
      <div className="relative pl-8 pb-10 last:pb-0 group">
        {/* Line */}
        <div className="absolute left-[11px] top-4 bottom-0 w-px bg-white/10 group-hover:bg-brand-400/30 transition-colors" />
        {/* Dot */}
        <div className="absolute left-0 top-2 w-[22px] h-[22px] border-2 flex items-center justify-center bg-black group-hover:scale-125 transition-transform duration-300"
          style={{ borderColor: accent }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
        </div>
        <div className="cyber-panel p-6 border-white/8 hover:border-brand-400/30 hover:bg-brand-400/5 transition-all ml-4">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h4 className="font-display font-bold text-white text-base uppercase tracking-wide group-hover:text-brand-400 transition-colors">{title}</h4>
              <p className="text-xs font-mono mt-1" style={{ color: accent }}>{subtitle}</p>
            </div>
            <span className="text-[9px] font-mono text-text-muted bg-black/50 border border-white/10 px-3 py-1.5 whitespace-nowrap group-hover:border-brand-400/30 transition-colors">
              {start} {end ? `→ ${end}` : '→ PRESENT'}
            </span>
          </div>
          {description && <p className="text-text-muted text-sm leading-relaxed">{description}</p>}
        </div>
      </div>
    </Reveal>
  );
}

export function Experience({ experience, education, certifications, settings }) {
  if (!experience || !education || !settings) return null;

  return (
    <>
      <SEO 
        title={`Experience | ${settings.owner_name}`} 
        description={`Work experience, education, and certifications of ${settings.owner_name}.`}
        name={settings.owner_name}
      />
      <section className="pt-20 lg:pt-32 pb-10">
        <Reveal>
          <SectionHeading number="04 / BACKGROUND" title="Experience & Education" />
        </Reveal>
        
        <div className="grid lg:grid-cols-2 gap-16 mb-24 mt-10">
          {/* Experience */}
          <div>
            <Reveal delay={0.1}>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-brand-400 text-2xl p-3 bg-brand-400/10 border border-brand-400/20"><Icons.Briefcase /></span>
                <h3 className="font-display font-black text-white text-xl uppercase tracking-widest">Work Experience</h3>
              </div>
            </Reveal>
            {experience.length === 0 ? (
              <Reveal delay={0.2}><EmptyState icon={Icons.Briefcase} message="No experience listed yet." /></Reveal>
            ) : (
              <div>
                {experience.map((ex, i) => (
                  <TimelineItem key={ex.id} title={ex.role} subtitle={ex.company}
                    start={ex.start_date} end={ex.end_date} description={ex.description}
                    accent="#00f0ff" index={i} />
                ))}
              </div>
            )}
          </div>
          {/* Education */}
          <div>
            <Reveal delay={0.1}>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-brand-500 text-2xl p-3 bg-brand-500/10 border border-brand-500/20"><Icons.GraduationCap /></span>
                <h3 className="font-display font-black text-white text-xl uppercase tracking-widest">Education</h3>
              </div>
            </Reveal>
            {education.length === 0 ? (
              <Reveal delay={0.2}><EmptyState icon={Icons.GraduationCap} message="No education listed yet." /></Reveal>
            ) : (
              <div>
                {education.map((edu, i) => (
                  <TimelineItem key={edu.id} title={edu.degree} subtitle={`${edu.college}${edu.cgpa ? ` — CGPA: ${edu.cgpa}` : ''}`}
                    start={edu.start_date} end={edu.end_date} description={edu.description}
                    accent="#ff003c" index={i} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <>
            <Reveal>
              <SectionHeading number="05 / CREDENTIALS" title="Certifications" />
            </Reveal>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
              {certifications.map((cert, i) => (
                <Reveal key={cert.id} delay={i * 0.1} type="up">
                  <div className="cyber-panel p-6 border-brand-400/15 hover:border-brand-400/50 hover:bg-brand-400/5 transition-all group hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 border border-brand-400/30 flex items-center justify-center text-brand-400 text-2xl shrink-0 group-hover:bg-brand-400/20 group-hover:scale-110 transition-all duration-300">
                        <Icons.Award />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-1 group-hover:text-brand-400 transition-colors">
                          {cert.name}
                        </h4>
                        <p className="text-brand-500 text-xs font-mono">{cert.issuer}</p>
                        {cert.date_earned && (
                          <p className="text-text-muted/60 text-[10px] font-mono mt-2">{cert.date_earned}</p>
                        )}
                        {cert.description && (
                          <p className="text-text-muted text-xs leading-relaxed mt-3">{cert.description}</p>
                        )}
                        {cert.url && (
                          <a href={cert.url} target="_blank" rel="noreferrer"
                            className="mt-4 inline-flex items-center gap-2 text-[10px] font-mono text-brand-400 hover:text-brand-500 uppercase tracking-wider group/link">
                            <Icons.ExternalLink /> <span className="group-hover/link:underline underline-offset-4">Verify</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
