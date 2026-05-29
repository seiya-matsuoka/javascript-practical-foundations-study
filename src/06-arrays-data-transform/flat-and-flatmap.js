import assert from 'node:assert/strict';

import { sampleOrders, sampleProducts } from './sample-data.js';

export function runFlatAndFlatMapExamples() {
  const nestedCategories = [
    ['book', 'javascript'],
    ['book', 'typescript'],
    ['stationery', 'note'],
  ];

  // flat は、ネストした配列を指定した深さだけ平坦化する。
  // API レスポンスや集計前の中間データで、配列の配列を 1 つの配列にしたいときに使う。
  const flattenedCategories = nestedCategories.flat();

  console.log('flat の結果:', flattenedCategories);

  const deeplyNestedValues = [1, [2, [3, [4]]]];
  const flatOneLevel = deeplyNestedValues.flat();
  const flatTwoLevels = deeplyNestedValues.flat(2);

  console.log('flat の深さ指定:', { flatOneLevel, flatTwoLevels });

  // flatMap は、map してから 1 段階 flat する method。
  // 「各注文の明細を 1 つの明細一覧にする」のような処理で使いやすい。
  const orderLineItems = sampleOrders.flatMap((order) => {
    return order.items.map((item) => ({
      orderId: order.id,
      userId: order.userId,
      status: order.status,
      ...item,
    }));
  });

  console.log('flatMap で作った注文明細一覧:', orderLineItems);

  // 商品タグのように、各要素がさらに配列を持つ場合も flatMap の題材になる。
  const allProductTags = sampleProducts.flatMap((product) => product.tags);

  console.log('flatMap で集めた商品 tag:', allProductTags);

  // flatMap では、条件に合わない要素を空配列へ変換することで、filter + map に近い処理も書ける。
  const paidOrderItems = sampleOrders.flatMap((order) => {
    if (order.status !== 'paid') {
      return [];
    }

    return order.items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      amount: item.unitPrice * item.quantity,
    }));
  });

  console.log('支払い済み注文の明細:', paidOrderItems);

  assert.deepEqual(flattenedCategories, [
    'book',
    'javascript',
    'book',
    'typescript',
    'stationery',
    'note',
  ]);
  assert.deepEqual(flatOneLevel, [1, 2, [3, [4]]]);
  assert.deepEqual(flatTwoLevels, [1, 2, 3, [4]]);
  assert.deepEqual(
    orderLineItems.map((item) => `${item.orderId}:${item.productId}:${item.quantity}`),
    ['o-001:p-001:1', 'o-001:p-004:2', 'o-002:p-003:1', 'o-003:p-002:1'],
  );
  assert.deepEqual(allProductTags, [
    'javascript',
    'beginner',
    'typescript',
    'practical',
    'react',
    'frontend',
    'note',
  ]);
  assert.deepEqual(paidOrderItems, [
    { orderId: 'o-001', productId: 'p-001', amount: 2800 },
    { orderId: 'o-001', productId: 'p-004', amount: 1200 },
    { orderId: 'o-003', productId: 'p-002', amount: 3400 },
  ]);
}
