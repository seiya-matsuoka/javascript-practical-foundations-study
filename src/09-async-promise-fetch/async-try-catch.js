import assert from 'node:assert/strict';
import { createDelayedError, createDelayedValue } from './async-helpers.js';

// 成功時は遅延して profile を返し、失敗時は遅延して Error を reject する。
// 同じ async function から見ても、成功と失敗は Promise の状態として表現される。
async function fetchUserProfile(userId) {
  if (userId === 1) {
    return createDelayedValue(
      {
        id: 1,
        name: 'Alice',
      },
      1,
    );
  }

  return createDelayedError('プロフィールを取得できなかった。', 1);
}

async function createProfileViewModel(userId) {
  try {
    const profile = await fetchUserProfile(userId);

    return {
      ok: true,
      label: `${profile.id}: ${profile.name}`,
      errorMessage: null,
    };
  } catch (error) {
    // await した Promise が rejected になると、この catch に入る。
    // UI では、ここで画面表示用のエラーメッセージに変換することが多い。
    return {
      ok: false,
      label: null,
      errorMessage: error.message,
    };
  } finally {
    // finally は成功・失敗どちらでも実行される。
    // 実務では loading 状態を戻す処理などを置くことがある。
  }
}

export async function runAsyncTryCatchExamples() {
  // 呼び出し元では、成功時も失敗時も同じ形の view model として受け取れる。
  // UI では、このように非同期処理の結果を表示用データへ変換することが多い。
  const successViewModel = await createProfileViewModel(1);
  const failureViewModel = await createProfileViewModel(999);

  console.log('async / awaitで成功を扱った結果:', successViewModel);
  console.log('async / awaitで失敗を扱った結果:', failureViewModel);

  assert.deepEqual(successViewModel, {
    ok: true,
    label: '1: Alice',
    errorMessage: null,
  });
  assert.deepEqual(failureViewModel, {
    ok: false,
    label: null,
    errorMessage: 'プロフィールを取得できなかった。',
  });
}
