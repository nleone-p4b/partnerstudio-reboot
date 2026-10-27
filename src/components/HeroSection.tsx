import { lazy, Suspense, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow, openChat } from './studio/Primitives';
import { Helix } from './studio/Helix';
import { SectorStage } from './studio/SectorStage';

const Expertise = lazy(() => import('./studio/Expertise'));

type Props = { sector: number | null; onSector: (index: number | null) => void; onOpenSectors: () => void };

export function HeroSection({ sector, onSector, onOpenSectors }: Props) {
  const [pinned, setPinned] = useState(false);
  const closeTimer = useRef<number>();

  const show = (index: number | null) => {
    window.clearTimeout(closeTimer.current);
    if (index === null) {
      if (pinned) return;
      // Piccolo ritardo: muovendo il cursore dallo strato alla lista si passa
      // per lo spazio vuoto in mezzo, e senza attesa la lista sparirebbe.
      closeTimer.current = window.setTimeout(() => onSector(null), 220);
      return;
    }
    onSector(index);
  };

  const pin = (index: number) => {
    window.clearTimeout(closeTimer.current);
    setPinned(true);
    onSector(index);
  };

  const close = () => {
    window.clearTimeout(closeTimer.current);
    setPinned(false);
    onSector(null);
  };

  return <section className="studio-hero" aria-label="NL Partner Studio">
    <Eyebrow>Strategic Advisory &amp; Growth Partnership</Eyebrow>
    <div className="hero-grid">
      <Helix active={sector} onActive={show} pinned={pinned} onPin={pin}/>
      <SectorStage
        index={sector}
        pinned={pinned}
        onClose={close}
        onKeep={() => window.clearTimeout(closeTimer.current)}
        onRelease={() => show(null)}
      />
      <Suspense fallback={<div className="expertise"/>}><Expertise/></Suspense>
    </div>
    <div className="hero-actions">
      <Button className="studio-button" onClick={openChat}>Contattaci <ArrowUpRight/></Button>
      <Button className="studio-button glass-button" variant="outline" onClick={onOpenSectors}>Scopri i Servizi <ArrowUpRight/></Button>
      <p className="hero-legal">© {new Date().getFullYear()} NL Partner Studio · P.IVA 04886240615</p>
    </div>
  </section>;
}
