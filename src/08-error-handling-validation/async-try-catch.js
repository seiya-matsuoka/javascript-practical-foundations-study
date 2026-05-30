import assert from 'node:assert/strict';

// 非同期処理の順序を確認するための小さな wait 関数。
// setTimeout を Promise で包み、await できる形にしている。
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// API 取得を模した async function。
// 成功時は値を返し、失敗時は throw することで Promise rejection として扱われる。
async function fetchUserProfile(userId) {
  await wait(1);

  if (userId === 1) {
    return {
      id: 1,
      name: 'Alice',
    };
  }

  throw new Error('ユーザープロフィールを取得できなかった。');
}

// async / await では、await した Promise の rejection を try-catch で捕まえられる。
// 呼び出し元へは、画面表示しやすい result object として返す。
async function loadProfileMessage(userId) {
  try {
    const profile = await fetchUserProfile(userId);

    return {
      ok: true,
      message: `${profile.name}さんのプロフィールを読み込みました。`,
    };
  } catch (error) {
    // async function 内の await で発生した rejection は、try-catch で扱える。
    // UI では、ここで画面表示用の失敗状態に変換することが多い。
    return {
      ok: false,
      message: error.message,
    };
  } finally {
    // 実務では、finally で loading 状態を false に戻すような処理を行うことがある。
    // このサンプルでは戻り値へ影響させず、流れだけを確認する。
  }
}

export async function runAsyncTryCatchExamples() {
  // 成功する userId と失敗する userId を渡し、同じ関数が成功 / 失敗をどの形で返すか確認する。
  const successResult = await loadProfileMessage(1);
  const failureResult = await loadProfileMessage(999);

  console.log('async / await成功時の結果:', successResult);
  console.log('async / await失敗時の結果:', failureResult);

  assert.deepEqual(successResult, {
    ok: true,
    message: 'Aliceさんのプロフィールを読み込みました。',
  });
  assert.deepEqual(failureResult, {
    ok: false,
    message: 'ユーザープロフィールを取得できなかった。',
  });
}
