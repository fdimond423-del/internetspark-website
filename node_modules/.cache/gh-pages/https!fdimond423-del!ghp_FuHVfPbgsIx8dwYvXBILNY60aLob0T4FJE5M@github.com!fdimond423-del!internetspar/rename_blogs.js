const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const blogDir = path.join(rootDir, 'blog');

// Helper to get HTML files recursively
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

// 1. Rename files in blog folder
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
const renameMapping = {};

blogFiles.forEach(file => {
    if (file.includes('-ahmedabad')) {
        const newFile = file.replace('-ahmedabad', '');
        const oldPath = path.join(blogDir, file);
        const newPath = path.join(blogDir, newFile);
        
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed blog file: ${file} -> ${newFile}`);
        
        // Track the mapping for link updating
        renameMapping[file] = newFile;
    }
});

// 2. Scan and update all HTML files for links, IDs, keywords
const allHtmlFiles = getHtmlFiles(rootDir);

allHtmlFiles.forEach(filePath => {
    let html = fs.readFileSync(filePath, 'utf8');
    let original = html;
    
    // Update renamed blog links
    Object.keys(renameMapping).forEach(oldLink => {
        const newLink = renameMapping[oldLink];
        // Replace exact filename references
        const regex = new RegExp(oldLink, 'g');
        html = html.replace(regex, newLink);
    });
    
    // Update local business marketing section details
    html = html.replace(/id=["']lb-ahmedabad["']/g, 'id="lb-local-expertise"');
    html = html.replace(/AHMEDABAD-SPECIFIC KNOWLEDGE/g, 'LOCAL EXPERTISE');
    html = html.replace(/Ahmedabad Expertise/g, 'Local Expertise');
    html = html.replace(/Ahmedabad-Specific Knowledge/g, 'Local Expertise');
    
    // Update SEO meta keywords
    html = html.replace(/digital marketing agency ahmedabad/gi, 'digital marketing agency, premium digital marketing');
    
    if (html !== original) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated links/keywords in: ${path.relative(rootDir, filePath)}`);
    }
});

console.log('Finished renaming blog files and updating links!');
