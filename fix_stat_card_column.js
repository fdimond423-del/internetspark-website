const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'services');
const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    if (file === 'whatsapp-marketing.html') return;
    const filePath = path.join(servicesDir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Currently the stat card is INSIDE the left column because of my previous flawed regex.
    // The structure looks like this:
    // <div class="" data-aos="fade-up">
    //   ... paragraphs ...
    //   <div class="stat-card-container" data-aos="fade-up" data-aos-delay="200">
    //     ... stats card ...
    //   </div>
    // </div>
    // </div>
    // </div>
    // </section>

    // First, let's extract the stat card html exactly as it is in the file so we don't lose it.
    const statCardRegex = /(<div class="stat-card-container" data-aos="fade-up" data-aos-delay="200">[\s\S]*?Data based on our average campaign performance<\/p>\s*<\/div>\s*<\/div>)/;
    
    const match = html.match(statCardRegex);
    if (match) {
        const statsCardHtml = match[1];
        
        // Remove it from its current bad position
        html = html.replace(statCardRegex, '');

        // Now we find the end of the overview section.
        // It should now end with exactly 4 closing tags since we removed the card from inside the first div.
        // </div> (left column)
        // </div> (grid)
        // </div> (container)
        // </section>
        
        // We want to inject the card right AFTER the first </div>
        const overviewEndRegex = /(<section class="section" id="wa-overview">[\s\S]*?)(<\/div>)\s*(<\/div>\s*<\/div>\s*<\/section>)/;
        
        if (overviewEndRegex.test(html)) {
            // $1 = everything from <section to right before the 4 closing tags
            // $2 = </div> (closes left column)
            // $3 = </div></div></section>
            html = html.replace(overviewEndRegex, `$1$2\n${statsCardHtml}\n$3`);
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Moved card to right column for: ${file}`);
        } else {
            console.log(`Could not find overview end for: ${file}`);
        }
    } else {
        console.log(`Could not find stat card in: ${file}`);
    }
});
console.log("All fixes applied.");
