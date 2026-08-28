export function renderProjectCard(project) {
  const tags = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');

  return `
    <article class="project-card">
      <div class="project-card__thumb dots-pattern" aria-hidden="true"></div>
      <div class="project-card__body">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__desc">${project.description}</p>
        <div class="project-card__tags">${tags}</div>
      </div>
    </article>
  `;
}

export function renderProjectList(projects) {
  return projects.map(renderProjectCard).join('');
}
