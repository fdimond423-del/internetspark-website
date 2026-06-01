const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      if (file.endsWith('.html') || file.endsWith('.js')) {
          filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const allFiles = walkSync(__dirname);

allFiles.forEach(file => {
    if (file.includes('node_modules') || file.includes('.gemini') || file.includes('firebase-tools')) return;

    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace image paths
    content = content.replace(/images\/logo100\.png/g, 'images/logo20.jpeg');
    content = content.replace(/images\/logo\.png/g, 'images/logo20.jpeg');
    
    // For services/ pages
    content = content.replace(/\.\.\/images\/logo100\.png/g, '../images/logo20.jpeg');
    content = content.replace(/\.\.\/images\/logo\.png/g, '../images/logo20.jpeg');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated logo in ${file}`);
    }
});

// Update js/shared.js explicitly for the menu and footer logo sizes and bg removal
const sharedJsPath = path.join(__dirname, 'js', 'shared.js');
let sharedContent = fs.readFileSync(sharedJsPath, 'utf8');

// The original matches might have changed if the script partially ran? Let's check using regex
sharedContent = sharedContent.replace(
    /style="height:\s*\d+px;\s*width:\s*auto;\s*object-fit:\s*contain;"/, 
    'style="height: 120px; width: auto; object-fit: contain; filter: invert(1) brightness(2); mix-blend-mode: screen;"'
);

sharedContent = sharedContent.replace(
    /style="height:\s*\d+px;\s*width:\s*auto;\s*object-fit:\s*contain;"/, 
    'style="height: 80px; width: auto; object-fit: contain; filter: invert(1) brightness(2); mix-blend-mode: screen;"'
);

fs.writeFileSync(sharedJsPath, sharedContent, 'utf8');

// Update main.css to handle loader-logo size
const cssPath = path.join(__dirname, 'css', 'main.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(
    /\.loader-logo\s*\{[\s\S]*?\}/, 
    '.loader-logo { width: 250px; height: auto; animation: pulse 2s infinite; filter: invert(1) brightness(2); mix-blend-mode: screen; }'
);

// Also I see the hero director image uses logo100.png, let's make sure it's correct
fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Logo update completed.');
