export function toggleNav(navEl, toggleBtnEl) {
  const isOpen = navEl.classList.toggle('is-open');
  toggleBtnEl.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('nav-open', isOpen);
  return isOpen;
}

export function closeNav(navEl, toggleBtnEl) {
  navEl.classList.remove('is-open');
  toggleBtnEl.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}
