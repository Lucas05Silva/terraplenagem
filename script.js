// ─── LOADER ────────────────────────────────────────────
document.body.style.overflow = 'hidden';

let loaderHidden = false;

function hideLoader() {
  if (loaderHidden) return;
  loaderHidden = true;
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hide');
  setTimeout(() => { document.body.style.overflow = 'auto'; }, 650);
}

// Bar animation runs for 2.4s starting at 0.6s = ends at ~3s
// Hide loader at 3.2s so the full bar is visible before disappearing
setTimeout(hideLoader, 3200);

// ─── NAVBAR SCROLL ─────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}, { passive: true });

// ─── MOBILE NAV ────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

if (navToggle) navToggle.addEventListener('click', () => mobileNav.classList.add('open'));
if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);

function closeMobileNav() {
  if (mobileNav) mobileNav.classList.remove('open');
}

// ─── SCROLL REVEAL ─────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── COUNTER ANIMATION ─────────────────────────────────
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + (el.dataset.suffix || '+');
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ─── FAQ ACCORDION ─────────────────────────────────────
function toggleFaq(btn) {
  const item = btn.parentElement;
  const answer = item.querySelector('.faq-answer');
  const isActive = item.classList.contains('active');

  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('active');
    i.querySelector('.faq-answer').style.maxHeight = '0';
  });

  if (!isActive) {
    item.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// ─── SMOOTH SCROLL ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
