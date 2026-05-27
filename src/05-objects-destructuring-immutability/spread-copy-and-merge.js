import assert from 'node:assert/strict';

export function runSpreadCopyAndMergeExamples() {
  const baseUser = {
    id: 1,
    name: 'Alice',
    role: 'reader',
    active: true,
  };

  // spread syntax は、object の own enumerable property を展開する。
  // object copy の入口としてよく使うが、あくまで shallow copy である点は後続ファイルで確認する。
  const copiedUser = {
    ...baseUser,
  };

  console.log('spreadでcopyしたuser:', copiedUser);

  const rolePatch = {
    role: 'editor',
  };

  const activePatch = {
    active: false,
  };

  // 複数の object を spread すると、左から順番に property が入る。
  // 同じ property name がある場合、後ろに書いた値で上書きされる。
  const mergedUser = {
    ...baseUser,
    ...rolePatch,
    ...activePatch,
  };

  console.log('spreadでmergeしたuser:', mergedUser);

  const overwriteBefore = {
    ...rolePatch,
    ...baseUser,
  };

  const overwriteAfter = {
    ...baseUser,
    ...rolePatch,
  };

  console.log('上書き順序の違い:', {
    overwriteBefore,
    overwriteAfter,
  });

  // spread の後ろに直接 property を書くと、部分更新の意図を読み取りやすい。
  // React の state 更新でも、この形は頻出する。
  const renamedUser = {
    ...baseUser,
    name: 'Bob',
  };

  console.log('spread後にpropertyを上書きしたuser:', renamedUser);

  assert.deepEqual(copiedUser, baseUser);
  assert.notEqual(copiedUser, baseUser);
  assert.deepEqual(mergedUser, {
    id: 1,
    name: 'Alice',
    role: 'editor',
    active: false,
  });
  assert.deepEqual(overwriteBefore, {
    id: 1,
    name: 'Alice',
    role: 'reader',
    active: true,
  });
  assert.deepEqual(overwriteAfter, {
    id: 1,
    name: 'Alice',
    role: 'editor',
    active: true,
  });
  assert.deepEqual(renamedUser, {
    id: 1,
    name: 'Bob',
    role: 'reader',
    active: true,
  });
}
