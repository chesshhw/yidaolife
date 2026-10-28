// Read the existing TypeScript data without maintaining another schedule or article store.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const cache = new Map();
function load(file) {
  file = path.resolve(root, file);
  if (!fs.existsSync(file)) file += '.ts';
  if (cache.has(file)) return cache.get(file);
  const module = { exports: {} };
  cache.set(file, module.exports);
  const js = ts.transpileModule(fs.readFileSync(file,'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(js, { module, exports: module.exports, Date, Intl,
    require: name => name.startsWith('@/') ? load('src/'+name.slice(2)) :
      name.startsWith('.') ? load(path.resolve(path.dirname(file),name)) : require(name),
  }, { filename: file });
  cache.set(file,module.exports);
  return module.exports;
}
module.exports = { load, root };
