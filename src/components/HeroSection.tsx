import { lazy, Suspense, useState } from 'react';
import { ArrowUpRight, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow, openChat, useCompact } from './studio/Primitives';
import { Helix } from './studio/Helix';

const Expertise = lazy(() => import('./studio/Expertise'));

type Props = { sector: number | null; onSector: (index: number) => void; onOpenSectors: () => void };

export function HeroSection({ sector, onSector, onOpenSectors }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  // Su telefono il gioco delle parole chiave non c'e': saltando il render
  // nemmeno matter-js viene scaricato.
  const compact = useCompact();

  return <section className={`studio-hero ${compact ? 'hero-compact' : ''}`} aria-label="NL Partner Studio">
    <Eyebrow>Strategic Advisory &amp; Growth Partnership</Eyebrow>
    <div className="hero-grid">
      <Helix active={sector ?? hovered} onHover={setHovered} onOpen={onSector}/>
      <div className="sector-stage">
        <div className="stage-idle">
          <Sparkle aria-hidden="true"/>
          <h1>Nella nostra orbita</h1>
          <p>Cinque strati di lavoro. Tocca uno strato per vedere chi c&apos;è dentro.</p>
        </div>
      </div>
      {!compact && <Suspense fallback={<div className="expertise"/>}><Expertise/></Suspense>}
    </div>
    <div className="hero-actions">
      <Button className="studio-button" onClick={openChat}>Contattaci <ArrowUpRight/></Button>
      <Button className="studio-button glass-button" variant="outline" onClick={onOpenSectors}>Scopri i Servizi <ArrowUpRight/></Button>
      <p className="hero-legal">© {new Date().getFullYear()} NL Partner Studio · P.IVA 04886240615</p>
    </div>
  </section>;
}
