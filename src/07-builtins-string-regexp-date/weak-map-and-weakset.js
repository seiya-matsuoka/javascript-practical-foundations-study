import assert from 'node:assert/strict';

export function runWeakMapAndWeakSetExamples() {
  // WeakMap は object だけを key にできる Map に近いコレクション。
  // key への参照が他になくなった場合、ガベージコレクションの対象になり得る。
  // その性質上、size や keys のような列挙 API は持たない。
  const user = { id: 1, name: 'Alice' };
  const metadataByUser = new WeakMap();

  metadataByUser.set(user, {
    loadedAt: '2026-05-29T00:00:00.000Z',
    source: 'api',
  });

  const metadata = metadataByUser.get(user);
  const hasMetadata = metadataByUser.has(user);

  console.log('WeakMap に object key で metadata を保存した結果:', {
    metadata,
    hasMetadata,
  });

  // WeakSet も object だけを保持する Set に近いコレクション。
  // 一度処理した object を記録する、内部的なマークを付ける、といった用途に使える。
  const processedUsers = new WeakSet();

  processedUsers.add(user);

  const alreadyProcessed = processedUsers.has(user);
  const otherUserProcessed = processedUsers.has({ id: 1, name: 'Alice' });

  console.log('WeakSet で処理済み object を確認した結果:', {
    alreadyProcessed,
    otherUserProcessed,
  });

  // primitive 値を WeakMap の key にすることはできない。
  // 直接書くと処理が止まるため、ここではエラーとして観察する。
  let primitiveKeyError = null;

  try {
    metadataByUser.set('user-id-1', { source: 'form' });
  } catch (error) {
    primitiveKeyError = error;
  }

  console.log('WeakMap に primitive key を渡したエラー:', primitiveKeyError?.name);

  assert.deepEqual(metadata, {
    loadedAt: '2026-05-29T00:00:00.000Z',
    source: 'api',
  });
  assert.equal(hasMetadata, true);
  assert.equal(alreadyProcessed, true);
  assert.equal(otherUserProcessed, false);
  assert.equal(primitiveKeyError instanceof TypeError, true);
}
