const CHECK_ICON = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M13.5 4.5 6 12 2.5 8.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CROSS_ICON = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

let toastTimeoutId;

export async function copyEmail(email, clipboard = navigator.clipboard) {
  await clipboard.writeText(email);
}

export function showCopiedFeedback(boxEl, duration = 2000) {
  boxEl.classList.add('is-copied');

  setTimeout(() => {
    boxEl.classList.remove('is-copied');
  }, duration);

  showToast('Copié !', duration, CHECK_ICON);
}

export function showCopyFailedFeedback(boxEl, duration = 2000) {
  boxEl.classList.add('is-copy-failed');

  setTimeout(() => {
    boxEl.classList.remove('is-copy-failed');
  }, duration);

  showToast('Copie impossible — utilisez le lien ci-dessous', duration, CROSS_ICON);
}

export function showToast(message, duration = 2000, icon = CHECK_ICON) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="toast__icon">${icon}</span><span class="toast__message">${message}</span>`;
  toast.classList.add('is-visible');

  clearTimeout(toastTimeoutId);
  toastTimeoutId = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, duration);

  return toast;
}
