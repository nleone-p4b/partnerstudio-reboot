import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sparkle, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { network, brandLogos } from './studio/network';
export function PartnersLogoStrip() {
 const [selected, setSelected] = useState<number | null>(null); const reduced = useReducedMotion();
 return <div id="partnerships" className={`constellation ${selected !== null ? 'constellation-expanded' : ''}`}>
  <h1 className="sr-only">NL Partner Studio — Nella nostra orbita</h1>
  <svg className="constellation-lines" viewBox="0 0 700 500" preserveAspectRatio="none" aria-hidden="true"><path d="M350 265L175 140M350 265L525 140M350 265L350 400"/></svg>
  <div className="constellation-sun"><Sparkle/><span>Nella nostra<br/>orbita</span></div>
  {network.map((planet, i) => <motion.div key={planet.name} className={`constellation-planet constellation-planet-${i} ${selected === i ? 'planet-selected' : ''}`} animate={{ opacity: selected !== null && selected !== i ? 0 : 1 }}>
   <Button variant="ghost" className="constellation-circle liquid-glass" aria-expanded={selected === i} aria-label={`Esplora ${planet.name}`} onClick={() => setSelected(selected === i ? null : i)}><span className="planet-index">0{i+1}</span><span>{planet.name}</span>{selected === i ? <X/> : <Plus/>}</Button>
  </motion.div>)}
  <AnimatePresence mode="wait">{selected !== null && <motion.div className="constellation-brands" key={selected} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>{network[selected].brands.map((brand, j, brands) => {
   const angle = -Math.PI / 2 + j / brands.length * Math.PI * 2;
   return <motion.div key={brand} className="radial-brand liquid-glass" style={{'--brand-x':`${Math.cos(angle)*35}%`,'--brand-y':`${Math.sin(angle)*39}%`} as React.CSSProperties} initial={{opacity:0, x:0, y:0, scale:reduced?1:.3}} animate={{opacity:1, x: reduced?0:'var(--radial-x)', y: reduced?0:'var(--radial-y)', scale:1}} exit={{opacity:0, scale:reduced?1:.3}} transition={{type:'spring',stiffness:120,damping:18,delay:j*.045}}>{brandLogos[brand] && <img src={brandLogos[brand]} alt=""/>}<span>{brand}</span></motion.div>;
  })}</motion.div>}</AnimatePresence>
 </div>;
}
