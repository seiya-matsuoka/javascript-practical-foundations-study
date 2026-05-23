import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const packageJsonUrl = new URL('../../package.json', import.meta.url);

export async function runPackageAndScriptsExamples() {
  // package.json は、Node.js / npm プロジェクトの基本設定ファイル。
  // ここでは、実行コマンド、Node.js バージョン、ES Modules 設定を確認する。
  const packageJsonText = await readFile(packageJsonUrl, 'utf8');
  const packageJson = JSON.parse(packageJsonText);

  console.log('package.jsonのname:', packageJson.name);
  console.log('package.jsonのtype:', packageJson.type);
  console.log('Node.js engines:', packageJson.engines);
  console.log('Unit 01実行用script:', packageJson.scripts['unit:01']);

  const toolScripts = {
    lint: packageJson.scripts.lint,
    format: packageJson.scripts.format,
    formatCheck: packageJson.scripts['format:check'],
  };

  console.log('開発用script:', toolScripts);

  // "type": "module" により、このリポジトリの .js ファイルは ES Modules として扱われる。
  // そのため、import / export を標準的に使える。
  assert.equal(packageJson.name, 'javascript-practical-foundations-study');
  assert.equal(packageJson.type, 'module');
  assert.equal(packageJson.engines.node, '>=24');
  assert.equal(packageJson.scripts['unit:01'], 'node src/01-runtime-module-basics/index.js');

  // ESLint と Prettier は、サンプル本体の外部ライブラリではなく開発ツール。
  // 実務では PR 前に lint や format を確認する流れがよく使われる。
  assert.equal(toolScripts.lint, 'eslint .');
  assert.equal(toolScripts.format, 'prettier --write .');
  assert.equal(toolScripts.formatCheck, 'prettier --check .');
}
