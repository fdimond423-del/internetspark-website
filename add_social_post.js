const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const portfolioPath = path.join(__dirname, 'portfolio.html');
let html = fs.readFileSync(portfolioPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const images = [
    "WhatsApp Image 2026-05-11 at 5.13.02 PM (1).jpeg",
    "WhatsApp Image 2026-05-11 at 5.13.02 PM (2).jpeg",
    "WhatsApp Image 2026-05-11 at 5.13.02 PM (3).jpeg",
    "WhatsApp Image 2026-05-11 at 5.13.02 PM (4).jpeg",
    "WhatsApp Image 2026-05-11 at 5.13.02 PM.jpeg",
    "WhatsApp Image 2026-05-11 at 5.13.24 PM (1).jpeg",
    "WhatsApp Image 2026-05-11 at 5.13.24 PM (2).jpeg",
    "WhatsApp Image 2026-05-11 at 5.13.24 PM.jpeg"
];

let addedHtml = '';
images.forEach((img, index) => {
    let delay = (index % 5) * 100;
    let encodedImg = encodeURIComponent(img);
    addedHtml += `
  <div class="port-card" data-cat="social" style="border-radius:16px;overflow:hidden;border:1px solid var(--glass-border);background:#000;position:relative;display:flex;justify-content:center;aspect-ratio:1/1;" data-aos="fade-up" data-aos-delay="${delay}">
    <img src="images/social_media/${encodedImg}" alt="Social Media Post" style="width:100%;height:100%;object-fit:cover;">
  </div>`;
});

// Append the new html inside the .portfolio-grid
$('.portfolio-grid').append(addedHtml);

fs.writeFileSync(portfolioPath, $.html(), 'utf8');
console.log('Successfully appended social media images to portfolio.html');
