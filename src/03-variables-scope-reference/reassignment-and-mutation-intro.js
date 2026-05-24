import assert from 'node:assert/strict';

export function runReassignmentAndMutationIntroExamples() {
  // 再代入は、変数が別の値を指し直すこと。
  // primitive 値の場合、値そのものを変更するのではなく、新しい値を変数に入れ直すと考える。
  let displayName = 'Alice';
  const beforeReassignment = displayName;

  displayName = 'Bob';

  console.log('再代入前のdisplayName:', beforeReassignment);
  console.log('再代入後のdisplayName:', displayName);

  // ミューテーションは、object や array の中身を変更すること。
  // const で宣言していても、object のプロパティ変更は可能。
  const user = {
    id: 1,
    name: 'Alice',
    active: true,
  };

  user.name = 'Bob';
  user.active = false;

  console.log('objectをミューテーションした結果:', user);

  const roles = ['reader'];

  roles.push('editor');

  console.log('arrayをミューテーションした結果:', roles);

  const originalSettings = {
    theme: 'light',
    sidebar: {
      collapsed: false,
    },
  };

  const updatedSettings = {
    ...originalSettings,
    theme: 'dark',
  };

  console.log('元のsettings:', originalSettings);
  console.log('spreadで作った新しいsettings:', updatedSettings);

  assert.equal(beforeReassignment, 'Alice');
  assert.equal(displayName, 'Bob');
  assert.deepEqual(user, { id: 1, name: 'Bob', active: false });
  assert.deepEqual(roles, ['reader', 'editor']);
  assert.deepEqual(originalSettings, {
    theme: 'light',
    sidebar: { collapsed: false },
  });
  assert.deepEqual(updatedSettings, {
    theme: 'dark',
    sidebar: { collapsed: false },
  });
  assert.notEqual(originalSettings, updatedSettings);
}
