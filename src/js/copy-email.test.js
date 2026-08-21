import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyEmail, showCopiedFeedback } from './copy-email.js';

describe('copyEmail', () => {
  it('writes the email to the given clipboard', async () => {
    const clipboard = { writeText: vi.fn().mockResolvedValue(undefined) };

    await copyEmail('prenom.nom@email.com', clipboard);

    expect(clipboard.writeText).toHaveBeenCalledWith('prenom.nom@email.com');
  });
});

describe('showCopiedFeedback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows "Copié !" then restores the original text after the duration', () => {
    const textEl = document.createElement('span');
    textEl.textContent = 'prenom.nom@email.com';
    const boxEl = document.createElement('button');

    showCopiedFeedback(textEl, boxEl, 2000);

    expect(textEl.textContent).toBe('Copié !');
    expect(boxEl.classList.contains('is-copied')).toBe(true);

    vi.advanceTimersByTime(2000);

    expect(textEl.textContent).toBe('prenom.nom@email.com');
    expect(boxEl.classList.contains('is-copied')).toBe(false);
  });
});
