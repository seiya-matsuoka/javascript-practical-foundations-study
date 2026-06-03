import assert from 'node:assert/strict';

export function runPitfallsEqualityNullishExamples() {
  // == は暗黙の型変換を行うため、直感と違う比較結果になりやすい。
  // 基本は === を使い、型変換が必要なら明示的に変換する。
  const looseEqualityResults = {
    zeroString: 0 == '0',
    falseString: false == '0',
    nullUndefined: null == undefined,
  };

  const strictEqualityResults = {
    zeroString: 0 === '0',
    falseString: false === '0',
    nullUndefined: null === undefined,
  };

  console.log('== の比較結果:', looseEqualityResults);
  console.log('=== の比較結果:', strictEqualityResults);

  // truthy / falsy は if の条件で暗黙的に boolean 判定される値。
  // 0 や空文字を「未入力」として扱ってよいかは、要件ごとに確認する必要がある。
  const values = [0, '', null, undefined, Number.NaN, 'text', 1, [], {}];
  const truthyFalsyLabels = values.map((value) => ({
    valueType: Array.isArray(value) ? 'array' : typeof value,
    truthy: Boolean(value),
  }));

  console.log('truthy/falsyの例:', truthyFalsyLabels);

  // NaN は自分自身とも等しくない。
  // Number.isNaN を使うと、数値としての NaN を安全に判定できる。
  const parsedNumber = Number.parseInt('not-number', 10);
  const nanResults = {
    compareWithSelf: parsedNumber === parsedNumber,
    isNaNByNumber: Number.isNaN(parsedNumber),
  };

  console.log('NaNの判定:', nanResults);

  // ?? は null / undefined のときだけ default を使う。
  // || は falsy 全般を default に置き換えるため、0 や空文字を有効値として扱う場面では注意する。
  const defaultValueResults = {
    zeroByOr: 0 || 10,
    zeroByNullish: 0 ?? 10,
    emptyStringByOr: '' || 'default',
    emptyStringByNullish: '' ?? 'default',
  };

  console.log('default値の扱い:', defaultValueResults);

  assert.deepEqual(looseEqualityResults, {
    zeroString: true,
    falseString: true,
    nullUndefined: true,
  });
  assert.deepEqual(strictEqualityResults, {
    zeroString: false,
    falseString: false,
    nullUndefined: false,
  });
  assert.equal(Number.isNaN(parsedNumber), true);
  assert.deepEqual(nanResults, {
    compareWithSelf: false,
    isNaNByNumber: true,
  });
  assert.deepEqual(defaultValueResults, {
    zeroByOr: 10,
    zeroByNullish: 0,
    emptyStringByOr: 'default',
    emptyStringByNullish: '',
  });
}
