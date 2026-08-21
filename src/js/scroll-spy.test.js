import { describe, it, expect } from 'vitest';
import { getActiveSectionId } from './scroll-spy.js';

describe('getActiveSectionId', () => {
  const sections = [
    { id: 'hero', offsetTop: 0 },
    { id: 'about', offsetTop: 500 },
    { id: 'skills', offsetTop: 1200 },
  ];

  it('returns null when scroll is above every section (accounting for offset)', () => {
    expect(getActiveSectionId(sections, 0, 90)).toBe(null);
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
