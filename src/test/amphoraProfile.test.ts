import { describe, expect, it } from 'vitest';
import { amphoraHalf, amphoraSamples, amphoraWalls } from '../components/studio/amphoraProfile';

describe('Amphora profile', () => {
  it('has a narrow mouth, a wide belly and a small foot', () => {
    expect(amphoraHalf(0)).toBeLessThan(0.3);
    expect(amphoraHalf(0.64)).toBeGreaterThan(0.9);
    expect(amphoraHalf(1)).toBeLessThan(0.6);
    expect(amphoraHalf(1)).toBeLessThan(amphoraHalf(0.64));
  });
  it('stays inside the box at every height', () => {
    amphoraSamples(60).forEach(sample => {
      expect(sample.half).toBeGreaterThan(0);
      expect(sample.half).toBeLessThanOrEqual(1);
    });
  });
  it('builds a closed set of walls on both sides plus a floor', () => {
    const walls = amphoraWalls(300, 600);
    expect(walls.length).toBeGreaterThan(40);
    expect(walls.some(w => w.x < 150)).toBe(true);
    expect(walls.some(w => w.x > 150)).toBe(true);
    expect(walls.at(-1)?.y).toBeGreaterThan(600);
  });
});
