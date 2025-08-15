(function () {
  const root = document.documentElement;
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', savedTheme);
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Mobile nav
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('show');
    });
  }

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Contact form validation
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      // Reset errors
      [nameError, emailError, messageError].forEach(el => el.textContent = '');

      if (!name.value.trim()) { nameError.textContent = 'Please enter your name.'; ok = false; }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Please enter a valid email.'; ok = false;
      }
      if (!message.value.trim()) { messageError.textContent = 'Please write a message.'; ok = false; }

      if (ok) {
        // Demo only: Show a success message.
        alert('Thanks! Your message was validated locally. Connect to Formspree/Netlify to send emails.');
        form.reset();
      }
    });
  }
})();
