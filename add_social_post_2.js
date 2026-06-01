const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const portfolioPath = path.join(__dirname, 'portfolio.html');
let html = fs.readFileSync(portfolioPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const images = [
    "9.png",
    "10.png",
    "11.png",
    "12.png",
    "13.png",
    "14.png",
    "15.png",
    "16.png"
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
console.log('Successfully appended second batch of social media images to portfolio.html');
