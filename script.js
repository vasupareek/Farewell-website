(function() {
    document.body.classList.add('loading');


    const particleContainer = document.getElementById('loaderParticles');
    if (particleContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('loader-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = (50 + Math.random() * 50) + '%';
            particle.style.animationDelay = (Math.random() * 4) + 's';
            particle.style.animationDuration = (3 + Math.random() * 3) + 's';
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            particleContainer.appendChild(particle);
        }
    }


    const loaderBar = document.getElementById('loaderBar');
    const loaderPercent = document.getElementById('loaderPercent');
    const ringProgress = document.querySelector('.loader-ring-progress');
    const overlay = document.getElementById('loaderOverlay');

    const totalDuration = 3000;
    const circumference = 2 * Math.PI * 90;
    let startTime = null;

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function animateLoader(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const rawProgress = Math.min(elapsed / totalDuration, 1);
        const progress = easeOutQuart(rawProgress);
        const percent = Math.round(progress * 100);

        if (loaderBar) loaderBar.style.width = percent + '%';
        if (loaderPercent) loaderPercent.textContent = percent + '%';
        if (ringProgress) {
            ringProgress.style.strokeDashoffset = circumference - (circumference * progress);
        }

        if (rawProgress < 1) {
            requestAnimationFrame(animateLoader);
        } else {

            setTimeout(() => {
                if (overlay) overlay.classList.add('fade-out');
                document.body.classList.remove('loading');


                setTimeout(() => {
                    if (overlay) overlay.remove();
                }, 900);
            }, 400);
        }
    }

    requestAnimationFrame(animateLoader);
})();

const sections = document.querySelectorAll('.heropage, #videos, #characters, #about');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden');
        } else {
            entry.target.classList.remove('visible');
            entry.target.classList.add('hidden');
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => {
    section.classList.add('fade-section');
    observer.observe(section);
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .hamburger, .card-socials a, .nav-links a, .video-photos img').forEach(el => {
    el.addEventListener('mouseenter', () => {
        dot.classList.add('hover');
        ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        dot.classList.remove('hover');
        ring.classList.remove('hover');
    });
});

if ('ontouchstart' in window) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    document.body.style.cursor = 'auto';
}
