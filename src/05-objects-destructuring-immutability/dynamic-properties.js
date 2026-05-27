import assert from 'node:assert/strict';

export function runDynamicPropertyExamples() {
  const user = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    active: true,
  };

  // bracket 記法では、変数に入ったキー名でプロパティを読める。
  // テーブル列、フォーム項目、ソート対象など、キー名が実行時に決まる場面で使う。
  const selectedKeys = ['name', 'email'];
  const selectedValues = selectedKeys.map((key) => ({
    key,
    value: user[key],
  }));

  console.log('動的なキーで取り出した値:', selectedValues);

  // dot 記法の user.selectedKey は、「selectedKey」という名前のプロパティを読む。
  // 変数 selectedKey の中身をキーとして使うわけではない点に注意する。
  const selectedKey = 'name';
  const valueByBracket = user[selectedKey];
  const valueByDot = user.selectedKey;

  console.log('変数を使ったbracket記法:', valueByBracket);
  console.log('dot記法でselectedKeyを読んだ結果:', valueByDot);

  // 動的にプロパティを追加することもできる。
  // ただし、既存 object を直接変更するため、非破壊更新をしたい場面では別の object を作る方がよい。
  const metrics = {};
  const metricName = 'loginCount';

  metrics[metricName] = 3;
  metrics.lastLoginAt = '2026-05-26T09:00:00.000Z';

  console.log('動的にプロパティを追加したobject:', metrics);

  // ユーザー入力をそのままキーに使う場合は、意図しないキーが作られないように注意する。
  // 実務では、許可するキーの一覧を持ってから処理することが多い。
  const allowedKeys = ['name', 'email'];
  const unsafeRequestedKey = 'password';
  const safeValue = allowedKeys.includes(unsafeRequestedKey) ? user[unsafeRequestedKey] : undefined;

  console.log('許可されていないキーの読み取り結果:', safeValue);

  assert.deepEqual(selectedValues, [
    { key: 'name', value: 'Alice' },
    { key: 'email', value: 'alice@example.com' },
  ]);
  assert.equal(valueByBracket, 'Alice');
  assert.equal(valueByDot, undefined);
  assert.deepEqual(metrics, {
    loginCount: 3,
    lastLoginAt: '2026-05-26T09:00:00.000Z',
  });
  assert.equal(safeValue, undefined);
}
