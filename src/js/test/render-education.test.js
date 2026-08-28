import { describe, it, expect } from 'vitest';
import { renderEducationCard, renderEducationList } from '../render-education.js';

function parse(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

const sampleEntry = {
  level: 'Bac +5 équivalent Maîtrise',
  title: 'Manager en Ingénierie Informatique · Option Lead Dev',
  school: 'Coding Factory by Esiee-It',
  meta: 'Pontoise · 2023 — 2025',
};

describe('renderEducationCard', () => {
  it('renders the level, title, school and meta in an article.education-card', () => {
    const card = parse(renderEducationCard(sampleEntry));

    const article = card.querySelector('article.education-card');
    expect(article).not.toBeNull();
    expect(card.querySelector('.education-card__level').textContent).toBe(sampleEntry.level);
    expect(card.querySelector('.education-card__title').textContent).toBe(sampleEntry.title);
    expect(card.querySelector('.education-card__school').textContent).toBe(sampleEntry.school);
    expect(card.querySelector('.education-card__meta').textContent).toBe(sampleEntry.meta);
  });
});

describe('renderEducationList', () => {
  it('renders one card per entry, in order', () => {
    const entries = [sampleEntry, { ...sampleEntry, title: 'Second diploma' }];
    const wrapper = parse(renderEducationList(entries));

    const titles = Array.from(wrapper.querySelectorAll('.education-card__title')).map((el) => el.textContent);
    expect(titles).toEqual([sampleEntry.title, 'Second diploma']);
  });
});
