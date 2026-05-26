import assert from 'node:assert/strict';

export function runImmediatelyInvokedFunctionExamples() {
  // 即時実行関数は、関数を定義してすぐに実行する書き方。
  // 現代の ES Modules では module scope があるため、昔ほど必須ではないが、既存コードでは見かけることがある。
  const initializedConfig = (() => {
    const apiBaseUrl = 'https://example.com/api';
    const timeoutMs = 5000;

    return {
      apiBaseUrl,
      timeoutMs,
    };
  })();

  console.log('即時実行関数で初期化したconfig:', initializedConfig);

  // 即時実行関数は、引数を渡してその場で変換結果を作ることもできる。
  // 一時的な変数や処理範囲を局所化したいときの読み方として押さえる。
  const normalizedUsers = ((users) => {
    return users.map((user) => ({
      ...user,
      name: user.name.trim(),
      active: Boolean(user.active),
    }));
  })([
    { id: 1, name: ' Alice ', active: 1 },
    { id: 2, name: ' Bob ', active: 0 },
  ]);

  console.log('即時実行関数で変換したusers:', normalizedUsers);

  // block scope と module scope が使える現在では、即時実行関数を乱用する必要は少ない。
  // ただし、「一度だけ計算して値を作る」意図を局所化したい場合の読み方として知っておくとよい。
  // 条件分岐を式のように扱い、最終的な label だけを const に入れる。
  // 現代の JavaScript では block scope でも近いことはできるが、既存コードの読解で出てくる。
  const label = (() => {
    const status = 'published';

    if (status === 'draft') {
      return '下書き';
    }

    return '公開済み';
  })();

  console.log('即時実行関数で作ったlabel:', label);

  assert.deepEqual(initializedConfig, {
    apiBaseUrl: 'https://example.com/api',
    timeoutMs: 5000,
  });
  assert.deepEqual(normalizedUsers, [
    { id: 1, name: 'Alice', active: true },
    { id: 2, name: 'Bob', active: false },
  ]);
  assert.equal(label, '公開済み');
}
