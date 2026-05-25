import assert from 'node:assert/strict';

export function runArrayReferenceSharingExamples() {
  const originalTags = ['javascript', 'nodejs'];

  // array も object の一種であり、別の変数へ代入すると参照を共有する。
  const sharedTags = originalTags;

  sharedTags.push('browser');

  console.log('元のarray:', originalTags);
  console.log('共有されたarray:', sharedTags);

  // 非破壊的に扱いたい場合は、新しい array を作る。
  // spread は、既存 array の要素を展開して新しい array を作るときによく使う。
  const copiedTags = [...originalTags, 'react'];

  console.log('spreadで作った新しいarray:', copiedTags);

  // map は、新しい array を返す。
  // ただし、要素が object の場合は、要素の参照まで自動で深くコピーするわけではない。
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  const copiedUsers = users.map((user) => user);

  copiedUsers[0].name = 'Carol';

  console.log('mapで作ったarrayの元users:', users);
  console.log('mapで作ったarray:', copiedUsers);

  assert.equal(originalTags, sharedTags);
  assert.deepEqual(originalTags, ['javascript', 'nodejs', 'browser']);
  assert.deepEqual(copiedTags, ['javascript', 'nodejs', 'browser', 'react']);
  assert.notEqual(originalTags, copiedTags);
  assert.notEqual(users, copiedUsers);
  assert.equal(users[0], copiedUsers[0]);
  assert.deepEqual(users[0], { id: 1, name: 'Carol' });
}
