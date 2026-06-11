const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file.startsWith('.')) continue;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Add loading="lazy" to img tags that don't have it
            const newContent = content.replace(/<img\s+([^>]*?)>/gi, (match, p1) => {
                if (p1.includes('loading=')) return match;
                modified = true;
                return `<img ${p1} loading="lazy">`;
            });

            if (modified) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log('Optimized:', fullPath);
            }
        }
    }
}

// Also optimize shared.js where the logo might be
let sharedJsPath = path.join(__dirname, 'js', 'shared.js');
if (fs.existsSync(sharedJsPath)) {
    let content = fs.readFileSync(sharedJsPath, 'utf8');
    let newContent = content.replace(/<img\s+([^>]*?)>/gi, (match, p1) => {
        if (p1.includes('loading=')) return match;
        return `<img ${p1} loading="lazy">`;
    });
    if (content !== newContent) {
        fs.writeFileSync(sharedJsPath, newContent, 'utf8');
        console.log('Optimized:', sharedJsPath);
    }
}

processDir(__dirname);
