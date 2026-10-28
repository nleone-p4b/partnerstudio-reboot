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

  // Prima i rapporti diretti, poi i gruppi per provenienza: un brand incontrato
  // attraverso un master non e' un cliente e non va presentato come tale.
  const groups: { label?: string; items: typeof sector.partners }[] = [];
  for (const partner of [...sector.partners].sort((a, b) => a.name.localeCompare(b.name, 'it'))) {
    const existing = groups.find(group => group.label === partner.via);
    if (existing) existing.items.push(partner);
    else groups.push({ label: partner.via, items: [partner] });
  }
  groups.sort((a, b) => (a.label ? 1 : 0) - (b.label ? 1 : 0));

  return <>
    <div className="drawer-head">
      <span className="helix-index">{String(index + 1).padStart(2, '0')}</span>
      <h2>{sector.name}</h2>
      <p className="panel-keywords">{sector.keywords.join(' · ')}</p>
      <Button variant="ghost" size="icon" className="panel-close" aria-label="Chiudi" onClick={onClose}><X/></Button>
    </div>
    <div className="panel-partners">{groups.map((group, g) => <div className="panel-group" key={group.label ?? 'diretti'}>
      {(group.label || g > 0) && <p className="panel-group-label">{group.label ?? 'Rapporti diretti'}</p>}
      <ul>{group.items.map(partner => <li key={partner.name}>
        {partner.url
          ? <a href={partner.url} target="_blank" rel="noopener noreferrer">{partner.name}<ArrowUpRight aria-hidden="true"/></a>
          : <span>{partner.name}</span>}
      </li>)}</ul>
    </div>)}</div>
    <Button className="studio-button panel-cta" onClick={openChat}>Parliamone <ArrowUpRight/></Button>
  </>;
}
