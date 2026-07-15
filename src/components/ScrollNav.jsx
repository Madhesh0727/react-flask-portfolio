import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const pages = [
  { href: '/', label: 'HOME',       num: '01' },
  { href: '/about', label: 'ABOUT', num: '02' },
  { href: '/projects', label: 'PROJECTS', num: '03' },
  { href: '/skills', label: 'SKILLS', num: '04' },
  { href: '/experience', label: 'EXPERIENCE', num: '05' },
  { href: '/blog', label: 'BLOG', num: '06' },
  { href: '/contact', label: 'CONTACT', num: '07' },
];

export function ScrollNav() {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const activeIndex = pages.findIndex(p => p.href === location.pathname);

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-4">
      {pages.map((page, i) => {
        const isActive = location.pathname === page.href;
        const isHovered = hovered === i;

        return (
          <Link
            key={page.href}
            to={page.href}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="group flex items-center gap-3"
            aria-label={`Navigate to ${page.label}`}
          >
            {/* Label */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="font-mono text-[10px] tracking-[0.2em] whitespace-nowrap"
                  style={{ color: isActive ? '#00f0ff' : '#94a3b8' }}
                >
                  {page.num} / {page.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <div className="relative flex items-center justify-center w-5 h-5">
              {/* Pulse ring for active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-brand-400/40"
                  animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                />
              )}

              <motion.div
                animate={{
                  scale: isActive ? 1 : isHovered ? 0.85 : 0.5,
                  backgroundColor: isActive ? '#00f0ff' : isHovered ? 'rgba(0,240,255,0.5)' : 'rgba(148,163,184,0.3)',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  boxShadow: isActive ? '0 0 10px #00f0ff, 0 0 20px rgba(0,240,255,0.4)' : 'none',
                }}
              />
            </div>
          </Link>
        );
      })}

      {/* Vertical connecting line */}
      <div className="absolute right-[9px] top-3 bottom-3 w-px bg-white/5 -z-10" />
      {/* Active fill line */}
      <motion.div
        className="absolute right-[9px] top-3 w-px bg-brand-400/30 -z-10"
        animate={{ height: `${((activeIndex) / (pages.length - 1)) * 100}%` }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
