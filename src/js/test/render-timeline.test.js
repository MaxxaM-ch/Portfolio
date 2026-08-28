import { describe, it, expect } from 'vitest';
import { renderTag, renderTimelineCard, renderTimelineItem, renderTimeline } from '../render-timeline.js';

function parse(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

const sampleExperience = {
  date: 'Jan. 2024 — Sept. 2025',
  title: 'Développeur FullStack · UsedPark',
  company: 'Paprec Group · Paris',
  achievements: ['Achievement one.', 'Achievement two.'],
  tags: ['Angular', 'SCSS'],
};

describe('renderTag', () => {
  it('wraps the tag text in a .tag span', () => {
    const el = parse(renderTag('Angular')).querySelector('.tag');
    expect(el.textContent).toBe('Angular');
  });
});

describe('renderTimelineCard', () => {
  it('renders the date, title, company, achievements and tags', () => {
    const card = parse(renderTimelineCard(sampleExperience));

    expect(card.querySelector('.timeline-card__date').textContent).toBe(sampleExperience.date);
    expect(card.querySelector('.timeline-card__title').textContent).toBe(sampleExperience.title);
    expect(card.querySelector('.timeline-card__company').textContent).toBe(sampleExperience.company);

    const items = card.querySelectorAll('.timeline-card__list li');
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toBe('Achievement one.');
    expect(items[1].textContent).toBe('Achievement two.');

    const tags = card.querySelectorAll('.timeline-card__tags .tag');
    expect(tags).toHaveLength(2);
    expect(tags[0].textContent).toBe('Angular');
    expect(tags[1].textContent).toBe('SCSS');
  });
});

describe('renderTimelineItem', () => {
  it('places even indexes on the left', () => {
    const item = parse(renderTimelineItem(sampleExperience, 0)).querySelector('.timeline__item');
    expect(item.classList.contains('timeline__item--left')).toBe(true);
  });

  it('places odd indexes on the right', () => {
    const item = parse(renderTimelineItem(sampleExperience, 1)).querySelector('.timeline__item');
    expect(item.classList.contains('timeline__item--right')).toBe(true);
  });
});

describe('renderTimeline', () => {
  it('renders one item per experience, in order', () => {
    const experiences = [sampleExperience, { ...sampleExperience, title: 'Second role' }];
    const wrapper = parse(renderTimeline(experiences));

    const titles = Array.from(wrapper.querySelectorAll('.timeline-card__title')).map((el) => el.textContent);
    expect(titles).toEqual([sampleExperience.title, 'Second role']);
  });
});
