import { useEffect, useRef, useState } from 'react';
import { sectors } from './network';
import { rungs as computeRungs, strandPath } from './helixGeometry';

const TURNS = 1.65;
const BAND = 104;

type Props = { active: number | null; onHover: (index: number | null) => void; onOpen: (index: number) => void };

export function Helix({ active, onHover, onOpen }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const strandA = useRef<SVGPathElement>(null);
  const strandB = useRef<SVGPathElement>(null);
  const rungRefs = useRef<(SVGLineElement | null)[]>([]);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const measure = () => setHeight(el.clientHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!height) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const draw = (phase: number) => {
      strandA.current?.setAttribute('d', strandPath(phase, BAND, height, TURNS));
      strandB.current?.setAttribute('d', strandPath(phase, BAND, height, TURNS, true));
      computeRungs(sectors.length, phase, BAND, height, TURNS).forEach((rung, i) => {
        const line = rungRefs.current[i];
        if (line) {
          line.setAttribute('x1', String(rung.x1));
          line.setAttribute('x2', String(rung.x2));
          line.setAttribute('y1', String(rung.y));
          line.setAttribute('y2', String(rung.y));
        }
        const group = nodeRefs.current[i];
        if (group) {
          const [a, b] = Array.from(group.children) as SVGCircleElement[];
          a?.setAttribute('cx', String(rung.x1));
          a?.setAttribute('cy', String(rung.y));
          b?.setAttribute('cx', String(rung.x2));
          b?.setAttribute('cy', String(rung.y));
        }
      });
    };
    if (reduced) { draw(0); return; }
    const start = performance.now();
    const tick = (time: number) => {
      draw(((time - start) / 1000) * 0.22);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [height]);

  const rows = computeRungs(sectors.length, 0, BAND, height || 1, TURNS);

  return <div className="helix" ref={wrap} onPointerLeave={() => onHover(null)}>
    <svg className="helix-svg" width={BAND} height={height || 1} viewBox={`0 0 ${BAND} ${height || 1}`} aria-hidden="true">
      <path ref={strandA} className="helix-strand"/>
      <path ref={strandB} className="helix-strand helix-strand-b"/>
      {sectors.map((sector, i) => <line key={`r-${sector.name}`} ref={el => { rungRefs.current[i] = el; }} className={`helix-rung ${active === i ? 'helix-rung-on' : ''}`}/>)}
      {sectors.map((sector, i) => <g key={`n-${sector.name}`} ref={el => { nodeRefs.current[i] = el; }} className={`helix-nodes ${active === i ? 'helix-nodes-on' : ''}`}>
        <circle r="5"/><circle r="5"/>
      </g>)}
    </svg>

    <ul className="helix-layers">
      {sectors.map((sector, i) => <li key={sector.name} style={{ top: height ? rows[i].y : 0 }}>
        <button
          type="button"
          className={`helix-layer ${active === i ? 'helix-layer-on' : ''}`}
          aria-expanded={active === i}
          onPointerEnter={() => onHover(i)}
          onFocus={() => onHover(i)}
          onClick={() => onOpen(i)}
        >
          <span className="helix-index">{String(i + 1).padStart(2, '0')}</span>
          <span className="helix-name">{sector.name}</span>
        </button>
      </li>)}
    </ul>
  </div>;
}
