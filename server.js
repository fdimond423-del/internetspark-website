const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.json': 'application/json',
  '.zip': 'application/zip'
};

function tryFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (!err) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'text/plain';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      });
      res.end(data);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html><html><body style="font-family:sans-serif;padding:40px;background:#0a0a0f;color:white">
        <h1 style="color:#E91E8C">404 - Page Not Found</h1>
        <p style="color:#aaa">${filePath.replace(ROOT, '')}</p>
        <a href="/" style="color:#E91E8C">← Home</a>
      </body></html>`);
    }
  });
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];

  // Root → index.html
  if (urlPath === '/') {
    return tryFile(path.join(ROOT, 'index.html'), res);
  }

  const filePath = path.join(ROOT, urlPath);

  // Try exact path first
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      // Check if it's a directory → try index.html inside
      fs.stat(filePath, (statErr, stat) => {
        if (!statErr && stat.isDirectory()) {
          tryFile(path.join(filePath, 'index.html'), res);
        } else {
          tryFile(filePath, res);
        }
      });
    } else {
      // Try adding .html extension
      const htmlPath = filePath + '.html';
      fs.access(htmlPath, fs.constants.F_OK, (htmlErr) => {
        if (!htmlErr) {
          tryFile(htmlPath, res);
        } else {
          // Try /services/page-name → /services/page-name.html
          tryFile(filePath, res);
        }
      });
    }
  });
});

server.listen(PORT, () => {
  console.log('\n🚀 Internet Spark Website Server Running!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Network: http://127.0.0.1:${PORT}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('   Press Ctrl+C to stop the server\n');
});
