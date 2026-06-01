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

    // Find all sections that contain an h2 with "Why Choose Us" or "The Spark Advantage"
    const whyChooseSections = [];
    
    $('section').each((i, el) => {
        const h2 = $(el).find('h2').text().trim().toLowerCase();
        if (h2.includes('why choose us')) {
            whyChooseSections.push(el);
        }
    });

    if (whyChooseSections.length > 1) {
        console.log(`Found ${whyChooseSections.length} 'Why Choose Us' sections in ${file}`);
        // Remove all but the LAST one
        for (let i = 0; i < whyChooseSections.length - 1; i++) {
            $(whyChooseSections[i]).remove();
        }
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, $.html(), 'utf8');
        modifiedCount++;
        console.log(`Removed duplicate 'Why Choose Us' sections in ${file}`);
    }
});

console.log(`Done! Modified ${modifiedCount} files.`);
