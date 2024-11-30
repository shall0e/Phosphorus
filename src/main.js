// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add loading animation for code preview
const codePreview = document.querySelector('.code-preview');
if (codePreview) {
    codePreview.addEventListener('mouseenter', () => {
        codePreview.style.transform = 'scale(1.02)';
        codePreview.style.transition = 'transform 0.3s ease';
    });
    
    codePreview.addEventListener('mouseleave', () => {
        codePreview.style.transform = 'scale(1)';
    });
}


// Assuming you've added a service binding called 'MY_WORKER'
async function fetchData(data) {
    console.log(RERSapi)
  }
  
  fetchData();  