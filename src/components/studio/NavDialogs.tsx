import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { brandLogos, highlights, sectors } from './network';
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
    <DialogTitle>Tre settori, un metodo.</DialogTitle>
    <DialogDescription>Scegli l&apos;area di cui vuoi vedere i servizi.</DialogDescription>
    <div className="dialog-sectors">{sectors.map((sector, i) => <Button key={sector.name} variant="ghost" className="dialog-sector liquid-glass" onClick={() => { onOpenChange(false); onSelect(i); }}>
      <span className="dialog-number">0{i + 1}</span>
      <strong>{sector.name}</strong>
      <span>{sector.hint}</span>
      <ArrowUpRight/>
    </Button>)}</div>
  </DialogContent></Dialog>;
}

export function PartnersDialog({ open, onOpenChange }: PanelProps) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="studio-dialog dialog-wide">
    <span className="dialog-eyebrow">PARTNERSHIP</span>
    <DialogTitle>Nella nostra orbita.</DialogTitle>
    <DialogDescription>Istituzioni, aziende e brand con cui lavoriamo.</DialogDescription>
    <div className="dialog-scroll">{sectors.map(sector => <div className="dialog-group" key={sector.name}>
      <h3>{sector.name}</h3>
      <div className="brand-grid">{sector.brands.map(brand => <div className="brand-chip" key={brand}>
        {brandLogos[brand] && <img src={brandLogos[brand]} alt=""/>}
        <span>{brand}</span>
      </div>)}</div>
    </div>)}</div>
  </DialogContent></Dialog>;
}
