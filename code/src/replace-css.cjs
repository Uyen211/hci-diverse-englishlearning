const fs = require('fs');
const path = require('path');

const replacementCSS = `
        /* === BOTTOM HINT BAR (consistent across screens) === */
        .wf-hint-bar { 
            margin-top: 24px;
            padding: 16px; 
            border: 1px solid rgba(78, 86, 192, 0.2) !important; 
            background: rgba(78, 86, 192, 0.05) !important; 
            border-radius: 12px;
            display: flex; 
            flex-direction: row; 
            align-items: center; 
            justify-content: space-between; 
            font-size: 14px;
            color: var(--primary);
            border-top: 1px solid rgba(78, 86, 192, 0.2) !important;
        }
        .wf-hint-key { 
            display: inline-block; 
            border: 1px solid #e2e8f0 !important; 
            background: #ffffff !important; 
            border-radius: 4px;
            padding: 2px 6px; 
            font-size: 12px; 
            font-weight: 600; 
            color: var(--text-primary) !important; 
            font-family: inherit; 
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
            margin-right: 4px;
        }
        .wf-hint-text { 
            font-size: 14px !important; 
            color: var(--primary) !important; 
        }
        .wf-hint-text span {
            display: inline-flex;
            align-items: center;
        }
        .wf-hint-bar > .wf-hint-text:last-child {
            font-size: 12px !important;
            color: var(--text-secondary) !important;
            opacity: 0.8;
            font-weight: normal;
        }
        @media (max-width: 768px) {
            .wf-hint-bar > .wf-hint-text:last-child {
                display: none;
            }
        }
        .wf-hint-text strong { 
            color: var(--primary); 
            font-weight: 600;
        }
`;

function processFile(filename, startStr, endStrFallback) {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    let startIndex = content.indexOf('.wf-hint-bar {');
    if (startIndex === -1) startIndex = content.indexOf('.wf-hint-bar');
    if (startIndex === -1) return;

    let commentStart = content.lastIndexOf('/*', startIndex);
    if (commentStart !== -1 && (startIndex - commentStart) < 100) {
        startIndex = commentStart;
    }

    let endIndex = -1;
    for (let fallback of endStrFallback) {
        endIndex = content.indexOf(fallback, startIndex + 50);
        if (endIndex !== -1) break;
    }

    if (endIndex !== -1) {
        let before = content.substring(0, startIndex);
        let after = content.substring(endIndex);
        fs.writeFileSync(filePath, before + replacementCSS + "\n        " + after);
        console.log('Updated', filename);
    } else {
        console.log('Could not find end of block in', filename);
    }
}

processFile('figma.css', '.wf-hint-bar', ['.wf-word-count {', '/* === MODE CARD']);
processFile('figma-uc5a.css', '.wf-hint-bar', ['.wf-word-count {', '/* === MODE CARD', '.wf-mode-grid {']);
processFile('figma-uc08.css', '.wf-hint-bar', ['/* ===', '.wf-progress', '.wf-stat']);
