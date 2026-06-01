const fs = require('fs');
let css = fs.readFileSync('css/main.css', 'utf8');

// The string we want to fix:
// .nav-logo img,
// .footer-brand .logo img,
// .logo img,
// .loader-logo,
// .page-loader img {
//   display: none !important;
// }

css = css.replace(/\.nav-logo img,\s*\.footer-brand \.logo img,\s*\.logo img,\s*/g, '');

fs.writeFileSync('css/main.css', css);
console.log('Fixed CSS');
