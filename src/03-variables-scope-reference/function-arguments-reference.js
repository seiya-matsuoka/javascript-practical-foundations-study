import assert from 'node:assert/strict';

function incrementNumber(value) {
  // primitive 値を引数として受け取り、関数内で再代入しても呼び出し元の変数は変わらない。
  value += 1;

  return value;
}

function deactivateUser(user) {
  // object の参照を受け取り、プロパティを変更すると呼び出し元の object にも影響する。
  user.active = false;

  return user;
}

function createDeactivatedUser(user) {
  // 呼び出し元の object を変更したくない場合は、新しい object を返す。
  return {
    ...user,
    active: false,
  };
}

export function runFunctionArgumentsReferenceExamples() {
  let count = 10;
  const incrementedCount = incrementNumber(count);

  console.log('関数に渡す前のprimitive値:', count);
  console.log('関数内で加算した結果:', incrementedCount);

  const user = {
    id: 1,
    name: 'Alice',
    active: true,
  };

  const mutatedUser = deactivateUser(user);

  console.log('関数内でミューテーションしたuser:', user);
  console.log('戻り値として返したuser:', mutatedUser);

  const anotherUser = {
    id: 2,
    name: 'Bob',
    active: true,
  };

  const deactivatedUser = createDeactivatedUser(anotherUser);

  console.log('元のanotherUser:', anotherUser);
  console.log('新しく作ったdeactivatedUser:', deactivatedUser);

  assert.equal(count, 10);
  assert.equal(incrementedCount, 11);
  assert.equal(user, mutatedUser);
  assert.deepEqual(user, { id: 1, name: 'Alice', active: false });
  assert.deepEqual(anotherUser, { id: 2, name: 'Bob', active: true });
  assert.deepEqual(deactivatedUser, { id: 2, name: 'Bob', active: false });
  assert.notEqual(anotherUser, deactivatedUser);
}
