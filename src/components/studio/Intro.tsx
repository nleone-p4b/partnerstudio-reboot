import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Logo } from './Primitives';
export function useIntro() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches && sessionStorage.getItem('studio-intro') !== 'seen');
  useEffect(() => {
    if (!active) return;
    sessionStorage.setItem('studio-intro', 'seen');
    const timer = window.setTimeout(() => setActive(false), reduced ? 0 : 2100);
    return () => window.clearTimeout(timer);
  }, [active, reduced]);
  return active;
}
export function Intro({ active }: { active: boolean }) {
  return <AnimatePresence>{active && <motion.div className="intro-veil" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }}><Logo animated shared/></motion.div>}</AnimatePresence>;
}
