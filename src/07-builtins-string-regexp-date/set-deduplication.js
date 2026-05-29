import assert from 'node:assert/strict';

export function runSetExamples() {
  // Set は、同じ値を重複して持たないコレクション。
  // 配列から重複を除去したいときや、存在確認を高速に行いたいときに使いやすい。
  const categoryNames = ['book', 'movie', 'book', 'music', 'movie', 'game'];
  const uniqueCategoryNames = [...new Set(categoryNames)];

  console.log('配列から重複を除去した結果:', uniqueCategoryNames);

  const selectedIds = new Set([101, 102, 103]);

  selectedIds.add(104);
  selectedIds.add(102);

  console.log('Set に値を追加した結果:', [...selectedIds]);

  const hasSelectedId = selectedIds.has(103);
  const hasUnknownId = selectedIds.has(999);

  console.log('Set で存在確認した結果:', {
    hasSelectedId,
    hasUnknownId,
  });

  selectedIds.delete(101);

  console.log('Set から値を削除した結果:', [...selectedIds]);

  // Set は primitive 値の重複除去では使いやすい。
  // 一方、object は「中身が同じか」ではなく「同じ参照か」で重複判定される。
  const firstUser = { id: 1, name: 'Alice' };
  const secondUser = { id: 1, name: 'Alice' };
  const users = new Set([firstUser, secondUser, firstUser]);

  console.log('object を Set に入れた結果:', [...users]);

  // object の id を基準に重複除去したい場合は、Set に id を記録しながら filter する。
  // API レスポンスや複数ソースのデータ統合でよく出る形。
  const apiUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Alice Duplicate' },
    { id: 3, name: 'Carol' },
  ];

  const seenUserIds = new Set();
  const uniqueUsersById = apiUsers.filter((user) => {
    if (seenUserIds.has(user.id)) {
      return false;
    }

    seenUserIds.add(user.id);
    return true;
  });

  console.log('id を基準に重複除去したユーザー:', uniqueUsersById);

  assert.deepEqual(uniqueCategoryNames, ['book', 'movie', 'music', 'game']);
  assert.deepEqual([...selectedIds], [102, 103, 104]);
  assert.equal(hasSelectedId, true);
  assert.equal(hasUnknownId, false);
  assert.equal(users.size, 2);
  assert.deepEqual(uniqueUsersById, [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Carol' },
  ]);
}
