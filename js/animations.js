/**
 * animations.js — Scroll reveal animations using IntersectionObserver
 * Also handles contact form submission feedback.
 */

(function () {
  'use strict';

  /* ── Scroll Reveal ── */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.10,
      rootMargin: '0px 0px -40px 0px',
    });

    els.forEach(el => observer.observe(el));
  }

  /* ── Gallery fade in keyframe (inject once) ── */
  function injectGalleryKeyframe() {
    if (document.getElementById('gallery-keyframe')) return;
    const style = document.createElement('style');
    style.id = 'gallery-keyframe';
    style.textContent = `
      @keyframes fadeInItem {
        from { opacity: 0; transform: scale(0.95); }
        to   { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Contact form ── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = document.getElementById('form-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }

  /* ── Counter animation (for stats if added) ── */
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 1500;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('en-IN');
        if (progress < 1) requestAnimationFrame(update);
      }
      const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(update);
          obs.disconnect();
        }
      });
      obs.observe(el);
    });
  }

  /* ── Smooth anchor scrolling ── */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
          const y = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    injectGalleryKeyframe();
    initContactForm();
    animateCounters();
    initSmoothAnchors();
  });

})();
