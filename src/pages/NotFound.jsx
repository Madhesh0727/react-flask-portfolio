import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Icons } from '../components/Icons';
import { SEO } from '../components/SEO';

export function NotFound() {
  return (
    <>
      <SEO title="404 - Not Found" description="The page you are looking for does not exist." />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative inline-block"
        >
          <span className="text-[120px] md:text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-brand-500/80 to-transparent opacity-20 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-widest text-brand-400 mix-blend-screen drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
              ERROR 404
            </h1>
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 font-mono text-sm md:text-base mt-6 max-w-md mx-auto leading-relaxed"
        >
          DATA FRAGMENT NOT FOUND. THE NODE YOU ARE LOOKING FOR DOES NOT EXIST OR HAS BEEN RELOCATED.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <Link to="/" className="cyber-button-primary px-8 py-4 text-xs flex items-center gap-3 group">
            RETURN TO ROOT <span className="group-hover:translate-x-1 transition-transform"><Icons.ChevronRight /></span>
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
}
