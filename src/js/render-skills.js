export function renderSkillBadge(skill, tier) {
  return `<span class="skill-badge skill-badge--${tier}">${skill}</span>`;
}

export function renderSkillGroup(group) {
  const badges = group.skills.map((skill) => renderSkillBadge(skill, group.tier)).join('');

  return `
    <div class="skill-group">
      <h3 class="skill-group__title"><span class="skill-dot skill-dot--${group.tier}"></span>${group.label}</h3>
      <div class="skill-badges">${badges}</div>
    </div>
  `;
}

export function renderSkillGroups(groups) {
  return groups.map(renderSkillGroup).join('');
}
