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
  it('renders the title, description and tags in an article.project-card, without a thumbnail', () => {
    const card = parse(renderProjectCard(sampleProject));

    expect(card.querySelector('article.project-card')).not.toBeNull();
    expect(card.querySelector('.project-card__thumb')).toBeNull();
    expect(card.querySelector('.project-card__title').textContent).toBe(sampleProject.title);
    expect(card.querySelector('.project-card__desc').textContent).toBe(sampleProject.description);

    const tags = card.querySelectorAll('.project-card__tags .tag');
    expect(tags).toHaveLength(2);
    expect(tags[0].textContent).toBe('React');
    expect(tags[1].textContent).toBe('Node.js');
  });

  it('appends a "+N" tag when extraTagsCount is set', () => {
    const project = { ...sampleProject, extraTagsCount: 3 };
    const tags = parse(renderProjectCard(project)).querySelectorAll('.project-card__tags .tag');

    expect(tags).toHaveLength(3);
    expect(tags[2].textContent).toBe('+3');
  });

  it('renders as a link with a "Voir le site" label when a url is provided', () => {
    const project = { ...sampleProject, url: 'https://example.com' };
    const card = parse(renderProjectCard(project));

    const link = card.querySelector('a.project-card');
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('https://example.com');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(card.querySelector('.project-card__link').textContent).toContain('Voir le site');
  });

  it('renders as a plain article with no link label when there is no url', () => {
    const card = parse(renderProjectCard(sampleProject));
    expect(card.querySelector('a.project-card')).toBeNull();
    expect(card.querySelector('article.project-card')).not.toBeNull();
    expect(card.querySelector('.project-card__link')).toBeNull();
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
