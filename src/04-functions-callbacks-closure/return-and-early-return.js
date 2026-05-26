import assert from 'node:assert/strict';

// return は、関数の計算結果を呼び出し元へ返す。
// 関数を「入力から出力を作る単位」として読むための基本になる。
function calculateDiscountPrice(price, discountRate) {
  return Math.floor(price * (1 - discountRate));
}

function formatUserName(user) {
  // early return は、処理を続けられない条件を先に返す書き方。
  // ネストを浅くできるため、条件が増えたときに読みやすくなる。
  if (user === null || user === undefined) {
    return 'ゲスト';
  }

  if (user.name === '') {
    return '名前未設定';
  }

  return user.name;
}

// validation では、失敗条件を early return で先に返すと分岐を追いやすい。
// 成功ケースを最後に残すことで、ネストを深くせずに条件を追加できる。
function validatePositiveNumber(value) {
  if (typeof value !== 'number') {
    return { ok: false, reason: 'numberではない' };
  }

  if (Number.isNaN(value)) {
    return { ok: false, reason: 'NaNは使用できない' };
  }

  if (value <= 0) {
    return { ok: false, reason: '0より大きい数値が必要' };
  }

  return { ok: true, reason: null };
}

export function runReturnAndEarlyReturnExamples() {
  const discountPrice = calculateDiscountPrice(1000, 0.2);

  console.log('returnで返した割引後価格:', discountPrice);

  const formattedNames = [
    formatUserName({ id: 1, name: 'Alice' }),
    formatUserName({ id: 2, name: '' }),
    formatUserName(null),
  ];

  console.log('early returnで整形した名前:', formattedNames);

  const validationResults = [
    validatePositiveNumber(10),
    validatePositiveNumber(0),
    validatePositiveNumber(NaN),
    validatePositiveNumber('10'),
  ];

  console.log('early returnで分岐したvalidation結果:', validationResults);

  function withoutReturn() {
    // return を書かない関数は undefined を返す。
    // console.log のような副作用だけを行う関数では、この挙動を意識しておく。
    const message = 'returnしない関数';
    console.log(message);
  }

  const withoutReturnResult = withoutReturn();

  console.log('returnなしの関数の戻り値:', withoutReturnResult);

  assert.equal(discountPrice, 800);
  assert.deepEqual(formattedNames, ['Alice', '名前未設定', 'ゲスト']);
  assert.deepEqual(validationResults, [
    { ok: true, reason: null },
    { ok: false, reason: '0より大きい数値が必要' },
    { ok: false, reason: 'NaNは使用できない' },
    { ok: false, reason: 'numberではない' },
  ]);
  assert.equal(withoutReturnResult, undefined);
}
