import assert from 'node:assert/strict';

import { sampleProducts, sampleUsers } from './sample-data.js';

export function runDeduplicationExamples() {
  const duplicatedTags = ['javascript', 'nodejs', 'javascript', 'browser', 'nodejs'];

  // primitive 値の重複除去には Set と spread を使う書き方がよく使われる。
  // Set は同じ値を 1 つだけ保持する collection。
  const uniqueTags = [...new Set(duplicatedTags)];

  console.log('primitive 値の重複除去:', uniqueTags);

  const uniqueProductTags = [...new Set(sampleProducts.flatMap((product) => product.tags))];

  console.log('商品 tag の重複除去:', uniqueProductTags);

  const duplicatedUsers = [
    sampleUsers[0],
    sampleUsers[1],
    { ...sampleUsers[0] },
    sampleUsers[2],
    sampleUsers[1],
  ];

  // object の重複除去は、参照ではなく id などの key で考えることが多い。
  // Set は object の中身ではなく参照を比較するため、同じ id でも別 object なら別物として扱われる。
  const usersById = new Map();

  for (const user of duplicatedUsers) {
    usersById.set(user.id, user);
  }

  const uniqueUsersById = [...usersById.values()];

  console.log('id を使った object 配列の重複除去:', uniqueUsersById);

  assert.deepEqual(uniqueTags, ['javascript', 'nodejs', 'browser']);
  assert.deepEqual(uniqueProductTags, [
    'javascript',
    'beginner',
    'typescript',
    'practical',
    'react',
    'frontend',
    'note',
  ]);
  assert.deepEqual(
    uniqueUsersById.map((user) => user.id),
    ['u-001', 'u-002', 'u-003'],
  );
  assert.equal(new Set(duplicatedUsers).size, 4);
}
