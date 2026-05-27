import assert from 'node:assert/strict';

function createUser(id, name, role) {
  // shorthand property は、変数名とプロパティ名が同じ場合に省略して書く構文。
  // { id: id, name: name } と書かずに { id, name } と書ける。
  return {
    id,
    name,
    role,
    active: true,
  };
}

export function runShorthandAndComputedPropertyExamples() {
  const id = 1;
  const name = 'Alice';
  const role = 'admin';

  const user = createUser(id, name, role);

  console.log('shorthand propertyで作ったuser:', user);

  // computed property name は、[] の中の式を評価してプロパティ名にする構文。
  // object を作る時点で動的なキーを使える。
  const fieldName = 'displayName';
  const formValue = 'Alice M.';

  const formState = {
    [fieldName]: formValue,
    [`${fieldName}Touched`]: true,
  };

  console.log('computed property nameで作ったformState:', formState);

  // computed property name は、更新用 object を作るときにもよく使う。
  // React のフォーム入力で、name 属性に応じて state の該当キーを更新する発想につながる。
  function createPatch(key, value) {
    return {
      [key]: value,
    };
  }

  const namePatch = createPatch('name', 'Bob');
  const activePatch = createPatch('active', false);

  console.log('動的キーで作ったpatch:', {
    namePatch,
    activePatch,
  });

  // shorthand と computed property name は混在できる。
  // ただし、省略が増えすぎると読みにくくなるため、意図が伝わる範囲で使う。
  const status = 'published';
  const statusKey = 'articleStatus';
  const article = {
    id: 101,
    title: 'Object basics',
    status,
    [statusKey]: status,
  };

  console.log('shorthandとcomputed property nameの混在:', article);

  assert.deepEqual(user, {
    id: 1,
    name: 'Alice',
    role: 'admin',
    active: true,
  });
  assert.deepEqual(formState, {
    displayName: 'Alice M.',
    displayNameTouched: true,
  });
  assert.deepEqual(namePatch, { name: 'Bob' });
  assert.deepEqual(activePatch, { active: false });
  assert.deepEqual(article, {
    id: 101,
    title: 'Object basics',
    status: 'published',
    articleStatus: 'published',
  });
}
