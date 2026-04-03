/* ══════════════════════════════════════════════════════════════
   AnxerStudios Landing — JavaScript
   Carousel, countdown modal, dynamic ads, mobile nav
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Constants ──────────────────────────────────────────────
  const COUNTDOWN_SECONDS = 5;
  const CAROUSEL_INTERVAL = 5000;
  // Update this when you create releases
  const GITHUB_RELEASES_URL =
    'https://github.com/ZLostTK/AnxerStudios/releases/latest';

  // ── DOM refs ───────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  // ── Carousel ───────────────────────────────────────────────
  function initCarousel() {
    const track = $('.carousel-track');
    const slides = $$('.carousel-slide');
    const dots = $$('.carousel-dot');
    const prevBtn = $('.carousel-arrow--prev');
    const nextBtn = $('.carousel-arrow--next');
    if (!track || slides.length === 0) return;

    let current = 0;
    let autoTimer;

    function goTo(i) {
      current = ((i % slides.length) + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(next, CAROUSEL_INTERVAL);
    }
    function stopAuto() {
      clearInterval(autoTimer);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); startAuto(); });
    });

    // Touch support
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      stopAuto();
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
      startAuto();
    }, { passive: true });

    startAuto();
  }

  // ── Download Modal ─────────────────────────────────────────
  function initModal() {
    const overlay = $('#download-modal');
    if (!overlay) return;

    const closeBtn = overlay.querySelector('.modal-close');
    const countdownNum = overlay.querySelector('.countdown-number');
    const progressFill = overlay.querySelector('.modal-progress-fill');
    const progressCircle = overlay.querySelector('.countdown-progress');
    const downloadBtn = overlay.querySelector('.modal-download-btn');

    let countdownTimer;
    let pendingUrl = '';

    function open(url) {
      pendingUrl = url;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      startCountdown();
    }

    function close() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      clearInterval(countdownTimer);
      resetCountdown();
    }

    function resetCountdown() {
      if (countdownNum) countdownNum.textContent = COUNTDOWN_SECONDS;
      if (progressFill) progressFill.style.width = '0%';
      if (progressCircle) progressCircle.style.strokeDashoffset = '0';
      if (downloadBtn) {
        downloadBtn.classList.remove('visible');
      }
    }

    function startCountdown() {
      let remaining = COUNTDOWN_SECONDS;
      const circumference = 339.292; // 2 * π * 54

      if (countdownNum) countdownNum.textContent = remaining;
      if (downloadBtn) downloadBtn.classList.remove('visible');

      countdownTimer = setInterval(() => {
        remaining--;
        if (countdownNum) countdownNum.textContent = remaining;

        // Update progress
        const pct = ((COUNTDOWN_SECONDS - remaining) / COUNTDOWN_SECONDS) * 100;
        if (progressFill) progressFill.style.width = pct + '%';
        if (progressCircle) {
          progressCircle.style.strokeDashoffset =
            circumference * (1 - pct / 100);
        }

        if (remaining <= 0) {
          clearInterval(countdownTimer);
          if (downloadBtn) {
            downloadBtn.classList.add('visible');
            const link = downloadBtn.querySelector('a');
            if (link) link.href = pendingUrl;
          }
        }
      }, 1000);
    }

    // Close button
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    // Bind all download triggers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-download]');
      if (trigger) {
        e.preventDefault();
        const url = trigger.dataset.download || GITHUB_RELEASES_URL;
        open(url);
      }
    });
  }


  // ── Mobile Nav ─────────────────────────────────────────────
  function initMobileNav() {
    const btn = $('.mobile-menu-btn');
    const nav = $('.mobile-nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('active');
      btn.setAttribute('aria-expanded', isOpen);
      // Toggle icon
      const lines = btn.querySelectorAll('line, path');
      // Simple toggle — handled by CSS or icon swap
    });

    // Close on link click
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Intersection Observer for animations ───────────────────
  function initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    $$('.feature-card, .download-card, .stat-item').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // ── GitHub Support Modal ──────────────────────────────────
  function initGithubModal() {
    const trigger = $('#github-modal-trigger');
    const modal = $('#github-modal');
    const closeBtn = $('#github-modal-close');
    const supportBtn = $('#support-go-download');
    const githubLink = modal ? modal.querySelector('a[href*="github.com"]') : null;

    if (!trigger || !modal) return;

    function open() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (supportBtn) supportBtn.addEventListener('click', close);
    if (githubLink) githubLink.addEventListener('click', close);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  }

  // ── Init ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initModal();
    initGithubModal();
    initMobileNav();
    initScrollAnimations();
  });
})();
