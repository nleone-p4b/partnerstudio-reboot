import { describe, expect, it } from 'vitest';
import { rungs, strandX } from '../components/studio/helixGeometry';

describe('Helix geometry', () => {
  it('keeps both strands inside the band', () => {
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      expect(strandX(t, 0.7, 100, 1.65)).toBeGreaterThanOrEqual(-0.01);
      expect(strandX(t, 0.7, 100, 1.65)).toBeLessThanOrEqual(100.01);
      expect(strandX(t, 0.7, 100, 1.65, true)).toBeGreaterThanOrEqual(-0.01);
    }
  });
  it('spaces the layers evenly away from the crossing points', () => {
    const list = rungs(5, 0, 100, 500, 1.65);
    expect(list).toHaveLength(5);
    expect(list[0].y).toBeGreaterThan(0);
    expect(list.at(-1)!.y).toBeLessThan(500);
    const gaps = list.slice(1).map((r, i) => r.y - list[i].y);
    gaps.forEach(gap => expect(Math.abs(gap - gaps[0])).toBeLessThan(0.01));
  });
});
