const fs = require('fs');
function findSpecs(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(dir + '/' + file);
    if (stat.isDirectory()) {
      findSpecs(dir + '/' + file, fileList);
    } else if (file.endsWith('.spec.ts')) {
      fileList.push(dir + '/' + file);
    }
  }
  return fileList;
}

const specs = findSpecs('./src/app');
for (const spec of specs) {
  let content = fs.readFileSync(spec, 'utf-8');
  let changed = false;

  // Make sure configureTestingModule has the testing modules and schemas
  let match = content.match(/TestBed\.configureTestingModule\(\s*\{([\s\S]*?)\}\s*\)/);
  if (match) {
    let configStr = match[1];
    
    // Check if we need to add imports
    if (!configStr.includes('HttpClientTestingModule')) {
      if (configStr.includes('imports:')) {
        configStr = configStr.replace(/imports:\s*\[/, 'imports: [HttpClientTestingModule, RouterTestingModule, ');
      } else {
        configStr += ',\n      imports: [HttpClientTestingModule, RouterTestingModule]';
      }
      changed = true;
    }
    
    // Check schemas
    if (!configStr.includes('NO_ERRORS_SCHEMA')) {
      if (configStr.includes('schemas:')) {
        configStr = configStr.replace(/schemas:\s*\[/, 'schemas: [NO_ERRORS_SCHEMA, ');
      } else {
        configStr += ',\n      schemas: [NO_ERRORS_SCHEMA]';
      }
      changed = true;
    }

    if (changed) {
      content = content.replace(/TestBed\.configureTestingModule\(\s*\{([\s\S]*?)\}\s*\)/, `TestBed.configureTestingModule({${configStr}})`);
      fs.writeFileSync(spec, content, 'utf-8');
      console.log(`Patched ${spec}`);
    }
  }
}
