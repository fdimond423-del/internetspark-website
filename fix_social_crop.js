const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const portfolioPath = path.join(__dirname, 'portfolio.html');
let html = fs.readFileSync(portfolioPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// Find all social media cards and update their styles to prevent cropping
$('.port-card[data-cat="social"]').each(function() {
    let style = $(this).attr('style');
    if (style) {
        style = style.replace('aspect-ratio:1/1;', 'aspect-ratio:4/5;');
        $(this).attr('style', style);
    }
    
    let img = $(this).find('img');
    if (img.length > 0) {
        let imgStyle = img.attr('style');
        if (imgStyle) {
            imgStyle = imgStyle.replace('object-fit:cover;', 'object-fit:contain;');
            img.attr('style', imgStyle);
        }
    }
});

fs.writeFileSync(portfolioPath, $.html(), 'utf8');
console.log('Successfully updated social media images to prevent cropping');
