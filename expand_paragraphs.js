const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'services');
const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));

function generateDescription(title) {
    const t = title.toLowerCase();
    if (t.includes('traffic') || t.includes('visitor')) {
        return "Drive high-intent visitors to your website to increase your digital footprint, expand your online reach, and attract your ideal audience consistently.";
    } else if (t.includes('lead') || t.includes('conversion') || t.includes('convert')) {
        return "Capture verified, high-quality prospects and maximize your conversion rates to build a sustainable, scalable sales pipeline for your business.";
    } else if (t.includes('sale') || t.includes('revenue') || t.includes('growth') || t.includes('profit')) {
        return "Boost your bottom line and scale your business rapidly with optimized, high-performing strategies designed to deliver maximum return on investment.";
    } else if (t.includes('visibil') || t.includes('brand') || t.includes('aware')) {
        return "Enhance your brand's presence across key digital channels, ensuring you stay top-of-mind for your target audience and build long-term credibility.";
    } else if (t.includes('audienc') || t.includes('target') || t.includes('demographic')) {
        return "Reach exactly the right people at the right time using advanced, data-driven demographic and behavioral targeting techniques.";
    } else if (t.includes('analytic') || t.includes('result') || t.includes('track') || t.includes('measur') || t.includes('report')) {
        return "Gain actionable insights with comprehensive tracking and transparent reporting, allowing you to measure your success and optimize accurately.";
    } else if (t.includes('strateg') || t.includes('campaign') || t.includes('optimiz') || t.includes('manage') || t.includes('audit')) {
        return "Leverage expertly crafted campaigns and continuous optimization designed to maximize your ROI and improve performance metrics over time.";
    } else if (t.includes('competit') || t.includes('market') || t.includes('advantage')) {
        return "Gain a significant edge over your competitors by leveraging proven digital methodologies and innovative market positioning strategies.";
    } else if (t.includes('experience') || t.includes('user') || t.includes('ui') || t.includes('ux')) {
        return "Deliver a seamless and engaging experience that keeps your audience captivated, reduces bounce rates, and encourages repeat interactions.";
    } else if (t.includes('content') || t.includes('creative') || t.includes('copy') || t.includes('design') || t.includes('video') || t.includes('graphic')) {
        return "Engage your audience with compelling, high-quality creative assets tailored to communicate your brand's unique message effectively.";
    } else if (t.includes('seo') || t.includes('rank') || t.includes('search') || t.includes('organic')) {
        return "Improve your search engine rankings and dominate search results to ensure your business is easily found by customers actively looking for your services.";
    } else if (t.includes('social') || t.includes('facebook') || t.includes('instagram') || t.includes('meta')) {
        return "Build a strong community and foster meaningful engagement across top social media platforms to turn followers into loyal brand advocates.";
    } else if (t.includes('automat') || t.includes('crm') || t.includes('system') || t.includes('ai') || t.includes('bot')) {
        return "Streamline your operations and save valuable time by implementing intelligent automation systems that work for you around the clock.";
    } else {
        return "Empower your business with tailored, result-oriented solutions designed to meet your specific goals, overcome challenges, and drive consistent success.";
    }
}

let totalExpanded = 0;

files.forEach(file => {
    const filePath = path.join(servicesDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // We look for <h4>...</h4><p>...</p> inside service-card, use-case-card, or service-item
    // The regex needs to capture the <h4> title so we can generate based on it.
    // Also handling optional empty <p></p> or short <p>text</p>
    
    // Pattern for <h4>Title</h4><p>Short content</p>
    const regex = /<h4>(.*?)<\/h4>\s*<p>(.*?)<\/p>/gs;
    
    html = html.replace(regex, (match, title, pContent) => {
        // Clean title (remove trailing ... if present)
        const cleanTitle = title.replace(/\.\.\.$/, '').trim();
        const cleanContent = pContent.replace(/\.\.\.$/, '').trim();
        
        // If content is empty, or very short (less than 45 chars), or matches the title exactly
        if (cleanContent.length < 45 || cleanContent.toLowerCase() === cleanTitle.toLowerCase() || cleanContent === '') {
            // Generate new content
            const newDesc = generateDescription(cleanTitle);
            totalExpanded++;
            changed = true;
            return `<h4>${title}</h4><p style="color:var(--text-muted);font-size:0.9rem;line-height:1.6;margin-top:8px;">${newDesc}</p>`;
        }
        return match;
    });

    if (changed) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Expanded short paragraphs in: ${file}`);
    }
});

console.log(`Done! Total short paragraphs expanded: ${totalExpanded}`);
