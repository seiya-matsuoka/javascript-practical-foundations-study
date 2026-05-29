import assert from 'node:assert/strict';

export function runNumberAndMathExamples() {
  // Number(value) は、値を number に変換する。
  // フォーム入力や URL query など、文字列で入ってきた値を数値として扱うときに使う。
  const priceText = '1980';
  const quantityText = '3';

  const price = Number(priceText);
  const quantity = Number(quantityText);
  const totalPrice = price * quantity;

  console.log('Number による数値変換:', {
    price,
    quantity,
    totalPrice,
  });

  // JavaScript の number は浮動小数点数として扱われる。
  // 0.1 + 0.2 のような小数計算では、見た目通りの 0.3 にならない場合がある。
  const floatingPointResult = 0.1 + 0.2;
  const roundedFloatingPointResult = Math.round(floatingPointResult * 100) / 100;

  console.log('小数計算の誤差:', {
    floatingPointResult,
    roundedFloatingPointResult,
  });

  const roundingResults = {
    round: Math.round(10.5),
    floor: Math.floor(10.9),
    ceil: Math.ceil(10.1),
    trunc: Math.trunc(10.9),
  };

  console.log('Math の丸め処理:', roundingResults);

  // Math.random は 0 以上 1 未満の疑似乱数を返す。
  // 実行ごとに値が変わるため、期待値確認では範囲だけを確認する。
  const randomValue = Math.random();
  const diceValue = Math.floor(randomValue * 6) + 1;

  console.log('Math.random から作ったサイコロ値:', {
    randomValue,
    diceValue,
  });

  // 金額計算では小数誤差を避けるため、最小単位の整数として扱う設計が使われることがある。
  // たとえば円なら整数、ドルなら cent 単位の整数として扱うなど。
  const itemPrices = [1200, 800, 500];
  const subtotal = itemPrices.reduce((total, itemPrice) => total + itemPrice, 0);
  const taxIncluded = Math.floor(subtotal * 1.1);

  console.log('整数中心の金額計算:', {
    subtotal,
    taxIncluded,
  });

  assert.deepEqual(
    {
      price,
      quantity,
      totalPrice,
    },
    {
      price: 1980,
      quantity: 3,
      totalPrice: 5940,
    },
  );
  assert.equal(floatingPointResult === 0.3, false);
  assert.equal(roundedFloatingPointResult, 0.3);
  assert.deepEqual(roundingResults, {
    round: 11,
    floor: 10,
    ceil: 11,
    trunc: 10,
  });
  assert.equal(randomValue >= 0 && randomValue < 1, true);
  assert.equal(Number.isInteger(diceValue), true);
  assert.equal(diceValue >= 1 && diceValue <= 6, true);
  assert.deepEqual(
    {
      subtotal,
      taxIncluded,
    },
    {
      subtotal: 2500,
      taxIncluded: 2750,
    },
  );
}
