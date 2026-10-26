import { lazy, Suspense } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow, SplitTitle, openChat } from './studio/Primitives';
const PhysicsPile = lazy(() => import('./studio/PhysicsPile'));
export function HeroSection({ ready = true }: { ready?: boolean }) {
  return <section className="studio-hero" aria-labelledby="hero-heading"><div className="hero-grid"><div className="hero-copy"><Eyebrow>Strategic Advisory & Growth Partnership</Eyebrow><SplitTitle hero id="hero-heading" first="Trasformiamo i processi" second="in vantaggio competitivo."/><p className="hero-description">Consulenza strategica, formazione accademica e soluzioni AI per trasformare le sfide operative in opportunità di crescita e innovazione.</p><p className="hero-specialties"><strong>Siamo specializzati in:</strong> Innovazione, Sostenibilità, Gestione strategica; nei settori <strong>Pharma, Healthcare, Digital, Technology.</strong></p><div className="hero-actions"><Button className="studio-button" asChild><a href="#services">Scopri i Servizi <ArrowUpRight/></a></Button><Button className="studio-button glass-button" variant="outline" onClick={openChat}>Contattaci <ArrowUpRight/></Button></div></div><Suspense fallback={<div className="physics-area"/>}><PhysicsPile ready={ready}/></Suspense></div><a className="hero-scroll" href="#about"><ArrowDown size={17}/><span>CHI SIAMO</span></a></section>;
}
