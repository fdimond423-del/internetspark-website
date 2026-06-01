/* ============================================
   INTERNET SPARK — Main JavaScript
   ============================================ */

// ===== Page Loader & Dynamic Logo Replacement =====
// Removed dynamic logo replacement as requested by user

window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }
  }, 800);
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (navbar) {
    if (current > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  lastScroll = current;
});

// ===== Mobile Menu =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Immediately show elements already in viewport on load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);
});

// ===== Counter Animation =====
function animateCounter(el, target, duration = 2000, suffix = '') {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString() + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const target = parseInt(entry.target.dataset.target);
      const suffix = entry.target.dataset.suffix || '';
      animateCounter(entry.target, target, 2000, suffix);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

// ===== Particle System =====
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = Math.floor(window.innerWidth / 20);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '233,30,140' : '123,47,190';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Mouse interaction
  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(233,30,140,${0.08 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    if (!canvas) return;
    
    // if (window.innerWidth < 768) return; // Disable on mobile for performance
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

initParticles();

// ===== Three.js 3D Globe =====
function initHeroGlobe() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Texture loader for 3D earth
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('images/earth.jpg');

  // Globe geometry
  const geometry = new THREE.SphereGeometry(2, 64, 64);
  const wireframeGeo = new THREE.SphereGeometry(2.05, 32, 32);

  const material = new THREE.MeshPhongMaterial({
    map: earthTexture,
    shininess: 60,
    transparent: true,
    opacity: 0.55,
  });

  const wireframeMat = new THREE.MeshBasicMaterial({
    color: 0xE91E8C,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });

  const globe = new THREE.Mesh(geometry, material);
  const wireframe = new THREE.Mesh(wireframeGeo, wireframeMat);
  scene.add(globe);
  scene.add(wireframe);

  // Particles around globe
  const particleGeo = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 500; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = 2.5 + Math.random() * 1.5;
    positions.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
  }
  particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xE91E8C,
    size: 0.04,
    transparent: true,
    opacity: 0.7
  });
  const particlesMesh = new THREE.Points(particleGeo, particleMat);
  scene.add(particlesMesh);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xE91E8C, 2, 10);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  const pointLight2 = new THREE.PointLight(0x7B2FBE, 1.5, 10);
  pointLight2.position.set(-5, -3, -5);
  scene.add(pointLight2);

  camera.position.z = 5;

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.003;
    wireframe.rotation.y += 0.003;
    wireframe.rotation.x += 0.001;
    particlesMesh.rotation.y -= 0.001;
    globe.rotation.x += (mouseY * 0.1 - globe.rotation.x) * 0.05;
    globe.rotation.y += (mouseX * 0.1 - globe.rotation.y) * 0.02;
    wireframe.rotation.x = globe.rotation.x;
    wireframe.rotation.y = globe.rotation.y;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
}

// Initialize globe after Three.js loads
window.addEventListener('load', initHeroGlobe);

// ===== Typewriter Effect =====
function typewriter(el, words, speed = 100, deleteSpeed = 60, pauseTime = 2000) {
  if (!el || !words.length) return;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => { isDeleting = true; type(); }, pauseTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, isDeleting ? deleteSpeed : speed);
  }
  type();
}

const typeEl = document.getElementById('typewriter-text');
if (typeEl) {
  const words = typeEl.dataset.words ? JSON.parse(typeEl.dataset.words) : [];
  typewriter(typeEl, words);
}

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// ===== Active Nav Link =====
const currentPage = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPage || 
      link.getAttribute('href') === currentPage.split('/').pop()) {
    link.classList.add('active');
  }
});

// ===== Smooth anchor scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== Floating Card Parallax =====
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelectorAll('.floating-card').forEach((card, i) => {
    const factor = (i + 1) * 0.5;
    card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ===== Form Submission — Send to yashworkonly16@gmail.com =====
document.querySelectorAll('form[data-form], form.contact-form, form#contact-form, form').forEach(form => {
  // Skip forms that don't have an action or are search forms
  if (!form.action || form.method === 'get') return;
  // Avoid double binding
  if (form.dataset.bound) return;
  form.dataset.bound = 'true';

  // Detect if we're in /services/ subfolder
  const isService = window.location.pathname.includes('/services/');
  const thankYouUrl = isService ? '../thank-you.html' : 'thank-you.html';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"], button');
    const originalHTML = btn ? btn.innerHTML : '';
    if (btn) {
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
    }

    // Build form data and convert to JSON for AJAX submission
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      // Don't append empty optional fields
      if (value !== '') {
        data[key] = value;
      }
    });

    // Ensure email and subject defaults
    data['_replyto'] = data['email'] || 'yashworkonly16@gmail.com';
    data['_subject'] = data['_subject'] || 'New Enquiry from Internet Spark Website';
    data['_captcha'] = 'false'; // Disable captcha for smooth flow

    // Use FormSubmit.co AJAX endpoint with yashworkonly16@gmail.com
    const endpoint = 'https://formsubmit.co/ajax/yashworkonly16@gmail.com';

    try {
      // Send the request to FormSubmit.co
      await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn('FormSubmit AJAX failed (might be CORS or local file):', err);
    }

    // Always redirect to the thank you page for the best user experience!
    window.location.href = thankYouUrl;
  });
});


// ===== Staggered animation for cards =====
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('.service-card, .glass-card, .case-card, .blog-card, .testimonial-card, .result-card, .process-step, .feature-item');
      children.forEach((child, i) => {
        child.style.animationDelay = `${i * 0.08}s`;
        child.classList.add('reveal');
        setTimeout(() => child.classList.add('visible'), i * 80);
      });
      staggerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.services-grid, .cases-grid, .testimonials-grid, .blog-grid, .results-grid, .process-steps, .feature-grid').forEach(el => {
  staggerObserver.observe(el);
});
