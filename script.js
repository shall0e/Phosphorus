// Smooth scroll for navigation links



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate features on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card').forEach((card) => {
    observer.observe(card);
});

// Animate stats on scroll
const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Trigger stat animations when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            (async () => {
                document.getElementById("toolsamount").innerHTML = (await (await fetch("https://ankor.pages.dev/api?rank=best")).json()).length;
                const statNumber = entry.target.querySelector('.stat-number');
                const finalValue = parseInt(statNumber.textContent);
                animateValue(statNumber, 0, finalValue, 2000);
                statsObserver.unobserve(entry.target);
            })();
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach((stat) => {
    statsObserver.observe(stat);
});