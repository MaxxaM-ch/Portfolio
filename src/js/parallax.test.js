import { describe, it, expect } from 'vitest';
import { computeParallaxOffset } from './parallax.js';

describe('computeParallaxOffset', () => {
  it('scales scrollY by the given factor', () => {
    expect(computeParallaxOffset(100, 0.3)).toBeCloseTo(30);
  });

  it('defaults to a factor of 0.3', () => {
    expect(computeParallaxOffset(200)).toBeCloseTo(60);
  });

  it('returns 0 for a scrollY of 0', () => {
    expect(computeParallaxOffset(0, 0.5)).toBe(0);
  });
});
