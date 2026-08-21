export function computeParallaxOffset(scrollY, factor = 0.3) {
  return scrollY * factor;
}

export function initParallax(el, factor = 0.3) {
  function onScroll() {
    el.style.transform = `translateY(${computeParallaxOffset(window.scrollY, factor)}px)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  return onScroll;
}
