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
