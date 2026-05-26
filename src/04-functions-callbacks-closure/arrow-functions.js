import assert from 'node:assert/strict';

export function runArrowFunctionExamples() {
  // arrow function は、関数式を短く書ける構文。
  // callback や小さな変換処理でよく使われる。
  const createMessage = (name) => {
    return `Hello, ${name}`;
  };

  const message = createMessage('JavaScript');

  console.log('ブロック本体のarrow function:', message);

  // 本体が 1 つの式だけの場合は、return を省略できる。
  // map などで小さな変換関数を書くときによく使う。
  // 省略形は短く書ける一方、処理が増える場合はブロック本体に戻した方が読みやすい。
  const double = (value) => value * 2;
  const doubledValues = [1, 2, 3].map((value) => double(value));

  console.log('式本体のarrow function:', doubledValues);

  // object literal を直接返す場合は、{} が関数本体と解釈されないように () で囲む。
  // React の props や state 用 object を作る callback でも見かける書き方。
  const createUser = (id, name) => ({
    id,
    name,
    active: true,
  });

  const user = createUser(1, 'Alice');

  console.log('objectを返すarrow function:', user);

  // arrow function は this を自分では持たず、外側の this を参照する。
  // this の詳細は後続 Unit で扱うため、ここでは通常の function と完全に同じではない点だけ押さえる。
  // object の method として使う場合は、method shorthand や function との違いを意識する。
  const calculator = {
    base: 10,
    addByMethod(value) {
      return this.base + value;
    },
    addByArrow: (value) => {
      return value + 10;
    },
  };

  const methodResult = calculator.addByMethod(5);
  const arrowResult = calculator.addByArrow(5);

  console.log('method shorthandの結果:', methodResult);
  console.log('arrow functionの結果:', arrowResult);

  assert.equal(message, 'Hello, JavaScript');
  assert.deepEqual(doubledValues, [2, 4, 6]);
  assert.deepEqual(user, { id: 1, name: 'Alice', active: true });
  assert.equal(methodResult, 15);
  assert.equal(arrowResult, 15);
}
