import { describe, it, expect } from 'vitest';
import { renderSkillBadge, renderSkillGroup, renderSkillGroups } from '../render-skills.js';

function parse(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

const sampleGroup = {
  tier: 'mastered',
  label: 'Maîtrisé',
  skills: ['HTML', 'CSS'],
};

describe('renderSkillBadge', () => {
  it('renders a span with the tier modifier class and the skill name', () => {
    const el = parse(renderSkillBadge('HTML', 'mastered')).querySelector('.skill-badge');
    expect(el.classList.contains('skill-badge--mastered')).toBe(true);
    expect(el.textContent).toBe('HTML');
  });
});

describe('renderSkillGroup', () => {
  it('renders the dot, the label and one badge per skill', () => {
    const group = parse(renderSkillGroup(sampleGroup));

    const dot = group.querySelector('.skill-dot');
    expect(dot.classList.contains('skill-dot--mastered')).toBe(true);
    expect(group.querySelector('.skill-group__title').textContent.trim()).toBe('Maîtrisé');

    const badges = group.querySelectorAll('.skill-badge');
    expect(badges).toHaveLength(2);
    expect(badges[0].textContent).toBe('HTML');
    expect(badges[0].classList.contains('skill-badge--mastered')).toBe(true);
    expect(badges[1].textContent).toBe('CSS');
  });
});

describe('renderSkillGroups', () => {
  it('renders one .skill-group per group, in order', () => {
    const groups = [sampleGroup, { tier: 'intermediate', label: 'Intermédiaire', skills: ['React'] }];
    const wrapper = parse(renderSkillGroups(groups));

    const labels = Array.from(wrapper.querySelectorAll('.skill-group__title')).map((el) => el.textContent.trim());
    expect(labels).toEqual(['Maîtrisé', 'Intermédiaire']);
  });
});
