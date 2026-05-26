import assert from 'node:assert/strict';

function calculateTaxIncludedPrice(price, taxRate) {
  // 純粋関数は、同じ引数に対して同じ戻り値を返し、外側の状態を変更しない関数。
  return Math.floor(price * (1 + taxRate));
}

function addTodoPure(todos, title) {
  // 元の array を変更せず、新しい array を返す。
  // React の state 更新につながる考え方。
  return [
    ...todos,
    {
      id: todos.length + 1,
      title,
      completed: false,
    },
  ];
}

function addTodoWithSideEffect(todos, title) {
  // こちらは引数で受け取った array を直接変更する。
  // 呼び出し元の array に影響するため、副作用を持つ関数として扱える。
  todos.push({
    id: todos.length + 1,
    title,
    completed: false,
  });

  return todos;
}

export function runPureFunctionAndSideEffectExamples() {
  const firstPrice = calculateTaxIncludedPrice(1000, 0.1);
  const secondPrice = calculateTaxIncludedPrice(1000, 0.1);

  console.log('同じ引数から同じ結果を返す純粋関数:', { firstPrice, secondPrice });

  const todos = [
    { id: 1, title: 'JavaScriptを読む', completed: true },
    { id: 2, title: 'Node.jsで実行する', completed: false },
  ];

  const pureAddedTodos = addTodoPure(todos, 'callbackを確認する');

  console.log('元のtodos:', todos);
  console.log('純粋関数的に追加したtodos:', pureAddedTodos);

  // 同じ array を関数内で直接変更すると、呼び出し元の変数から見える値も変わる。
  // Unit 03 の参照共有と同じ問題が、関数の引数でも起きる。
  const mutableTodos = [{ id: 1, title: '関数を確認する', completed: false }];
  const sideEffectTodos = addTodoWithSideEffect(mutableTodos, '副作用を確認する');

  console.log('副作用ありで変更した元array:', mutableTodos);
  console.log('副作用あり関数の戻り値:', sideEffectTodos);

  // 副作用がすべて悪いわけではない。
  // console.log、ファイル書き込み、HTTP 通信、DOM 更新など、外側の世界に影響する処理は実務で必要になる。
  // 重要なのは、どの関数が値を返すだけで、どの関数が外側へ影響するのかを分けて読めること。
  const sideEffectExamples = ['console.log', 'file write', 'HTTP request', 'DOM update'];

  console.log('副作用の例:', sideEffectExamples);

  assert.equal(firstPrice, 1100);
  assert.equal(secondPrice, 1100);
  assert.deepEqual(todos, [
    { id: 1, title: 'JavaScriptを読む', completed: true },
    { id: 2, title: 'Node.jsで実行する', completed: false },
  ]);
  assert.deepEqual(pureAddedTodos, [
    { id: 1, title: 'JavaScriptを読む', completed: true },
    { id: 2, title: 'Node.jsで実行する', completed: false },
    { id: 3, title: 'callbackを確認する', completed: false },
  ]);
  assert.notEqual(todos, pureAddedTodos);
  assert.equal(mutableTodos, sideEffectTodos);
  assert.deepEqual(mutableTodos, [
    { id: 1, title: '関数を確認する', completed: false },
    { id: 2, title: '副作用を確認する', completed: false },
  ]);
  assert.deepEqual(sideEffectExamples, ['console.log', 'file write', 'HTTP request', 'DOM update']);
}
