import assert from 'node:assert/strict';

// callback を受け取る側の関数は、処理の流れを管理する。
// 具体的に各値へ何をするかは、呼び出し側から渡された callback に任せる。
function applyToEach(values, callback) {
  const results = [];

  for (const value of values) {
    results.push(callback(value));
  }

  return results;
}

// callback が true を返した値だけを残す。
// Array.prototype.filter と同じ発想を、小さな関数として書いた例。
function filterBy(values, callback) {
  const results = [];

  for (const value of values) {
    if (callback(value)) {
      results.push(value);
    }
  }

  return results;
}

// メッセージの作り方を callback として外から渡す。
// 通知処理そのものと、文言の組み立てを分けて考えられる。
function notifyUser(userName, createMessage) {
  return createMessage(userName);
}

export function runCallbackBasicsExamples() {
  // callback は、別の関数に渡して、必要なタイミングで呼んでもらう関数。
  // 「処理の流れ」は呼び出し先に任せ、「具体的な処理」を callback として渡す。
  const numbers = [1, 2, 3, 4];

  const doubledNumbers = applyToEach(numbers, (value) => value * 2);
  const squaredNumbers = applyToEach(numbers, (value) => value ** 2);

  console.log('callbackで2倍にした結果:', doubledNumbers);
  console.log('callbackで2乗にした結果:', squaredNumbers);

  const evenNumbers = filterBy(numbers, (value) => value % 2 === 0);
  const greaterThanTwoNumbers = filterBy(numbers, (value) => value > 2);

  console.log('callbackで偶数だけ残した結果:', evenNumbers);
  console.log('callbackで2より大きい値だけ残した結果:', greaterThanTwoNumbers);

  const welcomeMessage = notifyUser('Alice', (userName) => `${userName}さん、ようこそ`);
  const goodbyeMessage = notifyUser('Bob', (userName) => `${userName}さん、また次回`);

  console.log('callbackで作った通知メッセージ:', { welcomeMessage, goodbyeMessage });

  // JavaScript 標準の array method も callback を受け取るものが多い。
  // map / filter / find / some / every / reduce などは、後続 Unit でも多く使う。
  const users = [
    { id: 1, name: 'Alice', active: true },
    { id: 2, name: 'Bob', active: false },
    { id: 3, name: 'Carol', active: true },
  ];

  // filter と map は、どちらも callback を受け取る higher-order function。
  // 条件で絞り込む処理と、表示用の値へ変換する処理をつなげて読める。
  const activeUserNames = users.filter((user) => user.active).map((user) => user.name);

  console.log('標準array methodのcallback結果:', activeUserNames);

  assert.deepEqual(doubledNumbers, [2, 4, 6, 8]);
  assert.deepEqual(squaredNumbers, [1, 4, 9, 16]);
  assert.deepEqual(evenNumbers, [2, 4]);
  assert.deepEqual(greaterThanTwoNumbers, [3, 4]);
  assert.equal(welcomeMessage, 'Aliceさん、ようこそ');
  assert.equal(goodbyeMessage, 'Bobさん、また次回');
  assert.deepEqual(activeUserNames, ['Alice', 'Carol']);
}
