export function renderTag(tag) {
  return `<span class="tag">${tag}</span>`;
}

export function renderProjectCard(project) {
  const tags = project.tags.map(renderTag).join('');
  const extraTag = project.extraTagsCount ? renderTag(`+${project.extraTagsCount}`) : '';
  const link = project.url
    ? '<span class="project-card__link">Voir le site <span aria-hidden="true">→</span></span>'
    : '';

  const body = `
    <div class="project-card__body">
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__desc">${project.description}</p>
      <div class="project-card__tags">${tags}${extraTag}</div>
      ${link}
    </div>
  `;

  if (project.url) {
    return `<a class="project-card" href="${project.url}" target="_blank" rel="noopener noreferrer">${body}</a>`;
  }

  return `<article class="project-card">${body}</article>`;
}

export function renderProjectList(projects) {
  return projects.map(renderProjectCard).join('');
}
