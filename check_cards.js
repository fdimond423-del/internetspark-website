const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('services/google-ads.html', 'utf8');
const $ = cheerio.load(html);

const headings = $('h2').filter((i, el) => $(el).text().trim() === 'Why Choose Us');

console.log('--- FIRST WHY CHOOSE US ---');
const firstSection = headings.eq(0).closest('section');
firstSection.find('.use-case-card h4').each((i, el) => console.log($(el).text()));

console.log('\n--- SECOND WHY CHOOSE US ---');
const secondSection = headings.eq(1).closest('section');
secondSection.find('.use-case-card h4').each((i, el) => console.log($(el).text()));
