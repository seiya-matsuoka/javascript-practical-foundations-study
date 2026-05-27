import assert from 'node:assert/strict';

export function runShallowCopyAndDeepCopyExamples() {
  const originalUser = {
    id: 1,
    name: 'Alice',
    profile: {
      language: 'ja',
      theme: 'light',
    },
  };

  // spread による object copy は shallow copy。
  // outer object は新しくなるが、ネストした object は同じ参照のままになる。
  const shallowCopiedUser = {
    ...originalUser,
  };

  shallowCopiedUser.profile.theme = 'dark';

  console.log('shallow copy後の元user:', originalUser);
  console.log('shallow copyしたuser:', shallowCopiedUser);

  // ネストした object も変更したくない場合は、変更したい階層まで明示的に copy する。
  // どの階層まで新しくするかを意識することが、非破壊更新の中心になる。
  const safelyCopiedUser = {
    ...originalUser,
    profile: {
      ...originalUser.profile,
      language: 'en',
    },
  };

  console.log('ネスト部分もcopyしたuser:', safelyCopiedUser);

  const originalProject = {
    id: 10,
    members: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  };

  // array を spread しても、要素の object までは deep copy されない。
  // array 自体は別参照でも、中の要素 object が同じ参照のままになることがある。
  const shallowCopiedProject = {
    ...originalProject,
    members: [...originalProject.members],
  };

  shallowCopiedProject.members[0].name = 'Carol';

  console.log('arrayを含むshallow copy後の元project:', originalProject);
  console.log('arrayを含むshallow copy:', shallowCopiedProject);

  assert.notEqual(shallowCopiedUser, originalUser);
  assert.equal(shallowCopiedUser.profile, originalUser.profile);
  assert.deepEqual(originalUser.profile, {
    language: 'ja',
    theme: 'dark',
  });
  assert.notEqual(safelyCopiedUser, originalUser);
  assert.notEqual(safelyCopiedUser.profile, originalUser.profile);
  assert.deepEqual(safelyCopiedUser, {
    id: 1,
    name: 'Alice',
    profile: {
      language: 'en',
      theme: 'dark',
    },
  });
  assert.notEqual(shallowCopiedProject, originalProject);
  assert.notEqual(shallowCopiedProject.members, originalProject.members);
  assert.equal(shallowCopiedProject.members[0], originalProject.members[0]);
  assert.deepEqual(originalProject.members[0], {
    id: 1,
    name: 'Carol',
  });
}
