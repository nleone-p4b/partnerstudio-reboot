import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus, Sparkle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sectors } from './network';
import { openChat } from './Primitives';

type Props = { selected: number | null; onSelect: (index: number | null) => void };
type Line = { x1: number; y1: number; x2: number; y2: number };

const SUN_RADIUS = 48;
// Le linee finiscono dentro la sfera: il galleggiamento la muove di 7px,
// quindi l'estremita' resta coperta e il collegamento non si stacca mai.
const SPHERE_BITE = 10;
// Raggiera: due anelli ellittici concentrici, il secondo sfalsato di mezzo passo.
const RINGS_TWO = [0.27, 0.41], RINGS_THREE = [0.21, 0.33, 0.45];
const REPEL_RADIUS = 150, REPEL_FORCE = 64;

export function Constellation({ selected, onSelect }: Props) {
  const reduced = useReducedMotion();
  const open = selected !== null;
  const field = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
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

  return <div id="partnerships" className={`constellation ${open ? 'constellation-open' : ''}`} ref={stage}>
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

    <AnimatePresence>{open && <SectorBurst key={selected} index={selected} reduced={!!reduced} onClose={() => onSelect(null)}/>}</AnimatePresence>
  </div>;
}

type BurstProps = { index: number; reduced: boolean; onClose: () => void };

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

