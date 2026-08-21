export async function copyEmail(email, clipboard = navigator.clipboard) {
  await clipboard.writeText(email);
}

export function showCopiedFeedback(textEl, boxEl, duration = 2000) {
  const original = textEl.dataset.original || textEl.textContent;
  textEl.dataset.original = original;
  textEl.textContent = 'Copié !';
  boxEl.classList.add('is-copied');

  setTimeout(() => {
    textEl.textContent = original;
    boxEl.classList.remove('is-copied');
  }, duration);
}

export function showCopyFailedFeedback(textEl, boxEl, duration = 2000) {
  const original = textEl.dataset.original || textEl.textContent;
  textEl.dataset.original = original;
  textEl.textContent = 'Copie impossible — utilisez le lien ci-dessous';
  boxEl.classList.add('is-copy-failed');

  setTimeout(() => {
    textEl.textContent = original;
    boxEl.classList.remove('is-copy-failed');
  }, duration);
}
