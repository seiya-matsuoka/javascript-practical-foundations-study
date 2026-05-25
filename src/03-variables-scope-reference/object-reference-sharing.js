import assert from 'node:assert/strict';

export function runObjectReferenceSharingExamples() {
  const user = {
    id: 1,
    profile: {
      name: 'Alice',
      role: 'reader',
    },
  };

  // object を別の変数に代入しても、中身がコピーされるわけではない。
  // 同じ object への参照が共有される。
  const sameUser = user;

  sameUser.profile.role = 'editor';

  console.log('同じ参照を共有したuser:', user);
  console.log('sameUser:', sameUser);

  // spread を使うと、新しい outer object は作れる。
  // ただし、ネストした profile は同じ参照のままになる。
  const shallowCopiedUser = {
    ...user,
  };

  shallowCopiedUser.profile.name = 'Carol';

  console.log('shallow copy後の元user:', user);
  console.log('shallow copyしたuser:', shallowCopiedUser);

  assert.equal(user, sameUser);
  assert.deepEqual(user, {
    id: 1,
    profile: {
      name: 'Carol',
      role: 'editor',
    },
  });
  assert.notEqual(user, shallowCopiedUser);
  assert.equal(user.profile, shallowCopiedUser.profile);
}
