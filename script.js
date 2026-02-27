document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const sections = document.querySelectorAll('section');
  const hireMeButton = document.querySelector('.hire-me-button');
  const contactForm = document.getElementById('contactForm');
  const modal = document.getElementById('codeModal');

  document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

  function setActiveSection(sectionId) {
    if (!sectionId) return;

    const targetSection = document.getElementById(sectionId);
    const targetLink = document.querySelector(`nav a[href="#${sectionId}"]`);

    if (!targetSection) return; 

    document.querySelectorAll('nav a.active').forEach(link => link.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));
    
    targetLink?.classList.add('active');
    targetSection.classList.add('active');
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    history.pushState(null, null, `#${sectionId}`);
    
  }
  if (nav) {
    nav.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        setActiveSection(href.substring(1));
      }
    });
  }

  if (hireMeButton) {
    hireMeButton.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveSection('contact');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const formData = new FormData(this);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
          alert('Thank you! Your message has been sent.');
          this.reset();
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        alert('Oops! There was a problem submitting your form.');
        console.error('Form submission error:', error);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
  window.openModal = () => {
    if (modal) modal.style.display = "block";
  };

  window.closeModal = () => {
    if (modal) modal.style.display = "none";
  };

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      window.closeModal();
    }
  });

  const initialHash = window.location.hash.substring(1);
  setActiveSection(initialHash || 'home'); 
});
