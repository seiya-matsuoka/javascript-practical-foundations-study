import assert from 'node:assert/strict';

function createCounterStore(initialCount = 0) {
  // count は createCounterStore の外から直接参照できない状態。
  // 返された method だけが closure として count を読み書きできる。
  let count = initialCount;

  return {
    increment() {
      count += 1;
      return count;
    },
    decrement() {
      count -= 1;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

function createTodoStore(initialTodos = []) {
  // 初期 array をそのまま保持せず、浅くコピーして内部状態にする。
  // 呼び出し元の array と store 内部の array が同じ参照になることを避ける。
  let todos = [...initialTodos];

  return {
    add(title) {
      const nextTodo = {
        id: todos.length + 1,
        title,
        completed: false,
      };

      // 既存 array を push で直接変更せず、新しい array を作って内部状態を差し替える。
      // React の state 更新に近い考え方。
      todos = [...todos, nextTodo];

      return nextTodo;
    },
    complete(id) {
      // map で新しい array を作り、対象の todo だけ新しい object として返す。
      // 破壊的処理と非破壊的処理の違いを意識する箇所。
      todos = todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          completed: true,
        };
      });
    },
    list() {
      return todos.map((todo) => ({ ...todo }));
    },
  };
}

export function runEncapsulatedStateExamples() {
  // closure を使うと、外側から直接触れない状態を関数の内側に閉じ込められる。
  // ただし、状態を持つ関数は副作用も持ちやすいため、どこで状態が変わるかを追える設計にする。
  const counterStore = createCounterStore(5);

  const counterResults = [
    counterStore.getCount(),
    counterStore.increment(),
    counterStore.increment(),
    counterStore.decrement(),
  ];

  console.log('closureで閉じ込めたcounter state:', counterResults);

  const todoStore = createTodoStore([{ id: 1, title: 'Unit 04を読む', completed: false }]);

  const addedTodo = todoStore.add('closureを確認する');
  todoStore.complete(1);

  const todos = todoStore.list();

  console.log('closureで閉じ込めたtodo state:', {
    addedTodo,
    todos,
  });

  // list は内部 array をそのまま返さず、要素をコピーして返す。
  // 呼び出し側が戻り値を変更しても、内部状態を直接壊しにくくするため。
  const outsideTodos = todoStore.list();
  outsideTodos[0].title = '外側で変更したtitle';

  const todosAfterOutsideMutation = todoStore.list();

  console.log('外側の変更後に再取得したtodo state:', todosAfterOutsideMutation);

  assert.deepEqual(counterResults, [5, 6, 7, 6]);
  assert.deepEqual(addedTodo, { id: 2, title: 'closureを確認する', completed: false });
  assert.deepEqual(todos, [
    { id: 1, title: 'Unit 04を読む', completed: true },
    { id: 2, title: 'closureを確認する', completed: false },
  ]);
  assert.deepEqual(todosAfterOutsideMutation, [
    { id: 1, title: 'Unit 04を読む', completed: true },
    { id: 2, title: 'closureを確認する', completed: false },
  ]);
}
