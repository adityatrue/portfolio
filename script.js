// ===== TYPING EFFECT =====
const typedTextEl = document.getElementById('typedText');
const roles = [
    'Full Stack Developer',
    'ML Engineer',
    'Web Developer',
    'Python Developer',
    'Problem Solver'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
    } else {
        typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400; // pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 600);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Close menu on link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
    });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // stop observing once visible
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px 0px -10px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            animateCounter(el, target);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

function animateCounter(el, target) {
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.round(start + (target - start) * eased);

        el.textContent = current >= 1000 ? current.toLocaleString() + '+' : current + '+';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ===== VIDEO LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(videoSrc) {
    const source = lightboxVideo.querySelector('source');
    source.src = videoSrc;
    lightboxVideo.load();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxVideo.play().catch(() => { });
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxVideo.pause();
    lightboxVideo.currentTime = 0;
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Project card play buttons
document.querySelectorAll('.video-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
        const video = overlay.previousElementSibling;
        const source = video.querySelector('source');
        if (source && source.src) {
            openLightbox(source.src);
        }
    });
});

// Demo cards
document.querySelectorAll('.demo-card').forEach(card => {
    card.addEventListener('click', () => {
        const videoSrc = card.getAttribute('data-video');
        if (videoSrc) {
            openLightbox(videoSrc);
        }
    });
});

// Hover preview on demo cards
document.querySelectorAll('.demo-card').forEach(card => {
    const preview = card.querySelector('.demo-preview');
    if (preview) {
        card.addEventListener('mouseenter', () => {
            preview.play().catch(() => { });
        });
        card.addEventListener('mouseleave', () => {
            preview.pause();
            preview.currentTime = 0;
        });
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
