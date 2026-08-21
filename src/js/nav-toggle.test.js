import { describe, it, expect, beforeEach } from 'vitest';
import { toggleNav, closeNav } from './nav-toggle.js';

function makeNavEl() {
  const el = document.createElement('ul');
  return el;
}

function makeToggleBtn() {
  const el = document.createElement('button');
  el.setAttribute('aria-expanded', 'false');
  return el;
}

describe('toggleNav', () => {
  let navEl;
  let toggleBtnEl;

  beforeEach(() => {
    navEl = makeNavEl();
    toggleBtnEl = makeToggleBtn();
    document.body.className = '';
  });

  it('opens the nav on first call and returns true', () => {
    const isOpen = toggleNav(navEl, toggleBtnEl);

    expect(isOpen).toBe(true);
    expect(navEl.classList.contains('is-open')).toBe(true);
    expect(toggleBtnEl.getAttribute('aria-expanded')).toBe('true');
    expect(document.body.classList.contains('nav-open')).toBe(true);
  });

  it('closes the nav on second call and returns false', () => {
    toggleNav(navEl, toggleBtnEl);
    const isOpen = toggleNav(navEl, toggleBtnEl);

    expect(isOpen).toBe(false);
    expect(navEl.classList.contains('is-open')).toBe(false);
    expect(toggleBtnEl.getAttribute('aria-expanded')).toBe('false');
    expect(document.body.classList.contains('nav-open')).toBe(false);
  });
});

describe('closeNav', () => {
  it('closes an open nav', () => {
    const navEl = makeNavEl();
    const toggleBtnEl = makeToggleBtn();
    toggleNav(navEl, toggleBtnEl);

    closeNav(navEl, toggleBtnEl);

    expect(navEl.classList.contains('is-open')).toBe(false);
    expect(toggleBtnEl.getAttribute('aria-expanded')).toBe('false');
    expect(document.body.classList.contains('nav-open')).toBe(false);
  });
});
