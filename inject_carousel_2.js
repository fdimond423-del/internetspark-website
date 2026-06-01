const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const filePath = path.join(__dirname, 'case-studies.html');
let html = fs.readFileSync(filePath, 'utf8');

const $ = cheerio.load(html, { decodeEntities: false });

const newCarouselHtml = `
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:60px;align-items:center;margin-top:80px;border-top:1px solid var(--glass-border);padding-top:80px;">
    
    <!-- Auto Slider Carousel 2 -->
    <div class="carousel-container" data-aos="fade-right" style="position:relative; width:100%; max-width: 400px; margin: 0 auto; aspect-ratio: 9/16; border-radius: 16px; overflow:hidden; border: 1px solid var(--glass-border); box-shadow: 0 20px 40px rgba(0,0,0,0.4); background: #000;">
        <div class="carousel-track" style="display:flex; width: 300%; height: 100%; animation: slideAnimation 9s infinite 2s;">
            <div style="width: 33.333%; height: 100%; flex-shrink: 0; background: #000;">
                <img src="images/crousol%20slide%20%20(1).png" style="width:100%; height:100%; object-fit:contain;" alt="Carousel Slide 4">
            </div>
            <div style="width: 33.333%; height: 100%; flex-shrink: 0; background: #000;">
                <img src="images/crousol%20slide%20(2).png" style="width:100%; height:100%; object-fit:contain;" alt="Carousel Slide 5">
            </div>
            <div style="width: 33.333%; height: 100%; flex-shrink: 0; background: #000;">
                <img src="images/crousol%20slide%20(3).png" style="width:100%; height:100%; object-fit:contain;" alt="Carousel Slide 6">
            </div>
        </div>
    </div>

    <!-- Content Box 2 -->
    <div class="stat-card-container" data-aos="fade-left">
        <div class="glass-card" style="padding:36px; height: 100%; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-size:1.4rem;font-weight:700;margin-bottom:30px;text-align:center">🚀 Performance Results</h3>
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:30px">
                <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                    <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">2500+</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Quality Leads</div>
                </div>
                <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                    <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">₹120</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Avg. CPL</div>
                </div>
                <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                    <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">₹4L+</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Ad Spend</div>
                </div>
                <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                    <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">Max</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Bookings</div>
                </div>
            </div>

            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:16px">
                <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> High-Quality Lead Gen</li>
                <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> Increased Brand Visibility</li>
                <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> Optimized Meta Ads</li>
                <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> Strong ROI &amp; Performance</li>
            </ul>
        </div>
    </div>
</div>
`;

// Find the first grid containing the first carousel
const firstGrid = $('.stat-card-container').first().parent();
firstGrid.after(newCarouselHtml);

fs.writeFileSync(filePath, $.html(), 'utf8');
console.log('Successfully injected carousel 2 section');
