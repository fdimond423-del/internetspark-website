const fs = require('fs');
const path = 'C:/Users/FENIL LIMBACHIYA/Downloads/internetspark website 2026/index.html';
let html = fs.readFileSync(path, 'utf8');

html = html.replace('<head>', '<head>\n  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">');
html = html.replace('</body>', '  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>\n  <script>AOS.init({duration: 800, once: true});</script>\n</body>');

// Replace classes
html = html.replace(/class="([^"]*)reveal([^"]*)"/g, 'class="$1$2" data-aos="fade-up"');
html = html.replace(/class="([^"]*)reveal-left([^"]*)"/g, 'class="$1$2" data-aos="fade-right"');
html = html.replace(/class="([^"]*)reveal-right([^"]*)"/g, 'class="$1$2" data-aos="fade-left"');
html = html.replace(/class="([^"]*)service-card([^"]*)"/g, 'class="$1service-card$2" data-aos="fade-up" data-aos-delay="100"');
html = html.replace(/class="([^"]*)why-item([^"]*)"/g, 'class="$1why-item$2" data-aos="fade-up" data-aos-delay="100"');
html = html.replace(/class="([^"]*)process-step([^"]*)"/g, 'class="$1process-step$2" data-aos="fade-up" data-aos-delay="100"');

fs.writeFileSync(path, html, 'utf8');
console.log('Done');
