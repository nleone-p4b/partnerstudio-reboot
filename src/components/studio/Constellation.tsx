import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Plus, Sparkle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sectors } from './network';
import { openChat } from './Primitives';

type Props = { selected: number | null; onSelect: (index: number | null) => void };

type Line = { x1: number; y1: number; x2: number; y2: number };
const SUN_RADIUS = 48;
// Le linee finiscono dentro la sfera: il galleggiamento la muove di 7px,
// quindi l'estremita' resta coperta e il collegamento non si stacca mai.
const SPHERE_BITE = 10;

export function Constellation({ selected, onSelect }: Props) {
  const reduced = useReducedMotion();
  const open = selected !== null;
  const field = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [lines, setLines] = useState<Line[]>([]);

  const measure = useCallback(() => {
    const el = field.current;
    if (!el) return;
    const width = el.clientWidth, height = el.clientHeight;
    if (!width || !height) return;
    const sunX = width / 2, sunY = height * 0.52;
    const next = Array.from(el.querySelectorAll<HTMLElement>('.sphere-orbit')).map(orbit => {
      const cx = orbit.offsetLeft + orbit.offsetWidth / 2;
      const cy = orbit.offsetTop + orbit.offsetHeight / 2;
      const radius = orbit.offsetWidth / 2;
      const dx = cx - sunX, dy = cy - sunY;
      const length = Math.hypot(dx, dy) || 1;
      const ux = dx / length, uy = dy / length;
      return {
        x1: sunX + ux * SUN_RADIUS, y1: sunY + uy * SUN_RADIUS,
        x2: cx - ux * (radius - SPHERE_BITE), y2: cy - uy * (radius - SPHERE_BITE),
      };
    });
    setSize({ width, height });
    setLines(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    const el = field.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') onSelect(null); };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [open, onSelect]);

  return <div id="partnerships" className={`constellation ${open ? 'constellation-open' : ''}`}>
    <h1 className="sr-only">NL Partner Studio — Strategic Advisory &amp; Growth Partnership</h1>
    <div className="constellation-field" ref={field}>
      {size.width > 0 && <svg className="constellation-lines" viewBox={`0 0 ${size.width} ${size.height}`} aria-hidden="true">
        {lines.map((line, i) => <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}/>)}
      </svg>}
      {sectors.map((sector, i) => <div className={`sphere-orbit sphere-orbit-${i}`} key={sector.name}>
        <div className="sphere-float">
          {selected !== i && <motion.button
            type="button"
            layoutId={`sphere-${i}`}
            className="sphere"
            aria-label={`Esplora ${sector.name}`}
            aria-expanded={false}
            onClick={() => onSelect(i)}
            transition={{ type: 'spring', stiffness: 140, damping: 20 }}
          >
            <span className="sphere-gloss" aria-hidden="true"/>
            <span className="sphere-index">0{i + 1}</span>
            <span className="sphere-name">{sector.name}</span>
            <span className="sphere-hint">{sector.hint}</span>
            <Plus className="sphere-plus" aria-hidden="true"/>
          </motion.button>}
        </div>
      </div>)}
    </div>

    <div className="constellation-sun" aria-hidden="true"><Sparkle/><span>Nella nostra<br/>orbita</span></div>

    <AnimatePresence>{open && <>
      <motion.div className="sector-scrim" key="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onSelect(null)}/>
      <motion.div
        key={`card-${selected}`}
        layoutId={`sphere-${selected}`}
        className="sector-card"
        role="dialog"
        aria-modal="false"
        aria-label={sectors[selected].name}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
      >
        <span className="sphere-gloss" aria-hidden="true"/>
        <motion.div className="sector-card-body" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: reduced ? 0 : 0.12 }}>
          <Button variant="ghost" size="icon" className="sector-close" aria-label="Chiudi" onClick={() => onSelect(null)}><X/></Button>
          <span className="sector-index">0{selected + 1}</span>
          <h2>{sectors[selected].name}</h2>
          <p>{sectors[selected].hint}</p>
          <ul>{sectors[selected].services.map((service, i) => <li key={service}><span>{String(i + 1).padStart(2, '0')}</span>{service}</li>)}</ul>
          <Button className="studio-button" onClick={openChat}>Parliamone <ArrowUpRight/></Button>
        </motion.div>
      </motion.div>
    </>}</AnimatePresence>
  </div>;
}
