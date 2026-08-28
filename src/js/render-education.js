export function renderEducationCard(entry) {
  return `
    <article class="education-card">
      <p class="education-card__level">${entry.level}</p>
      <h3 class="education-card__title">${entry.title}</h3>
      <p class="education-card__school">${entry.school}</p>
      <p class="education-card__meta">${entry.meta}</p>
    </article>
  `;
}

export function renderEducationList(entries) {
  return entries.map(renderEducationCard).join('');
}
