const fs = require('fs');
let css = fs.readFileSync('d:/hci-diverse-englishlearning/code/src/figma-uc08-strict.css', 'utf8');
css = css.replace(/width:\s*1440px\s*!important;/g, 'width: 100% !important;');
css = css.replace(/width:\s*1180px\s*!important;/g, 'width: 100% !important;');
css = css.replace(/max-width:\s*1180px\s*!important;/g, 'max-width: 100% !important;');
css = css.replace(/width:\s*1180px;/g, 'width: 100%;');
css = css.replace(/width:\s*1440px;/g, 'width: 100%;');
fs.writeFileSync('d:/hci-diverse-englishlearning/code/src/figma-uc08-strict.css', css);
console.log('Removed hardcoded widths');
