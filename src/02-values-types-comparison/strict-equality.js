import assert from 'node:assert/strict';

export function runStrictEqualityExamples() {
  // === は、値と型が同じかどうかを比較する。
  // JavaScript では、基本的に == ではなく === を使う方針にすると、暗黙の型変換による事故を避けやすい。
  const sameNumber = 100 === 100;
  const numberAndString = 100 === '100';
  const trueAndOne = true === 1;
  const nullAndUndefined = null === undefined;

  console.log('100 === 100:', sameNumber);
  console.log('100 === "100":', numberAndString);
  console.log('true === 1:', trueAndOne);
  console.log('null === undefined:', nullAndUndefined);

  // !== は、=== の逆。
  // 型が違う場合も true になるため、「同じ値に見える文字列と数値」を区別できる。
  const strictNotEqualResults = {
    numberAndString: 100 !== '100',
    falseAndZero: false !== 0,
    sameText: 'JavaScript' !== 'JavaScript',
  };

  console.log('!==による比較:', strictNotEqualResults);

  // object の === は、中身ではなく参照の同一性を見る。
  // 同じプロパティを持つ object でも、別々に作られた値であれば === は false になる。
  const user = { id: 1 };
  const sameReference = user;
  const anotherUser = { id: 1 };

  const objectComparisonResults = {
    sameReference: user === sameReference,
    differentReference: user === anotherUser,
  };

  console.log('objectの===比較:', objectComparisonResults);

  assert.equal(sameNumber, true);
  assert.equal(numberAndString, false);
  assert.equal(trueAndOne, false);
  assert.equal(nullAndUndefined, false);
  assert.deepEqual(strictNotEqualResults, {
    numberAndString: true,
    falseAndZero: true,
    sameText: false,
  });
  assert.deepEqual(objectComparisonResults, {
    sameReference: true,
    differentReference: false,
  });
}
