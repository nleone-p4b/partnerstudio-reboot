// Silhouette dell'anfora, in coordinate normalizzate: y da 0 (bocca) a 1 (piede),
// half = semi-larghezza come frazione della larghezza massima.
// Lo stesso profilo disegna il vetro e costruisce le pareti fisiche: se i due
// divergessero, le pillole cadrebbero fuori dal disegno.
const CONTROL: { y: number; half: number }[] = [
  { y: 0.00, half: 0.22 },
  { y: 0.05, half: 0.21 },
  { y: 0.10, half: 0.26 },
  { y: 0.18, half: 0.45 },
  { y: 0.28, half: 0.68 },
  { y: 0.40, half: 0.86 },
  { y: 0.52, half: 0.96 },
  { y: 0.64, half: 1.00 },
  { y: 0.75, half: 0.97 },
  { y: 0.85, half: 0.85 },
  { y: 0.93, half: 0.66 },
  { y: 0.98, half: 0.52 },
  { y: 1.00, half: 0.50 },
];

export function amphoraHalf(y: number): number {
  const t = Math.max(0, Math.min(1, y));
  for (let i = 0; i < CONTROL.length - 1; i++) {
    const a = CONTROL[i], b = CONTROL[i + 1];
    if (t >= a.y && t <= b.y) {
      const span = b.y - a.y;
      const k = span === 0 ? 0 : (t - a.y) / span;
      return a.half + (b.half - a.half) * k;
    }
  }
  return CONTROL[CONTROL.length - 1].half;
}

export type Sample = { y: number; half: number };

export function amphoraSamples(count = 48): Sample[] {
  const total = Math.max(2, count);
  return Array.from({ length: total }, (_, i) => {
    const y = i / (total - 1);
    return { y, half: amphoraHalf(y) };
  });
}

// Contorno chiuso in pixel, per il path SVG del vetro.
export function amphoraOutline(width: number, height: number, count = 48): string {
  const samples = amphoraSamples(count);
  const cx = width / 2;
  const right = samples.map(s => `${(cx + s.half * cx).toFixed(2)},${(s.y * height).toFixed(2)}`);
  const left = [...samples].reverse().map(s => `${(cx - s.half * cx).toFixed(2)},${(s.y * height).toFixed(2)}`);
  return `M${right.join('L')}L${left.join('L')}Z`;
}

export type Wall = { x: number; y: number; width: number; angle: number };

// Una parete per segmento del profilo: la forma e' concava, quindi non si puo'
// usare un singolo corpo convesso.
export function amphoraWalls(width: number, height: number, thickness = 10, count = 30): Wall[] {
  const samples = amphoraSamples(count);
  const cx = width / 2;
  const walls: Wall[] = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < samples.length - 1; i++) {
      const a = samples[i], b = samples[i + 1];
      const ax = cx + side * a.half * cx, ay = a.y * height;
      const bx = cx + side * b.half * cx, by = b.y * height;
      const dx = bx - ax, dy = by - ay;
      const length = Math.hypot(dx, dy);
      if (length < 0.5) continue;
      walls.push({
        x: (ax + bx) / 2,
        y: (ay + by) / 2,
        width: length + thickness,
        angle: Math.atan2(dy, dx),
      });
    }
  }
  const foot = amphoraHalf(1) * cx * 2;
  walls.push({ x: cx, y: height + thickness / 2, width: foot + thickness, angle: 0 });
  return walls;
}

// Riflesso verticale sul fianco sinistro: una fascia stretta che segue il profilo.
export function amphoraSheen(width: number, height: number, count = 32): string {
  const samples = amphoraSamples(count).filter(s => s.y > 0.08 && s.y < 0.88);
  const cx = width / 2;
  const inner = samples.map(s => `${(cx - s.half * cx * 0.52).toFixed(2)},${(s.y * height).toFixed(2)}`);
  const outer = [...samples].reverse().map(s => `${(cx - s.half * cx * 0.80).toFixed(2)},${(s.y * height).toFixed(2)}`);
  return `M${inner.join('L')}L${outer.join('L')}Z`;
}
