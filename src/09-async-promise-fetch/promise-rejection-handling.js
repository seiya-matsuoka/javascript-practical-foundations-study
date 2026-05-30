import assert from 'node:assert/strict';
import { captureAsyncResult, createDelayedError, createDelayedValue } from './async-helpers.js';

// 必須データの取得に失敗したケースを Promise rejection として表す。
// throw と同じく、呼び出し元が適切に catch しないと処理全体の失敗になる。
async function loadRequiredValue(shouldFail) {
  if (shouldFail) {
    return createDelayedError('必須データを読み込めなかった。', 1);
  }

  return createDelayedValue('required value', 1);
}

export async function runPromiseRejectionHandlingExamples() {
  // Promise rejection は、非同期処理における失敗の表現。
  // await する場合は try-catch、Promise chain では catch を使って扱う。
  const successResult = await captureAsyncResult(() => loadRequiredValue(false));
  const failureResult = await captureAsyncResult(() => loadRequiredValue(true));

  // Promise chain では、catch の戻り値で失敗を result object に変換できる。
  // ここで return した object は、await した結果として呼び出し元に渡る。
  const chainFailureResult = await loadRequiredValue(true)
    .then((value) => ({ ok: true, value }))
    .catch((error) => ({
      ok: false,
      value: null,
      message: `catchで処理: ${error.message}`,
    }));

  // rejection を何も処理しないと、未処理の失敗として扱われる。
  // このサンプルでは必ず catch / capture して、実行全体が止まらないようにしている。
  console.log('rejectionなしの成功結果:', successResult);
  console.log('try-catchで扱ったrejection:', failureResult);
  console.log('Promise chainで扱ったrejection:', chainFailureResult);

  assert.deepEqual(successResult, {
    ok: true,
    value: 'required value',
    message: null,
  });
  assert.deepEqual(failureResult, {
    ok: false,
    value: null,
    message: '必須データを読み込めなかった。',
  });
  assert.deepEqual(chainFailureResult, {
    ok: false,
    value: null,
    message: 'catchで処理: 必須データを読み込めなかった。',
  });
}
