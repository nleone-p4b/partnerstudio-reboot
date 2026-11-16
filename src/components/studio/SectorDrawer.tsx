import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sectors } from './network';
import { openChat } from './Primitives';

type Props = { index: number | null; onClose: () => void };

export function SectorDrawer({ index, onClose }: Props) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [open, onClose]);

  return <AnimatePresence>{open && <div className="drawer-layer">
    {/* Lo spazio che resta libero accanto al pannello chiude: e' il modo
        naturale di togliere una slide door senza cercare la crocetta. */}
    <motion.button
      type="button"
      className="drawer-scrim"
      aria-label="Chiudi l'elenco"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />
    <motion.aside
      className="drawer-panel"
      role="dialog"
      aria-modal="true"
      aria-label={sectors[index].name}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 260, damping: 32 }}
    >
      <DrawerBody index={index} onClose={onClose}/>
    </motion.aside>
  </div>}</AnimatePresence>;
}

function DrawerBody({ index, onClose }: { index: number; onClose: () => void }) {
  const sector = sectors[index];
  return <>
    <div className="drawer-head">
      <span className="helix-index">{String(index + 1).padStart(2, '0')}</span>
      <h2>{sector.name}</h2>
      <p className="panel-keywords">{sector.keywords.join(' · ')}</p>
      <Button variant="ghost" size="icon" className="panel-close" aria-label="Chiudi" onClick={onClose}><X/></Button>
    </div>
    <div className="panel-partners">
      <p className="panel-claim">{sector.claim}</p>
      <div className="panel-group">
        <p className="panel-group-label">Cosa facciamo</p>
        <ul className="panel-services">{sector.services.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
      <div className="panel-workshop liquid-glass">
        <p className="panel-group-label">Workshop d&apos;ingresso</p>
        <strong>«{sector.workshop.title}»</strong>
        <p>{sector.workshop.text}</p>
      </div>
      {sector.proof && <div className="panel-group">
        <p className="panel-group-label">Fatto da noi</p>
        <p className="panel-proof">{sector.proof}</p>
      </div>}
    </div>
    <Button className="studio-button panel-cta" onClick={openChat}>Prenota il workshop <ArrowUpRight/></Button>
  </>;
}
