const fs = require('fs');
const path = require('path');

const srcPath = 'c:\\hci-diverse-englishlearning\\docs\\figma\\figma-uc5a.html';
const destPath = 'c:\\hci-diverse-englishlearning\\code\\src\\figma-uc5a.css';

const html = fs.readFileSync(srcPath, 'utf8');

const styleStart = html.indexOf('<style>');
const styleEnd = html.indexOf('</style>');

if (styleStart !== -1 && styleEnd !== -1) {
  const css = html.substring(styleStart + 7, styleEnd);
  fs.writeFileSync(destPath, css, 'utf8');
  console.log('Successfully extracted CSS!');
} else {
  console.error('Could not find <style> tags.');
}
