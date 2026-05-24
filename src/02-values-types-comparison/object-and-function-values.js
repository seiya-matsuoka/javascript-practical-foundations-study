import assert from 'node:assert/strict';

function createDisplayName(user) {
  return `${user.id}: ${user.name}`;
}

export function runObjectAndFunctionValuesExamples() {
  // object は、複数の値をまとめて持てる値。
  // JavaScript では、配列も function も広い意味では object 的な性質を持つ。
  const user = { id: 1, name: 'Alice', active: true };
  const tags = ['javascript', 'nodejs', 'browser'];

  // function も値として扱える。
  // 変数に入れたり、引数に渡したり、戻り値として返したりできる。
  const formatter = createDisplayName;

  console.log('objectの例:', user);
  console.log('arrayの例:', tags);
  console.log('functionの例:', formatter);
  console.log('functionを値として呼び出した結果:', formatter(user));

  // object はプロパティを持つ。
  // Unit 03 以降で参照共有を詳しく扱うが、ここでは primitive とは別カテゴリの値として確認する。
  const copiedUser = { ...user, name: 'Bob' };

  console.log('元のobject:', user);
  console.log('spreadで作った別object:', copiedUser);

  // 配列は Array.isArray で判定できる。
  // typeof だけでは array と通常の object を区別できない。
  const valueCategories = [
    { label: 'user', type: typeof user, isArray: Array.isArray(user) },
    { label: 'tags', type: typeof tags, isArray: Array.isArray(tags) },
    { label: 'formatter', type: typeof formatter, isArray: Array.isArray(formatter) },
  ];

  console.log('値の分類:', valueCategories);

  assert.equal(typeof user, 'object');
  assert.equal(typeof tags, 'object');
  assert.equal(typeof formatter, 'function');
  assert.equal(Array.isArray(user), false);
  assert.equal(Array.isArray(tags), true);
  assert.equal(Array.isArray(formatter), false);
  assert.equal(formatter(user), '1: Alice');
  assert.deepEqual(copiedUser, { id: 1, name: 'Bob', active: true });
  assert.deepEqual(valueCategories, [
    { label: 'user', type: 'object', isArray: false },
    { label: 'tags', type: 'object', isArray: true },
    { label: 'formatter', type: 'function', isArray: false },
  ]);
}
