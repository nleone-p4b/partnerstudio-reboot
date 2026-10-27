import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { pills } from './network';
import { amphoraHalf, amphoraOutline, amphoraSheen, amphoraWalls } from './amphoraProfile';

const RATIO = 0.82;

export default function Amphora() {
  const wrap = useRef<HTMLDivElement>(null);
  const vessel = useRef<HTMLDivElement>(null);
  const glass = useRef<SVGPathElement>(null);
  const shine = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();
  const [compact, setCompact] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width:767px)').matches);
  const [box, setBox] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const query = window.matchMedia('(max-width:767px)');
    const update = () => setCompact(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Il vaso deve stare dentro due vincoli, larghezza e altezza della cella.
  // Con aspect-ratio il CSS ne rispetta uno solo e l'altro lo schiaccia, quindi
  // la misura la decidiamo qui e la passiamo in pixel.
  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const cellWidth = el.clientWidth, cellHeight = el.clientHeight;
      if (!cellWidth || !cellHeight) return;
      const width = Math.min(cellWidth, cellHeight * RATIO);
      setBox({ width: Math.round(width), height: Math.round(width / RATIO) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!box.width || !box.height) return;
    glass.current?.setAttribute('d', amphoraOutline(box.width, box.height));
    shine.current?.setAttribute('d', amphoraSheen(box.width, box.height));
  }, [box]);

  const still = reduced;

  useEffect(() => {
    const el = vessel.current;
    if (still || !el || !box.width || !box.height) return;
    let disposed = false;
    let cleanup = () => {};
    import('matter-js').then(({ default: Matter }) => {
      if (disposed || !vessel.current) return;
      const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint, Events } = Matter;
      const width = box.width, height = box.height;
      // enableSleeping: una pila ferma smette di essere ricalcolata e i corpi
      // smettono di compenetrarsi per micro-assestamenti.
      const engine = Engine.create({ gravity: { x: 0, y: 1 }, positionIterations: 18, velocityIterations: 10, constraintIterations: 4, enableSleeping: true });
      const chips = Array.from(el.querySelectorAll<HTMLElement>('.amphora-chip'));

      // Pareti spesse: sottili, sotto la pressione di trenta pillole si fanno
      // attraversare.
      const walls = amphoraWalls(width, height, 26).map(wall =>
        Bodies.rectangle(wall.x, wall.y, wall.width, 26, { isStatic: true, angle: wall.angle, friction: 0.4 }));
      Composite.add(engine.world, walls);

      // Le pillole nascono dentro la pancia: dal collo stretto farebbero tappo.
      const bodies = chips.map((chip, i) => {
        const band = 0.34 + (i % 7) * 0.05;
        const reach = amphoraHalf(band) * (width / 2) * 0.55;
        const x = width / 2 + (Math.random() - 0.5) * reach * 2;
        const body = Bodies.rectangle(x, height * band, chip.offsetWidth, chip.offsetHeight,
          { chamfer: { radius: 11 }, restitution: 0.08, friction: 0.5, frictionStatic: 1, frictionAir: 0.02, slop: 0.01 });
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
              if (time - start < i * 70) { chips[i].style.opacity = '0'; return; }
              Composite.add(engine.world, body);
              released.add(i);
            }
            // Rete di sicurezza legata alla sagoma, non al rettangolo: quello
            // lasciava le pillole fuori dal vetro pur dentro il riquadro.
            const half = chips[i].offsetWidth / 2, halfHeight = chips[i].offsetHeight / 2;
            const y = Math.max(halfHeight, Math.min(height - halfHeight, body.position.y));
            const reach = Math.max(half + 2, amphoraHalf(y / height) * (width / 2) - 2);
            const x = Math.max(width / 2 - reach + half, Math.min(width / 2 + reach - half, body.position.x));
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
  }, [still, box, compact]);

  return <div className={`amphora ${still ? 'amphora-static' : ''}`} ref={wrap} aria-label="Competenze di NL Partner Studio">
    <span className="amphora-caption">STRATEGY. PEOPLE. POSSIBILITIES.</span>
    <div className="amphora-vessel" ref={vessel} style={still ? undefined : { width: box.width, height: box.height }}>
      <svg className="amphora-glass" viewBox={`0 0 ${box.width || 1} ${box.height || 1}`} aria-hidden="true">
        <defs>
          <linearGradient id="amphora-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(216,224,230,.55)"/>
            <stop offset="38%" stopColor="rgba(255,255,255,.30)"/>
            <stop offset="72%" stopColor="rgba(238,232,220,.38)"/>
            <stop offset="100%" stopColor="rgba(184,134,47,.16)"/>
          </linearGradient>
        </defs>
        <path ref={glass} className="amphora-body"/>
        <ellipse className="amphora-lip" cx={(box.width || 1) / 2} cy={2} rx={amphoraHalf(0) * (box.width || 1) / 2} ry={5}/>
      </svg>
      {pills.map(pill => <span key={pill.word} className={`amphora-chip ${pill.tone}`}>{pill.word}</span>)}
      <svg className="amphora-glass amphora-front" viewBox={`0 0 ${box.width || 1} ${box.height || 1}`} aria-hidden="true">
        <path ref={shine} className="amphora-sheen"/>
        <ellipse className="amphora-foot" cx={(box.width || 1) / 2} cy={(box.height || 1) - 3} rx={amphoraHalf(1) * (box.width || 1) / 2} ry={5}/>
      </svg>
    </div>
  </div>;
}
