import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

import { Navbar } from './components/Navbar';
import { Footer, LoadingScreen, Scanlines, NeonOrbs } from './components/Shared';
import { Icons } from './components/Icons';
import { SmoothScroll } from './components/animations/SmoothScroll';
import { CustomCursor } from './components/animations/CustomCursor';
import { ScrollNav } from './components/ScrollNav';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Experience } from './pages/Experience';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Resume } from './pages/Resume';
import { NotFound } from './pages/NotFound';

function PageTransition({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => { if (!r.ok) throw new Error('API_ERROR_' + r.status); return r.json(); })
      .then(json => { setData(json); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <LoadingScreen />;

  if (error) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="cyber-panel p-12 border-brand-500/40 max-w-md w-full text-center">
        <span className="text-brand-500 text-5xl block mb-6 flex justify-center"><Icons.AlertTriangle /></span>
        <p className="font-display text-brand-500 uppercase tracking-widest text-lg mb-3">CONNECTION REFUSED</p>
        <p className="text-text-muted font-mono text-xs mb-2">{error}</p>
        <p className="text-text-muted/50 font-mono text-[10px]">Ensure Flask backend is running on port 5000</p>
      </div>
    </div>
  );

  const { settings, projects, skills, education, experience, certifications, blog } = data;

  return (
    <HelmetProvider>
      <SmoothScroll>
        <Router>
          <div className="relative min-h-screen bg-[#050505] overflow-x-hidden text-text-main font-sans flex flex-col cursor-none">
            <CustomCursor />
            <Scanlines />
          <NeonOrbs />

          {/* Grid bg */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.12] z-0"
            style={{ backgroundImage: 'linear-gradient(rgba(0,240,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.15) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

          {/* Scroll progress */}
          <motion.div className="fixed top-0 left-0 h-[2px] z-[100]"
            style={{ width: progressWidth, background: 'linear-gradient(90deg,#00f0ff,#ff003c)', boxShadow: '0 0 8px #00f0ff' }} />

          <Navbar siteName={settings.site_name} profileImage={settings.profile_image} />
          <ScrollNav />

          <main className="relative z-10 max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-5 sm:px-10 flex-grow w-full pt-6">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home settings={settings} />} />
                <Route path="/about" element={<About settings={settings} />} />
                <Route path="/projects" element={<Projects projects={projects} settings={settings} />} />
                <Route path="/skills" element={<Skills skills={skills} settings={settings} />} />
                <Route path="/experience" element={<Experience experience={experience} education={education} certifications={certifications} settings={settings} />} />
                <Route path="/blog" element={<Blog blog={blog} settings={settings} />} />
                <Route path="/contact" element={<Contact settings={settings} />} />
                <Route path="/resume" element={<Resume settings={settings} skills={skills} experience={experience} education={education} certifications={certifications} projects={projects} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </main>

            <Footer settings={settings} />
          </div>
        </Router>
      </SmoothScroll>
    </HelmetProvider>
  );
}
