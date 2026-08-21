import './styles/main.scss';
import { toggleNav, closeNav } from './js/nav-toggle.js';

const navLinks = document.getElementById('nav-links');
const navToggle = document.getElementById('nav-toggle');

navToggle.addEventListener('click', () => {
  toggleNav(navLinks, navToggle);
});

navLinks.querySelectorAll('.navbar__link').forEach((link) => {
  link.addEventListener('click', () => {
    closeNav(navLinks, navToggle);
  });
});

import { copyEmail, showCopiedFeedback } from './js/copy-email.js';

const emailBox = document.getElementById('email-box');
const emailText = document.getElementById('email-text');

emailBox.addEventListener('click', () => {
  const email = emailBox.dataset.email;
  copyEmail(email).then(() => {
    showCopiedFeedback(emailText, emailBox);
  });
});

import { getActiveSectionId } from './js/scroll-spy.js';

const sections = Array.from(document.querySelectorAll('main section[id]'));
const navAnchors = Array.from(document.querySelectorAll('.navbar__link'));
const NAV_OFFSET = 90;

function updateActiveLink() {
  const activeId = getActiveSectionId(sections, window.scrollY, NAV_OFFSET);
  navAnchors.forEach((anchor) => {
    anchor.classList.toggle('is-active', anchor.getAttribute('href') === `#${activeId}`);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

import { initRevealObserver } from './js/reveal-on-scroll.js';

const revealTargets = Array.from(document.querySelectorAll('.reveal'));
initRevealObserver(revealTargets);

import { initParallax } from './js/parallax.js';

const heroPattern = document.querySelector('.hero__pattern');
if (heroPattern) {
  initParallax(heroPattern, 0.3);
}
