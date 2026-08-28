import { describe, it, expect } from 'vitest';
import {
  computeDotCount,
  computeWaveDelay,
  pickAnimationType,
  pickDotColor,
  pickTier,
} from '../hero-dots-wave.js';

describe('computeDotCount', () => {
  it('scales with area and target spacing density', () => {
    expect(computeDotCount(360, 360, 36)).toBe(100);
  });

  it('rounds to the nearest whole dot', () => {
    expect(computeDotCount(100, 100, 36)).toBe(8);
  });
});

describe('computeWaveDelay', () => {
  it('returns 0 at the origin (0, 0)', () => {
    expect(computeWaveDelay(0, 0, 0.001)).toBe(0);
  });

  it('increases with distance from the origin', () => {
    expect(computeWaveDelay(200, 300, 0.001)).toBeCloseTo(0.5);
  });

  it('respects a custom delay step', () => {
    expect(computeWaveDelay(100, 100, 0.002)).toBeCloseTo(0.4);
  });
});

describe('pickTier', () => {
  const sizes = [2, 3, 5];

  it('picks the first tier for a random value near 0', () => {
    expect(pickTier(0, sizes)).toBe(2);
  });

  it('picks the last tier for a random value near 1', () => {
    expect(pickTier(0.999, sizes)).toBe(5);
  });

  it('picks the middle tier for a value in the middle third', () => {
    expect(pickTier(0.5, sizes)).toBe(3);
  });

  it('works with a different set of tiers (e.g. durations)', () => {
    const durations = [2, 3, 4.5];
    expect(pickTier(0, durations)).toBe(2);
    expect(pickTier(0.999, durations)).toBe(4.5);
  });
});

describe('pickAnimationType', () => {
  it('returns "twinkle" when the random value is below the probability', () => {
    expect(pickAnimationType(0.1, 0.35)).toBe('twinkle');
  });

  it('returns "bob" when the random value is at or above the probability', () => {
    expect(pickAnimationType(0.35, 0.35)).toBe('bob');
    expect(pickAnimationType(0.9, 0.35)).toBe('bob');
  });

  it('defaults to a 35% twinkle probability', () => {
    expect(pickAnimationType(0.2)).toBe('twinkle');
    expect(pickAnimationType(0.5)).toBe('bob');
  });
});

describe('pickDotColor', () => {
  it('returns "white" when the random value is below the probability', () => {
    expect(pickDotColor(0.1, 0.3)).toBe('white');
  });

  it('returns "primary" when the random value is at or above the probability', () => {
    expect(pickDotColor(0.3, 0.3)).toBe('primary');
    expect(pickDotColor(0.9, 0.3)).toBe('primary');
  });

  it('defaults to a 30% white probability', () => {
    expect(pickDotColor(0.2)).toBe('white');
    expect(pickDotColor(0.5)).toBe('primary');
  });
});
