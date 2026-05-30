import assert from 'node:assert/strict';

// try / finally の動きを確認するため、接続の open / close を記録する object を作る。
// 実際の DB 接続やファイル操作ではないが、後片付けが必要な処理の縮小版として読む。
function createConnectionSimulator({ shouldFail }) {
  const events = [];

  return {
    events,
    open() {
      events.push('open');

      if (shouldFail) {
        throw new Error('接続に失敗した。');
      }

      return 'connection';
    },
    close() {
      events.push('close');
    },
  };
}

// 成功時も失敗時も close したい処理は finally に置く。
// catch で失敗内容を扱い、finally で後片付けする役割分担を見る。
function readWithFinally({ shouldFail }) {
  const connection = createConnectionSimulator({ shouldFail });
  let readResult = null;
  let errorMessage = null;

  try {
    const openedConnection = connection.open();

    readResult = `${openedConnection}: read success`;
  } catch (error) {
    // catch では、失敗時に必要な処理だけを行う。
    // 何もせず握りつぶすと、呼び出し元やログから原因を追えなくなる。
    errorMessage = error.message;
  } finally {
    // finally は、成功しても失敗しても実行される。
    // 接続の後片付け、ロック解除、ローディング状態の解除などに使う。
    connection.close();
  }

  return {
    readResult,
    errorMessage,
    events: connection.events,
  };
}

function ignoreErrorBadExample() {
  try {
    throw new Error('握りつぶされるエラー');
  } catch {
    // エラーを握りつぶすと、何が起きたか外から分からなくなる。
    // 実務では、最低限ログに残す、result object として返す、再 throw するなどの方針を選ぶ。
    return '失敗したが理由は失われた';
  }
}

export function runTryCatchFinallyExamples() {
  // 同じ readWithFinally を成功条件と失敗条件で実行し、finally がどちらでも動くことを確認する。
  const successResult = readWithFinally({ shouldFail: false });
  const failureResult = readWithFinally({ shouldFail: true });
  const ignoredResult = ignoreErrorBadExample();

  console.log('成功時のtry-catch-finally結果:', successResult);
  console.log('失敗時のtry-catch-finally結果:', failureResult);
  console.log('握りつぶしの悪い例:', ignoredResult);

  assert.deepEqual(successResult, {
    readResult: 'connection: read success',
    errorMessage: null,
    events: ['open', 'close'],
  });
  assert.deepEqual(failureResult, {
    readResult: null,
    errorMessage: '接続に失敗した。',
    events: ['open', 'close'],
  });
  assert.equal(ignoredResult, '失敗したが理由は失われた');
}
