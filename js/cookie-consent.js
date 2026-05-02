/* ═══════════════════════════════════════════════════════════
   AZcom — Cookie Consent (LGPD)
   ═══════════════════════════════════════════════════════════ */

export function initCookieConsent() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  // Check if already consented
  if (localStorage.getItem('azcom-cookies')) return;

  // Show banner after 2s delay
  setTimeout(() => {
    banner.classList.add('is-visible');
  }, 2000);

  const acceptBtn = banner.querySelector('.cookie-banner__accept');
  const rejectBtn = banner.querySelector('.cookie-banner__reject');

  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem('azcom-cookies', 'accepted');
    banner.classList.remove('is-visible');
  });

  rejectBtn?.addEventListener('click', () => {
    localStorage.setItem('azcom-cookies', 'rejected');
    banner.classList.remove('is-visible');
  });
}

/* ═══════════════════════════════════════════════════════════
   AZcom — Scroll to Top
   ═══════════════════════════════════════════════════════════ */

export function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
