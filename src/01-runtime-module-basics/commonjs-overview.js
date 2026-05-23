import assert from 'node:assert/strict';

// CommonJS は、古くから Node.js で使われてきたモジュール方式。
// このリポジトリでは ES Modules を中心に使うため、CommonJS は概要のみ確認する。
const commonJsExample = `const { readFileSync } = require('node:fs');

function readTextFile(path) {
  return readFileSync(path, 'utf8');
}

module.exports = {
  readTextFile,
};`;

const esmExample = `import { readFile } from 'node:fs/promises';

export async function readTextFile(path) {
  return readFile(path, 'utf8');
}`;

export function runCommonJsOverview() {
  const comparison = [
    {
      moduleSystem: 'CommonJS',
      fileExtensionExample: '.cjs / type指定なしの.js',
      loadingSyntax: 'require(...)',
      exportSyntax: 'module.exports',
      mainUseCase: '古いNode.jsプロジェクトや既存ライブラリで見かける',
    },
    {
      moduleSystem: 'ES Modules',
      fileExtensionExample: '.mjs / package.jsonでtype=moduleの.js',
      loadingSyntax: 'import ... from ...',
      exportSyntax: 'export',
      mainUseCase: '現代的なJavaScript、TypeScript、React、Vite系で中心になる',
    },
  ];

  console.log('CommonJSとES Modulesの比較:', comparison);
  console.log('CommonJSの例:');
  console.log(commonJsExample);
  console.log('ES Modulesの例:');
  console.log(esmExample);
  console.log('このリポジトリではES Modulesを中心に扱う。');

  assert.equal(comparison[0].loadingSyntax, 'require(...)');
  assert.equal(comparison[0].exportSyntax, 'module.exports');
  assert.equal(comparison[1].loadingSyntax, 'import ... from ...');
  assert.equal(comparison[1].exportSyntax, 'export');
}
