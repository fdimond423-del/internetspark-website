const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const servicesDir = path.join(__dirname, 'services');
const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));

let modifiedCount = 0;

files.forEach(file => {
    const filePath = path.join(servicesDir, file);
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });
    let changed = false;

    // Limit .use-case-card to 10 within .use-case-grid
    $('.use-case-grid').each((i, el) => {
        const cards = $(el).find('.use-case-card');
        if (cards.length > 10) {
            cards.slice(10).remove();
            changed = true;
            console.log(`Trimmed .use-case-card to 10 in ${file}`);
        }
    });

    // Limit .service-item to 10 within .service-list
    $('.service-list').each((i, el) => {
        const items = $(el).find('.service-item');
        if (items.length > 10) {
            items.slice(10).remove();
            changed = true;
            console.log(`Trimmed .service-item to 10 in ${file}`);
        }
    });

    if (changed) {
        fs.writeFileSync(filePath, $.html(), 'utf8');
        modifiedCount++;
    }
});

console.log(`Done! Modified ${modifiedCount} files.`);
