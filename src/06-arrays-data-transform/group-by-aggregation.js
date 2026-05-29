import assert from 'node:assert/strict';

import { sampleOrders, sampleProducts, sampleUsers } from './sample-data.js';

function calculateOrderTotal(order) {
  return order.items.reduce((total, item) => {
    return total + item.unitPrice * item.quantity;
  }, 0);
}

export function runGroupByAggregationExamples() {
  // reduce を使うと、group by 風の object を作れる。
  // JavaScript 標準に SQL の GROUP BY そのものがあるわけではないため、object を集計先として組み立てる。
  const productsByCategory = sampleProducts.reduce((groups, product) => {
    const currentProducts = groups[product.category] ?? [];

    return {
      ...groups,
      [product.category]: [...currentProducts, product.name],
    };
  }, {});

  console.log('category ごとの商品名:', productsByCategory);

  // 件数や合計値を持つ object に畳み込むと、集計用データを作れる。
  const productSummaryByCategory = sampleProducts.reduce((summary, product) => {
    const currentSummary = summary[product.category] ?? { count: 0, stock: 0 };

    return {
      ...summary,
      [product.category]: {
        count: currentSummary.count + 1,
        stock: currentSummary.stock + product.stock,
      },
    };
  }, {});

  console.log('category ごとの商品集計:', productSummaryByCategory);

  const orderSummaryByStatus = sampleOrders.reduce((summary, order) => {
    const currentSummary = summary[order.status] ?? { count: 0, total: 0 };

    return {
      ...summary,
      [order.status]: {
        count: currentSummary.count + 1,
        total: currentSummary.total + calculateOrderTotal(order),
      },
    };
  }, {});

  console.log('status ごとの注文集計:', orderSummaryByStatus);

  const usersByRole = sampleUsers.reduce((groups, user) => {
    const currentUsers = groups[user.role] ?? [];

    return {
      ...groups,
      [user.role]: [...currentUsers, user.name],
    };
  }, {});

  console.log('role ごとの user:', usersByRole);

  assert.deepEqual(productsByCategory, {
    book: ['JavaScript入門', 'TypeScript実践', 'Reactハンズオン'],
    stationery: ['学習ノート'],
  });
  assert.deepEqual(productSummaryByCategory, {
    book: { count: 3, stock: 17 },
    stationery: { count: 1, stock: 30 },
  });
  assert.deepEqual(orderSummaryByStatus, {
    paid: { count: 2, total: 7400 },
    pending: { count: 1, total: 3200 },
  });
  assert.deepEqual(usersByRole, {
    admin: ['Alice'],
    member: ['Bob', 'Carol'],
  });
}
