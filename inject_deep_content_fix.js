const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, 'Website_content.txt');
const servicesDir = path.join(__dirname, 'services');

const content = fs.readFileSync(contentPath, 'utf8');
const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').map(l => l.trim());

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
let currentMode = null;
const servicesData = {};

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    if (fileMap[line]) {
        currentService = line;
        servicesData[currentService] = { title: line, intro: [], includes: [], includes_text: [], benefits: [], benefits_text: [] };
        currentMode = 'intro';
        if (lines[i+1] && lines[i+1].length > 10 && !lines[i+1].startsWith('Our ')) i++; 
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
            // Check if it's a short bullet or a long paragraph
            if (line.length > 80 || line.includes('We combine creativity') || line.includes('At Fenil') || line.includes('Why Choose')) {
                servicesData[currentService].includes_text.push(line);
            } else {
                servicesData[currentService].includes.push(line);
            }
        } else if (currentMode === 'benefits' && line.length > 5) {
            if (line.length > 80 || line.includes('Our goal is to') || line.includes('If you are looking')) {
                servicesData[currentService].benefits_text.push(line);
            } else {
                servicesData[currentService].benefits.push(line);
            }
        }
    }
}

Object.keys(servicesData).forEach(key => {
    const data = servicesData[key];
    const filename = fileMap[key];
    if (!filename) return;

    const filePath = path.join(servicesDir, filename);
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    // 1. Generate Intro
    let introHtml = data.intro.map((p, idx) => {
        let text = p;
        if (idx === 0) text = `As the <strong>Best Digital Marketing Agency in Ahmedabad</strong>, ${text.charAt(0).toLowerCase() + text.slice(1)}`;
        return `<p style="margin-bottom:15px; font-size:1.05rem; line-height:1.7; color:var(--text-muted);">${text}</p>`;
    }).join('\n');

    // 2. Generate Includes Grid + Extra Text
    let includesHtml = data.includes.map((item, idx) => {
        let delay = (idx % 4) * 50;
        return `<div class="feature-item reveal" data-aos="fade-up" data-aos-delay="${delay}">
            <div class="feat-icon" style="color:var(--primary); font-size:1.5rem;"><i class="fas fa-check-circle"></i></div>
            <div><h4 style="font-size:1.1rem; margin-bottom:5px;">${item}</h4></div>
        </div>`;
    }).join('\n');
    
    if (data.includes_text.length > 0) {
        let extraText = data.includes_text.map(t => `<p style="margin-top:20px; font-size:1.1rem; color:var(--text-muted); line-height:1.7; grid-column: 1 / -1;">${t}</p>`).join('\n');
        includesHtml += `\n${extraText}`;
    }

    // 3. Generate Benefits Grid + Extra Text
    let benefitsHtml = data.benefits.map((item, idx) => {
        let delay = (idx % 4) * 50;
        return `<div class="glass-card reveal" data-aos="fade-up" data-aos-delay="${delay}" style="padding:20px; text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:center;">
            <div style="font-size:2rem; color:var(--accent); margin-bottom:10px;"><i class="fas fa-chart-line"></i></div>
            <h5 style="font-size:1rem; margin-bottom:0; line-height:1.4;">${item}</h5>
        </div>`;
    }).join('\n');
    
    if (data.benefits_text.length > 0) {
        let extraText = data.benefits_text.map(t => `<p style="margin-top:30px; font-size:1.1rem; color:var(--text-muted); line-height:1.7; grid-column: 1 / -1; text-align:center;">${t}</p>`).join('\n');
        benefitsHtml += `\n${extraText}`;
    }

    // Replace Intro
    html = html.replace(/(<div class="-left" data-aos="fade-up">\s*<div class="section-badge">.*?<\/div>\s*<h2>.*?<\/h2>\s*)(.*?)(<\/div>\s*<div class="-right")/s, `$1\n${introHtml}\n$3`);
    html = html.replace(/(<div class="reveal-left">\s*<div class="section-badge">.*?<\/div>\s*<h2>.*?<\/h2>\s*)(.*?)(<\/div>\s*<div class="reveal-right")/s, `$1\n${introHtml}\n$3`);

    // Replace feature grid
    html = html.replace(/(<div class="feature-grid">)(.*?)(<\/div>\s*<\/div>\s*<\/section>)/s, `$1\n${includesHtml}\n$3`);

    // Replace Benefits grid (this matches the previously modified header or the original)
    html = html.replace(/(<section class="section-padding">\s*<div class="container">\s*<div class="section-header " data-aos="fade-up">.*?<\/h2><\/div>\s*<div style="display:grid;grid-template-columns:repeat\(auto-fill,minmax\(150px,1fr\)\);gap:20px">)(.*?)(<\/div>\s*<\/div>\s*<\/section>)/s, 
    (match, p1, p2, p3) => {
        return `${p1}\n${benefitsHtml}\n${p3}`;
    });

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Repaired Content for: ${filename}`);
});
