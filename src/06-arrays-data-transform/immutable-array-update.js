import assert from 'node:assert/strict';

import { sampleProducts } from './sample-data.js';

function updateProductStock(products, targetProductId, nextStock) {
  // 配列内の要素を更新する場合、map で新しい配列を作る書き方が React の state 更新でもよく使われる。
  // 対象外の要素はそのまま返し、対象要素だけ新しい object として返す。
  return products.map((product) => {
    if (product.id !== targetProductId) {
      return product;
    }

    return {
      ...product,
      stock: nextStock,
    };
  });
}

function appendProduct(products, product) {
  // push ではなく spread で新しい配列を作る。
  // 元配列を変更しないため、呼び出し元に副作用を与えにくい。
  return [...products, product];
}

function removeProductById(products, targetProductId) {
  // filter は、条件に合う要素だけを残した新しい配列を返す。
  // 削除対象以外を残す、と読むと非破壊削除として使いやすい。
  return products.filter((product) => product.id !== targetProductId);
}

export function runImmutableArrayUpdateExamples() {
  const updatedProducts = updateProductStock(sampleProducts, 'p-002', 8);
  const appendedProducts = appendProduct(sampleProducts, {
    id: 'p-005',
    name: 'CSS設計メモ',
    category: 'book',
    price: 2400,
    stock: 4,
    tags: ['css', 'frontend'],
  });
  const removedProducts = removeProductById(sampleProducts, 'p-004');

  console.log('配列内要素を非破壊で更新:', updatedProducts);
  console.log('配列へ非破壊で追加:', appendedProducts);
  console.log('配列から非破壊で削除:', removedProducts);

  // toSpliced を使うと、index を指定した非破壊更新も書ける。
  // id で探して更新したい場合は map、index が分かっている場合は toSpliced のように、意図に応じて選ぶ。
  const targetIndex = sampleProducts.findIndex((product) => product.id === 'p-003');
  const replacedProducts = sampleProducts.toSpliced(targetIndex, 1, {
    ...sampleProducts[targetIndex],
    stock: 9,
  });

  console.log('toSpliced で index 指定の非破壊更新:', replacedProducts);

  assert.deepEqual(
    sampleProducts.map((product) => product.stock),
    [12, 0, 5, 30],
  );
  assert.deepEqual(
    updatedProducts.map((product) => product.stock),
    [12, 8, 5, 30],
  );
  assert.notEqual(sampleProducts, updatedProducts);
  assert.equal(sampleProducts[0], updatedProducts[0]);
  assert.notEqual(sampleProducts[1], updatedProducts[1]);
  assert.equal(appendedProducts.length, 5);
  assert.deepEqual(
    appendedProducts.map((product) => product.id),
    ['p-001', 'p-002', 'p-003', 'p-004', 'p-005'],
  );
  assert.deepEqual(
    removedProducts.map((product) => product.id),
    ['p-001', 'p-002', 'p-003'],
  );
  assert.deepEqual(
    replacedProducts.map((product) => product.stock),
    [12, 0, 9, 30],
  );
  assert.deepEqual(
    sampleProducts.map((product) => product.stock),
    [12, 0, 5, 30],
  );
}
