export function computeDotCount(width, height, spacing) {
  return Math.round((width * height) / (spacing * spacing));
}

export function computeWaveDelay(x, y, delayStep = 0.0012) {
  return (x + y) * delayStep;
}

export function pickTier(randomValue, tiers) {
  const index = Math.min(Math.floor(randomValue * tiers.length), tiers.length - 1);
  return tiers[index];
}

export function pickAnimationType(randomValue, twinkleProbability = 0.35) {
  return randomValue < twinkleProbability ? 'twinkle' : 'bob';
}

export function pickDotColor(randomValue, whiteProbability = 0.3) {
  return randomValue < whiteProbability ? 'white' : 'primary';
}

export function initHeroDotsWave(container, options = {}) {
  const spacing = options.spacing ?? 36;
  const delayStep = options.delayStep ?? 0.0012;
  const sizes = options.sizes ?? [2, 3, 5];
  const maxSize = Math.max(...sizes);
  const bobDurations = options.bobDurations ?? [4, 6, 9];
  const twinkleDurations = options.twinkleDurations ?? [1.5, 2, 2.8];
  const twinkleProbability = options.twinkleProbability ?? 0.35;
  const whiteProbability = options.whiteProbability ?? 0.3;

  function render() {
    const rect = container.getBoundingClientRect();
    const count = computeDotCount(rect.width, rect.height, spacing);

    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i += 1) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const size = pickTier(Math.random(), sizes);
      const animationType = pickAnimationType(Math.random(), twinkleProbability);
      const duration = animationType === 'twinkle'
        ? pickTier(Math.random(), twinkleDurations)
        : pickTier(Math.random(), bobDurations);
      const color = pickDotColor(Math.random(), whiteProbability);

      const dot = document.createElement('span');
      dot.className = `hero__pattern-dot hero__pattern-dot--${animationType}`;
      if (color === 'white') {
        dot.classList.add('hero__pattern-dot--white');
      }
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.opacity = String(0.25 + (size / maxSize) * 0.5);
      dot.style.animationDelay = `${computeWaveDelay(x, y, delayStep)}s`;
      dot.style.animationDuration = `${duration}s`;
      fragment.appendChild(dot);
    }

    container.appendChild(fragment);
  }

  render();

  let resizeTimeout;
  function onResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(render, 200);
  }

  window.addEventListener('resize', onResize);

  return render;
}
