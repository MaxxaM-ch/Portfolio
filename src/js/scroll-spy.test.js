import { describe, it, expect } from 'vitest';
import { getActiveSectionId, isScrolledToBottom } from './scroll-spy.js';

describe('getActiveSectionId', () => {
  const sections = [
    { id: 'hero', offsetTop: 0 },
    { id: 'about', offsetTop: 500 },
    { id: 'skills', offsetTop: 1200 },
  ];

  it('activates the hero section at the top of the page (offset already accounted for)', () => {
    expect(getActiveSectionId(sections, 0, 90)).toBe('hero');
  });

  it('returns the first section once scrolled past its offset-adjusted top', () => {
    expect(getActiveSectionId(sections, 100, 90)).toBe('hero');
  });

  it('returns the last section whose top has been passed', () => {
    expect(getActiveSectionId(sections, 600, 90)).toBe('about');
  });

  it('returns the final section when scrolled past all of them', () => {
    expect(getActiveSectionId(sections, 2000, 90)).toBe('skills');
  });
});

describe('isScrolledToBottom', () => {
  it('returns false when nowhere near the bottom', () => {
    expect(isScrolledToBottom(0, 800, 5000)).toBe(false);
  });

  it('returns true when scrolled exactly to the bottom', () => {
    expect(isScrolledToBottom(4200, 800, 5000)).toBe(true);
  });

  it('returns true when document is shorter than viewport (by design: treats full-page-in-viewport as at-bottom)', () => {
    expect(isScrolledToBottom(0, 900, 800)).toBe(true);
  });

  it('respects a custom threshold argument', () => {
    expect(isScrolledToBottom(100, 800, 900, 50)).toBe(true);
    expect(isScrolledToBottom(100, 800, 1000, 50)).toBe(false);
  });
});
