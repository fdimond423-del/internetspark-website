const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'internet-spark-website.zip') continue;
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, fileList);
    } else {
      fileList.push(name);
    }
  }
  return fileList;
}

const dir = __dirname;
const allFiles = getFiles(dir);

console.log('Injecting js/shared.js script tags into HTML files if they are missing...');

allFiles.forEach(file => {
  if (!file.endsWith('.html')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let updated = false;

  // Check if shared.js is already imported
  if (!content.includes('shared.js')) {
    const isServicePage = file.includes(path.sep + 'services' + path.sep);
    const sharedScriptTag = isServicePage 
      ? '<script src="../js/shared.js"></script>' 
      : '<script src="js/shared.js"></script>';
      
    // We want to insert the sharedScriptTag right before the main.js script tag.
    // Let's find main.js script tag.
    const mainScriptRegex = /<script\s+src="(?:\.\.\/)?js\/main\.js"><\/script>/;
    const match = content.match(mainScriptRegex);
    
    if (match) {
      const mainScriptTag = match[0];
      content = content.replace(mainScriptTag, `${sharedScriptTag}\n  ${mainScriptTag}`);
      updated = true;
    } else {
      // Fallback: insert before </body>
      if (content.includes('</body>')) {
        content = content.replace('</body>', `${sharedScriptTag}\n</body>`);
        updated = true;
      }
    }
  }

  if (updated) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Fixed imports for: ${path.relative(dir, file)}`);
  }
});
