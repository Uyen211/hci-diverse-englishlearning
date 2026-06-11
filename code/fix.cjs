const fs = require('fs');
const file = 'd:/hci-diverse-englishlearning/code/src/pages/FigmaUC08Strict.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/-Pct/g, "'--pct'");
fs.writeFileSync(file, content);
