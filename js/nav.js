/**
 * nav.js — Navigation, sticky header, hamburger menu, scroll-to-section
 */

(function () {
  'use strict';

  /* ── Sticky header shadow ── */
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Hamburger / Mobile nav ── */
  function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const navOverlay = document.getElementById('nav-overlay');
    const navClose = document.getElementById('nav-close');
    if (!hamburger || !mobileNav) return;

    function openNav() {
      hamburger.classList.add('open');
      mobileNav.classList.add('open');
      if (navOverlay) navOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
    }

    function closeNav() {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      if (navOverlay) navOverlay.style.display = 'none';
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    }

    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('open') ? closeNav() : openNav();
    });
    if (navClose) navClose.addEventListener('click', closeNav);
    if (navOverlay) navOverlay.addEventListener('click', closeNav);

    /* Close on nav link click */
    mobileNav.querySelectorAll('a, .mobile-nav__link').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    /* Close on Escape */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ── Active nav link on scroll ── */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  /* ── Back to top ── */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initHamburger();
    initScrollSpy();
    initBackToTop();
  });

})();
