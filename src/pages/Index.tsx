import { useEffect } from 'react';
import { LayoutGroup, motion, useScroll, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { Footer } from '@/components/Footer';
import { GlassFilter, AmbientBackground } from '@/components/studio/Primitives';
import { Intro, useIntro } from '@/components/studio/Intro';
import { ContactChat } from '@/components/studio/ContactChat';
const Index=()=>{
 const intro=useIntro();const reduced=useReducedMotion();const {scrollYProgress}=useScroll();
 useEffect(()=>{document.documentElement.classList.toggle('chromium-glass',/Chrome|Chromium|Edg/.test(navigator.userAgent));if(reduced)return;const lenis=new Lenis({autoRaf:true,anchors:true,smoothWheel:true});return()=>lenis.destroy();},[reduced]);
 useEffect(()=>{if(reduced)return;const move=(e:PointerEvent)=>{document.documentElement.style.setProperty('--parallax-x',`${(e.clientX/window.innerWidth-.5)*25}px`);document.documentElement.style.setProperty('--parallax-y',`${(e.clientY/window.innerHeight-.5)*25}px`);};window.addEventListener('pointermove',move,{passive:true});return()=>window.removeEventListener('pointermove',move);},[reduced]);
 return <LayoutGroup><div className="studio-page"><GlassFilter/><AmbientBackground/><Header introActive={intro}/><main aria-label="Contenuto principale"><HeroSection ready={!intro}/><AboutSection/><ServicesSection/></main><Footer/><motion.div className="page-progress" style={{scaleX:scrollYProgress}} aria-hidden="true"/><ContactChat ready={!intro}/><Intro active={intro}/></div></LayoutGroup>;
};export default Index;
