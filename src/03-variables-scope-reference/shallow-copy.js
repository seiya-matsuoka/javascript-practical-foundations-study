import assert from 'node:assert/strict';

export function runShallowCopyExamples() {
  const user = {
    id: 1,
    name: 'Alice',
    profile: {
      role: 'reader',
      language: 'ja',
    },
  };

  // spread による object copy は shallow copy。
  // outer object は新しくなるが、ネストした profile は同じ参照のままになる。
  const shallowCopiedUser = {
    ...user,
    name: 'Bob',
  };

  shallowCopiedUser.profile.role = 'editor';

  console.log('shallow copy後の元user:', user);
  console.log('shallow copyしたuser:', shallowCopiedUser);

  // ネストした object も変更したくない場合は、ネスト部分も明示的にコピーする。
  const safelyUpdatedUser = {
    ...user,
    profile: {
      ...user.profile,
      language: 'en',
    },
  };

  console.log('ネスト部分もコピーしたuser:', safelyUpdatedUser);

  assert.notEqual(user, shallowCopiedUser);
  assert.equal(user.profile, shallowCopiedUser.profile);
  assert.deepEqual(user.profile, {
    role: 'editor',
    language: 'ja',
  });
  assert.notEqual(user, safelyUpdatedUser);
  assert.notEqual(user.profile, safelyUpdatedUser.profile);
  assert.deepEqual(safelyUpdatedUser, {
    id: 1,
    name: 'Alice',
    profile: {
      role: 'editor',
      language: 'en',
    },
  });
}
