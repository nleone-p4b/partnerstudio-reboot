import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Plus, Sparkle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sectors } from './network';
import { openChat } from './Primitives';

type Props = { selected: number | null; onSelect: (index: number | null) => void };
type Line = { x1: number; y1: number; x2: number; y2: number };
type Spot = { left: number; top: number };

const SUN_RADIUS = 48;
// Le linee finiscono dentro la sfera: il galleggiamento la muove di 7px,
// quindi l'estremita' resta coperta e il collegamento non si stacca mai.
const SPHERE_BITE = 10;
const SUN_Y = 0.52;

// Le sfere stanno su un anello attorno alla stella, calcolato: cosi' aggiungere
// un settore non richiede di riscrivere posizioni fisse nel CSS.
function ringSpots(count: number): Spot[] {
  if (count <= 3) {
    return [{ left: 20, top: 25 }, { left: 80, top: 25 }, { left: 50, top: 79 }].slice(0, count);
  }
  const rx = count > 4 ? 38 : 34, ry = count > 4 ? 30 : 27;
  return Array.from({ length: count }, (_, i) => {
    const angle = -Math.PI / 2 + (i / count) * Math.PI * 2;
    return { left: 50 + Math.cos(angle) * rx, top: SUN_Y * 100 + Math.sin(angle) * ry };
  });
}

export function Constellation({ selected, onSelect }: Props) {
  const open = selected !== null;
  const field = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [lines, setLines] = useState<Line[]>([]);
  const spots = ringSpots(sectors.length);

  const measure = useCallback(() => {
    const el = field.current;
    if (!el) return;
    const width = el.clientWidth, height = el.clientHeight;
    if (!width || !height) return;
    const sunX = width / 2, sunY = height * SUN_Y;
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

  return <div id="partnerships" className={`constellation ${open ? 'constellation-open' : ''}`}>
    <h1 className="sr-only">NL Partner Studio — Strategic Advisory &amp; Growth Partnership</h1>
    <div className="constellation-field" ref={field}>
      {size.width > 0 && <svg className="constellation-lines" viewBox={`0 0 ${size.width} ${size.height}`} aria-hidden="true">
        {lines.map((line, i) => <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}/>)}
      </svg>}
      {sectors.map((sector, i) => <div
        className="sphere-orbit"
        key={sector.name}
        style={{ left: `${spots[i].left}%`, top: `${spots[i].top}%`, animationDelay: `${-i * 1.4}s` }}
      >
        <div className="sphere-float" style={{ animationDelay: `0s, ${-i * 1.3}s` }}>
          {selected !== i && <motion.button
            type="button"
            layoutId={`sphere-${i}`}
            className="sphere"
            aria-label={`Esplora ${sector.name}`}
            aria-expanded={false}
            onClick={() => onSelect(i)}
            transition={{ type: 'spring', stiffness: 150, damping: 22 }}
          >
            <span className="sphere-gloss" aria-hidden="true"/>
            <span className="sphere-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="sphere-name">{sector.name}</span>
            <span className="sphere-hint">{sector.hint}</span>
            <Plus className="sphere-plus" aria-hidden="true"/>
          </motion.button>}
        </div>
      </div>)}
    </div>

    <div className="constellation-sun" aria-hidden="true"><Sparkle/><span>Nella nostra<br/>orbita</span></div>

    <AnimatePresence>{open && <SectorPanel key={selected} index={selected} onClose={() => onSelect(null)}/>}</AnimatePresence>
  </div>;
}

function useCompact() {
  const [compact, setCompact] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width:767px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(max-width:767px)');
    const update = () => setCompact(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return compact;
}

function SectorPanel({ index, onClose }: { index: number; onClose: () => void }) {
  const sector = sectors[index];
  const compact = useCompact();
  const partners = [...sector.partners].sort((a, b) => a.name.localeCompare(b.name, 'it'));

  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [onClose]);

  // Su telefono il pannello esce dalla costellazione e diventa un foglio a tutto
  // schermo: dentro i 364px della costellazione la lista sarebbe illeggibile.
  // Niente layoutId li': l'animazione condivisa partirebbe da una sfera fuori campo.
  return <>
    <motion.div className={`panel-scrim ${compact ? 'panel-scrim-sheet' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}/>
    <div className={`panel-stage ${compact ? 'panel-stage-sheet' : ''}`}>
      <motion.div
        layoutId={compact ? undefined : `sphere-${index}`}
        className="sector-panel"
        role="dialog"
        aria-modal="false"
        aria-label={sector.name}
        initial={compact ? { opacity: 0, y: 24 } : false}
        animate={compact ? { opacity: 1, y: 0 } : undefined}
        exit={compact ? { opacity: 0, y: 16 } : undefined}
        transition={{ type: 'spring', stiffness: 150, damping: 22 }}
      >
        <motion.div className="sector-panel-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: compact ? 0 : 0.1 }}>
        <Button variant="ghost" size="icon" className="panel-close" aria-label="Chiudi" onClick={onClose}><X/></Button>
        <span className="sphere-index">{String(index + 1).padStart(2, '0')}</span>
        <h2>{sector.name}</h2>
        <p className="panel-keywords">{sector.keywords.join(' · ')}</p>
        <ul className="panel-partners">{partners.map(partner => <li key={partner.name}>
          {partner.url
            ? <a href={partner.url} target="_blank" rel="noopener noreferrer">{partner.name}<ArrowUpRight aria-hidden="true"/></a>
            : <span>{partner.name}</span>}
        </li>)}</ul>
          <Button className="studio-button panel-cta" onClick={openChat}>Parliamone <ArrowUpRight/></Button>
        </motion.div>
      </motion.div>
    </div>
  </>;
}
