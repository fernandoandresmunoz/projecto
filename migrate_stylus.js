const fs = require('fs');
const path = require('path');
const stylus = require('stylus');

function findFiles(dir, ext, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory() && file !== 'node_modules' && file !== 'dist') {
      findFiles(path.join(dir, file), ext, fileList);
    } else if (file.endsWith(ext)) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const stylFiles = findFiles('./src', '.styl');

for (const stylFile of stylFiles) {
  const content = fs.readFileSync(stylFile, 'utf-8');
  try {
    const css = stylus.render(content);
    const cssFile = stylFile.replace(/\.styl$/, '.css');
    fs.writeFileSync(cssFile, css, 'utf-8');
    fs.unlinkSync(stylFile); // Remove old styl file
    console.log(`Compiled and removed ${stylFile}`);
  } catch (e) {
    console.error(`Failed to compile ${stylFile}:`, e.message);
  }
}

const tsFiles = findFiles('./src', '.ts');
for (const tsFile of tsFiles) {
  let content = fs.readFileSync(tsFile, 'utf-8');
  if (content.includes('.styl')) {
    content = content.replace(/\.styl/g, '.css');
    fs.writeFileSync(tsFile, content, 'utf-8');
    console.log(`Updated references in ${tsFile}`);
  }
}
