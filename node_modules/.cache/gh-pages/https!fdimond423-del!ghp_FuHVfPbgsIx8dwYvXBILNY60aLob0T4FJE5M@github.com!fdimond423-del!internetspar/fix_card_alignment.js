const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'services');
const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));

let changedFiles = 0;

files.forEach(file => {
    const filePath = path.join(servicesDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // We want to add text-align: center; to the paragraphs in the cards if they don't have it
    // The previous script generated: <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.6;margin-top:8px;">
    
    const oldStyle = 'style="color:var(--text-muted);font-size:0.9rem;line-height:1.6;margin-top:8px;"';
    const newStyle = 'style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-top:12px;text-align:center;padding:0 10px;"';
    
    if (html.includes(oldStyle)) {
        html = html.split(oldStyle).join(newStyle);
        fs.writeFileSync(filePath, html, 'utf8');
        changedFiles++;
        console.log(`Updated alignment in ${file}`);
    }
});

console.log(`Done! Updated ${changedFiles} files.`);
