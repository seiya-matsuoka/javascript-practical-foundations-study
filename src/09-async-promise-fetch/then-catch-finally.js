import assert from 'node:assert/strict';

// 成功時は fulfilled、失敗時は rejected の Promise を返す小さな関数。
// then / catch / finally の流れを観察しやすくするため、通信ではなく固定値で表現する。
function fetchScore({ shouldFail }) {
  if (shouldFail) {
    return Promise.reject(new Error('scoreを取得できなかった。'));
  }

  return Promise.resolve(80);
}

export async function runThenCatchFinallyExamples() {
  const successEvents = [];

  // then は fulfilled の値を受け取り、次の Promise chain へ値を渡す。
  // return した値は、次の then で受け取れる。
  const successResult = await fetchScore({ shouldFail: false })
    .then((score) => {
      successEvents.push('then:score');
      return score + 10;
    })
    .then((score) => {
      successEvents.push('then:bonus');
      return `score=${score}`;
    })
    .catch((error) => {
      successEvents.push('catch');
      return error.message;
    })
    .finally(() => {
      successEvents.push('finally');
    });

  // 失敗時は、rejected になった位置から最初の catch へ処理が移る。
  // catch で値を return すると、その後の chain は fulfilled として続けられる。
  const failureEvents = [];

  // catch は rejected になった Promise を処理する。
  // finally は成功・失敗のどちらでも実行されるため、後片付けや loading 解除に使いやすい。
  const failureResult = await fetchScore({ shouldFail: true })
    .then((score) => {
      failureEvents.push('then');
      return score;
    })
    .catch((error) => {
      failureEvents.push('catch');
      return `error=${error.message}`;
    })
    .finally(() => {
      failureEvents.push('finally');
    });

  console.log('then / catch / finally成功時:', {
    successResult,
    successEvents,
  });
  console.log('then / catch / finally失敗時:', {
    failureResult,
    failureEvents,
  });

  assert.equal(successResult, 'score=90');
  assert.deepEqual(successEvents, ['then:score', 'then:bonus', 'finally']);
  assert.equal(failureResult, 'error=scoreを取得できなかった。');
  assert.deepEqual(failureEvents, ['catch', 'finally']);
}
