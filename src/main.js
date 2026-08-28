import './styles/main.scss';

import { experiences } from './data/experiences.js';
import { renderTimeline } from './js/render-timeline.js';

const timelineEl = document.getElementById('timeline');
if (timelineEl) {
  timelineEl.innerHTML = renderTimeline(experiences);
}

import { education } from './data/education.js';
import { renderEducationList } from './js/render-education.js';

const educationGridEl = document.getElementById('education-grid');
if (educationGridEl) {
  educationGridEl.innerHTML = renderEducationList(education);
}

import { projects } from './data/projects.js';
import { renderProjectList } from './js/render-projects.js';

const projectsGridEl = document.getElementById('projects-grid');
if (projectsGridEl) {
  projectsGridEl.innerHTML = renderProjectList(projects);
}

import { skillGroups } from './data/skills.js';
import { renderSkillGroups } from './js/render-skills.js';

const skillsGroupsEl = document.getElementById('skills-groups');
if (skillsGroupsEl) {
  skillsGroupsEl.innerHTML = renderSkillGroups(skillGroups);
}

import { toggleNav, closeNav } from './js/nav-toggle.js';

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

import { copyEmail, showCopiedFeedback, showCopyFailedFeedback } from './js/copy-email.js';

const emailBox = document.getElementById('email-box');

if (emailBox) {
  emailBox.addEventListener('click', () => {
    const email = emailBox.dataset.email;
    copyEmail(email)
      .then(() => {
        showCopiedFeedback(emailBox);
      })
      .catch(() => {
        showCopyFailedFeedback(emailBox);
      });
  });
}

const phoneBox = document.getElementById('phone-box');

if (phoneBox) {
  phoneBox.addEventListener('click', () => {
    const phone = phoneBox.dataset.phone;
    copyEmail(phone)
      .then(() => {
        showCopiedFeedback(phoneBox);
      })
      .catch(() => {
        showCopyFailedFeedback(phoneBox);
      });
  });
}

import { getActiveSectionId, isScrolledToBottom } from './js/scroll-spy.js';

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

import { initRevealObserver } from './js/reveal-on-scroll.js';

const revealTargets = Array.from(document.querySelectorAll('.reveal'));
if (revealTargets.length) {
  initRevealObserver(revealTargets);
}

import { initParallax } from './js/parallax.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const heroPattern = document.querySelector('.hero__pattern');
if (heroPattern && !prefersReducedMotion) {
  initParallax(heroPattern, 0.3);
}

import { initHeroDotsWave } from './js/hero-dots-wave.js';

if (heroPattern) {
  initHeroDotsWave(heroPattern);
}

import { initCursorTrail } from './js/cursor-trail.js';

const heroSection = document.querySelector('.hero');
if (heroSection && !prefersReducedMotion) {
  initCursorTrail(heroSection);
}

import { initCardGlare } from './js/card-glare.js';

const glareCards = Array.from(document.querySelectorAll('.stat, .timeline-card, .education-card, .back-to-top'));
if (glareCards.length) {
  initCardGlare(glareCards);
}

import { initBackToTop } from './js/back-to-top.js';

const contactSection = document.getElementById('contact');
const backToTopButton = document.getElementById('back-to-top');
if (contactSection && backToTopButton) {
  initBackToTop(contactSection, backToTopButton);
}
