import { motion } from 'framer-motion';

export function Reveal({ children, delay = 0, className = '', type = 'up' }) {
  const variants = {
    up: {
      hidden: { opacity: 0, y: 75 },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -75 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: 75 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: -75 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    }
  };

  return (
    <div className={`relative ${type === 'scale' ? '' : ''} ${className}`}>
      <motion.div
        variants={variants[type]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.6, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
