document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var icon = toggle.querySelector('i');
      var isOpen = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      if (icon) icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });
    var closeNav = function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      var icon = toggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    };
    nav.querySelectorAll('a:not(.dropdown-toggle)').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
    // Close the menu when tapping/clicking outside it
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      closeNav();
    });
  }

  // Services dropdown (tap to expand on mobile, hover on desktop)
  document.querySelectorAll('.has-dropdown > a.dropdown-toggle').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      link.closest('.has-dropdown').classList.toggle('open');
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      item.closest('.faq-list, body').querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Point Formspree's post-submit redirect at the current origin's thank-you
  // page, so it works correctly on localhost/Vercel previews/production
  // alike instead of a hardcoded domain that may not match where the form
  // was actually submitted from
  document.querySelectorAll('input[name="_next"]').forEach(function (input) {
    input.value = window.location.origin + '/thank-you.html';
  });

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) header.style.boxShadow = '0 6px 20px rgba(13,82,48,0.08)';
      else header.style.boxShadow = 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});
