import { motion } from 'framer-motion';
import { Icons } from '../components/Icons';
import { SectionHeading, EmptyState } from '../components/Shared';
import { SEO } from '../components/SEO';
import { Reveal } from '../components/animations/Reveal';

export function Skills({ skills, settings }) {
  if (!skills || !settings) return null;

  const grouped = skills.reduce((acc, s) => {
    const cat = s.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  const catColors = {
    'ai-ml': '#00f0ff',
    'cybersecurity': '#ff003c',
    'programming': '#fce205',
    'tools': '#a855f7',
  };

  return (
    <>
      <SEO 
        title={`Skills | ${settings.owner_name}`} 
        description={`Technical skills and capabilities of ${settings.owner_name}.`}
        name={settings.owner_name}
      />
      <section className="pt-20 lg:pt-32 pb-10">
        <Reveal>
          <SectionHeading number="03 / CAPABILITIES" title="Skills" />
        </Reveal>
        
        {skills.length === 0 ? (
          <Reveal delay={0.1}>
            <EmptyState icon={Icons.Cpu} message="No capabilities loaded yet." />
          </Reveal>
        ) : (
          <div className="space-y-12 mt-10">
            {Object.entries(grouped).map(([category, catSkills], catIndex) => {
              const color = catColors[category] || '#00f0ff';
              return (
                <div key={category}>
                  <Reveal delay={0.1}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
                      <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color }}>
                        // {category.replace('-', '/')}
                      </p>
                    </div>
                  </Reveal>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {catSkills.map((skill, i) => (
                      <Reveal key={i} delay={0.1 + i * 0.05} type="up">
                        <div className="cyber-panel p-5 flex items-center gap-5 border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.02] group">
                          <span className="font-display font-bold text-xs text-white uppercase tracking-wide w-28 shrink-0 truncate group-hover:text-brand-400 transition-colors">
                            {skill.name}
                          </span>
                          <div className="flex-1 h-2 bg-white/5 border border-white/10 overflow-hidden rounded-full">
                            <motion.div className="h-full rounded-full relative"
                              style={{ background: `linear-gradient(90deg, ${color}33, ${color})`, boxShadow: `0 0 10px ${color}` }}
                              initial={{ width: 0 }} 
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true, margin: "0px" }}
                              transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <div className="absolute top-0 bottom-0 right-0 w-4 bg-white/40 blur-sm rounded-full" />
                            </motion.div>
                          </div>
                          <span className="font-mono text-xs shrink-0 font-bold" style={{ color }}>{skill.level}%</span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
