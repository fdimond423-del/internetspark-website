const fs = require('fs');
const path = require('path');

const servicesMetrics = {
    'social-media-marketing.html': [
        { label: 'Brand Reach Increase', value: '400%', width: '90%' },
        { label: 'Audience Engagement', value: '5X', width: '85%' },
        { label: 'Follower Growth Rate', value: 'High', width: '95%' }
    ],
    'seo.html': [
        { label: 'Organic Traffic Growth', value: '350%', width: '90%' },
        { label: 'Keyword Rankings', value: 'Top #3', width: '85%' },
        { label: 'Search Visibility', value: 'High', width: '95%' }
    ],
    'google-ads.html': [
        { label: 'Average ROAS', value: '450%', width: '95%' },
        { label: 'Cost Per Acquisition', value: '-40%', width: '85%' },
        { label: 'Conversion Rate', value: '3X', width: '90%' }
    ],
    'meta-ads.html': [
        { label: 'Lead Generation', value: '500%', width: '95%' },
        { label: 'Click-Through Rate', value: '4X', width: '85%' },
        { label: 'Cost Per Lead', value: '-35%', width: '90%' }
    ],
    'website-development.html': [
        { label: 'Page Load Speed', value: '2X', width: '90%' },
        { label: 'Bounce Rate Reduction', value: '60%', width: '85%' },
        { label: 'User Experience', value: 'Premium', width: '95%' }
    ],
    'video-editing.html': [
        { label: 'Viewer Retention', value: '300%', width: '90%' },
        { label: 'Video Shares', value: '4X', width: '85%' },
        { label: 'Visual Quality', value: 'Premium', width: '95%' }
    ],
    'branding-graphic-design.html': [
        { label: 'Brand Recall', value: '85%', width: '90%' },
        { label: 'Design Consistency', value: '100%', width: '95%' },
        { label: 'Visual Appeal', value: 'High', width: '90%' }
    ],
    'ai-avatar-video.html': [
        { label: 'Production Cost', value: '-70%', width: '95%' },
        { label: 'Content Output', value: '5X', width: '90%' },
        { label: 'Delivery Speed', value: 'Instant', width: '95%' }
    ],
    'google-my-business.html': [
        { label: 'Local Search Views', value: '400%', width: '90%' },
        { label: 'Store Visits', value: '3X', width: '85%' },
        { label: 'Customer Actions', value: 'High', width: '95%' }
    ],
    'crm-automation.html': [
        { label: 'Process Efficiency', value: '+300%', width: '90%' },
        { label: 'Lead Response Time', value: 'Instant', width: '95%' },
        { label: 'Sales Closing Rate', value: '+40%', width: '85%' }
    ],
    'real-estate-marketing.html': [
        { label: 'Qualified Leads', value: '350%', width: '90%' },
        { label: 'Site Visits', value: '4X', width: '85%' },
        { label: 'Project Launch ROI', value: 'High', width: '95%' }
    ],
    'whatsapp-marketing.html': [
        { label: 'Message Open Rate', value: '95%', width: '95%' },
        { label: 'Response Rate', value: '5X', width: '90%' },
        { label: 'Campaign ROI', value: '400%', width: '85%' }
    ]
};

const dir = 'services';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (!file.endsWith('.html')) return;
    
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const metrics = servicesMetrics[file] || [
        { label: 'Client ROI Improvement', value: '300%', width: '90%' },
        { label: 'Audience Engagement', value: '5X', width: '80%' },
        { label: 'Brand Visibility Focus', value: 'High', width: '95%' }
    ];
    
    const newBoxContent = `<div class="stat-card-container" data-aos="fade-up" data-aos-delay="200">
    <div class="glass-card" style="padding:36px">
    <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:24px;text-align:center">🚀 Digital Growth Impact</h3>
    <div style="display:flex;flex-direction:column;gap:18px">
    <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
    <span style="font-size:0.95rem;font-weight:600">${metrics[0].label}</span>
    <span style="font-weight:800;color:var(--primary)">${metrics[0].value}</span>
    </div>
    <div style="height:10px;background:rgba(255,255,255,0.07);border-radius:5px;overflow:hidden">
    <div style="height:100%;width:${metrics[0].width};background:linear-gradient(90deg,var(--primary-dark),var(--primary-light));border-radius:5px"></div>
    </div>
    </div>
    <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
    <span style="font-size:0.95rem;font-weight:600">${metrics[1].label}</span>
    <span style="font-weight:800;color:var(--primary)">${metrics[1].value}</span>
    </div>
    <div style="height:10px;background:rgba(255,255,255,0.07);border-radius:5px;overflow:hidden">
    <div style="height:100%;width:${metrics[1].width};background:linear-gradient(90deg,var(--primary-dark),var(--primary-light));border-radius:5px"></div>
    </div>
    </div>
    <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
    <span style="font-size:0.95rem;font-weight:600">${metrics[2].label}</span>
    <span style="font-weight:800;color:var(--primary)">${metrics[2].value}</span>
    </div>
    <div style="height:10px;background:rgba(255,255,255,0.07);border-radius:5px;overflow:hidden">
    <div style="height:100%;width:${metrics[2].width};background:linear-gradient(90deg,var(--primary-dark),var(--primary-light));border-radius:5px"></div>
    </div>
    </div>
    </div>
    <p style="font-size:0.8rem;color:var(--text-muted);margin-top:20px;text-align:center;font-style:italic">Data based on our average campaign performance</p>
    </div>
    </div>`;

    const regex = /<div class="stat-card-container"[^>]*>[\s\S]*?<\/p>\s*<\/div>\s*<\/div>/;
    
    if (regex.test(content)) {
        content = content.replace(regex, newBoxContent);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', file);
    } else {
        console.log('Could not find stat-card-container in', file);
    }
});
