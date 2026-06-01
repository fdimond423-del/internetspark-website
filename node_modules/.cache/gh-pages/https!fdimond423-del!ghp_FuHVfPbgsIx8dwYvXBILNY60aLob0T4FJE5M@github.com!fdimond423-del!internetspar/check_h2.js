const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('services/google-ads.html', 'utf8');
const $ = cheerio.load(html);

$('h2').each((i, el) => {
    console.log(`[${i}] ${$(el).text().trim()}`);
    console.log(`    Parent Section: ` + $(el).closest('section').attr('class') + ` ID: ` + $(el).closest('section').attr('id'));
});
