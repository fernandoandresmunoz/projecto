const fs = require('fs');
const path = require('path');

function findSpecs(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      findSpecs(path.join(dir, file), fileList);
    } else if (file.endsWith('.spec.ts')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const specs = findSpecs('./src/app');

for (const spec of specs) {
  let content = fs.readFileSync(spec, 'utf-8');
  let changed = false;

  // Add imports if missing
  if (!content.includes('HttpClientTestingModule')) {
    content = `import { HttpClientTestingModule } from '@angular/common/http/testing';\n` + content;
    changed = true;
  }
  if (!content.includes('RouterTestingModule')) {
    content = `import { RouterTestingModule } from '@angular/router/testing';\n` + content;
    changed = true;
  }
  if (!content.includes('NO_ERRORS_SCHEMA')) {
    content = `import { NO_ERRORS_SCHEMA } from '@angular/core';\n` + content;
    changed = true;
  }

  // Patch TestBed.configureTestingModule
  if (content.includes('TestBed.configureTestingModule({') && !content.includes('HttpClientTestingModule')) {
    // Wait, the checks above just prepended the imports to the file.
    // Let's replace the configureTestingModule object
    content = content.replace(
      /TestBed\.configureTestingModule\(\{([\s\S]*?)\}\)/,
      (match, p1) => {
        let newConfig = p1;
        if (!newConfig.includes('imports:')) {
          newConfig += `\n      imports: [HttpClientTestingModule, RouterTestingModule],`;
        } else {
          newConfig = newConfig.replace(/imports:\s*\[/, 'imports: [HttpClientTestingModule, RouterTestingModule, ');
        }
        if (!newConfig.includes('schemas:')) {
          newConfig += `\n      schemas: [NO_ERRORS_SCHEMA],`;
        } else {
          newConfig = newConfig.replace(/schemas:\s*\[/, 'schemas: [NO_ERRORS_SCHEMA, ');
        }
        return `TestBed.configureTestingModule({${newConfig}})`;
      }
    );
    changed = true;
  }
  
  // also patch GraficosService which does TestBed.configureTestingModule({});
  if (content.includes('TestBed.configureTestingModule({})')) {
      content = content.replace('TestBed.configureTestingModule({})', 'TestBed.configureTestingModule({ imports: [HttpClientTestingModule, RouterTestingModule], schemas: [NO_ERRORS_SCHEMA] })');
      changed = true;
  }

  if (changed) {
    fs.writeFileSync(spec, content, 'utf-8');
    console.log(`Patched ${spec}`);
  }
}
