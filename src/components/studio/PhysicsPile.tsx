import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { containedPose } from './physicsRules';
const pills = [
  { word: 'Strategia', tone: 'chip-black' },
  { word: 'AI', tone: 'chip-gold' },
  { word: 'Formazione', tone: 'liquid-glass' },
  { word: 'Healthcare', tone: 'liquid-glass' },
  { word: 'Communication', tone: 'chip-black' },
  { word: 'Growth', tone: 'chip-gold' },
];
export default function PhysicsPile({ ready }: { ready: boolean }) {
  const container = useRef<HTMLDivElement>(null); const reduced = useReducedMotion();
  useEffect(() => {
    if (!ready || reduced || !container.current) return;
    let disposed = false; let cleanup = () => {};
    import('matter-js').then(({ default: Matter }) => {
      const el = container.current; if (!el || disposed) return;
      const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint, Events } = Matter;
      const engine = Engine.create({ gravity: { x: 0, y: 1.1 }, positionIterations: 12, velocityIterations: 8, constraintIterations: 4 });
      let width = el.clientWidth, height = el.clientHeight;
      const chips = Array.from(el.querySelectorAll<HTMLElement>('.physics-chip'));
      const bodies = chips.map((chip, i) => {
        const body = Bodies.rectangle(width / 2 + (i % 2 ? 14 : -14), 54, chip.offsetWidth, chip.offsetHeight, { chamfer: { radius: 18 }, restitution: 0.1, friction: 0.6, frictionStatic: 1, frictionAir: 0.022, slop: 0.01 });
        // Le pillole restano orizzontali: senza rotolamento si impilano invece di allinearsi e sovrapporsi.
        Body.setInertia(body, Infinity);
        return body;
      });
      const walls = () => [Bodies.rectangle(width/2,-30,width+100,60,{isStatic:true}), Bodies.rectangle(width/2,height+30,width+100,60,{isStatic:true}), Bodies.rectangle(-30,height/2,60,height*4,{isStatic:true}), Bodies.rectangle(width+30,height/2,60,height*4,{isStatic:true})];
      let boundaries = walls(); Composite.add(engine.world, boundaries);
      const released = new Set<number>();
      const mouse = Mouse.create(el); const constraint = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.18, render: { visible: false } } }); Composite.add(engine.world, constraint);
      // The scene is draggable, but the mouse wheel must still scroll the page.
      const wheelHandler = (mouse as unknown as { mousewheel?: EventListener }).mousewheel;
       if (wheelHandler) { el.removeEventListener('wheel', wheelHandler); el.removeEventListener('mousewheel', wheelHandler); el.removeEventListener('DOMMouseScroll', wheelHandler); }
       const start = performance.now();
      let frame = 0, last = 0, visible = true;
      const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; }); observer.observe(el);
      const render = (time: number) => {
        if (disposed) return;
        if (visible && !document.hidden) {
          Engine.update(engine, Math.min(time-last || 16.66, 33));
          bodies.forEach((body, i) => {
            if (!released.has(i) && time - start < i * 260) { chips[i].style.opacity = '0'; return; }
            if (!released.has(i)) { Composite.add(engine.world, body); released.add(i); }
            const pose = containedPose(body.position.x, body.position.y, body.angle, chips[i].offsetWidth, chips[i].offsetHeight, width, height);
            if (pose.angle !== body.angle) { Body.setAngle(body, pose.angle); Body.setAngularVelocity(body, 0); }
            if (pose.x !== body.position.x || pose.y !== body.position.y) { Body.setPosition(body, pose); Body.setVelocity(body, {x:body.velocity.x*.5,y:body.velocity.y*.5}); }
            chips[i].style.transform = `translate(${body.position.x - chips[i].offsetWidth/2}px, ${body.position.y - chips[i].offsetHeight/2}px) rotate(${body.angle}rad)`;
            chips[i].style.opacity = '1';
          });
        }
        last = time; frame = requestAnimationFrame(render);
      };
      frame = requestAnimationFrame(render);
      const resize = new ResizeObserver(() => {
        const newWidth = el.clientWidth; height = el.clientHeight;
        bodies.forEach(body => Body.setPosition(body, {x: body.position.x * newWidth/width, y: Math.min(body.position.y, height-60)})); width = newWidth;
        Composite.remove(engine.world, boundaries); boundaries = walls(); Composite.add(engine.world, boundaries);
      }); resize.observe(el);
      cleanup = () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); Mouse.clearSourceEvents(mouse); Events.off(engine, ''); Composite.clear(engine.world, false); Engine.clear(engine); };
    });
    return () => { disposed = true; cleanup(); };
  }, [ready, reduced]);
  return <div className={`physics-area ${reduced ? 'physics-static' : ''}`} ref={container} aria-label="Mosaico interattivo delle competenze"><div className="physics-watermark" aria-hidden="true">NL.</div>{pills.map(chip => <div key={chip.word} className={`physics-chip ${chip.tone}`}>{chip.word}</div>)}<span className="physics-caption">STRATEGY. PEOPLE. POSSIBILITIES.</span></div>;
}
