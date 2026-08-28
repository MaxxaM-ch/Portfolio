import './styles/main.scss';

import { experiences } from './data/experiences.js';
import { education } from './data/education.js';
import { projects } from './data/projects.js';
import { skillGroups } from './data/skills.js';
import { renderTimeline } from './js/render-timeline.js';
import { renderEducationList } from './js/render-education.js';
import { renderProjectList } from './js/render-projects.js';
import { renderSkillGroups } from './js/render-skills.js';
import { toggleNav, closeNav } from './js/nav-toggle.js';
import { copyEmail, showCopiedFeedback, showCopyFailedFeedback } from './js/copy-email.js';
import { getActiveSectionId, isScrolledToBottom } from './js/scroll-spy.js';
import { initRevealObserver } from './js/reveal-on-scroll.js';
import { initParallax } from './js/parallax.js';
import { initHeroDotsWave } from './js/hero-dots-wave.js';
import { initCursorTrail } from './js/cursor-trail.js';
import { initCardGlare } from './js/card-glare.js';
import { initBackToTop } from './js/back-to-top.js';

function mount(id, render, data) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = render(data);
  }
}

mount('timeline', renderTimeline, experiences);
mount('education-grid', renderEducationList, education);
mount('projects-grid', renderProjectList, projects);
mount('skills-groups', renderSkillGroups, skillGroups);

const navLinks = document.getElementById('nav-links');
const navToggle = document.getElementById('nav-toggle');

if (navLinks && navToggle) {
  navToggle.addEventListener('click', () => {
    toggleNav(navLinks, navToggle);
  });

  navLinks.querySelectorAll('.navbar__link').forEach((link) => {
    link.addEventListener('click', () => {
      closeNav(navLinks, navToggle);
    });
  });
}

function wireCopyButton(boxEl, datasetKey) {
  if (!boxEl) {
    return;
  }

  boxEl.addEventListener('click', () => {
    const value = boxEl.dataset[datasetKey];
    copyEmail(value)
      .then(() => {
        showCopiedFeedback(boxEl);
      })
      .catch(() => {
        showCopyFailedFeedback(boxEl);
      });
  });
}

wireCopyButton(document.getElementById('email-box'), 'email');
wireCopyButton(document.getElementById('phone-box'), 'phone');

const sections = Array.from(document.querySelectorAll('main section[id]'));
const navAnchors = Array.from(document.querySelectorAll('.navbar__link'));
const NAV_OFFSET = 90;

if (sections.length && navAnchors.length) {
  const NAV_CLICK_SUPPRESS_MS = 700;
  let suppressUntil = 0;

  const setActiveLink = (id) => {
    navAnchors.forEach((anchor) => {
      anchor.classList.toggle('is-active', anchor.getAttribute('href') === `#${id}`);
    });
  };

  const updateActiveLink = () => {
    if (Date.now() < suppressUntil) {
      return;
    }

    const atBottom = isScrolledToBottom(window.scrollY, window.innerHeight, document.documentElement.scrollHeight);
    const activeId = atBottom
      ? sections[sections.length - 1].id
      : getActiveSectionId(sections, window.scrollY, NAV_OFFSET);

    setActiveLink(activeId);
  };

  navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', () => {
      setActiveLink(anchor.getAttribute('href').slice(1));
      suppressUntil = Date.now() + NAV_CLICK_SUPPRESS_MS;
    });
  });

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

const revealTargets = Array.from(document.querySelectorAll('.reveal'));
if (revealTargets.length) {
  initRevealObserver(revealTargets);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const heroPattern = document.querySelector('.hero__pattern');
if (heroPattern && !prefersReducedMotion) {
  initParallax(heroPattern, 0.3);
}

if (heroPattern) {
  initHeroDotsWave(heroPattern);
}

const heroSection = document.querySelector('.hero');
if (heroSection && !prefersReducedMotion) {
  initCursorTrail(heroSection);
}

const glareCards = Array.from(document.querySelectorAll('.stat, .timeline-card, .education-card, .back-to-top'));
if (glareCards.length) {
  initCardGlare(glareCards);
}

const contactSection = document.getElementById('contact');
const backToTopButton = document.getElementById('back-to-top');
if (contactSection && backToTopButton) {
  initBackToTop(contactSection, backToTopButton);
}
