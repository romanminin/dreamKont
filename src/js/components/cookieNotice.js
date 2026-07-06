const CONSENT_KEY = 'dreamkont_cookie_consent_v1';

export function initCookieNotice() {
  const root = document.documentElement;
  const bar = document.querySelector('.cookie-notice');
  const btn = bar?.querySelector('.cookie-notice__accept');

  if (!bar || !btn) return;

  function hide() {
    bar.classList.add('is-closing');
    setTimeout(() => {
      try {
        localStorage.setItem(CONSENT_KEY, '1');
      } catch (e) {
        // ignore
      }
      root.classList.add('cookie-consent-done');
      bar.classList.remove('is-closing');
    }, 280);
  }

  btn.addEventListener('click', hide);

  try {
    if (localStorage.getItem(CONSENT_KEY)) {
      root.classList.add('cookie-consent-done');
    }
  } catch (e) {
    // ignore
  }
}
