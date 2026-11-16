import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { highlights, network, sectors, type Partner } from './network';
import { openChat } from './Primitives';

type PanelProps = { open: boolean; onOpenChange: (open: boolean) => void };

export function AboutDialog({ open, onOpenChange }: PanelProps) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="studio-dialog">
    <span className="dialog-eyebrow">CHI SIAMO</span>
    <DialogTitle>Doppia anima: rigore accademico e pragmatismo operativo.</DialogTitle>
    <DialogDescription className="sr-only">I quattro pilastri di NL Partner Studio</DialogDescription>
    <ul className="dialog-highlights">{highlights.map((item, i) => <li key={item.title}>
      <span className="dialog-number">{String(i + 1).padStart(2, '0')}</span>
      <strong>{item.title}</strong>
      <span>{item.description}</span>
    </li>)}</ul>
    <Button className="studio-button" onClick={() => { onOpenChange(false); openChat(); }}>Parliamone <ArrowUpRight/></Button>
  </DialogContent></Dialog>;
}

export function SectorsDialog({ open, onOpenChange, onSelect }: PanelProps & { onSelect: (index: number) => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="studio-dialog">
    <span className="dialog-eyebrow">SERVIZI</span>
    <DialogTitle>Tre linee, un metodo: prima si guarda, poi si costruisce.</DialogTitle>
    <DialogDescription>Ogni linea parte da un workshop di discovery. Scegli da dove partire.</DialogDescription>
    <div className="dialog-sectors">{sectors.map((sector, i) => <Button key={sector.name} variant="ghost" className="dialog-sector liquid-glass" onClick={() => { onOpenChange(false); onSelect(i); }}>
      <span className="dialog-number">0{i + 1}</span>
      <strong>{sector.name}</strong>
      <span>{sector.hint}</span>
      <ArrowUpRight/>
    </Button>)}</div>
  </DialogContent></Dialog>;
}

// Prima i rapporti diretti, poi i gruppi per provenienza: un brand incontrato
// attraverso un master non e' un cliente e non va presentato come tale.
function byOrigin(partners: Partner[]) {
  const groups: { label?: string; items: Partner[] }[] = [];
  for (const partner of [...partners].sort((a, b) => a.name.localeCompare(b.name, 'it'))) {
    const existing = groups.find(group => group.label === partner.via);
    if (existing) existing.items.push(partner);
    else groups.push({ label: partner.via, items: [partner] });
  }
  return groups.sort((a, b) => (a.label ? 1 : 0) - (b.label ? 1 : 0));
}

export function PartnersDialog({ open, onOpenChange }: PanelProps) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="studio-dialog dialog-wide">
    <span className="dialog-eyebrow">PARTNERSHIP</span>
    <DialogTitle>Nella nostra orbita.</DialogTitle>
    <DialogDescription>Istituzioni, aziende e brand con cui lavoriamo. Dove il rapporto passa da un master, lo scriviamo.</DialogDescription>
    <div className="dialog-scroll">{network.map(group => <div className="dialog-group" key={group.name}>
      <h3>{group.name}</h3>
      {byOrigin(group.partners).map(origin => <div key={origin.label ?? 'diretti'}>
        {origin.label && <p className="partner-origin">via {origin.label}</p>}
        <ul className="partner-list">{origin.items.map(partner => <li key={partner.name}>
          {partner.url
            ? <a href={partner.url} target="_blank" rel="noopener noreferrer">{partner.name}</a>
            : <span>{partner.name}</span>}
        </li>)}</ul>
      </div>)}
    </div>)}</div>
  </DialogContent></Dialog>;
}
