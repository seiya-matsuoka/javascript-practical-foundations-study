import assert from 'node:assert/strict';

import { sampleProducts, sampleUsers } from './sample-data.js';

export function runArrayObjectConversionExamples() {
  // 配列から object へ変換すると、id を key にして値を引ける形を作れる。
  // API レスポンスの配列を、画面側で扱いやすくする正規化の入口になる。
  const usersById = Object.fromEntries(sampleUsers.map((user) => [user.id, user]));

  console.log('配列から id key の object へ変換:', usersById);

  // object から配列へ戻す場合は Object.values を使える。
  // object にした後でも、一覧表示や map 処理をしたいときは配列に戻して扱う。
  const userNamesFromObject = Object.values(usersById).map((user) => user.name);

  console.log('object から配列へ戻して name を取得:', userNamesFromObject);

  const productPriceEntries = sampleProducts.map((product) => [product.id, product.price]);
  const productPricesById = Object.fromEntries(productPriceEntries);

  console.log('product price entries:', productPriceEntries);
  console.log('product price object:', productPricesById);

  // Object.entries を使うと、object の key / value を配列 method で処理できる。
  // 設定値や集計結果を表示用ラベルへ変換するときによく使う。
  const priceLabels = Object.entries(productPricesById).map(([productId, price]) => {
    return `${productId}: ${price.toLocaleString('ja-JP')}円`;
  });

  console.log('Object.entries から表示ラベルへ変換:', priceLabels);

  assert.deepEqual(Object.keys(usersById), ['u-001', 'u-002', 'u-003']);
  assert.deepEqual(userNamesFromObject, ['Alice', 'Bob', 'Carol']);
  assert.deepEqual(productPriceEntries, [
    ['p-001', 2800],
    ['p-002', 3400],
    ['p-003', 3200],
    ['p-004', 600],
  ]);
  assert.deepEqual(productPricesById, {
    'p-001': 2800,
    'p-002': 3400,
    'p-003': 3200,
    'p-004': 600,
  });
  assert.deepEqual(priceLabels, [
    'p-001: 2,800円',
    'p-002: 3,400円',
    'p-003: 3,200円',
    'p-004: 600円',
  ]);
}
