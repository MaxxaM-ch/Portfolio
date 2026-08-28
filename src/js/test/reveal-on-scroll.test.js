import { describe, it, expect, vi } from 'vitest';
import { handleReveal } from '../reveal-on-scroll.js';

function makeEntry(isIntersecting) {
  return {
    isIntersecting,
    target: { classList: { add: vi.fn() } },
  };
}

describe('handleReveal', () => {
  it('adds "is-visible" only to intersecting entries', () => {
    const visible = makeEntry(true);
    const hidden = makeEntry(false);

    handleReveal([visible, hidden]);

    expect(visible.target.classList.add).toHaveBeenCalledWith('is-visible');
    expect(hidden.target.classList.add).not.toHaveBeenCalled();
  });
});
