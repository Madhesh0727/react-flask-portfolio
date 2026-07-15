import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from './Icons';
import { Magnetic } from './animations/Magnetic';

export function Navbar({ siteName, profileImage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/projects', label: 'PROJECTS' },
    { href: '/skills', label: 'SKILLS' },
    { href: '/experience', label: 'EXPERIENCE' },
    { href: '/blog', label: 'BLOG' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-brand-400/15 py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-5 sm:px-10 flex justify-between items-center h-[60px]">
        <Link to="/" className="font-display font-black text-lg tracking-widest text-brand-400 hover:text-white transition-colors flex items-center gap-3">
          {profileImage && (
            <img src={profileImage} alt="Logo" className="w-8 h-8 rounded-full border border-brand-400 object-cover" />
          )}
          <span>{siteName || 'MADHESH.EXE'}</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Magnetic key={href} strength={0.3}>
              <Link to={href}
                className={`relative text-[10px] font-display font-bold uppercase tracking-[0.2em] transition-colors group ${
                  location.pathname === href ? 'text-brand-400' : 'text-text-muted hover:text-white'
                }`}>
                {label}
                {location.pathname === href && (
                  <motion.div layoutId="navbar-indicator" className="absolute -bottom-2 left-0 right-0 h-px bg-brand-400" />
                )}
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-brand-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
            </Magnetic>
          ))}
          <Magnetic strength={0.2}>
            <Link to="/resume" className="cyber-button px-5 py-2 text-[10px] flex items-center gap-2 group">
              RESUME <span className="group-hover:-translate-y-0.5 transition-transform"><Icons.Download /></span>
            </Link>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link to="/resume" className="cyber-button px-3 py-1.5 text-[9px] flex items-center gap-1.5">
             <Icons.Download />
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="cyber-button px-4 py-1.5 text-[10px]">
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-black/95 border-t border-brand-400/15">
            <div className="px-5 py-4 flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <Link key={href} to={href} onClick={() => setMenuOpen(false)}
                  className={`text-xs font-display font-bold uppercase tracking-widest transition-colors py-2 border-b border-brand-400/10 ${
                    location.pathname === href ? 'text-brand-400' : 'text-text-muted hover:text-brand-400'
                  }`}>
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
