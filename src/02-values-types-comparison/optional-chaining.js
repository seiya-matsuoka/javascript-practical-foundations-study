import assert from 'node:assert/strict';

export function runOptionalChainingExamples() {
  // optional chaining は、途中の値が null または undefined の場合に undefined を返す。
  // ネストした API レスポンスや optional なプロパティを読むときに使う。
  const userResponse = {
    id: 1,
    profile: {
      name: 'Alice',
      address: {
        city: 'Tokyo',
      },
    },
  };

  const userWithoutProfile = {
    id: 2,
    profile: null,
  };

  const city = userResponse.profile?.address?.city;
  const missingCity = userWithoutProfile.profile?.address?.city;

  console.log('存在するcity:', city);
  console.log('存在しないcity:', missingCity);

  // optional chaining と nullish coalescing を組み合わせると、
  // null / undefined の場合だけ default 値を入れられる。
  const cityLabels = {
    existing: userResponse.profile?.address?.city ?? '未設定',
    missing: userWithoutProfile.profile?.address?.city ?? '未設定',
  };

  console.log('city表示用ラベル:', cityLabels);

  // 関数呼び出しにも optional chaining を使える。
  // callback が渡された場合だけ呼ぶ、のような場面で使う。
  const handlers = {
    onSuccess: (message) => `success: ${message}`,
  };

  const callbackResults = {
    success: handlers.onSuccess?.('保存完了'),
    error: handlers.onError?.('保存失敗') ?? 'error handlerなし',
  };

  console.log('optional chainingを使ったcallback呼び出し:', callbackResults);

  // optional chaining は便利だが、どこでも付ければよいわけではない。
  // 必ず存在すべき値に付けすぎると、不具合を見逃しやすくなる。
  const requiredConfig = {
    apiBaseUrl: 'https://example.com/api',
  };

  const apiBaseUrl = requiredConfig.apiBaseUrl;
  const optionalTimeout = requiredConfig.timeoutMs ?? 5000;

  console.log('必須設定:', apiBaseUrl);
  console.log('optionalな設定:', optionalTimeout);

  assert.equal(city, 'Tokyo');
  assert.equal(missingCity, undefined);
  assert.deepEqual(cityLabels, {
    existing: 'Tokyo',
    missing: '未設定',
  });
  assert.deepEqual(callbackResults, {
    success: 'success: 保存完了',
    error: 'error handlerなし',
  });
  assert.equal(apiBaseUrl, 'https://example.com/api');
  assert.equal(optionalTimeout, 5000);
}
