const fs = require('fs');

const cssToAppend = `
.orbit-wrapper { position:absolute; right:15%; top:50%; transform:translateY(-50%); width:400px; height:400px; z-index:0; }
@media(max-width:992px){ .orbit-wrapper { right:50%; transform:translate(50%, -50%) scale(0.7); opacity:0.3; } }
.orbit-center { position:absolute; inset:0; border-radius:50%; background:radial-gradient(circle, rgba(233,30,140,0.1) 0%, transparent 60%); border:2px dashed rgba(233,30,140,0.3); display:flex; align-items:center; justify-content:center; }
.orbit-center::before { content:''; position:absolute; width:150px; height:150px; border-radius:50%; background:var(--gradient-card); border:1px solid var(--glass-border); box-shadow:0 0 30px rgba(233,30,140,0.5); }
.orbit-center-icon { position:relative; z-index:1; font-size:4rem; color:var(--primary); animation:pulse-logo 2s infinite; }
.orbit-icon { position:absolute; left:50%; top:50%; width:70px; height:70px; background:var(--glass); border:1px solid var(--glass-border); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem; color:var(--primary); box-shadow:0 10px 20px rgba(0,0,0,0.3); animation:orbit-anim 20s linear infinite; animation-delay:var(--delay); }
@keyframes orbit-anim { 0% { transform:translate(-50%,-50%) rotate(0deg) translateX(200px) rotate(0deg); } 100% { transform:translate(-50%,-50%) rotate(360deg) translateX(200px) rotate(-360deg); } }
`;

fs.appendFileSync('c:/Users/FENIL LIMBACHIYA/Downloads/internetspark website 2026/css/main.css', cssToAppend);
console.log('Appended Orbit CSS');
