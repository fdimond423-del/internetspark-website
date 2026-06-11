const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const servicesDir = path.join(rootDir, 'services');
const sitemapPath = path.join(rootDir, 'sitemap.xml');
const robotsPath = path.join(rootDir, 'robots.txt');

const baseUrl = 'https://internet-spark.com';

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

function addUrl(urlPath, priority, changefreq) {
    const fullUrl = urlPath === '' ? baseUrl + '/' : `${baseUrl}/${urlPath}`;
    sitemapContent += `  <url>\n    <loc>${fullUrl}</loc>\n    <priority>${priority}</priority>\n    <changefreq>${changefreq}</changefreq>\n  </url>\n`;
}

// 1. Add Root Pages
const rootPages = fs.readdirSync(rootDir).filter(file => file.endsWith('.html') && file !== 'temp_live.html');
rootPages.forEach(file => {
    let priority = '0.8';
    let changefreq = 'monthly';
    
    if (file === 'index.html') {
        priority = '1.0';
        changefreq = 'weekly';
        addUrl('', priority, changefreq); // Root
    } else if (['services.html', 'portfolio.html', 'case-studies.html', 'blog.html'].includes(file)) {
        changefreq = 'weekly';
        addUrl(file, priority, changefreq);
    } else {
        addUrl(file, priority, changefreq);
    }
});

// 2. Add Services Pages
if (fs.existsSync(servicesDir)) {
    const servicePages = fs.readdirSync(servicesDir).filter(file => file.endsWith('.html'));
    servicePages.forEach(file => {
        addUrl(`services/${file}`, '0.9', 'weekly');
    });
}

sitemapContent += `</urlset>`;

// Write Sitemap
fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log('sitemap.xml generated successfully.');

// Write robots.txt
const robotsContent = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
fs.writeFileSync(robotsPath, robotsContent, 'utf8');
console.log('robots.txt generated successfully.');
