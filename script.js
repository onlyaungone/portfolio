document.addEventListener('DOMContentLoaded', () => {
  // Reveal sections with scroll
  const sections = document.querySelectorAll('.section');

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => sectionObserver.observe(section));

  // Force reveal for visible sections on load
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && !section.classList.contains('visible')) {
      section.classList.add('visible');
    }
  });

  // Animate skill bars on scroll with percentage counters
  const skillSection = document.querySelector('.skills-grid');
  const skillFills = document.querySelectorAll('.bar-fill');

  function animateSkills() {
    skillFills.forEach((fill) => {
      const top = fill.getBoundingClientRect().top;
      const isVisible = top < window.innerHeight - 100;

      if (isVisible && !fill.classList.contains('visible')) {
        fill.classList.add('visible');

        // Animate bar fill
        const level = fill.style.getPropertyValue('--level');
        fill.style.width = level;

        // Animate percentage counter
        const skill = fill.closest('.skill');
        const percentElem = skill.querySelector('.percent');

        if (percentElem) {
          const target = +percentElem.dataset.target;
          let current = 0;

          const step = () => {
            const increment = Math.ceil(target / 30);
            current += increment;
            if (current >= target) {
              percentElem.textContent = `${target}%`;
            } else {
              percentElem.textContent = `${current}%`;
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      }
    });
  }

  if (skillSection && skillFills.length > 0) {
    window.addEventListener('scroll', animateSkills);
    window.addEventListener('load', animateSkills);
  }
});
