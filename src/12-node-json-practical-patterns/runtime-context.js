import assert from 'node:assert/strict';

function readOptionValue(args, optionName, defaultValue) {
  const prefix = `${optionName}=`;
  const option = args.find((arg) => arg.startsWith(prefix));

  if (option === undefined) {
    return defaultValue;
  }

  return option.slice(prefix.length);
}

export function runRuntimeContextExamples() {
  // process は Node.js の実行環境に関する情報を持つ global object。
  // ブラウザの window とは別物であり、Node.js 側の JavaScript で使う代表的な入口になる。
  const runtimeInfo = {
    nodeVersion: process.version,
    platform: process.platform,
    currentWorkingDirectory: process.cwd(),
  };

  console.log('processから取得した実行環境:', runtimeInfo);

  // 環境変数は process.env から取得する。
  // 実務では API URL、実行モード、外部サービスの設定値などをコード外から渡すために使う。
  // ここでは値が未設定でも動くように default value を用意する。
  const appMode = process.env.UNIT12_APP_MODE ?? 'local';
  const logLevel = process.env.UNIT12_LOG_LEVEL ?? 'info';

  console.log('環境変数から作った設定:', {
    appMode,
    logLevel,
  });

  // コマンドライン引数は process.argv に入る。
  // 先頭 2 件は Node.js 実行ファイルと実行対象ファイルのため、アプリ側の引数だけを見るなら slice(2) する。
  const userArgs = process.argv.slice(2);
  const limitText = readOptionValue(userArgs, '--limit', '3');
  const parsedLimit = Number.parseInt(limitText, 10);
  const limit = Number.isNaN(parsedLimit) ? 3 : parsedLimit;

  console.log('コマンドライン引数:', userArgs);
  console.log('引数から作ったlimit:', limit);

  // npm scripts から実行した場合、npm_lifecycle_event に script 名が入ることがある。
  // devDependencies 自体をコードから扱うわけではないが、npm scripts 経由でツールを呼ぶ流れの確認に役立つ。
  const npmScriptName = process.env.npm_lifecycle_event ?? 'direct-node';

  console.log('npm script名の例:', npmScriptName);

  assert.equal(typeof runtimeInfo.nodeVersion, 'string');
  assert.equal(typeof runtimeInfo.platform, 'string');
  assert.equal(typeof runtimeInfo.currentWorkingDirectory, 'string');
  assert.equal(appMode.length > 0, true);
  assert.equal(logLevel.length > 0, true);
  assert.equal(Number.isInteger(limit), true);
  assert.equal(typeof npmScriptName, 'string');
}
