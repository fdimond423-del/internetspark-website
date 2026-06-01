const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const filePath = path.join(__dirname, 'case-studies.html');
let html = fs.readFileSync(filePath, 'utf8');

const $ = cheerio.load(html, { decodeEntities: false });

const newSectionHtml = `
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:60px;align-items:center;margin-top:80px;border-top:1px solid var(--glass-border);padding-top:80px;">
    
    <!-- Static Image -->
    <div class="carousel-container" data-aos="fade-right" style="position:relative; width:100%; max-width: 400px; margin: 0 auto; aspect-ratio: 9/16; border-radius: 16px; overflow:hidden; border: 1px solid var(--glass-border); box-shadow: 0 20px 40px rgba(0,0,0,0.4); background: #000; display:flex; justify-content:center; align-items:center;">
        <img src="images/case_study_2.jpeg" style="width:100%; height:100%; object-fit:contain;" alt="OK Properties">
    </div>

    <!-- Content Box 5 -->
    <div class="stat-card-container" data-aos="fade-left">
        <div class="glass-card" style="padding:36px; height: 100%; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-size:1.6rem;font-weight:700;margin-bottom:30px;text-align:center">OK Properties</h3>
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
                <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                    <div style="font-size:1.6rem;font-weight:800;color:var(--primary);margin-bottom:8px">₹23-53</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Lead Cost</div>
                </div>
                <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                    <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">7X</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Better Results</div>
                </div>
                <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                    <div style="font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:8px">6</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Active Projects</div>
                </div>
                <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.03);border-radius:12px;border:1px solid rgba(255,255,255,0.05)">
                    <div style="font-size:1.6rem;font-weight:800;color:var(--primary);margin-bottom:8px">Optimized</div>
                    <div style="font-size:0.9rem;font-weight:600;color:var(--text-muted)">Campaigns</div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

// Append after the last grid
const grids = $('.stat-card-container').map(function() { return $(this).parent(); }).get();
const lastGrid = grids[grids.length - 1];
$(lastGrid).after(newSectionHtml);

fs.writeFileSync(filePath, $.html(), 'utf8');
console.log('Successfully injected case study 2 section');
