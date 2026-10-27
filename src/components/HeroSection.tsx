import { lazy, Suspense } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow, openChat } from './studio/Primitives';
import { Constellation } from './studio/Constellation';

const PhysicsPile = lazy(() => import('./studio/PhysicsPile'));

type Props = { ready?: boolean; sector: number | null; onSector: (index: number | null) => void; onOpenSectors: () => void };

export function HeroSection({ ready = true, sector, onSector, onOpenSectors }: Props) {
  return <section className="studio-hero" aria-label="NL Partner Studio">
    <Eyebrow>Strategic Advisory &amp; Growth Partnership</Eyebrow>
    <div className="hero-grid">
      <Constellation selected={sector} onSelect={onSector}/>
      <Suspense fallback={<div className="physics-area"/>}><PhysicsPile ready={ready}/></Suspense>
    </div>
    <div className="hero-actions">
      <Button className="studio-button" onClick={openChat}>Contattaci <ArrowUpRight/></Button>
      <Button className="studio-button glass-button" variant="outline" onClick={onOpenSectors}>Scopri i Servizi <ArrowUpRight/></Button>
      <p className="hero-legal">© {new Date().getFullYear()} NL Partner Studio · P.IVA 04886240615</p>
    </div>
  </section>;
}
