import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from './Icons';
import { Magnetic } from './animations/Magnetic';

export function Navbar({ siteName, profileImage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    if (location.pathname !== '/') return;
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'blog', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { href: '#home', label: 'HOME', id: 'home' },
    { href: '#about', label: 'ABOUT', id: 'about' },
    { href: '#projects', label: 'PROJECTS', id: 'projects' },
    { href: '#skills', label: 'SKILLS', id: 'skills' },
    { href: '#experience', label: 'EXPERIENCE', id: 'experience' },
    { href: '#blog', label: 'BLOG', id: 'blog' },
    { href: '#contact', label: 'CONTACT', id: 'contact' },
  ];

  const handleLinkClick = (e, id) => {
    if (location.pathname !== '/') {
      return; // Let standard link navigation happen to go to /#id
    }
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

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
            <img src={profileImage.startsWith('http') ? profileImage : `${import.meta.env.VITE_API_URL || ''}${profileImage}`} alt="Logo" className="w-8 h-8 rounded-full border border-brand-400 object-cover" />
          )}
          <span>{siteName || 'MADHESH.EXE'}</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ href, label, id }) => (
            <Magnetic key={href} strength={0.3}>
              <a href={`/${href}`} onClick={(e) => handleLinkClick(e, id)}
                className={`relative text-[10px] font-display font-bold uppercase tracking-[0.2em] transition-colors group ${
                  location.pathname === '/' && activeSection === id ? 'text-brand-400' : 'text-text-muted hover:text-white'
                }`}>
                {label}
                {location.pathname === '/' && activeSection === id && (
                  <motion.div layoutId="navbar-indicator" className="absolute -bottom-2 left-0 right-0 h-px bg-brand-400" />
                )}
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-brand-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
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
              {navLinks.map(({ href, label, id }) => (
                <a key={href} href={`/${href}`} onClick={(e) => handleLinkClick(e, id)}
                  className={`text-xs font-display font-bold uppercase tracking-widest transition-colors py-2 border-b border-brand-400/10 ${
                    location.pathname === '/' && activeSection === id ? 'text-brand-400' : 'text-text-muted hover:text-brand-400'
                  }`}>
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
