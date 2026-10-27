import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Plus, Sparkle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sectors } from './network';
import { openChat } from './Primitives';

type Props = { selected: number | null; onSelect: (index: number | null) => void };

export function Constellation({ selected, onSelect }: Props) {
  const reduced = useReducedMotion();
  const open = selected !== null;

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') onSelect(null); };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [open, onSelect]);

  return <div id="partnerships" className={`constellation ${open ? 'constellation-open' : ''}`}>
    <h1 className="sr-only">NL Partner Studio — Strategic Advisory &amp; Growth Partnership</h1>
    <div className="constellation-field">
      <svg className="constellation-lines" viewBox="0 0 700 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M350 260L140 125"/><path d="M350 260L560 125"/><path d="M350 260L350 395"/>
      </svg>
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
