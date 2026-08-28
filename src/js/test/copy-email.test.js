import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyEmail, showCopiedFeedback, showCopyFailedFeedback, showToast } from '../copy-email.js';

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
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('marks the box as copied, shows a toast, then clears the class after the duration', () => {
    const boxEl = document.createElement('button');

    showCopiedFeedback(boxEl, 2000);

    expect(boxEl.classList.contains('is-copied')).toBe(true);
    const toast = document.querySelector('.toast');
    expect(toast.textContent).toContain('Copié !');
    expect(toast.classList.contains('is-visible')).toBe(true);

    vi.advanceTimersByTime(2000);

    expect(boxEl.classList.contains('is-copied')).toBe(false);
  });
});

describe('showCopyFailedFeedback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('marks the box as failed, shows a failure toast, then clears the class after the duration', () => {
    const boxEl = document.createElement('button');

    showCopyFailedFeedback(boxEl, 2000);

    expect(boxEl.classList.contains('is-copy-failed')).toBe(true);
    const toast = document.querySelector('.toast');
    expect(toast.textContent).toContain('Copie impossible');
    expect(toast.classList.contains('is-visible')).toBe(true);

    vi.advanceTimersByTime(2000);

    expect(boxEl.classList.contains('is-copy-failed')).toBe(false);
  });
});

describe('showToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('creates a toast element in the DOM with the given message', () => {
    showToast('Copié !', 2000);

    const toast = document.querySelector('.toast');
    expect(toast).not.toBeNull();
    expect(toast.textContent).toContain('Copié !');
    expect(toast.classList.contains('is-visible')).toBe(true);
  });

  it('reuses the same toast element on a second call instead of creating a duplicate', () => {
    showToast('Copié !', 2000);
    showToast('Copié !', 2000);

    expect(document.querySelectorAll('.toast').length).toBe(1);
  });

  it('hides the toast after the duration', () => {
    showToast('Copié !', 2000);
    vi.advanceTimersByTime(2000);

    const toast = document.querySelector('.toast');
    expect(toast.classList.contains('is-visible')).toBe(false);
  });

  it('uses a different icon when one is provided', () => {
    showToast('Erreur', 2000, '<svg class="x-icon"></svg>');

    const toast = document.querySelector('.toast');
    expect(toast.querySelector('.x-icon')).not.toBeNull();
  });
});
