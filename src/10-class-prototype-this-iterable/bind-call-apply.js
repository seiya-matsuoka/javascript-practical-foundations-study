import assert from 'node:assert/strict';

function createUserLabel(prefix, suffix) {
  return `${prefix}${this.id}: ${this.name}${suffix}`;
}

export function runBindCallApplyExamples() {
  const user = {
    id: 1,
    name: 'Alice',
  };

  // call は、this と引数を個別に指定して関数を呼び出す。
  // 関数の中で this を使っている場合、どの object を this として渡すかを明示できる。
  const callResult = createUserLabel.call(user, '[', ']');

  console.log('callでthisを指定した結果:', callResult);

  // apply は call と似ているが、引数を配列として渡す。
  // 既に配列として引数を持っている場面では apply の形を見かけることがある。
  const applyResult = createUserLabel.apply(user, ['<', '>']);

  console.log('applyでthisを指定した結果:', applyResult);

  // bind は、this が固定された新しい関数を作る。
  // callback に method を渡す場面で this が失われる問題を避けるために使える。
  const boundCreateUserLabel = createUserLabel.bind(user);
  const bindResult = boundCreateUserLabel('(', ')');

  console.log('bindでthisを固定した結果:', bindResult);

  const formatter = {
    prefix: 'user=',
    format(userName) {
      return `${this.prefix}${userName}`;
    },
  };

  const names = ['Alice', 'Bob'];

  // map に method をそのまま渡すと this が失われる。
  // bind で this を固定した関数を渡すと、callback として呼ばれても formatter を参照できる。
  const formattedNames = names.map(formatter.format.bind(formatter));

  console.log('bindしたmethodをcallbackに渡した結果:', formattedNames);

  // bind / call / apply は便利だが、日常的なコードでは arrow function で包む方が読みやすい場面も多い。
  // どちらを使うかは、this を明示的に固定したい意図があるかで判断する。
  const wrappedNames = names.map((name) => formatter.format(name));

  console.log('arrow functionで包んだcallback結果:', wrappedNames);

  assert.equal(callResult, '[1: Alice]');
  assert.equal(applyResult, '<1: Alice>');
  assert.equal(bindResult, '(1: Alice)');
  assert.deepEqual(formattedNames, ['user=Alice', 'user=Bob']);
  assert.deepEqual(wrappedNames, ['user=Alice', 'user=Bob']);
}
