const fs = require('fs');
const path = require('path');

// 1. Rename the image
const oldImagePath = path.join('images', 'logo-final.png');
const newImagePath = path.join('images', 'logo-final.png');
if (fs.existsSync(oldImagePath)) {
  fs.renameSync(oldImagePath, newImagePath);
  console.log('Renamed image');
}

// 2. Replace 'logo-final.png' with 'logo-final.png' in all files
function walkSync(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
        walkSync(fullPath, callback);
      }
    } else {
      if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
        callback(fullPath);
      }
    }
  });
}

walkSync('.', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  if (content.includes('logo-final.png')) {
    content = content.replace(/logo final\.png/g, 'logo-final.png');
    changed = true;
  }
  
  if ((filePath.endsWith('index.html') || filePath.endsWith('about.html')) && content.includes('grayscale(1) invert(1) brightness(2)')) {
    content = content.replace(/grayscale\(1\) invert\(1\) brightness\(2\)/g, '');
    changed = true;
  }

  if ((filePath.endsWith('index.html') || filePath.endsWith('about.html')) && content.includes('mix-blend-mode: screen;')) {
    // Note: We're replacing it specifically in the image inline styles where the logo is
    // Let's replace ' mix-blend-mode: screen;' with '' or just the whole tag
    content = content.replace(/mix-blend-mode:\s*screen;/g, '');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath);
  }
});

// 3. Fix shared.js base calculation
const sharedJsPath = path.join('js', 'shared.js');
if (fs.existsSync(sharedJsPath)) {
  let sharedContent = fs.readFileSync(sharedJsPath, 'utf8');
  const oldBaseLogic = /const pathParts = window\.location\.pathname\.split\('\/'\);\s*const dirDepth = pathParts\.length - 2;\s*const base = dirDepth > 0 \? '\.\.\/'\.repeat\(dirDepth\) : '';/;
  
  const newBaseLogic = `  let base = '';
  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].getAttribute('src');
    if (src && src.includes('shared.js')) {
      if (src.startsWith('../')) base = '../';
      else if (src.startsWith('../../')) base = '../../';
      break;
    }
  }`;
  
  if (oldBaseLogic.test(sharedContent)) {
    sharedContent = sharedContent.replace(oldBaseLogic, newBaseLogic);
    fs.writeFileSync(sharedJsPath, sharedContent, 'utf8');
    console.log('Fixed shared.js base logic');
  } else {
    console.log('Could not find old base logic in shared.js');
  }
}
