import { useEffect, useState } from 'react';
import { LayoutGroup, useReducedMotion } from 'framer-motion';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { GlassFilter, AmbientBackground } from '@/components/studio/Primitives';
import { Intro, useIntro } from '@/components/studio/Intro';
import { ContactChat } from '@/components/studio/ContactChat';
import { AboutDialog, PartnersDialog, SectorsDialog } from '@/components/studio/NavDialogs';

const Index = () => {
  const intro = useIntro();
  const reduced = useReducedMotion();
  const [sector, setSector] = useState<number | null>(null);
  const [about, setAbout] = useState(false);
  const [sectorList, setSectorList] = useState(false);
  const [partners, setPartners] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('chromium-glass', /Chrome|Chromium|Edg/.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (reduced) return;
    const move = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--parallax-x', `${(e.clientX / window.innerWidth - .5) * 25}px`);
      document.documentElement.style.setProperty('--parallax-y', `${(e.clientY / window.innerHeight - .5) * 25}px`);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduced]);

  return <LayoutGroup><div className="studio-page">
    <GlassFilter/>
    <AmbientBackground/>
    <Header introActive={intro} onOpenAbout={() => setAbout(true)} onOpenSectors={() => setSectorList(true)} onOpenPartners={() => setPartners(true)}/>
    <main aria-label="Contenuto principale">
      <HeroSection sector={sector} onSector={setSector} onOpenSectors={() => setSectorList(true)}/>
    </main>
    <AboutDialog open={about} onOpenChange={setAbout}/>
    <SectorsDialog open={sectorList} onOpenChange={setSectorList} onSelect={setSector}/>
    <PartnersDialog open={partners} onOpenChange={setPartners}/>
    <ContactChat ready={!intro}/>
    <Intro active={intro}/>
  </div></LayoutGroup>;
};

export default Index;
