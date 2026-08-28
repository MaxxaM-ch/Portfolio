import { describe, it, expect } from 'vitest';
import { shouldSpawnParticle } from '../cursor-trail.js';

describe('shouldSpawnParticle', () => {
  it('spawns on the first movement (no previous position)', () => {
    expect(shouldSpawnParticle(null, null, 100, 100, 24)).toBe(true);
  });

  it('does not spawn when the movement is below the minimum distance', () => {
    expect(shouldSpawnParticle(100, 100, 105, 100, 24)).toBe(false);
  });

  it('spawns once the movement reaches the minimum distance', () => {
    expect(shouldSpawnParticle(100, 100, 124, 100, 24)).toBe(true);
  });

  it('respects a custom minimum distance', () => {
    expect(shouldSpawnParticle(0, 0, 5, 0, 3)).toBe(true);
    expect(shouldSpawnParticle(0, 0, 2, 0, 3)).toBe(false);
  });
});