function SectorBurst({ index, reduced, onClose }: BurstProps) {
  const sector = sectors[index];
  const compact = useCompact();
  const arena = useRef<HTMLDivElement>(null);
  const chips = useRef<(HTMLAnchorElement | null)[]>([]);
  const bases = useRef<{ x: number; y: number }[]>([]);
  const poses = useRef<{ x: number; y: number }[]>([]);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const drag = useRef<{ index: number | null; dx: number; dy: number; moved: boolean }>({ index: null, dx: 0, dy: 0, moved: false });

  const layout = useCallback(() => {
    const el = arena.current;
    if (!el) return;
    const width = el.clientWidth, height = el.clientHeight;
    const core = el.querySelector<HTMLElement>('.burst-core');
    const coreRadius = core ? core.offsetWidth / 2 : 100;
    const total = sector.partners.length;
    // Con molti partner due anelli si affollano: il terzo da' respiro.
    const radii = total >= 10 ? RINGS_THREE : RINGS_TWO;
    const perRing = Math.ceil(total / radii.length);
    bases.current = sector.partners.map((_, i) => {
      const chip = chips.current[i];
      const halfWidth = (chip?.offsetWidth ?? 130) / 2, halfHeight = (chip?.offsetHeight ?? 36) / 2;
      const ringIndex = Math.min(radii.length - 1, Math.floor(i / perRing));
      const slot = i - ringIndex * perRing;
      const count = Math.min(perRing, total - ringIndex * perRing);
      // Mezzo passo di sfalsamento a anelli alterni, cosi' i nomi non si incolonnano.
      const angle = -Math.PI / 2 + (slot + (ringIndex % 2 ? 0.5 : 0)) / count * Math.PI * 2;
      const ring = radii[ringIndex];
      // Il raggio sta fuori dal nucleo e dentro l'arena: senza questi due vincoli
      // i nomi finiscono sopra la sfera centrale o fuori dallo schermo.
      const clear = coreRadius + Math.hypot(halfWidth, halfHeight) + 10;
      const rx = Math.min(Math.max(width * ring, clear), Math.max(width / 2 - halfWidth - 6, clear));
      const ry = Math.min(Math.max(height * ring, clear), Math.max(height / 2 - halfHeight - 6, clear));
      return { x: Math.cos(angle) * rx, y: Math.sin(angle) * ry };
    });
    if (poses.current.length !== total) poses.current = sector.partners.map(() => ({ x: 0, y: 0 }));
  }, [sector]);

  useLayoutEffect(() => {
    layout();
    const el = arena.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(layout);
    observer.observe(el);
    return () => observer.disconnect();
  }, [layout]);

  useEffect(() => {
    if (compact) return;
    let frame = 0;
    const start = performance.now();
    const tick = (time: number) => {
      const el = arena.current;
      if (!el) { frame = requestAnimationFrame(tick); return; }
      const elapsed = time - start, seconds = time / 1000;
      const width = el.clientWidth, height = el.clientHeight;
      const core = el.querySelector<HTMLElement>('.burst-core');
      const coreRadius = core ? core.offsetWidth / 2 : 100;
      const boxes: { halfWidth: number; halfHeight: number }[] = [];

      sector.partners.forEach((_, i) => {
        const chip = chips.current[i], base = bases.current[i], pose = poses.current[i];
        if (!chip || !base || !pose) { boxes[i] = { halfWidth: 0, halfHeight: 0 }; return; }
        boxes[i] = { halfWidth: chip.offsetWidth / 2, halfHeight: chip.offsetHeight / 2 };
        let tx = base.x, ty = base.y;
        if (!reduced) {
          tx += Math.sin(seconds * 0.5 + i * 1.7) * 5;
          ty += Math.cos(seconds * 0.43 + i * 1.1) * 5;
        }
        if (drag.current.index === i) {
          tx = pointer.current.x + drag.current.dx;
          ty = pointer.current.y + drag.current.dy;
        } else if (pointer.current.active && !reduced) {
          const dx = tx - pointer.current.x, dy = ty - pointer.current.y;
          const distance = Math.hypot(dx, dy);
          if (distance < REPEL_RADIUS && distance > 0.5) {
            const push = (1 - distance / REPEL_RADIUS) * REPEL_FORCE;
            tx += dx / distance * push;
            ty += dy / distance * push;
          }
        }
        const ease = drag.current.index === i ? 0.42 : 0.12;
        pose.x += (tx - pose.x) * (reduced ? 1 : ease);
        pose.y += (ty - pose.y) * (reduced ? 1 : ease);
      });

      // Le posizioni calcolate non bastano: la larghezza dei nomi cambia col font
      // e col testo, quindi i vincoli si risolvono sulle misure reali a ogni frame.
      // Arena e nucleo vanno risolti DOPO la separazione: allontanare due nomi
      // puo' rispingerne uno sopra la sfera centrale.
      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < sector.partners.length; i++) {
          for (let j = i + 1; j < sector.partners.length; j++) {
            const a = poses.current[i], b = poses.current[j], ba = boxes[i], bb = boxes[j];
            if (!a || !b || !ba?.halfWidth || !bb?.halfWidth) continue;
            const overlapX = ba.halfWidth + bb.halfWidth + 8 - Math.abs(a.x - b.x);
            const overlapY = ba.halfHeight + bb.halfHeight + 6 - Math.abs(a.y - b.y);
            if (overlapX <= 0 || overlapY <= 0) continue;
            if (overlapX < overlapY) {
              const shift = (a.x < b.x ? -1 : 1) * overlapX / 2;
              a.x += shift; b.x -= shift;
            } else {
              const shift = (a.y < b.y ? -1 : 1) * overlapY / 2;
              a.y += shift; b.y -= shift;
            }
          }
        }
        sector.partners.forEach((_, i) => {
          const pose = poses.current[i], box = boxes[i];
          if (!pose || !box || !box.halfWidth) return;
          const maxX = Math.max(0, width / 2 - box.halfWidth - 6);
          const maxY = Math.max(0, height / 2 - box.halfHeight - 6);
          pose.x = Math.max(-maxX, Math.min(maxX, pose.x));
          pose.y = Math.max(-maxY, Math.min(maxY, pose.y));
          const distance = Math.hypot(pose.x, pose.y) || 0.01;
          const reach = Math.abs(pose.x / distance) * box.halfWidth + Math.abs(pose.y / distance) * box.halfHeight;
          const clearance = coreRadius + reach + 26;
          if (distance < clearance) {
            pose.x = pose.x / distance * clearance;
            pose.y = pose.y / distance * clearance;
          }
        });
      }

      sector.partners.forEach((_, i) => {
        const chip = chips.current[i], pose = poses.current[i];
        if (!chip || !pose) return;
        chip.style.transform = `translate(-50%,-50%) translate(${pose.x.toFixed(1)}px, ${pose.y.toFixed(1)}px)`;
        chip.style.opacity = reduced ? '1' : String(Math.max(0, Math.min(1, (elapsed - i * 42) / 240)));
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [sector, reduced, compact]);

  const toLocal = (event: { clientX: number; clientY: number }) => {
    const rect = arena.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 };
  };

  if (compact) return <>
    <motion.div className="burst-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}/>
    <motion.div className="burst-list" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <Button variant="ghost" size="icon" className="burst-close" aria-label="Chiudi" onClick={onClose}><X/></Button>
      <span className="sphere-index">0{index + 1}</span>
      <h2>{sector.name}</h2>
      <p>{sector.keywords.join(' · ')}</p>
      <ul className="partner-list">{sector.partners.map(partner => <li key={partner.name}>
        {partner.url
          ? <a href={partner.url} target="_blank" rel="noopener noreferrer">{partner.name}</a>
          : <span>{partner.name}</span>}
      </li>)}</ul>
      <Button className="studio-button" onClick={openChat}>Parliamone ↗</Button>
    </motion.div>
  </>;

  return <>
    <motion.div className="burst-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}/>
    <div
      className="burst-arena"
      ref={arena}
      onPointerMove={event => {
        const local = toLocal(event);
        pointer.current = { ...local, active: true };
        if (drag.current.index !== null) drag.current.moved = true;
      }}
      onPointerLeave={() => { pointer.current.active = false; drag.current.index = null; }}
      onPointerUp={() => { drag.current.index = null; }}
    >
      <Button variant="ghost" size="icon" className="burst-close" aria-label="Chiudi" onClick={onClose}><X/></Button>

      <motion.button
        type="button"
        layoutId={`sphere-${index}`}
        className="sphere burst-core"
        onClick={openChat}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
      >
        <span className="sphere-gloss" aria-hidden="true"/>
        <span className="sphere-index">0{index + 1}</span>
        <span className="sphere-name">{sector.name}</span>
        <span className="burst-services">{sector.keywords.join(' · ')}</span>
        <span className="burst-cta">Parliamone ↗</span>
      </motion.button>

      {sector.partners.map((partner, i) => <a
        key={partner.name}
        ref={element => { chips.current[i] = element; }}
        className={`burst-chip ${partner.url ? '' : 'burst-chip-plain'}`}
        href={partner.url || undefined}
        target={partner.url ? '_blank' : undefined}
        rel={partner.url ? 'noopener noreferrer' : undefined}
        onPointerDown={event => {
          const local = toLocal(event);
          const pose = poses.current[i];
          drag.current = { index: i, dx: pose.x - local.x, dy: pose.y - local.y, moved: false };
          pointer.current = { ...local, active: true };
        }}
        onClick={event => { if (drag.current.moved) event.preventDefault(); }}
      >{partner.name}</a>)}
    </div>
  </>;
}
