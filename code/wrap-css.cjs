const fs = require('fs');
let css = fs.readFileSync('d:/hci-diverse-englishlearning/code/src/figma-uc08-strict.css', 'utf8');

css = css.replace(/@import.*?;/, '');

const rootMatch = css.match(/:root\s*\{[\s\S]*?\}/);
const rootStr = rootMatch ? rootMatch[0] : '';
css = css.replace(/:root\s*\{[\s\S]*?\}/, '');

// Clean up previous temporary fixes
css = css.replace(/\.figma-strict-wrapper \*/g, '*');
css = css.replace(/\.figma-strict-wrapper\s*\{\s*background-color: var\(--canvas\);\s*padding: 40px;\s*color: var\(--text-primary\);\s*\}/g, 'body { background-color: var(--canvas); padding: 40px; color: var(--text-primary); }');

css = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap');
${rootStr}
.figma-strict-wrapper {
${css}
}`;

fs.writeFileSync('d:/hci-diverse-englishlearning/code/src/figma-uc08-strict.css', css);
console.log('CSS wrapped successfully');
