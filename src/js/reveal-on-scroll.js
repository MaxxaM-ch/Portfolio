export function handleReveal(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}

export function initRevealObserver(targets, options = { threshold: 0.15 }) {
  const observer = new IntersectionObserver(handleReveal, options);
  targets.forEach((el) => observer.observe(el));
  return observer;
}
