export function handleBackToTopVisibility(entries, buttonEl) {
  entries.forEach((entry) => {
    buttonEl.classList.toggle('is-visible', entry.isIntersecting);
  });
}

export function initBackToTop(sectionEl, buttonEl, options = { threshold: 0.1 }) {
  const observer = new IntersectionObserver(
    (entries) => handleBackToTopVisibility(entries, buttonEl),
    options
  );
  observer.observe(sectionEl);
  return observer;
}
