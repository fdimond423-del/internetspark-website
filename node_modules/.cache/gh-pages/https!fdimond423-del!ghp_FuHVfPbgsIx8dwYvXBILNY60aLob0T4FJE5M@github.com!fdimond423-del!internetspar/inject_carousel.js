const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'case-studies.html');
let html = fs.readFileSync(filePath, 'utf8');

const newSection = `
<style>
@keyframes slideAnimation {
    0%, 25% { transform: translateX(0); }
    33%, 58% { transform: translateX(-33.333%); }
    66%, 91% { transform: translateX(-66.666%); }
    100% { transform: translateX(0); }
}
</style>
<section class="section-padding" style="padding-bottom: 20px;">
    <div class="container">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:60px;align-items:center;">
            
            <!-- Auto Slider Carousel -->
            <div class="carousel-container" data-aos="fade-right" style="position:relative; width:100%; max-width: 400px; margin: 0 auto; aspect-ratio: 4/5; border-radius: 16px; overflow:hidden; border: 1px solid var(--glass-border); box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
                <div class="carousel-track" style="display:flex; width: 300%; height: 100%; animation: slideAnimation 9s infinite;">
                    <div style="width: 33.333%; height: 100%; flex-shrink: 0;">
                        <img src="images/crousol%20slide%20(1).png" style="width:100%; height:100%; object-fit:cover;" alt="Carousel Slide 1">
                    </div>
                    <div style="width: 33.333%; height: 100%; flex-shrink: 0;">
                        <img src="images/crousol%20slide%202.png" style="width:100%; height:100%; object-fit:cover;" alt="Carousel Slide 2">
                    </div>
                    <div style="width: 33.333%; height: 100%; flex-shrink: 0;">
                        <img src="images/crousol%20slide%20%203.png" style="width:100%; height:100%; object-fit:cover;" alt="Carousel Slide 3">
                    </div>
                </div>
            </div>

            <!-- Content Box -->
            <div class="stat-card-container" data-aos="fade-left">
                <div class="glass-card" style="padding:36px; height: 100%; display: flex; flex-direction: column; justify-content: center;">
                    <h3 style="font-size:1.4rem;font-weight:700;margin-bottom:30px;text-align:center">🚀 Campaign Highlights</h3>
                    
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:30px">
                        <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                            <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">753+</div>
                            <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Quality Leads</div>
                        </div>
                        <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                            <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">₹56</div>
                            <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Avg. CPL</div>
                        </div>
                        <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                            <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">₹70K+</div>
                            <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Ad Spend</div>
                        </div>
                        <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                            <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">Strong</div>
                            <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">ROI Results</div>
                        </div>
                    </div>

                    <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:16px">
                        <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> High-Intent Targeting</li>
                        <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> Consistent Lead Flow</li>
                        <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> Optimized Meta Ads</li>
                        <li style="display:flex;align-items:center;gap:12px;font-size:1rem;color:var(--text-muted)"><i class="fas fa-check-circle" style="color:var(--primary)"></i> Increased Enquiries</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
`;

html = html.replace('<section class="section-padding">', newSection + '\n<section class="section-padding">');

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully injected carousel section');
