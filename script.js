/* =========================================================
   BTG CONSULTING LIMITED - SCRIPT.JS
   Executive UI Interactions & Animations
   ========================================================= */

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

if (hamburger && navLinksContainer) {
  hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinksContainer.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

// ---- ACTIVE NAV LINK HIGHLIGHT ----
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionH = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionH) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ---- STREAMLINED SERVICE TABS (2 PILLARS) ----
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.getAttribute('data-tab');

    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const targetContent = document.getElementById(`content-${tabName}`);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  });
});

// Handle dropdown link navigation directly to service tab
document.querySelectorAll('a[href^="#engineering-services"]').forEach(link => {
  link.addEventListener('click', () => {
    const engBtn = document.getElementById('tab-engineering');
    if (engBtn) engBtn.click();
  });
});

document.querySelectorAll('a[href^="#industry-relations"]').forEach(link => {
  link.addEventListener('click', () => {
    const relBtn = document.getElementById('tab-relations');
    if (relBtn) relBtn.click();
  });
});

// ---- SCROLL REVEAL ANIMATIONS ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

function addRevealToElements() {
  const selectors = [
    '.section-header', '.why-card', '.value-chip',
    '.pillar-feature', '.contact-item', '.highlight-item', '.footer-links-col',
    '.about-text-col', '.about-values-col', '.commit-text', '.commit-logo', '.hero-logo-card'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      revealObserver.observe(el);
    });
  });
}

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;

    setTimeout(() => {
      formSuccess.style.display = 'block';
      contactForm.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;

      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    }, 1000);
  });
}

// ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#' || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- INITIALIZATION ----
document.addEventListener('DOMContentLoaded', () => {
  addRevealToElements();
  updateActiveNav();
});
