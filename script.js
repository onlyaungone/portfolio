document.addEventListener('DOMContentLoaded', () => {
  const skillBalanceContainers = document.querySelectorAll('[data-skill-balance]');

  skillBalanceContainers.forEach((container) => {
    if (container.dataset.skillBalanced === 'true') {
      return;
    }

    const skills = Array.from(container.querySelectorAll(':scope > .skill'));
    if (skills.length === 0) {
      return;
    }

    const midpoint = Math.ceil(skills.length / 2);
    const leftColumn = document.createElement('div');
    const rightColumn = document.createElement('div');

    leftColumn.className = 'skills-column';
    rightColumn.className = 'skills-column';

    skills.forEach((skill, index) => {
      if (index < midpoint) {
        leftColumn.appendChild(skill);
      } else {
        rightColumn.appendChild(skill);
      }
    });

    container.replaceChildren(leftColumn, rightColumn);
    container.dataset.skillBalanced = 'true';
  });

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

  const skillSection = document.querySelector('.skills-grid, .skills-columns, .skills-balance');
  const skillFills = document.querySelectorAll('.bar-fill');

  function animateSkills() {
    skillFills.forEach((fill) => {
      const top = fill.getBoundingClientRect().top;
      const isVisible = top < window.innerHeight;

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
    animateSkills();
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
