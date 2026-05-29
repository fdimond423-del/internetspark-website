const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// Helper to find all HTML files
function getHtmlFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                getHtmlFiles(fullPath, files);
            }
        } else if (file.endsWith('.html')) {
            files.push(fullPath);
        }
    });
    return files;
}

const replacements = [
    // Specific phrases
    { regex: /Ahmedabad's Complete/g, replacement: 'Complete' },
    { regex: /Ahmedabad's complete/g, replacement: 'complete' },
    { regex: /Ahmedabad's top/gi, replacement: 'a top' },
    { regex: /Ahmedabad's leading/gi, replacement: 'a leading' },
    { regex: /Ahmedabad's best/gi, replacement: 'the best' },
    { regex: /Ahmedabad's most/gi, replacement: 'the most' },
    { regex: /Ahmedabad's premier/gi, replacement: 'a premier' },
    
    { regex: /agency based in Ahmedabad, India/gi, replacement: 'agency' },
    { regex: /agency based in Ahmedabad/gi, replacement: 'agency' },
    { regex: /based in Ahmedabad, India/gi, replacement: '' },
    { regex: /based in Ahmedabad/gi, replacement: '' },
    { regex: /Ahmedabad-based/gi, replacement: 'expert' },
    { regex: /Ahmedabad - based/gi, replacement: 'expert' },
    { regex: /in Ahmedabad, India/gi, replacement: '' },
    { regex: /in Ahmedabad/gi, replacement: '' },
    { regex: /for Ahmedabad/gi, replacement: '' },
    { regex: /near Ahmedabad/gi, replacement: '' },
    { regex: /around Ahmedabad/gi, replacement: '' },
    { regex: /throughout Ahmedabad/gi, replacement: '' },
    { regex: /across Ahmedabad/gi, replacement: '' },
    
    // Address specific
    { regex: /Makarba, Ahmedabad – 380051/g, replacement: 'Makarba – 380051' },
    { regex: /Makarba, Ahmedabad/g, replacement: 'Makarba' },
    { regex: /Ahmedabad – 380051/g, replacement: '380051' },
    { regex: /Ahmedabad - 380051/g, replacement: '380051' },
    
    // Standalone
    { regex: /Ahmedabad/g, replacement: '' },
];

const cleanup = [
    { regex: /  +/g, replacement: ' ' },            // double spaces
    { regex: / ,/g, replacement: ',' },             // space before comma
    { regex: /,,+/g, replacement: ',' },            // double commas
    { regex: /,\s*,/g, replacement: ',' },          // comma space comma
    { regex: /\bin\s*,\s*/gi, replacement: '' },    // "in ,"
    { regex: /\bfor\s*,\s*/gi, replacement: '' },   // "for ,"
    { regex: /\bat\s*,\s*/gi, replacement: '' },    // "at ,"
    { regex: /,\s*–/g, replacement: ' –' },         // ", –"
    { regex: /,\s*\./g, replacement: '.' },         // ", ."
    { regex: /,\s*$/gm, replacement: '' },          // comma at end of line
    { regex: /\b(in|for|at|of|near|around|throughout)\s*(\.|\?|!|(<[^>]+>)*\s*<\/)/gi, replacement: '$2' } // dangling prepositions
];

function processHtmlFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    let original = html;
    
    // Run replacements
    replacements.forEach(rep => {
        html = html.replace(rep.regex, rep.replacement);
    });
    
    // Run cleanups
    cleanup.forEach(cl => {
        html = html.replace(cl.regex, cl.replacement);
    });
    
    // Extra cleanup for double tags or malformed spacing in HTML tags
    html = html.replace(/&nbsp;/g, ' ');
    html = html.replace(/  +/g, ' ');
    
    if (html !== original) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated: ${path.relative(rootDir, filePath)}`);
    }
}

// Execute
const htmlFiles = getHtmlFiles(rootDir);
htmlFiles.forEach(file => {
    processHtmlFile(file);
});

console.log('Finished removing Ahmedabad references!');
