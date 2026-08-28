import { describe, it, expect } from 'vitest';
import { renderProjectCard, renderProjectList } from '../render-projects.js';

function parse(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

const sampleProject = {
  title: 'Projet Un',
  description: 'Courte description du projet et de son objectif.',
  tags: ['React', 'Node.js'],
};

describe('renderProjectCard', () => {
  it('renders the thumb, title, description and tags in an article.project-card', () => {
    const card = parse(renderProjectCard(sampleProject));

    expect(card.querySelector('article.project-card')).not.toBeNull();
    expect(card.querySelector('.project-card__thumb')).not.toBeNull();
    expect(card.querySelector('.project-card__title').textContent).toBe(sampleProject.title);
    expect(card.querySelector('.project-card__desc').textContent).toBe(sampleProject.description);

    const tags = card.querySelectorAll('.project-card__tags .tag');
    expect(tags).toHaveLength(2);
    expect(tags[0].textContent).toBe('React');
    expect(tags[1].textContent).toBe('Node.js');
  });
});

describe('renderProjectList', () => {
  it('renders one card per project, in order', () => {
    const projects = [sampleProject, { ...sampleProject, title: 'Projet Deux' }];
    const wrapper = parse(renderProjectList(projects));

    const titles = Array.from(wrapper.querySelectorAll('.project-card__title')).map((el) => el.textContent);
    expect(titles).toEqual([sampleProject.title, 'Projet Deux']);
  });
});
