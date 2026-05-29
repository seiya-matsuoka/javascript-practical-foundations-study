import assert from 'node:assert/strict';

import { sampleProducts } from './sample-data.js';

export function runSortAndReverseExamples() {
  const prices = [2800, 3400, 3200, 600];

  // sort は、元の配列を直接並び替える破壊的メソッド。
  // 数値を並び替える場合、比較関数を渡さないと文字列順に近い比較になり、意図しない並びになる。
  const pricesForSort = [...prices];
  const sortReturnValue = pricesForSort.sort((left, right) => left - right);

  console.log('sort 後の配列:', pricesForSort);
  console.log('sort の戻り値は同じ配列:', sortReturnValue === pricesForSort);
  console.log('sort 後の元データ用配列:', prices);

  // toSorted は sort の非破壊版。
  // 元の配列を残したまま、並び替え済みの新しい配列を作る。
  const sortedPrices = prices.toSorted((left, right) => left - right);

  console.log('toSorted の結果:', sortedPrices);
  console.log('toSorted 後の元配列:', prices);

  // object 配列の並び替えでは、比較関数でどのプロパティを見るかを明示する。
  // API レスポンスを一覧表示用に並び替える場合によく使う。
  const productsByPriceDesc = sampleProducts.toSorted((left, right) => right.price - left.price);

  console.log('価格が高い順の商品:', productsByPriceDesc);

  // reverse も元の配列を変更する破壊的メソッド。
  // toReversed を使うと、元の配列を残したまま逆順の配列を作れる。
  const pricesForReverse = [...prices];
  const reverseReturnValue = pricesForReverse.reverse();
  const reversedPrices = prices.toReversed();

  console.log('reverse 後の配列:', pricesForReverse);
  console.log('reverse の戻り値は同じ配列:', reverseReturnValue === pricesForReverse);
  console.log('toReversed の結果:', reversedPrices);

  assert.deepEqual(prices, [2800, 3400, 3200, 600]);
  assert.deepEqual(pricesForSort, [600, 2800, 3200, 3400]);
  assert.equal(sortReturnValue, pricesForSort);
  assert.deepEqual(sortedPrices, [600, 2800, 3200, 3400]);
  assert.deepEqual(
    productsByPriceDesc.map((product) => product.id),
    ['p-002', 'p-003', 'p-001', 'p-004'],
  );
  assert.deepEqual(pricesForReverse, [600, 3200, 3400, 2800]);
  assert.equal(reverseReturnValue, pricesForReverse);
  assert.deepEqual(reversedPrices, [600, 3200, 3400, 2800]);
}
