import assert from 'node:assert/strict';

function renameUser(user, name) {
  // 非破壊更新では、元の object を変更せず、新しい object を返す。
  // React の state 更新や reducer で基本になる考え方。
  return {
    ...user,
    name,
  };
}

function deactivateUser(user) {
  return {
    ...user,
    active: false,
  };
}

function completeTodo(todos, targetId) {
  // array の要素を更新するときも、元の array と元の要素を直接変更しない。
  // 対象要素だけ新しい object を作り、それ以外はそのまま返す。
  return todos.map((todo) => {
    if (todo.id !== targetId) {
      return todo;
    }

    return {
      ...todo,
      completed: true,
    };
  });
}

export function runImmutableUpdateExamples() {
  const user = {
    id: 1,
    name: 'Alice',
    active: true,
  };

  const renamedUser = renameUser(user, 'Bob');
  const deactivatedUser = deactivateUser(user);

  console.log('元のuser:', user);
  console.log('非破壊的にrenameしたuser:', renamedUser);
  console.log('非破壊的にdeactivateしたuser:', deactivatedUser);

  const todos = [
    { id: 1, title: 'JavaScriptを読む', completed: true },
    { id: 2, title: 'object更新を確認する', completed: false },
    { id: 3, title: 'Reactにつなげる', completed: false },
  ];

  const completedTodos = completeTodo(todos, 2);

  console.log('元のtodos:', todos);
  console.log('非破壊的に更新したtodos:', completedTodos);

  assert.deepEqual(user, {
    id: 1,
    name: 'Alice',
    active: true,
  });
  assert.deepEqual(renamedUser, {
    id: 1,
    name: 'Bob',
    active: true,
  });
  assert.deepEqual(deactivatedUser, {
    id: 1,
    name: 'Alice',
    active: false,
  });
  assert.notEqual(user, renamedUser);
  assert.notEqual(user, deactivatedUser);
  assert.deepEqual(todos, [
    { id: 1, title: 'JavaScriptを読む', completed: true },
    { id: 2, title: 'object更新を確認する', completed: false },
    { id: 3, title: 'Reactにつなげる', completed: false },
  ]);
  assert.deepEqual(completedTodos, [
    { id: 1, title: 'JavaScriptを読む', completed: true },
    { id: 2, title: 'object更新を確認する', completed: true },
    { id: 3, title: 'Reactにつなげる', completed: false },
  ]);
  assert.notEqual(todos, completedTodos);
  assert.equal(todos[0], completedTodos[0]);
  assert.notEqual(todos[1], completedTodos[1]);
}
