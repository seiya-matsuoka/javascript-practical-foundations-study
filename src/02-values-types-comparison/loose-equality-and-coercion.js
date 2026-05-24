import assert from 'node:assert/strict';

export function runLooseEqualityAndCoercionExamples() {
  // == は、比較前に暗黙の型変換を行うことがある。
  // 結果だけを見ると便利に見える場面もあるが、読み手が変換規則を追う必要があり、実務では避けることが多い。
  const looseEqualityResults = {
    numberAndString: 100 == '100',
    falseAndZero: false == 0,
    emptyStringAndZero: '' == 0,
    nullAndUndefined: null == undefined,
    zeroAndNull: 0 == null,
  };

  console.log('==による比較:', looseEqualityResults);

  // != も == と同じく、比較前に暗黙の型変換を行うことがある。
  // 「違うかどうか」を確認したい場合も、!== を使う方が挙動を読みやすい。
  const looseNotEqualResults = {
    numberAndString: 100 != '100',
    falseAndZero: false != 0,
    zeroAndNull: 0 != null,
  };

  console.log('!=による比較:', looseNotEqualResults);

  // 暗黙の型変換は、比較以外の演算でも起きる。
  // + は数値加算だけでなく文字列結合にも使われるため、片方が文字列だと結果が文字列になりやすい。
  const implicitConversionResults = {
    stringPlusNumber: '10' + 5,
    stringMinusNumber: '10' - 5,
    booleanPlusNumber: true + 1,
    nullPlusNumber: null + 1,
    undefinedPlusNumber: undefined + 1,
  };

  console.log('暗黙の型変換を含む演算:', implicitConversionResults);

  assert.deepEqual(looseEqualityResults, {
    numberAndString: true,
    falseAndZero: true,
    emptyStringAndZero: true,
    nullAndUndefined: true,
    zeroAndNull: false,
  });
  assert.deepEqual(looseNotEqualResults, {
    numberAndString: false,
    falseAndZero: false,
    zeroAndNull: true,
  });
  assert.equal(implicitConversionResults.stringPlusNumber, '105');
  assert.equal(implicitConversionResults.stringMinusNumber, 5);
  assert.equal(implicitConversionResults.booleanPlusNumber, 2);
  assert.equal(implicitConversionResults.nullPlusNumber, 1);
  assert.equal(Number.isNaN(implicitConversionResults.undefinedPlusNumber), true);
}
