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
    <Eyebrow>GEO · Knowledge Management · App verticali</Eyebrow>
    <div className="hero-grid">
      <Helix active={sector ?? hovered} onHover={setHovered} onOpen={onSector}/>
      <div className="sector-stage">
        <div className="stage-idle">
          <Sparkle aria-hidden="true"/>
          <h1>Se le AI non ti citano, non esisti.</h1>
          <p>Rendiamo leggibile la conoscenza della tua azienda: per le AI, per le persone, per i prodotti. Tre strati di lavoro, ognuno parte da un workshop. Toccane uno.</p>
        </div>
      </div>
      {!compact && <Suspense fallback={<div className="expertise"/>}><Expertise/></Suspense>}
    </div>
    <div className="hero-actions">
      <Button className="studio-button" onClick={openChat}>Prenota un workshop <ArrowUpRight/></Button>
      <Button className="studio-button glass-button" variant="outline" onClick={onOpenSectors}>I tre workshop <ArrowUpRight/></Button>
      <p className="hero-legal">© {new Date().getFullYear()} NL Partner Studio · P.IVA 04886240615</p>
    </div>
  </section>;
}
