const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const filePath = path.join(__dirname, 'case-studies.html');
let html = fs.readFileSync(filePath, 'utf8');

const $ = cheerio.load(html, { decodeEntities: false });

const newCarouselHtml = `
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:60px;align-items:center;margin-top:80px;border-top:1px solid var(--glass-border);padding-top:80px;">
    
    <!-- Auto Slider Carousel 3 -->
    <div class="carousel-container" data-aos="fade-right" style="position:relative; width:100%; max-width: 400px; margin: 0 auto; aspect-ratio: 9/16; border-radius: 16px; overflow:hidden; border: 1px solid var(--glass-border); box-shadow: 0 20px 40px rgba(0,0,0,0.4); background: #000;">
        <div class="carousel-track" style="display:flex; width: 300%; height: 100%; animation: slideAnimation 9s infinite 4s;">
            <div style="width: 33.333%; height: 100%; flex-shrink: 0; background: #000;">
                <img src="images/crousol%20slide%202%20%20(1).png" style="width:100%; height:100%; object-fit:contain;" alt="Carousel Slide 7">
            </div>
            <div style="width: 33.333%; height: 100%; flex-shrink: 0; background: #000;">
                <img src="images/crousol%20slide%202%20%20(2).png" style="width:100%; height:100%; object-fit:contain;" alt="Carousel Slide 8">
            </div>
            <div style="width: 33.333%; height: 100%; flex-shrink: 0; background: #000;">
                <img src="images/crousol%20slide%202%20%20(3).png" style="width:100%; height:100%; object-fit:contain;" alt="Carousel Slide 9">
            </div>
        </div>
    </div>

    <!-- Content Box 3 -->
    <div class="stat-card-container" data-aos="fade-left">
        <div class="glass-card" style="padding:36px; height: 100%; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-size:1.4rem;font-weight:700;margin-bottom:30px;text-align:center">🚀 Campaign Success</h3>
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:30px">
                <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                    <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">422+</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Quality Leads</div>
                </div>
                <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                    <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">₹172</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Avg. CPL</div>
                </div>
                <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                    <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">₹70K+</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Ad Spend</div>
                </div>
                <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                    <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">Strong</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Performance</div>
                </div>
            </div>

            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:16px">
                <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> High-Intent Lead Generation</li>
                <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> Increased Brand Visibility</li>
                <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> Consistent Lead Flow</li>
                <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> Optimized Meta Ad Campaigns</li>
                <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> Maximum Booking Opportunities</li>
                <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> Better ROI Results</li>
            </ul>
        </div>
    </div>
</div>
`;

// Find the second grid containing the second carousel and insert after it
// Since they are all identical grids inside the container, we can grab the last one and append
const grids = $('.stat-card-container').map(function() { return $(this).parent(); }).get();
const lastGrid = grids[grids.length - 1];
$(lastGrid).after(newCarouselHtml);

fs.writeFileSync(filePath, $.html(), 'utf8');
console.log('Successfully injected carousel 3 section');
