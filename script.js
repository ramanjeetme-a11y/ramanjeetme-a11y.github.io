document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
    });
    
    // Close mobile nav when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
      });
    });
  }

  // Typewriter Effect
  const typewriter = document.getElementById('typewriter-text');
  const roles = ['Backend Engineer', 'Scala & Akka Developer', 'Spring Boot & Microservices Specialist'];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    if (!typewriter) return;
    
    // Check reduced motion (using window matchMedia)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typewriter.textContent = roles[0];
      return;
    }

    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      typewriter.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      typewriter.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      // Pause at full word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Initial check

  // Contact Form Handling
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Reset errors
      const errorEls = form.querySelectorAll('.form-error');
      errorEls.forEach(el => el.textContent = '');
      
      let isValid = true;
      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();
      
      if (!name) {
        document.getElementById('error-name').textContent = 'Please enter your name.';
        isValid = false;
      }
      
      if (!email) {
        document.getElementById('error-email').textContent = 'Please enter your email.';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('error-email').textContent = 'Please enter a valid email address.';
        isValid = false;
      }
      
      if (!message) {
        document.getElementById('error-message').textContent = 'Please enter your message.';
        isValid = false;
      }
      
      if (!isValid) {
        statusEl.className = 'form-status status-error';
        statusEl.textContent = 'Please correct the errors in the form before submitting.';
        return;
      }
      
      // Simulate form submission
      statusEl.className = 'form-status';
      statusEl.textContent = 'Sending message...';
      
      setTimeout(() => {
        statusEl.className = 'form-status status-success';
        statusEl.textContent = 'Thank you! Your message has been simulated successfully.';
        form.reset();
      }, 1200);
    });
  }
});
