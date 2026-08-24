export function computeRelativePosition(clientX, clientY, rect) {
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;
  return { x, y };
}

export function initCardGlare(cards) {
  function onMouseMove(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const { x, y } = computeRelativePosition(event.clientX, event.clientY, rect);
    card.style.setProperty('--glare-x', `${x}%`);
    card.style.setProperty('--glare-y', `${y}%`);
  }

  cards.forEach((card) => {
    card.addEventListener('mousemove', onMouseMove);
  });

  return onMouseMove;
}
