const fs = require('fs');

// 1. Clean CSS
let css = fs.readFileSync('d:/hci-diverse-englishlearning/code/src/figma-uc08-strict.css', 'utf8');

// Un-wrap if it was wrapped
css = css.replace(/\.figma-strict-wrapper\s*\{([\s\S]*)\}/, '$1');

// Remove * { ... } and body { ... } to prevent global leak
css = css.replace(/\*\s*\{[\s\S]*?\}/, '');
css = css.replace(/body\s*\{[\s\S]*?\}/, '');

fs.writeFileSync('d:/hci-diverse-englishlearning/code/src/figma-uc08-strict.css', css);

// 2. Clean JSX
let jsx = fs.readFileSync('d:/hci-diverse-englishlearning/code/src/pages/FigmaUC08Strict.jsx', 'utf8');

jsx = jsx.replace(/<aside className="sidebar">[\s\S]*?<\/aside>/g, '');
jsx = jsx.replace(/<header className="header">[\s\S]*?<\/header>/g, '');
jsx = jsx.replace(/<footer className="footer">[\s\S]*?<\/footer>/g, '');

fs.writeFileSync('d:/hci-diverse-englishlearning/code/src/pages/FigmaUC08Strict.jsx', jsx);

console.log('Cleaned up CSS leak and removed Figma Layout parts');
