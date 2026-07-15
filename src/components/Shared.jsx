import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icons } from './Icons';

export function Scanlines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.9) 2px,rgba(0,0,0,0.9) 4px)' }}
    />
  );
}

export function NeonOrbs() {
  return (
    <>
      <div className="pointer-events-none fixed -top-32 right-0 w-[500px] h-[500px] rounded-full opacity-[0.08] blur-3xl z-0"
        style={{ background: 'radial-gradient(circle,#00f0ff,transparent 70%)' }} />
      <div className="pointer-events-none fixed bottom-0 -left-40 w-[600px] h-[400px] rounded-full opacity-[0.07] blur-3xl z-0"
        style={{ background: 'radial-gradient(circle,#ff003c,transparent 70%)' }} />
      <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full opacity-[0.04] blur-3xl z-0"
        style={{ background: 'radial-gradient(ellipse,#fce205,transparent 70%)' }} />
    </>
  );
}

export function SectionHeading({ number, title }) {
  return (
    <div className="mb-14">
      <p className="text-brand-500 font-mono text-xs tracking-[0.3em] mb-2 flex items-center gap-2">
        <span className="w-6 h-px bg-brand-500 inline-block" />
        {number}
      </p>
      <h1 className="text-4xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">{title}</h1>
      <div className="mt-4 h-px bg-gradient-to-r from-brand-400/60 via-brand-500/30 to-transparent" />
    </div>
  );
}

export function EmptyState({ icon: Icon, message }) {
  return (
    <div className="cyber-panel p-14 text-center border-brand-400/15 col-span-full w-full">
      <span className="text-4xl text-brand-400/30 block mb-4 flex justify-center"><Icon /></span>
      <p className="font-display text-text-muted uppercase tracking-widest text-xs">{message}</p>
    </div>
  );
}

export function LoadingScreen() {
  const lines = ['INITIALIZING NEURAL LINK...', 'DECRYPTING DATA STREAMS...', 'ESTABLISHING SECURE CHANNEL...', 'SYSTEM ONLINE.'];
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(prev => [...prev, line]), i * 400);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <Scanlines />
      <div className="fixed inset-0 pointer-events-none opacity-[0.15]"
        style={{ backgroundImage: 'linear-gradient(rgba(0,240,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.1) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="cyber-panel p-8 border-brand-400/40">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-brand-400 text-2xl"><Icons.Terminal /></span>
            <span className="font-display text-brand-400 text-sm uppercase tracking-widest">MADHESH.SYS v3.0</span>
          </div>
          <div className="font-mono text-sm space-y-2 min-h-[100px]">
            {visibleLines.map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className={i === visibleLines.length - 1 ? 'text-brand-400' : 'text-text-muted/70'}>
                <span className="text-brand-500 mr-2">&gt;</span>{line}
                {i === visibleLines.length - 1 && <span className="animate-pulse ml-1">_</span>}
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <div className="w-full h-1 bg-black border border-brand-400/30 overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-brand-400 to-brand-500"
                initial={{ width: '0%' }} animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Footer({ settings }) {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-sm py-8 px-5 sm:px-10 mt-auto">
      <div className="max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-text-muted/60 text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} {settings.owner_name} — ALL RIGHTS RESERVED
        </p>
        <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted/40">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse inline-block" style={{ boxShadow: '0 0 6px #00f0ff' }} />
          UPTIME: NOMINAL
        </div>
      </div>
    </footer>
  );
}
