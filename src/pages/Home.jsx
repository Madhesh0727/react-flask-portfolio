import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Icons } from '../components/Icons';
import { SEO } from '../components/SEO';
import { Reveal } from '../components/animations/Reveal';
import { TiltCard } from '../components/animations/TiltCard';
import { Magnetic } from '../components/animations/Magnetic';

export function Home({ settings }) {
  if (!settings) return null;

  const fullName = settings.owner_name || 'MADHESH';

  return (
    <>
      <SEO 
        title={`${settings.owner_name} | ${settings.tagline}`} 
        description={settings.bio}
        name={settings.owner_name}
      />
      <section className="min-h-screen flex flex-col justify-center pt-20">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-12">
          {/* Text */}
          <div className="flex-grow max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" style={{ boxShadow: '0 0 10px #00f0ff' }} />
                <span className="font-mono text-xs text-brand-500 tracking-[0.3em] uppercase">SYSTEM ONLINE</span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="font-mono text-brand-400/60 text-sm mb-3 tracking-widest">&gt; greetings, I am</div>
            </Reveal>

            <Reveal delay={0.3}>
              <h1 className="text-5xl sm:text-7xl font-display font-black leading-none mb-6 text-white uppercase"
                style={{ textShadow: '0 0 60px rgba(0,240,255,0.15)' }}>
                {fullName.split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block whitespace-nowrap mr-4 last:mr-0">
                    {word.split('').map((char, charIndex) => {
                      const globalIndex = wordIndex * 10 + charIndex; // unique delay index approximation
                      return (
                        <motion.span
                          key={charIndex}
                          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          transition={{ duration: 0.5, delay: 0.3 + globalIndex * 0.05, type: 'spring', stiffness: 100 }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                ))}
              </h1>
            </Reveal>

            <Reveal delay={0.6}>
              <p className="text-sm sm:text-base text-brand-500 font-mono tracking-widest mb-4 uppercase">{settings.tagline}</p>
            </Reveal>
            <Reveal delay={0.7}>
              <p className="text-text-muted leading-relaxed max-w-xl mb-10 text-base">{settings.bio}</p>
            </Reveal>

            {/* Location */}
            {settings.location && (
              <Reveal delay={0.8}>
                <div className="flex items-center gap-2 text-text-muted/70 text-xs font-mono mb-10">
                  <span className="text-brand-400"><Icons.MapPin /></span> {settings.location}
                </div>
              </Reveal>
            )}

            {/* CTA Buttons */}
            <Reveal delay={0.9}>
              <div className="flex flex-wrap gap-4 mb-8">
                <Magnetic strength={0.4}>
                  <Link to="/projects" className="cyber-button-primary px-8 py-4 text-xs flex items-center gap-2">
                    VIEW PROJECTS <span><Icons.ChevronRight /></span>
                  </Link>
                </Magnetic>
                <Magnetic strength={0.4}>
                  <Link to="/contact" className="cyber-button px-8 py-4 text-xs">
                    HIRE ME
                  </Link>
                </Magnetic>
              </div>
            </Reveal>

            {/* Social Links */}
            <Reveal delay={1.0}>
              <div className="flex items-center gap-3">
                {[
                  { icon: Icons.Github, url: settings.github_url },
                  { icon: Icons.Linkedin, url: settings.linkedin_url },
                  { icon: Icons.Twitter, url: settings.twitter_url },
                  { icon: Icons.Instagram, url: settings.instagram_url },
                  { icon: Icons.WhatsApp, url: settings.whatsapp_url },
                  { icon: Icons.Mail, url: settings.email ? `mailto:${settings.email}` : null }
                ].filter(s => s.url).map((social, i) => (
                  <Magnetic key={i} strength={0.3}>
                    <motion.a 
                      href={social.url} target="_blank" rel="noreferrer"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.1 + i * 0.1, type: 'spring' }}
                      className="w-10 h-10 cyber-panel flex items-center justify-center text-brand-400 hover:text-white hover:bg-brand-400/20 transition-colors text-lg border-brand-400/30"
                    >
                      <social.icon />
                    </motion.a>
                  </Magnetic>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Profile Image */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative w-64 h-64 sm:w-[320px] sm:h-[320px] flex-shrink-0 mt-8 lg:mt-0">
            <TiltCard>
              {/* Rotating border ring */}
              <motion.div className="absolute -inset-6 border border-brand-400/20 rounded-full"
                animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
              <motion.div className="absolute -inset-10 border border-brand-500/10 rounded-full"
                animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }} />

              {/* Corner brackets */}
              {['-top-3 -left-3 border-t-2 border-l-2', '-top-3 -right-3 border-t-2 border-r-2',
                '-bottom-3 -left-3 border-b-2 border-l-2', '-bottom-3 -right-3 border-b-2 border-r-2'].map((cls, i) => (
                <div key={i} className={`absolute w-5 h-5 border-brand-400 ${cls}`} />
              ))}

              {/* Image */}
              <div className="w-full h-full overflow-hidden border-2 border-brand-400/60 relative rounded-inherit"
                style={{ boxShadow: '0 0 40px rgba(0,240,255,0.2), 0 0 80px rgba(0,240,255,0.05)' }}>
                <img src={settings.profile_image.startsWith('http') ? settings.profile_image : `${import.meta.env.VITE_API_URL || ''}${settings.profile_image}`} alt={settings.owner_name}
                  className="w-full h-full object-cover filter hover:grayscale-0 grayscale-[30%] transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Scan line animation on image */}
                <motion.div className="absolute left-0 right-0 h-px bg-brand-400/50"
                  animate={{ top: ['-5%', '105%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }} />
              </div>

              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black border border-brand-400 px-5 py-1.5 text-[9px] font-display font-black uppercase tracking-[0.25em] text-brand-400 whitespace-nowrap"
                style={{ boxShadow: '0 0 20px rgba(0,240,255,0.3)' }}>
                ◈ ACTIVE ◈
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>
    </>
  );
}
