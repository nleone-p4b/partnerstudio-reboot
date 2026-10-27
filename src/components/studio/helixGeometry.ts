// Doppia elica verticale: due filamenti sfasati di mezzo giro, con uno strato
// (il "piolo") per ogni settore. Tutto in pixel sul riquadro passato.

export type Rung = { y: number; x1: number; x2: number; front: 0 | 1 };

export function strandX(t: number, phase: number, width: number, turns: number, flip = false): number {
  const angle = t * turns * Math.PI * 2 + phase + (flip ? Math.PI : 0);
  return width / 2 + Math.sin(angle) * (width / 2);
}

export function strandPath(phase: number, width: number, height: number, turns: number, flip = false, steps = 60): string {
  const points = Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    return `${strandX(t, phase, width, turns, flip).toFixed(2)},${(t * height).toFixed(2)}`;
  });
  return `M${points.join('L')}`;
}

// Gli strati sono distribuiti nella parte centrale dell'altezza: alle estremita'
// i due filamenti si sovrappongono e il piolo sarebbe lungo zero.
export function rungs(count: number, phase: number, width: number, height: number, turns: number): Rung[] {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : 0.08 + (i / (count - 1)) * 0.84;
    const x1 = strandX(t, phase, width, turns);
    const x2 = strandX(t, phase, width, turns, true);
    return { y: t * height, x1, x2, front: x1 <= x2 ? 0 : 1 };
  });
}
