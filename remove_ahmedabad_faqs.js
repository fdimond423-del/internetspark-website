const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'services');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Replace the section badge and h2 for FAQs
    // Old: <div class="section-badge">🎙️ Voice Search / AEO</div><h2>Ahmedabad Social Media <span class="text-gradient">Voice Search FAQs</span></h2>
    
    html = html.replace(/<div class="section-badge">[^<]*Voice Search[^<]*<\/div>\s*<h2>Ahmedabad.*?FAQ.*?<\/h2>/gi, 
    `<div class="section-badge"><i class="fas fa-question-circle"></i> FAQs</div><h2>Frequently Asked <span class="text-gradient">Questions</span></h2>`);

    // In case the emoji was parsed differently, or it's a bit different:
    html = html.replace(/<div class="section-badge">[^<]*<\/div>\s*<h2>Ahmedabad.*?FAQ.*?<\/h2>/gi, 
    `<div class="section-badge"><i class="fas fa-question-circle"></i> FAQs</div><h2>Frequently Asked <span class="text-gradient">Questions</span></h2>`);

    fs.writeFileSync(filePath, html, 'utf8');
});

console.log(`Updated FAQs in ${files.length} files.`);
