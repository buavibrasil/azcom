/* ═══════════════════════════════════════════════════════════
   AZcom — Main Entry Point
   ═══════════════════════════════════════════════════════════ */

import '../css/tokens.css';
import '../css/base.css';
import '../css/components.css';
import '../css/sections.css';
import '../css/animations.css';

import { initScrollReveal } from './scroll-reveal.js';
import { initCounters } from './counter.js';
import { initMobileMenu, initHeaderScroll } from './mobile-menu.js';
import { initForm } from './form.js';
import { initCookieConsent, initScrollTop } from './cookie-consent.js';
import { initTheme } from './theme.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollReveal();
  initCounters();
  initMobileMenu();
  initHeaderScroll();
  initForm();
  initCookieConsent();
  initScrollTop();
});
