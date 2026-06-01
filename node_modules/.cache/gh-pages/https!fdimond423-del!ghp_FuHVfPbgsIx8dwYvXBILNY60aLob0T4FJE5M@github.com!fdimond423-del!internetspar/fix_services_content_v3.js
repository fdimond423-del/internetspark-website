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
    'Search Engine Optimization (SEO) Services': 'seo.html',
    'Website Development Services': 'website-development.html',
    'Branding & Graphic Design Services': 'branding-graphic-design.html',
    'Video Editing Services': 'video-editing.html',
    'AI Avatar & AI Video Services': 'ai-avatar-video.html',
    'Lead Generation Services': 'lead-generation.html',
    'Google My Business (GMB) Optimization Services': 'google-my-business.html',
    'Content Creation Services': 'content-creation.html',
    'CRM & Automation Services': 'crm-automation.html',
    'LinkedIn Personal Branding Services': 'linkedin-branding.html',
    'Real Estate Marketing Services': 'real-estate-marketing.html',
    'Local Business Marketing Services': 'local-business-marketing.html',
    'YouTube Marketing Services': 'youtube-marketing.html'
};

let currentService = null;
let currentMode = null;
const servicesData = {};

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    if (fileMap[line]) {
        currentService = line;
        servicesData[currentService] = { title: line, intro: [], includes: [], benefits: [] };
        currentMode = 'intro';
        if (lines[i+1] && lines[i+1].length > 10 && !lines[i+1].startsWith('Our ')) i++; 
        continue;
    }

    if (currentService) {
        if (line.startsWith('Our ') && line.includes(' Services Include')) {
            currentMode = 'includes';
            continue;
        } else if (line.startsWith('Why Choose Our ') || line.startsWith('Benefits of ')) {
            currentMode = 'benefits';
            continue;
        }

        if (line === 'CTA Buttons' || line === 'Benefits of Meta Ads Services') {
            currentMode = null;
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

for (const [serviceName, fileName] of Object.entries(fileMap)) {
    if (fileName === 'whatsapp-marketing.html') continue; 
    
    const filePath = path.join(servicesDir, fileName);
    if (!fs.existsSync(filePath)) continue;

    let html = fs.readFileSync(filePath, 'utf8');
    const data = servicesData[serviceName];
    if (!data) continue;

    // 1. Replace the Overview Text robustly
    let introHtml = data.intro.map(p => `<p style="color:var(--text-muted);line-height:1.9;margin-bottom:18px;font-size:0.97rem">${p}</p>`).join('\n');
    html = html.replace(/<p[^>]*>\s*With over 500 million active users in India alone[\s\S]*?maximum engagement\.\s*<\/p>/, introHtml);
    html = html.replace(/<span class="section-badge"[^>]*>💡 The WhatsApp Advantage<\/span>/, '<span class="section-badge" style="margin-bottom:16px;display:inline-block">💡 The Spark Advantage</span>');
    html = html.replace(/<h2[^>]*>\s*Why WhatsApp is the <span class="text-gradient">Most Powerful<\/span> Marketing Channel in India\s*<\/h2>/, `<h2 style="font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:800;margin-bottom:20px;line-height:1.3">Transforming Your Business with <span class="text-gradient">Digital Growth</span></h2>`);

    // Remove the WhatsApp specific CTA in the overview
    html = html.replace(/<div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:28px">\s*<a href="\.\.\/contact\.html" class="btn btn-primary" id="wa-overview-cta">[\s\S]*?<\/a>\s*<\/div>/, '');

    // 2. Add the Impact Stats Card (filling the empty right column)
    const statsCardHtml = `<div class="" data-aos="fade-up">
    <div class="glass-card" data-aos="fade-up" data-aos-delay="100" style="padding:36px">
    <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:24px;text-align:center">🚀 Digital Growth Impact</h3>
    <div style="space-y:14px">
    <div style="margin-bottom:14px">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
    <span style="font-size:0.9rem;font-weight:600">Client ROI Improvement</span>
    <span style="font-weight:700;color:var(--primary)">300%</span>
    </div>
    <div style="height:8px;background:rgba(255,255,255,0.07);border-radius:4px;overflow:hidden">
    <div style="height:100%;width:90%;background:linear-gradient(90deg,var(--primary-dark),var(--primary-light));border-radius:4px"></div>
    </div>
    </div>
    <div style="margin-bottom:14px">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
    <span style="font-size:0.9rem;font-weight:600">Audience Engagement</span>
    <span style="font-weight:700;color:var(--primary)">5X</span>
    </div>
    <div style="height:8px;background:rgba(255,255,255,0.07);border-radius:4px;overflow:hidden">
    <div style="height:100%;width:80%;background:linear-gradient(90deg,var(--primary-dark),var(--primary-light));border-radius:4px"></div>
    </div>
    </div>
    <div style="margin-bottom:14px">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
    <span style="font-size:0.9rem;font-weight:600">Brand Visibility Focus</span>
    <span style="font-weight:700;color:var(--primary)">High</span>
    </div>
    <div style="height:8px;background:rgba(255,255,255,0.07);border-radius:4px;overflow:hidden">
    <div style="height:100%;width:95%;background:linear-gradient(90deg,var(--primary-dark),var(--primary-light));border-radius:4px"></div>
    </div>
    </div>
    </div>
    <p style="font-size:0.78rem;color:var(--text-muted);margin-top:16px;text-align:center">Data based on our average campaign performance</p>
    </div>
    </div>`;
    
    // Inject it into the grid (robust regex)
    // Avoid double injection if already injected
    if (!html.includes('Digital Growth Impact')) {
        // If the empty div exists, replace it
        if (/<div class="" data-aos="fade-up">\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/.test(html)) {
            html = html.replace(/<div class="" data-aos="fade-up">\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/, `${statsCardHtml}\n</div>\n</div>\n</section>`);
        } else {
            // Otherwise, inject it after the left column closes
            html = html.replace(/(<\/div>)\s*<\/div>\s*<\/div>\s*<\/section>/, `$1\n${statsCardHtml}\n</div>\n</div>\n</section>`);
        }
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated content and layout for: ${fileName}`);
}
console.log('Done fixing content for all services!');
