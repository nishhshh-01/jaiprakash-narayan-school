/**
 * i18n.js — Language Engine
 * Handles language switching, localStorage persistence, and DOM updates.
 */

(function () {
  'use strict';

  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'jpn_lang';

  /* ── Get stored or default language ── */
  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  /* ── Store selected language ── */
  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* ignore */ }
  }

  /* ── Nested key resolver: "hero.title" → translations[lang].hero.title ── */
  function resolve(obj, path) {
    return path.split('.').reduce((acc, part) => {
      return acc && acc[part] !== undefined ? acc[part] : null;
    }, obj);
  }

  /* ── Apply translations to all [data-i18n] elements ── */
  function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = resolve(t, key);
      if (value !== null) {
        el.textContent = value;
      }
    });

    /* data-i18n-placeholder — for input placeholders */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = resolve(t, key);
      if (value !== null) el.placeholder = value;
    });

    /* data-i18n-title — for title attributes */
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const value = resolve(t, key);
      if (value !== null) el.title = value;
    });

    /* Update page lang attribute */
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';

    /* Update body class for font switching */
    document.body.classList.toggle('lang-hi', lang === 'hi');
    document.body.classList.toggle('lang-en', lang === 'en');

    /* Update page title */
    const siteTitle = resolve(t, 'siteTitle');
    if (siteTitle) document.title = siteTitle;

    /* Update meta description */
    const metaDesc = document.querySelector('meta[name="description"]');
    const siteDesc = resolve(t, 'siteDesc');
    if (metaDesc && siteDesc) metaDesc.content = siteDesc;

    /* Sync all language buttons to show active state */
    document.querySelectorAll('.lang-btn, .footer-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
  }

  /* ── Switch language ── */
  window.switchLanguage = function (lang) {
    if (!translations[lang]) return;
    storeLang(lang);
    applyTranslations(lang);
  };

  /* ── Init ── */
  window.i18nInit = function () {
    const lang = getStoredLang();
    applyTranslations(lang);

    /* Attach click events to all language buttons */
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        switchLanguage(btn.dataset.lang);
      });
    });
  };

})();
