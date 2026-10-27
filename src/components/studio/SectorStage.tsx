import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Sparkle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sectors } from './network';
import { openChat } from './Primitives';

type Props = {
  index: number | null;
  pinned: boolean;
  onClose: () => void;
  onKeep: () => void;
  onRelease: () => void;
};

export function SectorStage({ index, pinned, onClose, onKeep, onRelease }: Props) {
  return <div className="sector-stage" onPointerEnter={onKeep} onPointerLeave={onRelease}>
    <AnimatePresence mode="wait">
      {index === null
        ? <motion.div className="stage-idle" key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Sparkle aria-hidden="true"/>
            <h1>Nella nostra orbita</h1>
            <p>Cinque strati di lavoro. Passa su uno strato per vedere chi c&apos;è dentro.</p>
          </motion.div>
        : <SectorList key={index} index={index} pinned={pinned} onClose={onClose}/>}
    </AnimatePresence>
  </div>;
}

function SectorList({ index, pinned, onClose }: { index: number; pinned: boolean; onClose: () => void }) {
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

  return <motion.div
    className="stage-list"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.22 }}
    role="region"
    aria-label={sector.name}
  >
    <div className="stage-head">
      <span className="sphere-index">{String(index + 1).padStart(2, '0')}</span>
      <h2>{sector.name}</h2>
      <p className="panel-keywords">{sector.keywords.join(' · ')}</p>
      {pinned && <Button variant="ghost" size="icon" className="panel-close" aria-label="Chiudi" onClick={onClose}><X/></Button>}
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
  </motion.div>;
}
