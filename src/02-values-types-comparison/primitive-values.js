import assert from 'node:assert/strict';

export function runPrimitiveValuesExamples() {
  // primitive 値は、JavaScript の基本的な値。
  // number、string、boolean、null、undefined、bigint、symbol が該当する。
  // object とは異なり、値そのものにプロパティを追加して状態を持たせる対象ではない。
  const numberValue = 42;
  const stringValue = 'JavaScript';
  const booleanValue = true;
  const nullValue = null;
  const undefinedValue = undefined;
  const bigintValue = 9007199254740993n;
  const symbolValue = Symbol('unit-02');

  console.log('number:', numberValue);
  console.log('string:', stringValue);
  console.log('boolean:', booleanValue);
  console.log('null:', nullValue);
  console.log('undefined:', undefinedValue);
  console.log('bigint:', bigintValue);
  console.log('symbol:', symbolValue);

  // primitive 値は immutable として扱う。
  // たとえば文字列を加工しても、元の文字列が書き換わるのではなく、新しい文字列が作られる。
  const originalText = 'javascript';
  const upperText = originalText.toUpperCase();

  console.log('元の文字列:', originalText);
  console.log('加工後の文字列:', upperText);

  // 変数への再代入と、値そのものの変更は別の話。
  // let で宣言した変数は別の primitive 値を指し直せるが、数値そのものを変更しているわけではない。
  let score = 80;
  const beforeReassign = score;

  score = 90;

  console.log('再代入前のscore:', beforeReassign);
  console.log('再代入後のscore:', score);

  assert.equal(typeof numberValue, 'number');
  assert.equal(typeof stringValue, 'string');
  assert.equal(typeof booleanValue, 'boolean');
  assert.equal(nullValue, null);
  assert.equal(typeof undefinedValue, 'undefined');
  assert.equal(typeof bigintValue, 'bigint');
  assert.equal(typeof symbolValue, 'symbol');
  assert.equal(originalText, 'javascript');
  assert.equal(upperText, 'JAVASCRIPT');
  assert.equal(beforeReassign, 80);
  assert.equal(score, 90);
}
