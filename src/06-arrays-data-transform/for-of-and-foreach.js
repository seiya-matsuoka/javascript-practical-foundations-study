import assert from 'node:assert/strict';

import { sampleProducts } from './sample-data.js';

export function runForOfAndForEachExamples() {
  // for...of は、配列の要素を順番に取り出して処理する構文。
  // break や continue を使いたい場合は、forEach より扱いやすい。
  const productNames = [];

  for (const product of sampleProducts) {
    productNames.push(product.name);
  }

  console.log('for...of で集めた商品名:', productNames);

  // forEach は、各要素に対して callback を実行する。
  // 戻り値は常に undefined であり、新しい配列を作る用途には向かない。
  const printedLabels = [];

  const forEachResult = sampleProducts.forEach((product, index) => {
    printedLabels.push(`${index + 1}. ${product.name}`);
  });

  console.log('forEach で作った表示用ラベル:', printedLabels);
  console.log('forEach の戻り値:', forEachResult);

  // 新しい配列を作りたい場合は、forEach より map の方が意図が伝わりやすい。
  const mappedLabels = sampleProducts.map((product, index) => `${index + 1}. ${product.name}`);

  console.log('map で作った表示用ラベル:', mappedLabels);

  // 途中で処理を止めたい場合は、for...of を使うと break できる。
  let firstOutOfStockProduct = null;

  for (const product of sampleProducts) {
    if (product.stock === 0) {
      firstOutOfStockProduct = product;
      break;
    }
  }

  console.log('for...of で見つけた最初の在庫切れ商品:', firstOutOfStockProduct);

  assert.deepEqual(productNames, [
    'JavaScript入門',
    'TypeScript実践',
    'Reactハンズオン',
    '学習ノート',
  ]);
  assert.deepEqual(printedLabels, [
    '1. JavaScript入門',
    '2. TypeScript実践',
    '3. Reactハンズオン',
    '4. 学習ノート',
  ]);
  assert.equal(forEachResult, undefined);
  assert.deepEqual(mappedLabels, printedLabels);
  assert.deepEqual(firstOutOfStockProduct, {
    id: 'p-002',
    name: 'TypeScript実践',
    category: 'book',
    price: 3400,
    stock: 0,
    tags: ['typescript', 'practical'],
  });
}
