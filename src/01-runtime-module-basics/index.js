import { runCommonJsOverview } from './commonjs-overview.js';
import { runModuleBasicsExamples } from './module-basics.js';
import { runModuleScopeAndStrictModeExamples } from './module-scope-and-strict-mode.js';
import { runPackageAndScriptsExamples } from './package-and-scripts.js';
import { runRuntimeBoundaryExamples } from './runtime-boundaries.js';
import { runScriptExecutionExamples } from './script-execution.js';

const unitTitle = 'Unit 01. JavaScriptの実行環境・リポジトリ基礎・モジュール入門';

// 各サンプルファイルは、Unit 01 で確認するテーマごとに分ける。
// index.js は、それらを順番に呼び出す実行入口として扱う。
// 実務コードでも、入口ファイルが各機能を import して処理を組み立てる構成はよく使われる。
const runners = [
  {
    title: 'JavaScript標準機能・Web API・Node.js APIの違い',
    run: runRuntimeBoundaryExamples,
  },
  {
    title: 'script実行とconsole.log',
    run: runScriptExecutionExamples,
  },
  {
    title: 'package.jsonとnpm scripts',
    run: runPackageAndScriptsExamples,
  },
  {
    title: 'ES Modulesのimport / export',
    run: runModuleBasicsExamples,
  },
  {
    title: 'モジュールスコープとstrict mode',
    run: runModuleScopeAndStrictModeExamples,
  },
  {
    title: 'CommonJSの概要',
    run: runCommonJsOverview,
  },
];

function printUnitHeader() {
  const line = '='.repeat(80);

  console.log(line);
  console.log(unitTitle);
  console.log(line);
}

function printSectionHeader(sectionNumber, title) {
  const line = '-'.repeat(80);

  console.log('');
  console.log(line);
  console.log(`${sectionNumber}. ${title}`);
  console.log(line);
}

printUnitHeader();

// ES Modules では top-level await を使える。
// ここでは、各テーマの run 関数が同期処理でも非同期処理でも同じ形で呼び出せるように await を付ける。
for (const [index, runner] of runners.entries()) {
  printSectionHeader(index + 1, runner.title);
  await runner.run();
}

console.log('');
console.log('Unit 01のNode.js側サンプルをすべて実行した。');
console.log('ブラウザ側の確認は browser-module-demo.html をブラウザで開いて行う。');
