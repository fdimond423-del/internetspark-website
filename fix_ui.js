const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = [];

function findHtmlFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findHtmlFiles(fullPath);
        } else if (fullPath.endsWith('.html')) {
            htmlFiles.push(fullPath);
        }
    }
}
findHtmlFiles(dir);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. Fix loader logo everywhere
    const relPath = file.includes('services') ? '../' : '';
    const newLoader = `<img src="${relPath}images/sir.png" alt="Internet Spark" class="loader-logo">`;
    
    // Replace any div.loader-logo with img
    if (content.match(/<div class="loader-logo">.*?<\/div>/s)) {
        content = content.replace(/<div class="loader-logo">.*?<\/div>/s, newLoader);
        changed = true;
    }
    
    // Ensure all existing img.loader-logo use sir.png
    if (content.match(/<img[^>]*class="loader-logo"[^>]*>/)) {
        content = content.replace(/<img[^>]*class="loader-logo"[^>]*>/, newLoader);
        changed = true;
    }
    
    // 2. Fix index.html specific empty space
    if (file.endsWith('index.html')) {
        const targetSection = /(<div class="-left" data-aos="fade-up">\s*<div class="section-badge"><i class="fas fa-robot"><\/i> Technology & Automation<\/div>\s*<h2>Smart Marketing Powered By <span class="text-gradient">AI & Automation<\/span><\/h2>\s*<p.*?>.*?<\/p>\s*<\/div>\s*)(<\/div>\s*<\/div>\s*<\/section>)/s;
        if (content.match(targetSection)) {
            const rightSide = `<div class="-right" data-aos="fade-left">
    <div style="background: var(--gradient-card); border: 1px solid var(--glass-border); border-radius: var(--border-radius-lg); height: 400px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
        <div style="position: absolute; width: 200px; height: 200px; background: rgba(233,30,140,0.2); filter: blur(50px); border-radius: 50%;"></div>
        <img src="images/sir.png" alt="AI Automation" style="width: 50%; max-width: 250px; filter: drop-shadow(0 0 30px rgba(233,30,140,0.8)); animation: pulse-glow 3s infinite;">
        <div style="position: absolute; bottom: 20px; right: 20px; background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); padding: 15px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
            <i class="fas fa-microchip" style="color: var(--primary); font-size: 1.5rem; margin-bottom: 5px;"></i>
            <div style="font-weight: 700;">Smart Workflows</div>
        </div>
    </div>
</div>`;
            content = content.replace(targetSection, `$1\n${rightSide}\n$2`);
            changed = true;
        }
    }

    // 3. Make paragraphs longer / text-align justify for better alignment
    // We will target paragraphs within hero, -left, and -right
    if (content.match(/<div class="(hero-content[^"]*|-left|-right)"[^>]*>.*?<\/div>/s)) {
        content = content.replace(/(<div class="(?:hero-content[^"]*|-left|-right)"[^>]*>.*?)<p( style=".*?")?>(.*?)<\/p>/gs, (match, p1, p2, p3) => {
            // Avoid repeatedly appending if already appended
            if (p3.includes('Our advanced strategies ensure')) return match;
            
            const style = p2 ? p2.replace('style="', 'style="text-align: justify; font-size: 1.05rem; line-height: 1.8; ') : ' style="text-align: justify; font-size: 1.05rem; line-height: 1.8;"';
            return `${p1}<p${style}>${p3} Our advanced strategies ensure your brand remains ahead of the curve, maximizing engagement and conversion rates consistently.</p>`;
        });
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated ' + file);
    }
});
