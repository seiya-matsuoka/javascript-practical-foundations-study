import assert from 'node:assert/strict';

export function runPrimitiveVsObjectValuesExamples() {
  // primitive 値は、代入すると値そのものをコピーしたように扱える。
  // 片方の変数を再代入しても、もう片方の変数には影響しない。
  let firstScore = 80;
  let copiedScore = firstScore;

  copiedScore = 95;

  console.log('元のprimitive値:', firstScore);
  console.log('再代入したprimitive値:', copiedScore);

  // object は、代入すると同じ object への参照を共有する。
  // 片方の変数経由でプロパティを変更すると、同じ object を見ているもう片方にも反映される。
  const firstUser = {
    id: 1,
    name: 'Alice',
  };

  const sharedUser = firstUser;

  sharedUser.name = 'Bob';

  console.log('元のobject参照:', firstUser);
  console.log('共有されたobject参照:', sharedUser);

  assert.equal(firstScore, 80);
  assert.equal(copiedScore, 95);
  assert.deepEqual(firstUser, { id: 1, name: 'Bob' });
  assert.equal(firstUser, sharedUser);
}
