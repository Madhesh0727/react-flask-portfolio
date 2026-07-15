import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icons } from '../components/Icons';
import { SectionHeading } from '../components/Shared';
import { SEO } from '../components/SEO';
import { Reveal } from '../components/animations/Reveal';
import { Magnetic } from '../components/animations/Magnetic';

export function Contact({ settings }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);

  if (!settings) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      <SEO 
        title={`Contact | ${settings.owner_name}`} 
        description={`Get in touch with ${settings.owner_name}.`}
        name={settings.owner_name}
      />
      <section className="pt-20 lg:pt-32 pb-10">
        <Reveal>
          <SectionHeading number="07 / CONNECT" title="Get In Touch" />
        </Reveal>
        
        <div className="grid lg:grid-cols-5 gap-12 mt-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <Reveal delay={0.1}>
              <p className="text-text-muted leading-relaxed text-base">
                Ready to collaborate? Open to new opportunities in AI/ML, cybersecurity, and full-stack development.
                Let's build something great together.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: Icons.Mail, label: 'Email', value: settings.email, href: settings.email ? `mailto:${settings.email}` : null },
                { icon: Icons.Github, label: 'GitHub', value: settings.github_url, href: settings.github_url },
                { icon: Icons.Linkedin, label: 'LinkedIn', value: settings.linkedin_url, href: settings.linkedin_url },
                { icon: Icons.Twitter, label: 'Twitter', value: settings.twitter_url, href: settings.twitter_url },
                { icon: Icons.Instagram, label: 'Instagram', value: settings.instagram_url, href: settings.instagram_url },
                { icon: Icons.WhatsApp, label: 'WhatsApp', value: settings.whatsapp_url, href: settings.whatsapp_url }
              ].filter(item => item.value).map((item, i) => (
                <Reveal key={item.label} delay={0.2 + i * 0.1} type="bottom">
                  <a href={item.href} target={item.label === 'Email' ? "_self" : "_blank"} rel="noreferrer"
                    className="flex items-center gap-3 cyber-panel p-4 border-brand-400/15 hover:border-brand-400/50 hover:bg-brand-400/5 transition-all group hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] justify-center">
                    <div className="text-brand-400 group-hover:scale-110 transition-transform duration-300 text-lg">
                      <item.icon />
                    </div>
                    <span className="text-[10px] font-mono text-white group-hover:text-brand-400 transition-colors uppercase tracking-widest">{item.label}</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Form */}
          <Reveal delay={0.4} className="lg:col-span-3">
            <div className="cyber-panel p-8 sm:p-10 border-brand-500/30 border-t-2 bg-black/40 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-brand-500/20 transition-colors duration-700" />
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { label: 'YOUR NAME', key: 'name', type: 'text' },
                    { label: 'YOUR EMAIL', key: 'email', type: 'email' },
                    { label: 'YOUR PHONE', key: 'phone', type: 'tel' },
                  ].map(({ label, key, type }) => (
                    <div key={key} className={`relative ${key === 'phone' ? 'sm:col-span-2' : ''}`}>
                      <label className="block text-brand-400 font-mono text-[9px] uppercase tracking-[0.25em] mb-2">{label}</label>
                      <input type={type} required={key !== 'phone'} value={formData[key]}
                        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                        className="w-full bg-white/[0.03] border border-brand-400/30 p-4 text-white text-sm focus:outline-none focus:border-brand-400 focus:bg-white/[0.06] transition-all font-mono placeholder-text-muted/30"
                        placeholder={`Enter ${label.toLowerCase()}`} />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-brand-400 font-mono text-[9px] uppercase tracking-[0.25em] mb-2">SUBJECT</label>
                  <input type="text" value={formData.subject || ''}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white/[0.03] border border-brand-400/30 p-4 text-white text-sm focus:outline-none focus:border-brand-400 focus:bg-white/[0.06] transition-all font-mono placeholder-text-muted/30"
                    placeholder="What's this about?" />
                </div>
                <div>
                  <label className="block text-brand-400 font-mono text-[9px] uppercase tracking-[0.25em] mb-2">YOUR MESSAGE</label>
                  <textarea required rows="5" value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.03] border border-brand-400/30 p-4 text-white text-sm focus:outline-none focus:border-brand-400 focus:bg-white/[0.06] transition-all resize-none font-mono placeholder-text-muted/30"
                    placeholder="Describe your project or opportunity..." />
                </div>
                
                <Magnetic strength={0.1} className="w-full mt-2">
                  <button type="submit" disabled={formStatus === 'sending'}
                    className="cyber-button py-4 text-xs w-full disabled:opacity-40 flex items-center justify-center gap-2 group/btn">
                    {formStatus === 'sending' ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                          <Icons.Settings />
                        </motion.div>
                        [ TRANSMITTING... ]
                      </>
                    ) : (
                      <>
                        [ SEND MESSAGE ] <span className="group-hover/btn:translate-x-1 transition-transform"><Icons.ChevronRight /></span>
                      </>
                    )}
                  </button>
                </Magnetic>

                {formStatus === 'success' && (
                  <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className="text-brand-400 font-mono text-xs text-center flex items-center justify-center gap-2 mt-2">
                    <Icons.Wifi /> MESSAGE DELIVERED SUCCESSFULLY
                  </motion.p>
                )}
                {formStatus === 'error' && (
                  <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className="text-brand-500 font-mono text-xs text-center flex items-center justify-center gap-2 mt-2">
                    <Icons.AlertTriangle /> TRANSMISSION FAILED — PLEASE RETRY
                  </motion.p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
