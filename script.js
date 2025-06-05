document.addEventListener('DOMContentLoaded', function() {
  // Handle navigation
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section');
  
  function setActiveSection(sectionId) {
    // Remove active class from all nav links and sections
    navLinks.forEach(link => link.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));
    
    // Add active class to clicked link and matching section
    document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
    document.getElementById(sectionId).classList.add('active');
    
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('href').substring(1);
      setActiveSection(sectionId);
    });
  });
  
  // Handle Hire Me button
  const hireMeButton = document.querySelector('.hire-me-button');
  if (hireMeButton) {
    hireMeButton.addEventListener('click', function(e) {
      e.preventDefault();
      setActiveSection('contact');
    });
  }
  
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Stop default submit (so we can use JS)

    const formData = new FormData(this);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
    .then(() => {
      alert('Thank you! Your message has been sent.');
      this.reset();
    })
    .catch((error) => {
      alert('Oops! There was a problem.');
      console.error(error);
    });
  });
}
  
  // Set home as active by default
  setActiveSection('home');
});

  function openModal() {
    document.getElementById("codeModal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("codeModal").style.display = "none";
  }

  // Optional: Close the modal when clicking outside of it
  window.onclick = function(event) {
    const modal = document.getElementById("codeModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }