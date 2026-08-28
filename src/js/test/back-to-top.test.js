import { describe, it, expect, vi } from 'vitest';
import { handleBackToTopVisibility } from '../back-to-top.js';

function makeButton() {
  return { classList: { toggle: vi.fn() } };
}

function makeEntry(isIntersecting) {
  return { isIntersecting };
}

describe('handleBackToTopVisibility', () => {
  it('shows the button when the target section is intersecting', () => {
    const buttonEl = makeButton();

    handleBackToTopVisibility([makeEntry(true)], buttonEl);

    expect(buttonEl.classList.toggle).toHaveBeenCalledWith('is-visible', true);
  });

  it('hides the button when the target section is not intersecting', () => {
    const buttonEl = makeButton();

    handleBackToTopVisibility([makeEntry(false)], buttonEl);

    expect(buttonEl.classList.toggle).toHaveBeenCalledWith('is-visible', false);
  });
});
