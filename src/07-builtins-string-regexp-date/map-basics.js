import assert from 'node:assert/strict';

export function runMapExamples() {
  // Map は key と value の組み合わせを保持するコレクション。
  // object も key-value を表せるが、Map は任意の値を key にでき、要素数も size で確認できる。
  const statusLabels = new Map([
    ['draft', '下書き'],
    ['published', '公開済み'],
  ]);

  statusLabels.set('archived', 'アーカイブ済み');

  const draftLabel = statusLabels.get('draft');
  const hasDeletedStatus = statusLabels.has('deleted');

  console.log('Map の基本操作:', {
    draftLabel,
    hasDeletedStatus,
    size: statusLabels.size,
    entries: [...statusLabels],
  });

  // object の key は基本的に文字列または Symbol として扱われる。
  // Map は object そのものを key として使える。
  const alice = { id: 1, name: 'Alice' };
  const bob = { id: 2, name: 'Bob' };

  const loginCountsByUser = new Map();

  loginCountsByUser.set(alice, 3);
  loginCountsByUser.set(bob, 1);

  console.log('object を key にした Map:', {
    aliceLoginCount: loginCountsByUser.get(alice),
    bobLoginCount: loginCountsByUser.get(bob),
  });

  // object を key にした場合、同じ中身に見える別 object は別 key になる。
  // これは参照の同一性で key が判定されるため。
  const anotherAlice = { id: 1, name: 'Alice' };
  const missingLoginCount = loginCountsByUser.get(anotherAlice);

  console.log('同じ中身の別 object を key にした結果:', missingLoginCount);

  // 実務では、配列を Map に変換して id から高速に参照する用途がある。
  // 一覧データを参照用の辞書へ変換する入口として読む。
  const users = [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'reader' },
    { id: 3, name: 'Carol', role: 'editor' },
  ];

  const usersById = new Map(users.map((user) => [user.id, user]));
  const editor = usersById.get(3);

  console.log('id で引ける Map:', {
    editor,
    allIds: [...usersById.keys()],
  });

  // Map から通常の object に変換する場合は Object.fromEntries を使える。
  // ただし、object の key は文字列化される点に注意する。
  const labelsObject = Object.fromEntries(statusLabels);

  console.log('Map から object へ変換した結果:', labelsObject);

  assert.equal(draftLabel, '下書き');
  assert.equal(hasDeletedStatus, false);
  assert.equal(statusLabels.size, 3);
  assert.equal(loginCountsByUser.get(alice), 3);
  assert.equal(loginCountsByUser.get(bob), 1);
  assert.equal(missingLoginCount, undefined);
  assert.deepEqual(editor, { id: 3, name: 'Carol', role: 'editor' });
  assert.deepEqual([...usersById.keys()], [1, 2, 3]);
  assert.deepEqual(labelsObject, {
    draft: '下書き',
    published: '公開済み',
    archived: 'アーカイブ済み',
  });
}
