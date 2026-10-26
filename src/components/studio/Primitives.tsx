import { useRef, type ReactNode, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function LiquidGlass({ children, className, tilt = false, ...props }: React.HTMLAttributes<HTMLDivElement> & { tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  return <div {...props} ref={ref} className={cn('liquid-glass', tilt && 'glass-tilt', className)} onPointerMove={e => {
    if (!ref.current || reduced || e.pointerType === 'touch') return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width, y = (e.clientY - rect.top) / rect.height;
    ref.current.style.setProperty('--mx', `${x * 100}%`); ref.current.style.setProperty('--my', `${y * 100}%`);
    if (tilt) { ref.current.style.setProperty('--rx', `${(0.5-y)*6}deg`); ref.current.style.setProperty('--ry', `${(x-0.5)*6}deg`); }
  }} onPointerLeave={() => { ref.current?.style.setProperty('--rx', '0deg'); ref.current?.style.setProperty('--ry', '0deg'); }}>{children}</div>;
}
export function GlassFilter() {
  return <svg className="glass-filter" aria-hidden="true"><defs><filter id="liquid" x="0%" y="0%" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="1" seed="8" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>;
}
export function Logo({ light = false, animated = false, shared = false }: { light?: boolean; animated?: boolean; shared?: boolean }) {
  return <motion.div layoutId={shared ? 'studio-brand' : undefined} className={cn('studio-logo', light && 'logo-light')} transition={{ type: 'spring', stiffness: 100, damping: 22 }}>
    <svg viewBox="0 0 112 100" fill="none" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <motion.path d="M14 86V14L62 86V14" className="logo-ink" initial={animated ? { pathLength: 0 } : false} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: 'easeInOut' }}/>
      <motion.path d="M62 86H98" className="logo-base" initial={animated ? { pathLength: 0 } : false} animate={{ pathLength: 1 }} transition={{ delay: animated ? 0.8 : 0, duration: 0.5 }}/>
    </svg><div className="wordmark">{['PARTNER', 'STUDIO'].map((line, row) => <div key={line}>{line.split('').map((char, i) => <motion.span key={i} initial={animated ? { opacity: 0, y: 7 } : false} animate={{ opacity: 1, y: 0 }} transition={{ delay: animated ? 0.6 + row * 0.15 + i * 0.065 : 0 }}>{char}</motion.span>)}</div>)}</div>
  </motion.div>;
}
export function Eyebrow({ children }: { children: ReactNode }) { return <span className="eyebrow">{children}</span>; }
export function SplitTitle({ first, second, hero = false, id }: { first: string; second: string; hero?: boolean; id?: string }) {
  const reduced = useReducedMotion(); const Tag = hero ? motion.h1 : motion.h2;
  return <Tag id={id} className={cn('split-title', hero && 'hero-title')} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} transition={{ staggerChildren: reduced ? 0 : 0.045 }}>{[first, second].map((part, p) => <span key={p} className={p ? 'title-gold' : undefined}>{part.split(' ').map((word, i) => <span className="word-mask" key={i}><motion.span variants={{ hidden: { opacity: 0, y: reduced ? 0 : '105%' }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span></span>)}{' '}</span>)}</Tag>;
}
export function Reveal({ children, index = 0, className }: { children: ReactNode; index?: number; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 0, x: reduced ? 0 : index % 2 ? 120 : -120, rotate: reduced ? 0 : index % 2 ? 4 : -4 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.08 }}>{children}</motion.div>;
}
export function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null); const reduced = useReducedMotion();
  return <div className="ambient-background" ref={ref} aria-hidden="true" onPointerMove={undefined}><div className="ambient-blob blob-one"/><div className="ambient-blob blob-two"/><div className="ambient-blob blob-three"/></div>;
}
export function openChat() { window.dispatchEvent(new Event('studio:open-chat')); }
