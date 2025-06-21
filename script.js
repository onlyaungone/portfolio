// Smooth scroll for internal links
const navLinks = document.querySelectorAll('nav a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.bar');

function animateSkills() {
  skillBars.forEach(bar => {
    const top = bar.getBoundingClientRect().top;
    const isVisible = top < window.innerHeight - 100;
    if (isVisible && !bar.classList.contains('visible')) {
      bar.classList.add('visible');
      bar.style.width = bar.style.getPropertyValue('--level');
    }
  });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);
