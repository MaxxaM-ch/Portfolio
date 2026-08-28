export function renderTag(tag) {
  return `<span class="tag">${tag}</span>`;
}

export function renderTimelineCard(experience) {
  const achievements = experience.achievements.map((item) => `<li>${item}</li>`).join('');
  const tags = experience.tags.map(renderTag).join('');

  return `
    <div class="timeline-card">
      <p class="timeline-card__date">${experience.date}</p>
      <h3 class="timeline-card__title">${experience.title}</h3>
      <p class="timeline-card__company">${experience.company}</p>
      <ul class="timeline-card__list">${achievements}</ul>
      <div class="timeline-card__tags">${tags}</div>
    </div>
  `;
}

export function renderTimelineItem(experience, index) {
  const side = index % 2 === 0 ? 'left' : 'right';
  return `<div class="timeline__item timeline__item--${side}">${renderTimelineCard(experience)}</div>`;
}

export function renderTimeline(experiences) {
  return experiences.map(renderTimelineItem).join('');
}
