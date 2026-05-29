import assert from 'node:assert/strict';

import { sampleProducts, sampleUsers } from './sample-data.js';

function isInStock(product) {
  // predicate 関数は、条件に合うかどうかを boolean で返す関数。
  // filter、find、some、every などで使いやすい。
  return product.stock > 0;
}

function isBook(product) {
  return product.category === 'book';
}

export function runFilterPredicateExamples() {
  // filter は、callback が true を返した要素だけを残す。
  // 元の配列は変更せず、条件に合う要素だけを含む新しい配列を返す。
  const inStockProducts = sampleProducts.filter(isInStock);
  const bookProducts = sampleProducts.filter(isBook);
  const activeUsers = sampleUsers.filter((user) => user.active);

  console.log('在庫ありの商品:', inStockProducts);
  console.log('book カテゴリの商品:', bookProducts);
  console.log('active なユーザー:', activeUsers);

  // predicate 関数を小さく分けると、条件名として読める。
  // 複数条件を組み合わせる場合も、何を判定しているかが追いやすくなる。
  const availableBookProducts = sampleProducts.filter(
    (product) => isBook(product) && isInStock(product),
  );

  console.log('在庫ありの book 商品:', availableBookProducts);

  // filter の結果は 0 件になる場合がある。
  // 呼び出し側では「必ず要素がある」と決めつけないようにする。
  const expensiveStationery = sampleProducts.filter((product) => {
    return product.category === 'stationery' && product.price >= 1000;
  });

  console.log('条件に合う商品がない例:', expensiveStationery);

  assert.deepEqual(
    inStockProducts.map((product) => product.id),
    ['p-001', 'p-003', 'p-004'],
  );
  assert.deepEqual(
    bookProducts.map((product) => product.id),
    ['p-001', 'p-002', 'p-003'],
  );
  assert.deepEqual(
    activeUsers.map((user) => user.id),
    ['u-001', 'u-003'],
  );
  assert.deepEqual(
    availableBookProducts.map((product) => product.id),
    ['p-001', 'p-003'],
  );
  assert.deepEqual(expensiveStationery, []);
  assert.notEqual(sampleProducts, inStockProducts);
}
