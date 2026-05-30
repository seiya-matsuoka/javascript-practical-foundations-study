import assert from 'node:assert/strict';

// 成功する Promise を返す関数。
// 非同期処理では、成功も失敗も Promise として表現される点を確認する。
function createResolvedTask(value) {
  return Promise.resolve({
    ok: true,
    value,
  });
}

// 失敗する Promise を返す関数。
// reject された Promise は、await 側の try-catch または .catch で扱う必要がある。
function createRejectedTask() {
  return Promise.reject(new Error('Promiseがrejectされた。'));
}

// Promise の成功 / 失敗を result object へ変換する helper。
// 非同期処理でも、外側へ返す形をそろえると呼び出し元が扱いやすい。
async function capturePromiseResult(promise) {
  try {
    return await promise;
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
}

export async function runPromiseRejectionExamples() {
  // Promise rejection は、非同期処理における失敗の表現。
  // await する側で try-catch するか、Promise chain の .catch で扱う必要がある。
  const resolvedResult = await capturePromiseResult(createResolvedTask('success'));
  const rejectedResult = await capturePromiseResult(createRejectedTask());

  // Promise chain の .catch でも rejection を扱える。
  // async / await と Promise chain の両方の書き方を読めるようにしておく。
  const chainResult = await createRejectedTask()
    .then((result) => result)
    .catch((error) => ({
      ok: false,
      message: `catchで処理: ${error.message}`,
    }));

  console.log('resolveされたPromiseの結果:', resolvedResult);
  console.log('rejectされたPromiseの結果:', rejectedResult);
  console.log('Promise chainのcatch結果:', chainResult);

  // Promise.all は、どれか 1 つでも reject すると全体が reject される。
  // 複数の非同期処理をまとめるときは、失敗時の扱いを事前に決める必要がある。
  const allResult = await capturePromiseResult(
    Promise.all([createResolvedTask('first'), createRejectedTask()]),
  );

  console.log('Promise.allの失敗結果:', allResult);

  assert.deepEqual(resolvedResult, {
    ok: true,
    value: 'success',
  });
  assert.deepEqual(rejectedResult, {
    ok: false,
    message: 'Promiseがrejectされた。',
  });
  assert.deepEqual(chainResult, {
    ok: false,
    message: 'catchで処理: Promiseがrejectされた。',
  });
  assert.deepEqual(allResult, {
    ok: false,
    message: 'Promiseがrejectされた。',
  });
}
