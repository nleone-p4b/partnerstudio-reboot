import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { LiquidGlass } from './Primitives';

type Item = { title: string; description: string; features?: string[] };
export function Conveyor({ items, small = false }: { items: Item[]; small?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const dragging = useRef(false);
  const moved = useRef(false);
  const pointer = useRef({ x: 0, time: 0 });
  const velocity = useRef(0);
  const pause = useRef(false);
  const holdUntil = useRef(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  useMotionValueEvent(scrollYProgress, 'change', value => {
    const el = ref.current;
    if (el && window.innerWidth >= 768 && !dragging.current && !pause.current) el.scrollLeft += (value - previous.current) * el.scrollWidth / 3;
    previous.current = value;
  });
  const previous = useRef(0);
  useEffect(() => { pause.current = paused || selected !== null; }, [paused, selected]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
    let frame = 0, last = 0, speed = 0;
    const tick = (time: number) => {
      const dt = Math.min(time - last || 16, 40); last = time;
      const cycle = el.scrollWidth / 3;
      if (!dragging.current) {
        const target = pause.current || reduced || time < holdUntil.current || document.hidden ? 0 : .023;
        speed += (target - speed) * .08;
        el.scrollLeft += speed * dt + velocity.current;
        velocity.current *= .94;
      }
      if (el.scrollLeft < cycle * .25) el.scrollLeft += cycle;
      if (el.scrollLeft > cycle * 1.75) el.scrollLeft -= cycle;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);
  const advance = (direction: number) => {
    holdUntil.current = performance.now() + 1600;
    ref.current?.scrollBy({ left: direction * (small ? 300 : 350), behavior: reduced ? 'instant' : 'smooth' });
  };
  return <div ref={section} className={`conveyor ${small ? 'conveyor-small' : ''} ${paused ? 'conveyor-paused' : ''}`}>
    <div className="conveyor-viewport" ref={ref} data-lenis-prevent onPointerDown={e => {
      if (e.button !== 0) return;
      dragging.current = true; moved.current = false; velocity.current = 0;
      pointer.current = { x: e.clientX, time: e.timeStamp };
    }} onPointerMove={e => {
      if (!dragging.current || !ref.current) return;
      const dx = pointer.current.x - e.clientX;
      if (Math.abs(dx) > 3) { moved.current = true; ref.current.setPointerCapture(e.pointerId); }
      ref.current.scrollLeft += dx; velocity.current = dx * .6;
      pointer.current = { x: e.clientX, time: e.timeStamp };
    }} onPointerUp={() => { dragging.current = false; holdUntil.current = performance.now() + 1200; }} onPointerCancel={() => { dragging.current = false; }} onPointerLeave={() => { if (!moved.current) dragging.current = false; setPaused(false); }}>
      <div className="conveyor-track">{[0, 1, 2].map(copy => <div className="conveyor-cycle" key={copy}>{items.map((item, i) => <Button key={item.title} variant="ghost" className="conveyor-card liquid-glass" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onClick={() => { if (!moved.current) setSelected(i); }} aria-label={`Apri ${item.title}`}>
        <span className="conveyor-number">{String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.description}</p>{item.features && <ul className="service-features">{item.features.map((f, j) => <li key={f}><span>{String(j + 1).padStart(2, '0')}</span>{f}</li>)}</ul>}<ArrowUpRight className="conveyor-open"/>
      </Button>)}</div>)}</div>
    </div>
    <div className="baggage-belt" aria-hidden="true"/>
    <Button variant="outline" size="icon" className="conveyor-arrow conveyor-prev liquid-glass" aria-label={small ? 'Chi siamo precedenti' : 'Servizi precedenti'} onClick={() => advance(-1)}><ChevronLeft/></Button>
    <Button variant="outline" size="icon" className="conveyor-arrow conveyor-next liquid-glass" aria-label={small ? 'Chi siamo successivi' : 'Servizi successivi'} onClick={() => advance(1)}><ChevronRight/></Button>
    <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="conveyor-dialog liquid-glass">{selected !== null && <><span className="conveyor-number">{String(selected + 1).padStart(2, '0')}</span><DialogTitle>{items[selected].title}</DialogTitle><DialogDescription>{items[selected].description}</DialogDescription>{items[selected].features && <ul className="service-features">{items[selected].features?.map((f, i) => <li key={f}><span>{String(i + 1).padStart(2, '0')}</span>{f}</li>)}</ul>}</>}</DialogContent></Dialog>
  </div>;
}