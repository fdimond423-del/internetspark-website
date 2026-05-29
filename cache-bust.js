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

console.log('Applying cache-busting (?v=2.1) to main.css links in all HTML files...');

allFiles.forEach(file => {
  if (!file.endsWith('.html')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let updated = false;

  // Pattern to match href="css/main.css" or href="../css/main.css" with optional existing query params
  const regex = /href="(\.\.\/)?css\/main\.css(\?v=[\d\.]+)??"/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, 'href="$1css/main.css?v=2.1"');
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Updated: ${path.relative(dir, file)}`);
  }
});
