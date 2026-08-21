export function getActiveSectionId(sections, scrollY, offset = 0) {
  let activeId = null;

  for (const section of sections) {
    if (section.offsetTop <= scrollY - offset) {
      activeId = section.id;
    }
  }

  return activeId;
}
