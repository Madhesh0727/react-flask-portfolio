import { useRef } from 'react';
import { SEO } from '../components/SEO';
import { Icons } from '../components/Icons';

/* ── Helpers ──────────────────────────────────────────────── */
function Section({ title, icon: Icon, children }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-gray-800 print:border-gray-300">
        <span className="text-brand-400 print:text-gray-700"><Icon /></span>
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 print:text-gray-500">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Badge({ children, color = 'cyan' }) {
  const colors = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 print:bg-gray-100 print:text-gray-700 print:border-gray-300',
    red:  'bg-red-500/10 text-red-400 border-red-500/30 print:bg-gray-100 print:text-gray-700 print:border-gray-300',
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-mono border rounded-sm mr-1.5 mb-1.5 ${colors[color]}`}>
      {children}
    </span>
  );
}

/* ── Skill Bar ─────────────────────────────────────────────── */
function SkillBar({ name, level }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xs text-gray-300 print:text-gray-700 w-28 shrink-0 truncate font-medium">{name}</span>
      <div className="flex-1 h-1.5 bg-gray-800 print:bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500/60 to-cyan-400 print:bg-gray-500"
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="text-[10px] text-gray-500 print:text-gray-400 w-8 text-right">{level}%</span>
    </div>
  );
}

/* ── Timeline Entry ────────────────────────────────────────── */
function TimelineEntry({ title, subtitle, start, end, description }) {
  return (
    <div className="mb-5 last:mb-0 pl-4 border-l-2 border-gray-800 print:border-gray-300 relative">
      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyan-400 print:bg-gray-600" />
      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
        <div>
          <h3 className="text-sm font-bold text-white print:text-gray-900">{title}</h3>
          <p className="text-xs text-cyan-400 print:text-gray-600 font-medium">{subtitle}</p>
        </div>
        {(start || end) && (
          <span className="text-[10px] font-mono text-gray-500 print:text-gray-400 bg-gray-800/60 print:bg-gray-100 px-2 py-0.5 rounded whitespace-nowrap">
            {start}{end ? ` – ${end}` : ' – Present'}
          </span>
        )}
      </div>
      {description && <p className="text-xs text-gray-400 print:text-gray-600 leading-relaxed mt-1">{description}</p>}
    </div>
  );
}

/* ── Main Resume Component ─────────────────────────────────── */
export function Resume({ settings, skills, experience, education, certifications, projects }) {
  const printRef = useRef();

  if (!settings) return null;

  const grouped = (skills || []).reduce((acc, s) => {
    const cat = s.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  const handlePrint = () => window.print();

  const featuredProjects = (projects || []).filter(p => p.featured).slice(0, 4);
  const allProjects = featuredProjects.length ? featuredProjects : (projects || []).slice(0, 4);

  return (
    <>
      <SEO
        title={`Resume | ${settings.owner_name}`}
        description={`Professional resume of ${settings.owner_name}`}
        name={settings.owner_name}
      />

      {/* ── Print/Download Bar (hidden on print) ── */}
      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-b border-brand-400/20 flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" style={{ boxShadow: '0 0 8px #00f0ff' }} />
          <span className="font-mono text-xs text-brand-400 tracking-widest uppercase">Auto-Generated Resume</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-brand-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-brand-400/80 transition"
          >
            <Icons.Download /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* ── Resume Paper ── */}
      <div
        ref={printRef}
        className="resume-paper max-w-[850px] mx-auto bg-[#0a0a0a] print:bg-white text-white print:text-gray-900 mt-16 no-print:mt-20 shadow-2xl print:shadow-none"
        style={{ fontFamily: '"Space Mono", monospace' }}
      >
        {/* Header */}
        <div className="p-10 pb-8 border-b border-gray-800 print:border-gray-300 bg-gradient-to-r from-black to-gray-900 print:bg-white">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            {settings.profile_image && (
              <img
                src={settings.profile_image.startsWith('http') ? settings.profile_image : `${import.meta.env.VITE_API_URL || ''}${settings.profile_image}`}
                alt={settings.owner_name}
                className="w-20 h-20 object-cover rounded border-2 border-brand-400/60 print:border-gray-400 shrink-0 grayscale-[20%] print:grayscale-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-black uppercase tracking-widest text-white print:text-gray-900 mb-1"
                style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {settings.owner_name}
              </h1>
              {settings.tagline && (
                <p className="text-brand-400 print:text-gray-600 text-sm font-mono uppercase tracking-widest mb-3">{settings.tagline}</p>
              )}
              {/* Contacts inline */}
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-gray-400 print:text-gray-600">
                {settings.email && (
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-brand-400 transition">
                    <Icons.Mail /> {settings.email}
                  </a>
                )}
                {settings.location && (
                  <span className="flex items-center gap-1.5">
                    <Icons.MapPin /> {settings.location}
                  </span>
                )}
                {settings.github_url && (
                  <a href={settings.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-brand-400 transition">
                    <Icons.Github /> {settings.github_url.replace('https://github.com/', 'github.com/')}
                  </a>
                )}
                {settings.linkedin_url && (
                  <a href={settings.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-brand-400 transition">
                    <Icons.Linkedin /> LinkedIn
                  </a>
                )}
                {settings.twitter_url && (
                  <a href={settings.twitter_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-brand-400 transition">
                    <Icons.Twitter /> Twitter
                  </a>
                )}
                {settings.instagram_url && (
                  <a href={settings.instagram_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-brand-400 transition">
                    <Icons.Instagram /> Instagram
                  </a>
                )}
                {settings.whatsapp_url && (
                  <a href={settings.whatsapp_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-brand-400 transition">
                    <Icons.WhatsApp /> WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-x-10 gap-y-0">

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Summary */}
            {settings.bio && (
              <Section title="Professional Summary" icon={Icons.BookOpen}>
                <p className="text-sm text-gray-300 print:text-gray-700 leading-relaxed">{settings.bio}</p>
              </Section>
            )}

            {/* Experience */}
            {(experience || []).length > 0 && (
              <Section title="Work Experience" icon={Icons.Briefcase}>
                {experience.map((ex, i) => (
                  <TimelineEntry
                    key={ex.id || i}
                    title={ex.role}
                    subtitle={ex.company}
                    start={ex.start_date}
                    end={ex.end_date}
                    description={ex.description}
                  />
                ))}
              </Section>
            )}

            {/* Education */}
            {(education || []).length > 0 && (
              <Section title="Education" icon={Icons.GraduationCap}>
                {education.map((edu, i) => (
                  <TimelineEntry
                    key={edu.id || i}
                    title={edu.degree}
                    subtitle={`${edu.college}${edu.cgpa ? `  •  CGPA: ${edu.cgpa}` : ''}`}
                    start={edu.start_date}
                    end={edu.end_date}
                    description={edu.description}
                  />
                ))}
              </Section>
            )}

            {/* Projects */}
            {allProjects.length > 0 && (
              <Section title="Key Projects" icon={Icons.Code}>
                {allProjects.map((p, i) => (
                  <div key={p.id || i} className="mb-4 last:mb-0 pl-4 border-l-2 border-gray-800 print:border-gray-300 relative">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-brand-500 print:bg-gray-600" />
                    <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                      <h3 className="text-sm font-bold text-white print:text-gray-900">{p.title}</h3>
                      <div className="flex gap-2">
                        {p.github_link && (
                          <a href={p.github_link} target="_blank" rel="noreferrer" className="text-[10px] text-gray-500 hover:text-brand-400 font-mono underline underline-offset-2">Code</a>
                        )}
                        {p.demo_link && (
                          <a href={p.demo_link} target="_blank" rel="noreferrer" className="text-[10px] text-brand-400 hover:text-brand-500 font-mono underline underline-offset-2">Live</a>
                        )}
                      </div>
                    </div>
                    {p.description && <p className="text-xs text-gray-400 print:text-gray-600 leading-relaxed mb-2">{p.description}</p>}
                    <div className="flex flex-wrap">
                      {p.tech_stack?.map(t => <Badge key={t} color="red">{t}</Badge>)}
                    </div>
                  </div>
                ))}
              </Section>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div>
            {/* Skills */}
            {Object.keys(grouped).length > 0 && (
              <Section title="Technical Skills" icon={Icons.Cpu}>
                {Object.entries(grouped).map(([cat, catSkills]) => (
                  <div key={cat} className="mb-4">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-gray-600 print:text-gray-400 font-mono mb-2">
                      // {cat.replace('-', '/')}
                    </p>
                    {catSkills.map((s, i) => (
                      <SkillBar key={i} name={s.name} level={s.level} />
                    ))}
                  </div>
                ))}
              </Section>
            )}

            {/* Specialty tags */}
            {settings.specialty && (
              <Section title="Specializations" icon={Icons.Star}>
                <div className="flex flex-wrap">
                  {settings.specialty.split(',').map(s => (
                    <Badge key={s} color="cyan">{s.trim()}</Badge>
                  ))}
                </div>
              </Section>
            )}

            {/* Certifications */}
            {(certifications || []).length > 0 && (
              <Section title="Certifications" icon={Icons.Award}>
                {certifications.map((cert, i) => (
                  <div key={cert.id || i} className="mb-3 last:mb-0">
                    <p className="text-xs font-bold text-white print:text-gray-900 leading-tight">{cert.name}</p>
                    <p className="text-[11px] text-cyan-400 print:text-gray-600">{cert.issuer}</p>
                    {cert.date_earned && <p className="text-[10px] text-gray-500 mt-0.5">{cert.date_earned}</p>}
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noreferrer" className="text-[10px] text-brand-400 hover:underline">
                        Verify ↗
                      </a>
                    )}
                  </div>
                ))}
              </Section>
            )}

            {/* What I Do */}
            {settings.what_i_do && (
              <Section title="Areas of Focus" icon={Icons.Settings}>
                <ul className="space-y-1.5">
                  {settings.what_i_do.split('\n').filter(Boolean).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-400 print:text-gray-600">
                      <span className="text-brand-400 print:text-gray-500 shrink-0 mt-px">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 print:border-gray-300 px-10 py-4 flex items-center justify-between text-[10px] text-gray-600 print:text-gray-400 font-mono">
          <span>// AUTO-GENERATED FROM LIVE PORTFOLIO DATA</span>
          <span>{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Print styles injected */}
      <style>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .resume-paper { margin: 0 !important; max-width: 100% !important; box-shadow: none !important; }
          @page { margin: 0.6in; size: A4; }
        }
      `}</style>
    </>
  );
}
