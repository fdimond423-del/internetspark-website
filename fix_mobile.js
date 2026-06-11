const fs = require('fs');
let css = fs.readFileSync('css/main.css', 'utf8');

const fix = `

/* --- Global Mobile Grid Fixes --- */
@media (max-width: 900px) {
  div[style*="grid-template-columns:1fr 1fr"],
  div[style*="grid-template-columns: 1fr 1fr"] {
    grid-template-columns: 1fr !important;
    gap: 30px !important;
  }
}
@media (max-width: 768px) {
  .hero-split,
  .about-grid,
  .service-detail-grid,
  .contact-grid,
  .why-grid,
  .two-col-grid {
    grid-template-columns: 1fr !important;
  }
}
`;

if (!css.includes("Global Mobile Grid Fixes")) {
  fs.writeFileSync('css/main.css', css + fix);
  console.log("Successfully added mobile grid fixes to main.css");
} else {
  console.log("Fix already applied.");
}
