// Initialize AOS if available
if (window.AOS) {
    AOS.init({ duration: 800, easing: 'ease-out', once: true });
}

// Pause hero slideshow animation on hover for accessibility
document.addEventListener('DOMContentLoaded', function () {
    const slideshow = document.querySelector('.hero-slideshow');
    if (!slideshow) return;
    // JS-driven slideshow (better control & accessibility)
    const slides = Array.from(slideshow.querySelectorAll('.slide'));
    const dotsContainer = document.querySelector('.slideshow-dots');
    let current = 0;
    let intervalId = null;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function goTo(index) {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        const dots = Array.from(dotsContainer.querySelectorAll('button'));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        current = index;
    }

    function next() {
        goTo((current + 1) % slides.length);
    }

    // build dots
    slides.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', `Show slide ${i+1}`);
        btn.addEventListener('click', () => {
            stopAuto();
            goTo(i);
        });
        dotsContainer.appendChild(btn);
    });

    // start
    goTo(0);
    if (!prefersReduced) {
        intervalId = setInterval(next, 4500);
    }

    function stopAuto() {
        if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    slideshow.addEventListener('mouseenter', stopAuto);
    slideshow.addEventListener('focusin', stopAuto);
    slideshow.addEventListener('mouseleave', () => { if (!prefersReduced && !intervalId) intervalId = setInterval(next, 4500); });
    slideshow.addEventListener('focusout', () => { if (!prefersReduced && !intervalId) intervalId = setInterval(next, 4500); });
});
