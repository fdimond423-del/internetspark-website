const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, 'Website_content.txt');
const content = fs.readFileSync(contentPath, 'utf8');

const lines = content.split('\n').map(l => l.trim());

const services = [];
let currentService = null;
let currentSection = null; // 'intro', 'includes', 'benefits'

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    // Check for new service header. Usually looks like "XYZ Services" followed by a tagline
    if (line.endsWith(' Services') && lines[i+1] && lines[i+2]) {
        // Exclude some false positives if any
        if (line === "Our Website Development Services Include" || line === "Benefits of Website Development Services") {
            // It's a subheader, skip this block
        } else if (!line.startsWith('Our ') && !line.startsWith('Benefits of ')) {
            // Found a new service!
            currentService = {
                title: line,
                tagline: lines[i+1],
                intro: [],
                includes: [],
                benefits: []
            };
            services.push(currentService);
            currentSection = 'intro';
            i++; // skip tagline
            continue;
        }
    }

    if (currentService) {
        if (line.startsWith('Our ') && line.includes(' Services Include')) {
            currentSection = 'includes';
            continue;
        }
        if (line.startsWith('Benefits of ')) {
            currentSection = 'benefits';
            continue;
        }

        if (currentSection === 'intro') currentService.intro.push(line);
        if (currentSection === 'includes') currentService.includes.push(line);
        if (currentSection === 'benefits') currentService.benefits.push(line);
    }
}

fs.writeFileSync('parsed_services.json', JSON.stringify(services, null, 2), 'utf8');
console.log(`Parsed ${services.length} services.`);
