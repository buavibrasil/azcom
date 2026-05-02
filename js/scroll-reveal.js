/* ═══════════════════════════════════════════════════════════
   AZcom — Scroll Reveal (Intersection Observer)
   ═══════════════════════════════════════════════════════════ */

export function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}
