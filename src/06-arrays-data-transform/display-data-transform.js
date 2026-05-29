import assert from 'node:assert/strict';

import { sampleOrders, sampleProducts, sampleUsers } from './sample-data.js';

function formatOrderStatus(status) {
  const labels = {
    paid: '支払い済み',
    pending: '保留中',
  };

  return labels[status] ?? '不明';
}

function formatCurrency(value) {
  return `${value.toLocaleString('ja-JP')}円`;
}

function calculateOrderTotal(order) {
  return order.items.reduce((total, item) => {
    return total + item.unitPrice * item.quantity;
  }, 0);
}

export function runDisplayDataTransformExamples() {
  const usersById = Object.fromEntries(sampleUsers.map((user) => [user.id, user]));
  const productsById = Object.fromEntries(sampleProducts.map((product) => [product.id, product]));

  // 実務では、API レスポンスをそのまま表示するのではなく、UI 用の形へ変換することが多い。
  // mapper 関数や formatter 関数に分けると、表示用加工の意図を名前で読める。
  const toOrderRow = (order) => {
    const user = usersById[order.userId];
    const total = calculateOrderTotal(order);
    const itemNames = order.items.map((item) => productsById[item.productId]?.name ?? '不明な商品');

    return {
      id: order.id,
      customerName: user?.name ?? '不明なユーザー',
      statusLabel: formatOrderStatus(order.status),
      totalLabel: formatCurrency(total),
      itemText: itemNames.join(' / '),
    };
  };

  const orderRows = sampleOrders
    .toSorted((left, right) => {
      return calculateOrderTotal(right) - calculateOrderTotal(left);
    })
    .map(toOrderRow);

  console.log('表示用 order row:', orderRows);

  const productCards = sampleProducts
    .filter((product) => product.stock > 0)
    .toSorted((left, right) => right.price - left.price)
    .map((product) => ({
      id: product.id,
      title: product.name,
      priceLabel: formatCurrency(product.price),
      stockLabel: `在庫 ${product.stock} 件`,
      tagText: product.tags.join(', '),
    }));

  console.log('表示用 product card:', productCards);

  assert.deepEqual(orderRows, [
    {
      id: 'o-001',
      customerName: 'Alice',
      statusLabel: '支払い済み',
      totalLabel: '4,000円',
      itemText: 'JavaScript入門 / 学習ノート',
    },
    {
      id: 'o-003',
      customerName: 'Alice',
      statusLabel: '支払い済み',
      totalLabel: '3,400円',
      itemText: 'TypeScript実践',
    },
    {
      id: 'o-002',
      customerName: 'Bob',
      statusLabel: '保留中',
      totalLabel: '3,200円',
      itemText: 'Reactハンズオン',
    },
  ]);
  assert.deepEqual(productCards, [
    {
      id: 'p-003',
      title: 'Reactハンズオン',
      priceLabel: '3,200円',
      stockLabel: '在庫 5 件',
      tagText: 'react, frontend',
    },
    {
      id: 'p-001',
      title: 'JavaScript入門',
      priceLabel: '2,800円',
      stockLabel: '在庫 12 件',
      tagText: 'javascript, beginner',
    },
    {
      id: 'p-004',
      title: '学習ノート',
      priceLabel: '600円',
      stockLabel: '在庫 30 件',
      tagText: 'note',
    },
  ]);
}
