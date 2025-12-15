// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navigation
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Create additional ink splatter particles on mouse move (only in hero section)
let particleCount = 0;
const maxParticles = 20;
const hero = document.querySelector('.hero');

if (hero) {
    hero.addEventListener('mousemove', (e) => {
        if (particleCount < maxParticles && Math.random() > 0.95) {
            createInkSplatter(e.clientX, e.clientY);
            particleCount++;
        }
    });
}

function createInkSplatter(x, y) {
    const splatter = document.createElement('div');
    splatter.className = 'ink-splatter';
    splatter.style.left = x + 'px';
    splatter.style.top = y + 'px';
    splatter.style.position = 'fixed';
    splatter.style.width = '4px';
    splatter.style.height = '4px';
    splatter.style.backgroundColor = 'rgba(196, 30, 58, 0.2)';
    splatter.style.borderRadius = '50%';
    splatter.style.pointerEvents = 'none';
    splatter.style.zIndex = '100';
    splatter.style.animation = 'splatterFade 3s ease-out forwards';
    
    document.body.appendChild(splatter);
    
    setTimeout(() => {
        splatter.remove();
        particleCount--;
    }, 3000);
}

// Add CSS animation for ink splatters
const style = document.createElement('style');
style.textContent = `
    @keyframes splatterFade {
        0% {
            opacity: 0.2;
            transform: scale(1) translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: scale(2) translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px);
        }
    }
`;
document.head.appendChild(style);

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all content sections for fade-in effect
document.querySelectorAll('.content-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Observe project and cert cards for staggered animation
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .cert-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    cardObserver.observe(card);
});
