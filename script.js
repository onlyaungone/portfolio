document.addEventListener('DOMContentLoaded', () => {
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

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && !section.classList.contains('visible')) {
      section.classList.add('visible');
    }
  });

  const skillSection = document.querySelector('.skills-grid, .skills-columns');
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

  const resumeTabs = document.querySelectorAll('[data-resume-tab]');
  const resumePanels = document.querySelectorAll('[data-resume-panel]');

  if (resumeTabs.length > 0 && resumePanels.length > 0) {
    const activateResumeTab = (target) => {
      resumeTabs.forEach((tab) => {
        const isActive = tab.dataset.resumeTab === target;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      resumePanels.forEach((panel) => {
        const isActive = panel.dataset.resumePanel === target;
        panel.classList.toggle('active', isActive);
        panel.hidden = !isActive;
      });
    };

    resumeTabs.forEach((tab) => {
      tab.addEventListener('click', () => activateResumeTab(tab.dataset.resumeTab));
    });

    activateResumeTab('work');
  }
});
