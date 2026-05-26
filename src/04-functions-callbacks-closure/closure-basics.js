import assert from 'node:assert/strict';

function createGreeter(greeting) {
  // createGreeter の実行が終わった後も、戻り値の関数は greeting を参照できる。
  // このように、関数とその関数が定義された lexical scope の組み合わせを closure として考える。
  return function greet(name) {
    return `${greeting}, ${name}`;
  };
}

// count は createCounter のローカル変数だが、戻り値の increment から参照され続ける。
// 外側から直接 count を触らせず、関数経由で状態を更新する例。
function createCounter(start) {
  let count = start;

  return function increment() {
    count += 1;

    return count;
  };
}

export function runClosureBasicsExamples() {
  const sayHello = createGreeter('Hello');
  const sayGoodMorning = createGreeter('Good morning');

  const greetings = [sayHello('Alice'), sayGoodMorning('Bob')];

  console.log('closureで外側の引数を保持した結果:', greetings);

  // createCounter を呼ぶたびに、新しい count と increment の組み合わせが作られる。
  // 同じ関数定義を使っていても、閉じ込める状態は呼び出しごとに分かれる。
  const counter = createCounter(0);
  const anotherCounter = createCounter(10);

  const counterResults = [counter(), counter(), anotherCounter(), counter()];

  console.log('closureで状態を保持したcounter:', counterResults);

  // counter と anotherCounter は、それぞれ別の count を閉じ込めている。
  // 同じ createCounter から作っていても、呼び出しごとに別の lexical scope が作られる。
  const independentCounterResults = [anotherCounter(), anotherCounter()];

  console.log('別counterの独立した状態:', independentCounterResults);

  assert.deepEqual(greetings, ['Hello, Alice', 'Good morning, Bob']);
  assert.deepEqual(counterResults, [1, 2, 11, 3]);
  assert.deepEqual(independentCounterResults, [12, 13]);
}
