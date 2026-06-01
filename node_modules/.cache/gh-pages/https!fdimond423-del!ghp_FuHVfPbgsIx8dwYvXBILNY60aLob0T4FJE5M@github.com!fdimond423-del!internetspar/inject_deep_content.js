const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, 'Website_content.txt');
const servicesDir = path.join(__dirname, 'services');

const content = fs.readFileSync(contentPath, 'utf8');
// Handle all types of line breaks
const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').map(l => l.trim());

// Map service titles from text to html files
const fileMap = {
    'Social Media Marketing Services': 'social-media-marketing.html',
    'Meta Ads Services': 'meta-ads.html',
    'Google Ads Services': 'google-ads.html',
    'SEO Services': 'seo.html',
    'Website Development Services': 'website-development.html',
    'Branding & Graphic Design Services': 'branding-graphic-design.html',
    'Video Editing Services': 'video-editing.html',
    'AI Video Services': 'ai-avatar-video.html',
    'Lead Generation Services': 'lead-generation.html',
    'GMB Optimization Services': 'google-my-business.html',
    'Content Creation Services': 'content-creation.html',
    'CRM & Automation Services': 'crm-automation.html',
    'LinkedIn Personal Branding Services': 'linkedin-branding.html',
    'Real Estate Marketing Services': 'real-estate-marketing.html',
    'Local Business Marketing Services': 'local-business-marketing.html',
    'YouTube Marketing Services': 'youtube-marketing.html',
    'E-commerce Marketing Services': 'ecommerce-marketing.html',
    'WhatsApp Marketing Services': 'whatsapp-marketing.html',
    'Funnel & Landing Page Services': 'funnel-landing-page.html'
};

let currentService = null;
let currentMode = null; // 'intro', 'includes', 'benefits'
const servicesData = {};

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    if (fileMap[line]) {
        currentService = line;
        servicesData[currentService] = { title: line, intro: [], includes: [], benefits: [] };
        currentMode = 'intro';
        
        // Skip the next line if it looks like a tagline
        if (lines[i+1] && lines[i+1].length > 10 && !lines[i+1].startsWith('Our ')) {
            i++; 
        }
        continue;
    }

    if (currentService) {
        if (line.startsWith('Our ') && line.includes(' Services Include')) {
            currentMode = 'includes';
            continue;
        }
        if (line.startsWith('Benefits of ')) {
            currentMode = 'benefits';
            continue;
        }

        if (currentMode === 'intro' && line.length > 20) {
            servicesData[currentService].intro.push(line);
        } else if (currentMode === 'includes' && line.length > 5) {
            servicesData[currentService].includes.push(line);
        } else if (currentMode === 'benefits' && line.length > 5) {
            servicesData[currentService].benefits.push(line);
        }
    }
}

console.log('Services found:', Object.keys(servicesData).length);

// Now generate HTML for each
Object.keys(servicesData).forEach(key => {
    const data = servicesData[key];
    const filename = fileMap[key];
    if (!filename) return;

    const filePath = path.join(servicesDir, filename);
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    // Generate Intro Paragraphs
    let introHtml = data.intro.map((p, idx) => {
        let text = p;
        if (idx === 0) {
            text = `As the <strong>Best Digital Marketing Agency</strong>, ${text.charAt(0).toLowerCase() + text.slice(1)}`;
        }
        return `<p style="margin-bottom:15px; font-size:1.05rem; line-height:1.7; color:var(--text-muted);">${text}</p>`;
    }).join('\n');

    // Generate "Services Include" List
    let includesHtml = data.includes.map((item, idx) => {
        let delay = (idx % 4) * 50;
        return `<div class="feature-item reveal" data-aos="fade-up" data-aos-delay="${delay}">
            <div class="feat-icon" style="color:var(--primary); font-size:1.5rem;"><i class="fas fa-check-circle"></i></div>
            <div><h4 style="font-size:1.1rem; margin-bottom:5px;">${item}</h4>
            <p style="font-size:0.9rem; color:var(--text-muted);">Comprehensive and advanced ${item.toLowerCase()} to ensure maximum ROI and unparalleled growth for your brand.</p></div>
        </div>`;
    }).join('\n');

    // Generate Benefits
    let benefitsHtml = data.benefits.map((item, idx) => {
        let delay = (idx % 4) * 50;
        return `<div class="glass-card reveal" data-aos="fade-up" data-aos-delay="${delay}" style="padding:20px; text-align:center;">
            <div style="font-size:2rem; color:var(--accent); margin-bottom:10px;"><i class="fas fa-chart-line"></i></div>
            <h5 style="font-size:1rem; margin-bottom:0;">${item}</h5>
        </div>`;
    }).join('\n');

    // 1. Replace Intro
    html = html.replace(/(<div class="-left" data-aos="fade-up">\s*<div class="section-badge">.*?<\/div>\s*<h2>.*?<\/h2>\s*)(.*?)(<\/div>\s*<div class="-right")/s, `$1\n${introHtml}\n$3`);
    // Fallback if the classes are already "reveal-left"
    html = html.replace(/(<div class="reveal-left">\s*<div class="section-badge">.*?<\/div>\s*<h2>.*?<\/h2>\s*)(.*?)(<\/div>\s*<div class="reveal-right")/s, `$1\n${introHtml}\n$3`);

    // 2. Replace feature grid
    html = html.replace(/(<div class="feature-grid">)(.*?)(<\/div>\s*<\/div>\s*<\/section>)/s, `$1\n${includesHtml}\n$3`);

    // 3. Replace Platforms/Benefits grid
    html = html.replace(/(<!-- Platforms -->\s*<section class="section-padding">\s*<div class="container">\s*<div class="section-header " data-aos="fade-up">.*?<h2>.*?<\/h2><\/div>\s*<div style="display:grid;grid-template-columns:repeat\(auto-fill,minmax\(150px,1fr\)\);gap:20px">)(.*?)(<\/div>\s*<\/div>\s*<\/section>)/s, 
    (match, p1, p2, p3) => {
        let newHeader = p1.replace(/<div class="section-badge">.*?<\/div><h2>.*?<\/h2><\/div>/, `<div class="section-badge"><i class="fas fa-star"></i> Core Benefits</div><h2>Why Choose Our <span class="text-gradient">Services</span></h2></div>`);
        return `${newHeader}\n${benefitsHtml}\n${p3}`;
    });

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Deep Content Updated: ${filename}`);
});
