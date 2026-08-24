import { describe, it, expect } from 'vitest';
import { computeRelativePosition } from './card-glare.js';

describe('computeRelativePosition', () => {
  it('returns 0%/0% at the top-left corner of the element', () => {
    const rect = { left: 100, top: 50, width: 200, height: 100 };
    expect(computeRelativePosition(100, 50, rect)).toEqual({ x: 0, y: 0 });
  });

  it('returns 100%/100% at the bottom-right corner of the element', () => {
    const rect = { left: 100, top: 50, width: 200, height: 100 };
    expect(computeRelativePosition(300, 150, rect)).toEqual({ x: 100, y: 100 });
  });

  it('returns 50%/50% at the center of the element', () => {
    const rect = { left: 0, top: 0, width: 200, height: 100 };
    expect(computeRelativePosition(100, 50, rect)).toEqual({ x: 50, y: 50 });
  });
});
