export function toggleNav(navEl, toggleBtnEl) {
  const isOpen = navEl.classList.toggle('is-open');
  toggleBtnEl.classList.toggle('is-open', isOpen);
  toggleBtnEl.setAttribute('aria-expanded', String(isOpen));
  toggleBtnEl.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  document.body.classList.toggle('nav-open', isOpen);
  return isOpen;
}

export function closeNav(navEl, toggleBtnEl) {
  navEl.classList.remove('is-open');
  toggleBtnEl.classList.remove('is-open');
  toggleBtnEl.setAttribute('aria-expanded', 'false');
  toggleBtnEl.setAttribute('aria-label', 'Ouvrir le menu');
  document.body.classList.remove('nav-open');
}
