/**
 * cogentAI — Main JavaScript
 * Handles: header scroll, mobile nav, scroll animations, accordions
 */

(function () {
  'use strict';

  // --- Header scroll effect ---
  const header = document.getElementById('site-header');
  if (header) {
    let lastScroll = 0;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 40);
      lastScroll = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile navigation ---
  const toggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll-triggered animations ---
  const animateElements = document.querySelectorAll('.animate-in');
  if (animateElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animateElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements immediately
    animateElements.forEach(el => el.classList.add('visible'));
  }

  // --- Accordion ---
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const inner = body.querySelector('.accordion-body-inner');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-body').style.maxHeight = '0';
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Active nav link highlighting ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

})();
