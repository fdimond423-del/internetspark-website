const fs = require('fs');
const path = require('path');

function processHtmlFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // Add AOS CDN if not present
    if (!html.includes('aos.css')) {
        html = html.replace('</head>', '  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">\n</head>');
    }
    if (!html.includes('aos.js')) {
        html = html.replace('</body>', '  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>\n  <script>AOS.init({duration: 800, once: true});</script>\n</body>');
    }

    // Replace classes with AOS attributes if not already done
    html = html.replace(/class="([^"]*)reveal([^"]*)"/g, (match, p1, p2) => {
        if(match.includes('data-aos')) return match;
        return `class="${p1}${p2}" data-aos="fade-up"`;
    });
    html = html.replace(/class="([^"]*)reveal-left([^"]*)"/g, (match, p1, p2) => {
        if(match.includes('data-aos')) return match;
        return `class="${p1}${p2}" data-aos="fade-right"`;
    });
    html = html.replace(/class="([^"]*)reveal-right([^"]*)"/g, (match, p1, p2) => {
        if(match.includes('data-aos')) return match;
        return `class="${p1}${p2}" data-aos="fade-left"`;
    });
    
    html = html.replace(/class="([^"]*)service-card([^"]*)"/g, (match, p1, p2) => {
        if(match.includes('data-aos')) return match;
        return `class="${p1}service-card${p2}" data-aos="fade-up" data-aos-delay="100"`;
    });
    html = html.replace(/class="([^"]*)why-item([^"]*)"/g, (match, p1, p2) => {
         if(match.includes('data-aos')) return match;
        return `class="${p1}why-item${p2}" data-aos="fade-up" data-aos-delay="100"`;
    });
    html = html.replace(/class="([^"]*)process-step([^"]*)"/g, (match, p1, p2) => {
         if(match.includes('data-aos')) return match;
        return `class="${p1}process-step${p2}" data-aos="fade-up" data-aos-delay="100"`;
    });
    html = html.replace(/class="([^"]*)team-card([^"]*)"/g, (match, p1, p2) => {
         if(match.includes('data-aos')) return match;
        return `class="${p1}team-card${p2}" data-aos="fade-up" data-aos-delay="100"`;
    });
    html = html.replace(/class="([^"]*)stat-item([^"]*)"/g, (match, p1, p2) => {
         if(match.includes('data-aos')) return match;
        return `class="${p1}stat-item${p2}" data-aos="fade-up" data-aos-delay="100"`;
    });
    html = html.replace(/class="([^"]*)glass-card([^"]*)"/g, (match, p1, p2) => {
         if(match.includes('data-aos')) return match;
        return `class="${p1}glass-card${p2}" data-aos="fade-up" data-aos-delay="100"`;
    });

    fs.writeFileSync(filePath, html, 'utf8');
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                traverseDir(fullPath);
            }
        } else if (file.endsWith('.html')) {
            processHtmlFile(fullPath);
            console.log('Processed', fullPath);
        }
    }
}

traverseDir(__dirname);
