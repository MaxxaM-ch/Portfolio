export function shouldSpawnParticle(lastX, lastY, x, y, minDistance = 24) {
  if (lastX === null || lastY === null) {
    return true;
  }

  const dx = x - lastX;
  const dy = y - lastY;
  return Math.sqrt(dx * dx + dy * dy) >= minDistance;
}

export function initCursorTrail(container, options = {}) {
  const minDistance = options.minDistance ?? 24;
  const particleLifetime = options.particleLifetime ?? 800;
  let lastX = null;
  let lastY = null;

  function spawnParticle(x, y) {
    const particle = document.createElement('span');
    particle.className = 'hero__sparkle';
    particle.textContent = '✦';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    container.appendChild(particle);
    setTimeout(() => particle.remove(), particleLifetime);
  }

  function onMouseMove(event) {
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (shouldSpawnParticle(lastX, lastY, x, y, minDistance)) {
      spawnParticle(x, y);
      lastX = x;
      lastY = y;
    }
  }

  container.addEventListener('mousemove', onMouseMove);
  return onMouseMove;
}
