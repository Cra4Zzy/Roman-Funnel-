const body = document.body;
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const words = document.querySelectorAll('.type-word');
const cursorOrb = document.querySelector('.cursor-orb');
const magneticCards = document.querySelectorAll('.magnetic-card');
const mobileCTA = document.querySelector('.mobile-cta');
const heroSection = document.querySelector('.hero-shell');
const revealNodes = document.querySelectorAll('.reveal');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });
}

const onScroll = () => {
  if (header) {
    header.classList.toggle('is-scrolled', window.scrollY > 18);
  }

  if (mobileCTA && heroSection) {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    body.classList.toggle('show-mobile-cta', window.innerWidth <= 720 && heroBottom < -120);
  }
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();


const scrollCue = document.querySelector('.hero-scrollcue');
if (scrollCue) {
  scrollCue.addEventListener('click', (event) => {
    const href = scrollCue.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}


if (words.length > 1) {
  let activeIndex = 0;
  window.setInterval(() => {
    words[activeIndex].classList.remove('is-active');
    activeIndex = (activeIndex + 1) % words.length;
    words[activeIndex].classList.add('is-active');
  }, 1900);
}

if (cursorOrb && window.matchMedia('(pointer:fine)').matches) {
  body.classList.add('cursor-ready');
  window.addEventListener('mousemove', (event) => {
    cursorOrb.style.left = `${event.clientX}px`;
    cursorOrb.style.top = `${event.clientY}px`;
  }, { passive: true });
}

magneticCards.forEach((card) => {
  if (!window.matchMedia('(pointer:fine)').matches) return;

  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const moveX = ((x / rect.width) - 0.5) * 8;
    const moveY = ((y / rect.height) - 0.5) * 8;
    card.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translate3d(0, 0, 0)';
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14,
  rootMargin: '0px 0px -30px 0px'
});

revealNodes.forEach((node) => revealObserver.observe(node));

const form = document.querySelector('.apply-card');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.textContent = 'Platzhalter – Formular später anbinden';
      submitButton.disabled = true;
      window.setTimeout(() => {
        submitButton.textContent = 'Anfrage absenden';
        submitButton.disabled = false;
      }, 1800);
    }
  });
}
