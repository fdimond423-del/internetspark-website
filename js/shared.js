/* Shared Nav & Footer Injector */
(function() {
    let base = '';
  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].getAttribute('src');
    if (src && src.includes('shared.js')) {
      if (src.startsWith('../')) base = '../';
      else if (src.startsWith('../../')) base = '../../';
      break;
    }
  }

  
  const navHTML = `
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="${base}index.html" class="nav-logo">
        <img src="${base}images/logo-final.png" alt="Internet Spark Logo" style="height: 165px; width: auto; object-fit: contain; margin-top: -25px;">
      </a>
      <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
      <ul class="nav-menu" id="nav-menu">
        <li class="nav-item"><a href="${base}index.html" class="nav-link">Home</a></li>
        <li class="nav-item"><a href="${base}about.html" class="nav-link">About</a></li>
        <li class="nav-item has-mega-menu">
          <a href="${base}services.html" class="nav-link">Services <i class="fas fa-chevron-down" style="font-size:0.7rem"></i></a>
          <div class="mega-menu"><div class="mega-menu-grid">
            <a href="${base}services/social-media-marketing.html" class="mega-menu-item"><span class="icon">📱</span>Social Media Marketing</a>
            <a href="${base}services/meta-ads.html" class="mega-menu-item"><span class="icon">📘</span>Meta Ads</a>
            <a href="${base}services/google-ads.html" class="mega-menu-item"><span class="icon">🎯</span>Google Ads</a>
            <a href="${base}services/seo.html" class="mega-menu-item"><span class="icon">🔍</span>Search Engine Optimization</a>
            <a href="${base}services/website-development.html" class="mega-menu-item"><span class="icon">💻</span>Website Development</a>
            <a href="${base}services/branding-graphic-design.html" class="mega-menu-item"><span class="icon">🎨</span>Branding</a>
            <a href="${base}services/video-editing.html" class="mega-menu-item"><span class="icon">🎬</span>Video Editing</a>
            <a href="${base}services/ai-avatar-video.html" class="mega-menu-item"><span class="icon">🤖</span>AI Video</a>
            <a href="${base}services/google-my-business.html" class="mega-menu-item"><span class="icon">📍</span>Google My Business</a>
            <a href="${base}services/crm-automation.html" class="mega-menu-item"><span class="icon">⚙️</span>CRM & Automation</a>
            <a href="${base}services/real-estate-marketing.html" class="mega-menu-item"><span class="icon">🏠</span>Real Estate Marketing</a>
            <a href="${base}services/whatsapp-marketing.html" class="mega-menu-item"><span class="icon">💬</span>WhatsApp Marketing</a>
          </div></div>
        </li>
        <li class="nav-item"><a href="${base}portfolio.html" class="nav-link">Portfolio</a></li>
        <li class="nav-item"><a href="${base}case-studies.html" class="nav-link">Case Studies</a></li>
        <li class="nav-item"><a href="${base}blog.html" class="nav-link">Blog</a></li>
        <li class="nav-item"><a href="${base}contact.html" class="nav-link nav-cta">Get Started</a></li>
      </ul>
    </div>
  </nav>`;

  const footerHTML = `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo">
            <a href="${base}index.html" style="display:inline-block;">
              <img src="${base}images/logo-final.png" alt="Internet Spark Logo" style="height: 140px; width: auto; object-fit: contain; mix-blend-mode: screen; margin-left: -20px;">
            </a>
          </div>
          <p>Internet Spark is a premium international digital marketing agency. Data-driven strategies that transform businesses and generate measurable ROI.</p>
          <div class="footer-socials">
            <a href="https://www.facebook.com/internetspark" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/internet_spark/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://wa.me/919313702720" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            <a href="https://www.youtube.com/@InternetSparkPrivateLimited" target="_blank" rel="noopener" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
            <a href="https://www.linkedin.com/company/internet-spark/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div><h4 class="footer-heading">Quick Links</h4><ul class="footer-links">
          <li><a href="${base}index.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> Home</a></li>
          <li><a href="${base}about.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> About Us</a></li>
          <li><a href="${base}services.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> Services</a></li>
          <li><a href="${base}portfolio.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> Portfolio</a></li>
          <li><a href="${base}case-studies.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> Case Studies</a></li>
          <li><a href="${base}blog.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> Blog</a></li>
          <li><a href="${base}contact.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> Contact</a></li>
        </ul></div>
        <div><h4 class="footer-heading">Services</h4><ul class="footer-links">
          <li><a href="${base}services/social-media-marketing.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> Social Media</a></li>
          <li><a href="${base}services/meta-ads.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> Meta Ads</a></li>
          <li><a href="${base}services/google-ads.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> Google Ads</a></li>
          <li><a href="${base}services/seo.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> SEO</a></li>
          <li><a href="${base}services/website-development.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> Website Dev</a></li>
          <li><a href="${base}services/real-estate-marketing.html"><i class="fas fa-chevron-right" style="font-size:0.7rem"></i> Real Estate</a></li>
        </ul></div>
        <div><h4 class="footer-heading">Contact Us</h4>
          <div class="footer-contact-item"><div class="icon"><i class="fas fa-map-marker-alt"></i></div><div>A-407, KP Epitome, Nr. DAV International School, Makarba – 380051</div></div>
          <div class="footer-contact-item"><div class="icon"><i class="fas fa-phone-alt"></i></div><div><a href="tel:+919313702720">+91 93137 02720</a></div></div>
          <div class="footer-contact-item"><div class="icon"><i class="fas fa-envelope"></i></div><div><a href="mailto:yashworkonly16@gmail.com">yashworkonly16@gmail.com</a></div></div>
          <div class="footer-contact-item"><div class="icon"><i class="fas fa-clock"></i></div><div>Mon–Sat: 9 AM – 7 PM</div></div>
          <a href="${base}contact.html" class="btn btn-primary" style="margin-top:20px;display:inline-flex"><i class="fas fa-paper-plane"></i> Send a Message</a>
        </div>
      </div>
      <div class="footer-bottom"><p>© 2024 Internet Spark. All Rights Reserved. | Made with ❤️</p><div style="display:flex;gap:20px"><a href="${base}privacy-policy.html" style="color:var(--text-muted);font-size:0.875rem">Privacy Policy</a><a href="${base}contact.html" style="color:var(--text-muted);font-size:0.875rem">Contact</a></div></div>
    </div>
  </footer>`;

  // Inject nav
  const navPlaceholder = document.getElementById('shared-nav') || document.getElementById('navbar') || document.querySelector('.navbar');
  if (navPlaceholder) navPlaceholder.outerHTML = navHTML;
  else document.body.insertAdjacentHTML('afterbegin', navHTML);


  const footerPlaceholder = document.getElementById('shared-footer') || document.querySelector('footer');
  if (footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;

  // Remove pricing sections from service detail pages
  if (isService) {
    const removePricing = () => {
      document.querySelectorAll('section, div.pricing-table, div.pricing-grid').forEach(el => {
        const header = el.querySelector('h2, h3, h4, .section-badge, .section-header');
        if (header) {
          const headerText = header.textContent.toLowerCase();
          if (headerText.includes('pricing') || headerText.includes('packages') || headerText.includes('plans')) {
            el.remove();
          }
        }
        // Fallback checks on ID and Class name
        if (el.id && (el.id.includes('pricing') || el.id.includes('plans') || el.id.includes('packages'))) {
          el.remove();
        }
        if (el.className && typeof el.className === 'string' && (el.className.includes('pricing') || el.className.includes('plans') || el.className.includes('packages'))) {
          el.remove();
        }
      });
    };
    
    // Run immediately and also on DOMContentLoaded to ensure elements are removed
    removePricing();
    document.addEventListener('DOMContentLoaded', removePricing);
    window.addEventListener('load', removePricing);
  }

  // Highlight active link in navbar
  const highlightActiveLink = () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link, .mega-menu-item').forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const linkPage = href.split('/').pop();
        if (linkPage === pageName) {
          link.classList.add('active');
          if (link.classList.contains('mega-menu-item')) {
            const parent = link.closest('.has-mega-menu');
            if (parent) {
              const parentLink = parent.querySelector('.nav-link');
              if (parentLink) parentLink.classList.add('active');
            }
          }
        }
      }
    });
  };

  highlightActiveLink();
  document.addEventListener('DOMContentLoaded', highlightActiveLink);
})();
