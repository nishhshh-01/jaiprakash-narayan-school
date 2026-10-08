/**
 * gallery.js — Gallery filter tabs
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item[data-category]');
    if (!filterBtns.length || !galleryItems.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        /* Update active button */
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        /* Show/hide items */
        galleryItems.forEach(item => {
          const cat = item.dataset.category;
          const show = filter === 'all' || cat === filter;
          item.style.display = show ? '' : 'none';
          if (show) {
            item.style.animation = 'none';
            item.offsetHeight; // reflow
            item.style.animation = 'fadeInItem 0.35s ease both';
          }
        });
      });
    });
  });
})();
