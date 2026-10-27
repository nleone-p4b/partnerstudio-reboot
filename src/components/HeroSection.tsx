import { lazy, Suspense } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow, openChat } from './studio/Primitives';
import { PartnersLogoStrip } from './PartnersLogoStrip';
const PhysicsPile = lazy(() => import('./studio/PhysicsPile'));
export function HeroSection({ ready = true }: { ready?: boolean }) {
 return <section className="studio-hero" aria-label="NL Partner Studio"><Eyebrow>Strategic Advisory & Growth Partnership</Eyebrow><div className="hero-grid"><PartnersLogoStrip/><Suspense fallback={<div className="physics-area"/>}><PhysicsPile ready={ready}/></Suspense></div><div className="hero-actions"><Button className="studio-button" asChild><a href="#services">Scopri i Servizi <ArrowUpRight/></a></Button><Button className="studio-button glass-button" variant="outline" onClick={openChat}>Contattaci <ArrowUpRight/></Button><a className="hero-scroll" href="#about" aria-label="Chi siamo"><ArrowDown/></a></div></section>;
}
