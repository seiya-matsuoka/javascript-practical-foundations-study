import assert from 'node:assert/strict';

// サンプル内で失敗を観察するための小さな helper。
// 本来の処理を止めずに、throw された Error object を戻り値として確認する。
function captureError(callback) {
  try {
    callback();
  } catch (error) {
    return error;
  }

  return null;
}

function parsePositiveInteger(value) {
  const parsedValue = Number(value);

  // throw は、処理を続けられない失敗を呼び出し元へ知らせるために使う。
  // ここでは「正の整数が必要」という関数の前提を満たさない場合に例外を投げる。
  if (!Number.isInteger(parsedValue)) {
    throw new Error('整数を指定する必要がある。');
  }

  if (parsedValue <= 0) {
    throw new Error('0より大きい整数を指定する必要がある。');
  }

  return parsedValue;
}

// 関数の前提条件を満たさない値は、処理の入口に近い場所で検出する。
// 後続の計算へ不正値を流すより、原因が分かりやすい失敗になる。
function calculateUnitPrice(totalPrice, quantity) {
  if (quantity <= 0) {
    throw new Error('quantityは1以上である必要がある。');
  }

  return Math.floor(totalPrice / quantity);
}

export function runThrowErrorBasicsExamples() {
  const parsedValue = parsePositiveInteger('10');
  const unitPrice = calculateUnitPrice(1200, 3);

  console.log('正常にparseした値:', parsedValue);
  console.log('正常に計算した単価:', unitPrice);

  // 失敗例は captureError で包み、エラーの種類や message を確認する。
  // 例外を投げる関数を読むときは、正常系だけでなく失敗時に何を伝えるかも見る。
  const invalidIntegerError = captureError(() => {
    parsePositiveInteger('10.5');
  });

  const invalidQuantityError = captureError(() => {
    calculateUnitPrice(1200, 0);
  });

  console.log('整数ではない値のエラー:', invalidIntegerError?.message);
  console.log('不正なquantityのエラー:', invalidQuantityError?.message);

  // Error object には message や stack などの情報が入る。
  // ユーザーにそのまま見せる文言と、開発者が調査する情報は分けて扱う。
  const sampleError = new Error('サンプルエラー');

  console.log('Errorのname:', sampleError.name);
  console.log('Errorのmessage:', sampleError.message);
  console.log('Errorのstackは文字列か:', typeof sampleError.stack === 'string');

  assert.equal(parsedValue, 10);
  assert.equal(unitPrice, 400);
  assert.equal(invalidIntegerError instanceof Error, true);
  assert.equal(invalidIntegerError?.message, '整数を指定する必要がある。');
  assert.equal(invalidQuantityError instanceof Error, true);
  assert.equal(invalidQuantityError?.message, 'quantityは1以上である必要がある。');
  assert.equal(sampleError.name, 'Error');
  assert.equal(sampleError.message, 'サンプルエラー');
  assert.equal(typeof sampleError.stack, 'string');
}
