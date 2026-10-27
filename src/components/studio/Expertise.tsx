import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { pills } from './network';

export default function Expertise() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [box, setBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const measure = () => setBox({ width: el.clientWidth, height: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (reduced || !el || !box.width || !box.height) return;
    let disposed = false;
    let cleanup = () => {};
    import('matter-js').then(({ default: Matter }) => {
      if (disposed || !wrap.current) return;
      const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint, Events } = Matter;
      const { width, height } = box;
      // enableSleeping: una pila ferma smette di assestarsi e le aree non si
      // compenetrano per micro-oscillazioni.
      const engine = Engine.create({ gravity: { x: 0, y: 1 }, positionIterations: 18, velocityIterations: 10, constraintIterations: 4, enableSleeping: true });
      const chips = Array.from(el.querySelectorAll<HTMLElement>('.expertise-chip'));

      const thickness = 60;
      Composite.add(engine.world, [
        Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, { isStatic: true, friction: 0.5 }),
        Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 4, { isStatic: true }),
        Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 4, { isStatic: true }),
      ]);

      const bodies = chips.map((chip, i) => {
        const body = Bodies.rectangle(
          width * (0.22 + (i % 4) * 0.19),
          -60 - Math.floor(i / 4) * 70,
          chip.offsetWidth, chip.offsetHeight,
          { chamfer: { radius: 16 }, restitution: 0.08, friction: 0.5, frictionStatic: 1, frictionAir: 0.02, slop: 0.01 });
        // Le aree restano orizzontali: senza rotolamento si impilano invece di
        // allinearsi e sovrapporsi.
        Body.setInertia(body, Infinity);
        return body;
      });

      const mouse = Mouse.create(el);
      const constraint = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.16, render: { visible: false } } });
      Composite.add(engine.world, constraint);
      const wheel = (mouse as unknown as { mousewheel?: EventListener }).mousewheel;
      if (wheel) {
        el.removeEventListener('wheel', wheel);
        el.removeEventListener('mousewheel', wheel);
        el.removeEventListener('DOMMouseScroll', wheel);
      }

      const released = new Set<number>();
      const start = performance.now();
      let frame = 0, last = 0, visible = true;
      const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; });
      observer.observe(el);

      const render = (time: number) => {
        if (disposed) return;
        if (visible && !document.hidden) {
          Engine.update(engine, Math.min(time - last || 16.66, 33));
          bodies.forEach((body, i) => {
            if (!released.has(i)) {
              if (time - start < i * 60) { chips[i].style.opacity = '0'; return; }
              Composite.add(engine.world, body);
              released.add(i);
            }
            const half = chips[i].offsetWidth / 2, halfHeight = chips[i].offsetHeight / 2;
            const x = Math.max(half, Math.min(width - half, body.position.x));
            const y = Math.min(height - halfHeight, body.position.y);
            if (x !== body.position.x || y !== body.position.y) {
              Body.setPosition(body, { x, y });
              Body.setVelocity(body, { x: body.velocity.x * 0.4, y: body.velocity.y * 0.4 });
            }
            chips[i].style.transform = `translate(${(body.position.x - half).toFixed(1)}px, ${(body.position.y - halfHeight).toFixed(1)}px)`;
            chips[i].style.opacity = '1';
          });
        }
        last = time;
        frame = requestAnimationFrame(render);
      };
      frame = requestAnimationFrame(render);

      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        Mouse.clearSourceEvents(mouse);
        Events.off(engine, '');
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      };
    });
    return () => { disposed = true; cleanup(); };
  }, [reduced, box]);

  return <div className={`expertise ${reduced ? 'expertise-static' : ''}`} ref={wrap} aria-label="Aree di expertise di NL Partner Studio">
    <span className="expertise-caption">STRATEGY. PEOPLE. POSSIBILITIES.</span>
    {pills.map(pill => <span key={pill.word} className={`expertise-chip ${pill.tone}`}>{pill.word}</span>)}
  </div>;
}
