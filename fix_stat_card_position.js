const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'services');
const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));

const statsCardHtml = `<div class="stat-card-container" data-aos="fade-up" data-aos-delay="200">
    <div class="glass-card" style="padding:36px">
    <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:24px;text-align:center">🚀 Digital Growth Impact</h3>
    <div style="display:flex;flex-direction:column;gap:18px">
    <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
    <span style="font-size:0.95rem;font-weight:600">Client ROI Improvement</span>
    <span style="font-weight:800;color:var(--primary)">300%</span>
    </div>
    <div style="height:10px;background:rgba(255,255,255,0.07);border-radius:5px;overflow:hidden">
    <div style="height:100%;width:90%;background:linear-gradient(90deg,var(--primary-dark),var(--primary-light));border-radius:5px"></div>
    </div>
    </div>
    <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
    <span style="font-size:0.95rem;font-weight:600">Audience Engagement</span>
    <span style="font-weight:800;color:var(--primary)">5X</span>
    </div>
    <div style="height:10px;background:rgba(255,255,255,0.07);border-radius:5px;overflow:hidden">
    <div style="height:100%;width:80%;background:linear-gradient(90deg,var(--primary-dark),var(--primary-light));border-radius:5px"></div>
    </div>
    </div>
    <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
    <span style="font-size:0.95rem;font-weight:600">Brand Visibility Focus</span>
    <span style="font-weight:800;color:var(--primary)">High</span>
    </div>
    <div style="height:10px;background:rgba(255,255,255,0.07);border-radius:5px;overflow:hidden">
    <div style="height:100%;width:95%;background:linear-gradient(90deg,var(--primary-dark),var(--primary-light));border-radius:5px"></div>
    </div>
    </div>
    </div>
    <p style="font-size:0.8rem;color:var(--text-muted);margin-top:20px;text-align:center;font-style:italic">Data based on our average campaign performance</p>
    </div>
    </div>`;

files.forEach(file => {
    if (file === 'whatsapp-marketing.html') return;
    const filePath = path.join(servicesDir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Remove incorrectly placed stat card from ANYWHERE
    const badRegex1 = /<div class="" data-aos="fade-up">\s*<div class="glass-card" data-aos="fade-up" data-aos-delay="100" style="padding:36px">[\s\S]*?Data based on our average campaign performance<\/p>\s*<\/div>\s*<\/div>/g;
    html = html.replace(badRegex1, '');

    const badRegex2 = /<div class="stat-card-container"[^>]*>[\s\S]*?Data based on our average campaign performance<\/p>\s*<\/div>\s*<\/div>/g;
    html = html.replace(badRegex2, '');

    // Now, find the end of the overview section's left column and inject
    // We look specifically for the wa-overview section
    // Overview section looks like:
    // <section class="section" id="wa-overview">
    // <div class="container">
    // <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center">
    // <div class="" data-aos="fade-up">
    // ... paragraph texts ...
    // </div>
    // </div>
    // </div>
    // </section>

    const overviewRegex = /(<section class="section" id="wa-overview">[\s\S]*?<div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center">[\s\S]*?)(<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/;
    
    if (overviewRegex.test(html)) {
        html = html.replace(overviewRegex, `$1\n${statsCardHtml}\n$2`);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Fixed card position for: ${file}`);
    } else {
        console.log(`Could not find overview section for: ${file}`);
    }
});
console.log("All fixes applied.");
