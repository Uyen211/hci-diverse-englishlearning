const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

const targetDir = path.join(__dirname, 'pages', 'student');

walk(targetDir, (filePath) => {
    if (!filePath.endsWith('.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // First, let's find the wf-hint-bar div.
    // It's usually like:
    // <div className="wf-hint-bar">
    //   <div className="wf-hint-text">...</div>
    //   <div className="wf-hint-text">...</div>
    // </div>
    
    // We will do replacements step by step.
    
    // Replace the main container class
    content = content.replace(/className="wf-hint-bar"/g, 'className="flex justify-between items-center bg-primary/5 border border-primary/20 rounded-xl p-4 mt-6 text-sm text-primary"');
    
    // Replace the keys
    content = content.replace(/<span className="wf-hint-key">/g, '<kbd className="bg-white px-1.5 py-0.5 border rounded shadow-sm text-xs font-semibold mr-1 text-text-primary">');
    // We need to replace the closing span for the keys. But how do we know which </span> is for the key?
    // Let's use regex to capture the content inside the key
    content = content.replace(/<kbd className="([^"]+)">([^<]+)<\/span>/g, '<kbd className="$1">$2</kbd>');
    
    // Now replace the wf-hint-text.
    // The first wf-hint-text is the left side, the second is the right side.
    // We can do this by finding the outer flex container and replacing inside it.
    let searchStr = 'className="flex justify-between items-center bg-primary/5 border border-primary/20 rounded-xl p-4 mt-6 text-sm text-primary"';
    let parts = content.split(searchStr);
    
    if (parts.length > 1) {
        for (let i = 1; i < parts.length; i++) {
            let blockStr = parts[i];
            
            // Find the first wf-hint-text
            let firstHintIdx = blockStr.indexOf('className="wf-hint-text"');
            if (firstHintIdx !== -1) {
                blockStr = blockStr.substring(0, firstHintIdx) + 'className="flex flex-wrap items-center gap-4"' + blockStr.substring(firstHintIdx + 24);
            }
            
            // Find the second wf-hint-text
            let secondHintIdx = blockStr.indexOf('className="wf-hint-text"');
            if (secondHintIdx !== -1) {
                blockStr = blockStr.substring(0, secondHintIdx) + 'className="text-xs text-text-secondary opacity-80 hidden md:block"' + blockStr.substring(secondHintIdx + 24);
            }
            
            parts[i] = blockStr;
        }
        content = parts.join(searchStr);
    }
    
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log('Updated jsx:', filePath);
    }
});
