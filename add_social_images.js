const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const portfolioPath = path.join(__dirname, 'portfolio.html');
const imagesDir = path.join(__dirname, 'images');

const allFiles = fs.readdirSync(imagesDir);
const ignoreList = ['ceo_image.jpeg', 'earth.jpg', 'logo100.png', 'sir.png'];
const imageFiles = allFiles.filter(file => {
    return (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) && !ignoreList.includes(file);
});

let html = fs.readFileSync(portfolioPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

$('.port-card[data-cat="social"]').each((i, el) => {
    const text = $(el).text().toLowerCase();
    if (text.includes('ad creative') || text.includes('performance ad') || $(el).find('.port-body').length === 0) {
        $(el).remove();
    }
});

let newCardsHtml = '';
imageFiles.forEach((file, index) => {
    const delay = (index % 5) * 100;
    // URL encode the filename to handle spaces properly
    const encodedFile = encodeURIComponent(file);
    newCardsHtml += `
  <div class="port-card" data-cat="social" style="border-radius:16px;overflow:hidden;border:1px solid var(--glass-border);background:#000;position:relative;display:flex;justify-content:center;aspect-ratio:1/1;" data-aos="fade-up" data-aos-delay="${delay}">
    <img src="images/${encodedFile}" alt="Social Media Post" style="width:100%;height:100%;object-fit:cover;">
  </div>`;
});

const portGrid = $('.portfolio-grid');
portGrid.append(newCardsHtml);

fs.writeFileSync(portfolioPath, $.html(), 'utf8');
console.log('Successfully added ' + imageFiles.length + ' social media images to portfolio.');
