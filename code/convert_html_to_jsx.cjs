const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../docs/figma/figma-uc08.html');
const cssOutputFile = path.join(__dirname, 'src/figma-uc08-strict.css');
const jsxOutputFile = path.join(__dirname, 'src/pages/FigmaUC08Strict.jsx');

let content = fs.readFileSync(inputFile, 'utf-8');

// 1. Extract CSS
const styleRegex = /<style>([\s\S]*?)<\/style>/i;
const styleMatch = content.match(styleRegex);
if (styleMatch) {
    fs.writeFileSync(cssOutputFile, styleMatch[1], 'utf-8');
}

// 2. Extract Body
const bodyRegex = /<body[^>]*>([\s\S]*?)<\/body>/i;
const bodyMatch = content.match(bodyRegex);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

// 3. Convert to JSX

// Convert attributes
bodyContent = bodyContent.replace(/class="/g, 'className="');
bodyContent = bodyContent.replace(/for="/g, 'htmlFor="');
bodyContent = bodyContent.replace(/tabindex="/g, 'tabIndex="');

// Convert inline styles
bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, p1) => {
    const rules = p1.split(';').filter(Boolean);
    const styleObjStr = rules.map(rule => {
        const parts = rule.split(':');
        if(parts.length < 2) return '';
        let key = parts[0].trim();
        if (key.startsWith('--')) {
            key = `'${key}'`;
        } else {
            key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        }
        const value = parts.slice(1).join(':').trim().replace(/'/g, '"');
        return `${key}: '${value}'`;
    }).filter(Boolean).join(', ');
    return `style={{ ${styleObjStr} }}`;
});

// Fix unclosed void tags
const voidTags = ['img', 'input', 'br', 'hr', 'source', 'link', 'meta'];
voidTags.forEach(tag => {
    const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'gi');
    bodyContent = bodyContent.replace(regex, `<${tag}$1 />`);
});

// Specifically fix SVG tags that might not have closing tags in some HTML exporters
const svgVoidTags = ['path', 'circle', 'rect', 'line', 'polyline', 'polygon'];
svgVoidTags.forEach(tag => {
    const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'gi');
    bodyContent = bodyContent.replace(regex, (match, p1) => {
        return `<${tag}${p1} />`;
    });
});
svgVoidTags.forEach(tag => {
    const closingRegex = new RegExp(`</${tag}>`, 'gi');
    bodyContent = bodyContent.replace(closingRegex, '');
});

// Convert SVG attributes
bodyContent = bodyContent.replace(/stroke-linecap="/g, 'strokeLinecap="');
bodyContent = bodyContent.replace(/stroke-linejoin="/g, 'strokeLinejoin="');
bodyContent = bodyContent.replace(/stroke-width="/g, 'strokeWidth="');
bodyContent = bodyContent.replace(/fill-rule="/g, 'fillRule="');
bodyContent = bodyContent.replace(/clip-rule="/g, 'clipRule="');

// Fix HTML comments
bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

// Fix => to =&gt; inside text nodes
bodyContent = bodyContent.replace(/=>/g, '=&gt;');
bodyContent = bodyContent.replace(/ <= /g, ' &lt;= ');

// Fix <script> tags for React JSX by using dangerouslySetInnerHTML
bodyContent = bodyContent.replace(/<script>([\s\S]*?)<\/script>/g, (match, scriptBody) => {
    // Escape backticks and dollar signs for template literal inside the JS generated file
    const escaped = scriptBody.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    return `<script dangerouslySetInnerHTML={{ __html: \`${escaped}\` }} />`;
});

const jsxTemplate = `import React from 'react';
import '../figma-uc08-strict.css';

export default function FigmaUC08Strict() {
  return (
    <div className="figma-strict-wrapper">
      ${bodyContent}
    </div>
  );
}
`;

fs.writeFileSync(jsxOutputFile, jsxTemplate, 'utf-8');
console.log('Conversion completed successfully!');
