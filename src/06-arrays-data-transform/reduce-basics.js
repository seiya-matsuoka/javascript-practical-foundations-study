import assert from 'node:assert/strict';

import { sampleOrders, sampleProducts } from './sample-data.js';

function calculateOrderTotal(order) {
  return order.items.reduce((total, item) => {
    return total + item.unitPrice * item.quantity;
  }, 0);
}

export function runReduceBasicsExamples() {
  // reduce は、配列を 1 つの値へ畳み込むメソッド。
  // 合計、件数集計、object への変換などで使われる。
  const prices = sampleProducts.map((product) => product.price);
  const totalPrice = prices.reduce((total, price) => total + price, 0);

  console.log('price の配列:', prices);
  console.log('reduce で合計した価格:', totalPrice);

  // reduce の第 2 引数は初期値。
  // 空配列の可能性がある場合は、初期値を明示しておくと安全に扱いやすい。
  const emptyTotal = [].reduce((total, value) => total + value, 0);

  console.log('空配列を reduce した結果:', emptyTotal);

  const orderTotals = sampleOrders.map((order) => ({
    id: order.id,
    total: calculateOrderTotal(order),
  }));

  console.log('注文ごとの合計:', orderTotals);

  const paidOrderTotal = sampleOrders
    .filter((order) => order.status === 'paid')
    .reduce((total, order) => total + calculateOrderTotal(order), 0);

  console.log('paid 注文だけの合計:', paidOrderTotal);

  // reduce は強力だが、何でも reduce にすると読みづらくなる。
  // 変換なら map、絞り込みなら filter、検索なら find を優先し、集約したいときに reduce を使うと意図が伝わりやすい。
  const stockByProductId = sampleProducts.reduce((result, product) => {
    return {
      ...result,
      [product.id]: product.stock,
    };
  }, {});

  console.log('reduce で作った productId ごとの stock:', stockByProductId);

  assert.deepEqual(prices, [2800, 3400, 3200, 600]);
  assert.equal(totalPrice, 10000);
  assert.equal(emptyTotal, 0);
  assert.deepEqual(orderTotals, [
    { id: 'o-001', total: 4000 },
    { id: 'o-002', total: 3200 },
    { id: 'o-003', total: 3400 },
  ]);
  assert.equal(paidOrderTotal, 7400);
  assert.deepEqual(stockByProductId, {
    'p-001': 12,
    'p-002': 0,
    'p-003': 5,
    'p-004': 30,
  });
}
