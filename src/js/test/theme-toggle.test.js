import { describe, it, expect } from 'vitest';
import { getEffectiveTheme, getNextTheme } from '../theme-toggle.js';

describe('getEffectiveTheme', () => {
  it('returns the stored theme when it is a valid explicit choice', () => {
    expect(getEffectiveTheme('light', true)).toBe('light');
    expect(getEffectiveTheme('dark', false)).toBe('dark');
  });

  it('falls back to the system preference when there is no stored theme', () => {
    expect(getEffectiveTheme(null, true)).toBe('dark');
    expect(getEffectiveTheme(null, false)).toBe('light');
  });

  it('ignores an invalid stored value and falls back to the system preference', () => {
    expect(getEffectiveTheme('sepia', true)).toBe('dark');
  });
});

describe('getNextTheme', () => {
  it('switches dark to light', () => {
    expect(getNextTheme('dark')).toBe('light');
  });

  it('switches light to dark', () => {
    expect(getNextTheme('light')).toBe('dark');
  });
});
