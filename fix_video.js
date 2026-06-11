const fs = require('fs');
const file = 'services/video-editing.html';
let content = fs.readFileSync(file, 'utf8');

const newServices = `<div class="service-list">
<div class="service-item" data-aos="fade-up"><div class="s-icon">🎬</div><div><h4>YouTube Video Editing</h4><p style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-top:12px;text-align:center;padding:0 10px;">High-retention edits with dynamic cuts, B-rolls, and engaging hooks designed to grow your YouTube channel.</p></div></div>
<div class="service-item" data-aos="fade-up"><div class="s-icon">📱</div><div><h4>Instagram Reels & Shorts</h4><p style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-top:12px;text-align:center;padding:0 10px;">Fast-paced, highly engaging short-form videos optimized for virality on Instagram, TikTok, and YouTube Shorts.</p></div></div>
<div class="service-item" data-aos="fade-up"><div class="s-icon">🏢</div><div><h4>Corporate Videos</h4><p style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-top:12px;text-align:center;padding:0 10px;">Professional brand storytelling, company culture videos, and executive interviews with premium quality.</p></div></div>
<div class="service-item" data-aos="fade-up"><div class="s-icon">🎨</div><div><h4>Color Grading</h4><p style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-top:12px;text-align:center;padding:0 10px;">Cinematic color correction and grading to give your footage a professional, polished, and visually stunning look.</p></div></div>
<div class="service-item" data-aos="fade-up"><div class="s-icon">✨</div><div><h4>Motion Graphics</h4><p style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-top:12px;text-align:center;padding:0 10px;">Custom animations, text tracking, and visual effects that bring your videos to life and explain complex concepts.</p></div></div>
<div class="service-item" data-aos="fade-up"><div class="s-icon">🎵</div><div><h4>Audio Mixing & SFX</h4><p style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-top:12px;text-align:center;padding:0 10px;">Crisp voiceovers, background noise removal, and immersive sound design to elevate the production value.</p></div></div>
<div class="service-item" data-aos="fade-up"><div class="s-icon">🎙️</div><div><h4>Podcast Editing</h4><p style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-top:12px;text-align:center;padding:0 10px;">Multi-cam switching, audio syncing, and removing pauses or mistakes for a seamless podcast viewing experience.</p></div></div>
<div class="service-item" data-aos="fade-up"><div class="s-icon">🏡</div><div><h4>Real Estate Videos</h4><p style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-top:12px;text-align:center;padding:0 10px;">Smooth drone footage editing and property walkthroughs with elegant transitions and typography.</p></div></div>
<div class="service-item" data-aos="fade-up"><div class="s-icon">📢</div><div><h4>Video Ads</h4><p style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-top:12px;text-align:center;padding:0 10px;">High-converting promotional videos and UGC ad edits designed to drive sales on Meta and Google Ads.</p></div></div>
<div class="service-item" data-aos="fade-up"><div class="s-icon">🤖</div><div><h4>AI Avatar Videos</h4><p style="color:var(--text-muted);font-size:0.95rem;line-height:1.7;margin-top:12px;text-align:center;padding:0 10px;">Cutting-edge AI-generated spokesperson videos for scalable, cost-effective content creation and marketing.</p></div></div>
</div>`;

content = content.replace(/<div class="service-list">.*?<\/div><\/div><\/section>/s, newServices + '</div></section>');
fs.writeFileSync(file, content, 'utf8');
console.log('Replaced successfully');
