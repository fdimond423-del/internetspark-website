const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'services');

function formatTitle(basename) {
    return basename.replace('.html', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function updateFile(filePath, basename) {
    let html = fs.readFileSync(filePath, 'utf8');
    const serviceName = formatTitle(basename);

    // Update Title
    html = html.replace(/<title>.*?<\/title>/s, `<title>Best ${serviceName} Agency in Ahmedabad | Internet Spark</title>`);
    
    // Update Meta Description
    html = html.replace(/<meta name="description" content=".*?">/s, `<meta name="description" content="Internet Spark is the Best Digital Marketing Agency in Ahmedabad offering top-tier ${serviceName}. We deliver measurable results and exponential growth.">`);
    
    // Update H1 in page hero
    html = html.replace(/<h1>.*?<\/h1>/s, `<h1>Top <span class="text-gradient">${serviceName}</span> Agency in Ahmedabad</h1>`);
    
    // Update Paragraph in page hero
    html = html.replace(/<p style="max-width:700px;margin:20px auto 0;font-size:1.1rem">.*?<\/p>/s, 
        `<p style="max-width:700px;margin:20px auto 0;font-size:1.1rem" data-aos="fade-up" data-aos-delay="200">Are you looking for the best digital marketing agency in Ahmedabad for ${serviceName}? Internet Spark provides data-driven, result-oriented strategies designed to skyrocket your brand's growth and maximize your ROI.</p>`
    );

    // Update Intro Section (First <p> inside the What We Do section)
    // We will look for <h2>...</h2> and the following <p> tags until a <div>
    
    // This is a bit tricky with pure regex, so let's do a smart replace on the first paragraph after <h2>
    html = html.replace(/<h2>(.*?)<\/h2>\s*<p(.*?)>(.*?)<\/p>\s*<p(.*?)>(.*?)<\/p>\s*<p(.*?)>(.*?)<\/p>/s, (match, h2, p1attr, p1, p2attr, p2, p3attr, p3) => {
        return `<h2>${h2}</h2>
          <p${p1attr}>As the <strong>best digital marketing agency in Ahmedabad</strong>, we understand that effective ${serviceName} is the backbone of modern business growth. We don't just execute campaigns; we build comprehensive ecosystems that predictably drive visibility, engagement, and revenue for your brand.</p>
          <p${p2attr}>Our approach to ${serviceName} combines deep market research, cutting-edge technology, and creative excellence. Whether you are a local startup or an established enterprise, our tailored strategies ensure that your marketing budget translates into tangible business outcomes.</p>
          <p${p3attr}>Partner with Internet Spark to dominate your industry. From strategic planning to flawless execution, our expert team in Ahmedabad manages everything end-to-end so you can focus on scaling your business operations.</p>`;
    });

    // Write back
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated ${basename}`);
}

const files = fs.readdirSync(servicesDir);
for (const file of files) {
    if (file.endsWith('.html')) {
        updateFile(path.join(servicesDir, file), file);
    }
}
