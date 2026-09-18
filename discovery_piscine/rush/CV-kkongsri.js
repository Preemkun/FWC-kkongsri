    document.addEventListener('DOMContentLoaded', function() {
      
      // Active Section
      const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
      const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href').substring(1);
        return document.getElementById(id);
      }).filter(Boolean);

      window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        sections.forEach((section, index) => {
          if (
            section.offsetTop <= scrollPosition &&
            section.offsetTop + section.offsetHeight > scrollPosition
          ) {
            navLinks.forEach(l => l.classList.remove('active'));
            if (navLinks[index]) {
              navLinks[index].classList.add('active');
            }
          }
        });
      });
    });