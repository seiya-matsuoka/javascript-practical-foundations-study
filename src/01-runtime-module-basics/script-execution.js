import assert from 'node:assert/strict';

export function runScriptExecutionExamples() {
  // console.log は、処理の流れや値を確認するために使う。
  // 実務ではログ出力方針に従う必要があるが、サンプルコードでは挙動確認に有効。
  console.log('console.logは実行結果確認に使う。');

  // process は Node.js が提供する API。
  // ブラウザでは通常 process をそのまま使えない。
  const executionInfo = {
    currentWorkingDirectory: process.cwd(),
    moduleUrl: import.meta.url,
    nodeExecutablePath: process.argv[0],
    executedScriptPath: process.argv[1],
  };

  // process.cwd() は、現在の作業ディレクトリを返す。
  // 「このファイルがあるディレクトリ」ではなく、「コマンドを実行した場所」を表す。
  console.log('現在の作業ディレクトリ:', executionInfo.currentWorkingDirectory);

  // import.meta.url は、ES Modules で現在のモジュール自身の URL を取得する方法。
  // CommonJS の __filename とは異なる書き方になる。
  console.log('このモジュールのURL:', executionInfo.moduleUrl);

  // process.argv には、Node.js 実行ファイルや実行対象スクリプト、追加引数が入る。
  // CLI ツールを作るときによく使う。
  console.log('Node.js実行ファイル:', executionInfo.nodeExecutablePath);
  console.log('実行されたエントリーファイル:', executionInfo.executedScriptPath);

  const directNodeCommand = 'node src/01-runtime-module-basics/index.js';
  const npmScriptCommand = 'npm run unit:01';

  // npm scripts を使うと、長い実行コマンドに名前を付けられる。
  // このリポジトリでは、Unit 単位で実行コマンドをそろえるために使う。
  console.log('直接実行する場合:', directNodeCommand);
  console.log('npm scripts経由で実行する場合:', npmScriptCommand);

  assert.equal(executionInfo.moduleUrl.startsWith('file:'), true);
  assert.equal(typeof executionInfo.currentWorkingDirectory, 'string');
  assert.equal(typeof executionInfo.nodeExecutablePath, 'string');
  assert.equal(typeof executionInfo.executedScriptPath, 'string');
  assert.equal(directNodeCommand, 'node src/01-runtime-module-basics/index.js');
  assert.equal(npmScriptCommand, 'npm run unit:01');
}
